#!/usr/bin/env python3
"""Fetch every dashboard feed server-side and write feeds.json.

Run by the GitHub Action in .github/workflows/update-feeds.yml. Standard
library only, so the workflow needs no pip install.

To add, remove or move a feed, edit GROUPS or CURIO below. The dashboard
itself no longer contains any feed URLs.

If a single feed fails, its previous items from the existing feeds.json are
kept, so one flaky publisher never empties a panel. feeds.json is only
rewritten when something actually changed, which keeps the commit history
quiet.
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "feeds.json"
UA = "Mozilla/5.0 (compatible; DashboardFeedBot/1.0; +https://jmilescaldwell.github.io/)"
TIMEOUT = 25
MAX_BYTES = 6_000_000
EXCERPT_LEN = 240
CURIO_PER_FEED = 15

# group -> (items kept per feed, [(source label, feed url), ...])
GROUPS = {
    "local": (8, [
        ("112 Zwolle", "https://www.112zwolle.nl/feed/"),
        ("RTV Focus", "https://www.rtvfocuszwolle.nl/feed/"),
        ("WeblogZwolle", "https://weblogzwolle.nl/feed/"),
        ("RTV Oost", "https://www.rtvoost.nl/rss"),
    ]),
    "national": (8, [
        ("NOS", "https://feeds.nos.nl/nosnieuwsalgemeen"),
        # Follow the Money was removed 2026-09-02: good reporting, but almost
        # everything sits behind their member paywall, so the headlines were
        # mostly teasers. Investico fills the investigative slot instead: same
        # money-and-power remit, published free on their own site. The domain
        # is platform-investico.nl; plain investico.nl does not resolve.
        ("Investico", "https://www.platform-investico.nl/feed"),
        ("Kanttekening", "https://dekanttekening.nl/feed/"),
        ("OneWorld", "https://www.oneworld.nl/feed/"),
    ]),
    "international": (8, [
        ("BBC", "https://feeds.bbci.co.uk/news/world/rss.xml"),
        ("NPR", "https://feeds.npr.org/1004/rss.xml"),
        ("Guardian", "https://www.theguardian.com/world/rss"),
        ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"),
    ]),
    "tech": (6, [
        ("HN", "https://hnrss.org/frontpage"),
        ("Willison", "https://simonwillison.net/atom/everything/"),
        ("OpenAI", "https://openai.com/blog/rss.xml"),
        ("DeepMind", "https://deepmind.google/blog/rss.xml"),
        ("Ars Technica", "https://feeds.arstechnica.com/arstechnica/index"),
        ("404 Media", "https://www.404media.co/rss/"),
    ]),
}

# Live RSS sources for the Discover panel. The names must match the rss
# entries in CURIO_SOURCES inside dashboard.html.
CURIO = [
    ("The Oatmeal", "https://theoatmeal.com/feed/rss"),
    ("Public Domain Review", "https://publicdomainreview.org/rss.xml"),
    ("Futility Closet", "https://www.futilitycloset.com/feed/"),
    ("Comics Curmudgeon", "https://joshreads.com/feed"),
    ("50 Watts", "https://50watts.com/rss"),
    ("Goblins", "https://www.goblinscomic.com/feed/"),
    ("Lileks (the Column)", "https://jameslileks.substack.com/feed"),
]

ATOM = "{http://www.w3.org/2005/Atom}"
MEDIA = "{http://search.yahoo.com/mrss/}"
CONTENT = "{http://purl.org/rss/1.0/modules/content/}"
DC = "{http://purl.org/dc/elements/1.1/}"


def child_text(el, *tags):
    for tag in tags:
        found = el.find(tag)
        if found is not None:
            value = "".join(found.itertext()).strip()
            if value:
                return value
    return ""


def strip_html(raw):
    no_tags = re.sub(r"<[^>]+>", " ", raw or "")
    return re.sub(r"\s+", " ", html.unescape(no_tags)).strip()


def parse_date(raw):
    if not raw:
        return None
    try:
        dt = parsedate_to_datetime(raw)
    except (TypeError, ValueError):
        try:
            dt = datetime.fromisoformat(raw.strip().replace("Z", "+00:00"))
        except ValueError:
            return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)


def find_link(entry):
    link = entry.find("link")
    if link is not None and (link.text or "").strip():
        return link.text.strip()
    for el in entry.findall(ATOM + "link"):
        if el.get("rel") in (None, "alternate") and el.get("href"):
            return el.get("href").strip()
    for el in entry.iter():
        if el.tag in ("link", ATOM + "link") and el.get("href"):
            return el.get("href").strip()
    guid = entry.find("guid")
    if guid is not None and (guid.text or "").startswith("http"):
        return guid.text.strip()
    return ""


def find_image(entry, raw_html):
    for el in entry.iter(MEDIA + "thumbnail"):
        if el.get("url"):
            return el.get("url")
    for el in entry.iter(MEDIA + "content"):
        kind = (el.get("type") or "") + (el.get("medium") or "")
        if el.get("url") and "image" in kind:
            return el.get("url")
    for el in entry.iter("enclosure"):
        if el.get("url") and (el.get("type") or "").startswith("image"):
            return el.get("url")
    match = re.search(r"<img[^>]+src=[\"']([^\"']+)[\"']", raw_html or "", re.I)
    return match.group(1) if match else None


def parse_feed(data):
    root = ET.fromstring(data)
    entries = [e for e in root.iter() if e.tag in ("item", ATOM + "entry")]
    items = []
    for entry in entries:
        title = strip_html(child_text(entry, "title", ATOM + "title"))
        link = find_link(entry)
        if not title or not link:
            continue
        raw_html = child_text(
            entry, CONTENT + "encoded", "description", ATOM + "summary", ATOM + "content"
        )
        when = parse_date(
            child_text(entry, "pubDate", DC + "date", ATOM + "published", ATOM + "updated")
        )
        items.append({
            "title": title,
            "link": link,
            "date": when.isoformat() if when else None,
            "excerpt": strip_html(raw_html)[:EXCERPT_LEN],
            "image": find_image(entry, raw_html),
        })
    return items


def download(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
    })
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read(MAX_BYTES)


def sort_key(item):
    return item["date"] or ""


def fetch_one(job):
    label, url, keep = job
    try:
        items = parse_feed(download(url))
        if not items:
            raise ValueError("no items found")
        items.sort(key=sort_key, reverse=True)
        return label, items[:keep], None
    except Exception as err:  # noqa: BLE001 - one bad feed must not stop the run
        return label, None, f"{type(err).__name__}: {err}"


def main():
    try:
        old = json.loads(OUT.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        old = {}
    old_groups = old.get("groups", {})
    old_curio = old.get("curio", {})

    jobs = []
    for group, (keep, feeds) in GROUPS.items():
        jobs += [(label, url, keep, group) for label, url in feeds]
    jobs += [(label, url, CURIO_PER_FEED, "__curio__") for label, url in CURIO]

    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda j: (j[3], fetch_one(j[:3])), jobs))

    groups = {g: {} for g in GROUPS}
    curio = {}
    failed = 0
    fresh = 0
    for group, (label, items, error) in results:
        if group == "__curio__":
            previous = old_curio.get(label, [])
            target = curio
        else:
            previous = old_groups.get(group, {}).get(label, [])
            target = groups[group]
        if error:
            failed += 1
            print(f"FAILED  {label}: {error}")
            if previous:
                target[label] = previous
                print(f"        kept {len(previous)} previous items")
        else:
            fresh += 1
            target[label] = items
            print(f"ok      {label}: {len(items)} items")

    payload = {"groups": groups, "curio": curio}
    previous_payload = {"groups": old_groups, "curio": old_curio}

    if fresh == 0 and not (old_groups or old_curio):
        print("Every feed failed and there is no previous data.")
        return 1

    if payload == previous_payload:
        print(f"No changes ({fresh} fetched, {failed} failed). feeds.json left alone.")
        return 0

    payload["updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    OUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
    )
    print(f"Wrote {OUT.name} ({fresh} fetched, {failed} failed).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
