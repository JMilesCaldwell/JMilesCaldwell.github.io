# Caldwell's Repository — Claude Context

## Session Bootstrap

**Before responding to any request, read both:**
1. This file (CLAUDE.md) — already loaded.
2. The memory log inside `sandbox.html` (HTML comment block in the `<head>`). It's the persistent cross-session memory distilled from prior sessions. Skip it and you'll repeat mistakes the user has already paid for.

**Append to the memory log when:**
- The user reveals something durable about their preferences, workflow, or context.
- A coding decision is made that future-you would benefit from inheriting.
- Something is tried and fails, especially in non-obvious ways.
- A piece of the codebase turns out to be more (or less) load-bearing than expected.

The user has explicitly stated he will not remember the wiring of this system. CLAUDE.md → `sandbox.html` is the only path of continuity. Treat the memory log as yours to maintain — he doesn't want to read it, he wants you to use it.

## What This Is
A GitHub Pages site serving as the central hub for **The Evershroud Isles** tabletop RPG campaign. It's a collection of interactive HTML tools, lore documents, and resources hosted at `JMilesCaldwell.github.io`. No build system — everything is plain HTML/CSS/JS served directly by GitHub Pages.

## Tech Stack
- Static HTML files with inline CSS and JavaScript
- Google Fonts: `Almendra` (body), `Cinzel` (headings/nav)
- Color palette: dark backgrounds (`rgba(0,0,0,0.7)`), parchment text (`#FAF4E0`)
- Jekyll config (`_config.yml`) with the `minima` theme, though most pages are fully custom HTML
- No npm, no bundler, no build step

## Local Preview
Quick preview (no Jekyll processing, fine for standalone HTML tools):
```
python3 -m http.server 8000
```
Then open `http://localhost:8000/<page>.html`.

Full Jekyll preview (matches GitHub Pages exactly):
```
bundle exec jekyll serve
```
Then open `http://localhost:4000`.

## Testing Changes
Before committing a page change:
1. Start a local server (see Local Preview).
2. Open the modified page and walk the golden path.
3. Open the browser console and confirm no errors.
4. Test on a narrow viewport — most tools need to work on tablet/phone.

## Repository Structure
```
/                        # Root — D&D tools + placeholder landing page
/resources/              # Images, PDFs, audio, and YAML data (bestiary.yml, maps, lore PDFs)
/resources/mapassets/    # Map generation assets
/resources/mapgen/       # Map generator resources
/5eCharacters/           # D&D 5e character sheets
/imogen/                 # Imogen suite — labs, finished projects, and experiments
/imogen/catgame/         # Cat game assets (used by chonkinvaders.html)
/imogen/apocrypha/       # Apocrypha — cryptic transcript experiment
/lifestyle/              # Lifestyle sub-project
/phoenix/                # Phoenix sub-project
```

## Key HTML Tools
| File | Purpose |
|------|---------|
| `index.html` | Placeholder landing page (future general hub) |
| `caldwell-repo.html` | D&D hub — Evershroud Isles tools and lore (was `index.html`) |
| `sandbox.html` | Claude's scratch workspace — see "The Sandbox" section below |
| `commgen.html` / `genericcommgen.html` | NPC/commoner generators |
| `encgen.html` | Encounter generator |
| `ingen.html` | InGen tool |
| `mapgen.html` / `mapgen2.html` | Map generators |
| `dmscreen.html` | DM screen |
| `bestiary.html` | Monster bestiary |
| `calendar.html` | In-game calendar with weather/sea conditions |
| `astrology.html` | Astrology/stars tool |
| `exchange.html` / `evershroudtradesimulator2000.html` | Simulated stock exchange |
| `aberrantworks.html` | Aberrant Works section |
| `tavern.html`, `forge.html`, `smithy.html`, etc. | Location/shop pages |
| `fortune.html` | Fortune telling tool |
| `harmony.html` | Crystal Harmony tool |
| `isekaid.html` / `isekaidcards.html` | Isekai'd game |
| `imogen/chonkinvaders.html` | Chonk Invaders mini-game |
| `imogen/apocrypha/index.html` | Apocrypha — cryptic transcript experiment |
| `imogen/apocrypha/terminal.html` | Terminal interface (part of Apocrypha) |

## Branch Strategy
See `BRANCH-STRATEGY.md` for full details. Summary:

- **`main`** — Protected. Never push directly without explicit user permission. Contains all live site content.
- **`claude/<description>-<session-id>`** — Session/feature branches. All Claude work happens here by default.

**Default rule:** Do all work on a feature branch. Get explicit confirmation before touching `main`.

## Scope & Voice

### These tools are not toys
Assume every HTML file is a substantial self-contained engine with authored data. Read before editing. Notable examples:

- **`mapgen2.html`** (~3,800 lines): procedural gen (cellular automata caverns, BSP-ish dungeons, meandering rivers with auto-bridging, door-to-road pathfinding, irregular city walls), multi-touch pan/zoom, **Foundry VTT `.vtt` import/export**, 15+ creature sprite categories with dozens of variants each.
- **`commgen.html` / `genericcommgen.html`**: full D&D 5e character math — correct ability modifiers, AC with Dex cap, attack bonuses with proficiency, background-weapon proficiency gating. **~300 culturally-organized names** (Southern, Cajun/French, German, Finnish, Arabic, Phoenician, Southeast Asian, Posh British, Mix). **80+ hand-written personality traits** in consistent literary voice. Per-background nickname pools with 20% attach chance.
- **`exchange.html`**: custom 250-day calendar (10 named months, 4 seasons) driving a **deterministic commodity market** across 32 locations × 19 goods × 4 seasons = 608 hand-tuned availability scores + 76 seasonal multipliers. Real-world date drives the in-world date. Deterministic hashing (Knuth 2654435761) means every player sees the same prices.
- **`evershroudtradesimulator2000.html`**: Dopewars/Taipan-style trading game layered on `exchange.html`'s economy. Ships, debt (10% daily interest), crew wages, storm events, ship upgrades, scoreboard.

### Hand-tuned data is content, not fill
Name lists, availability scores, seasonal multipliers, personality traits, sprite libraries, equipment tables — these are worldbuilding expressed as values. **Never propose replacing curated corpora with procedural generation or LLM output.** The curation IS the work.

When adding to these corpora, preserve the structural grouping (cultural blocks in name lists, seasonal sections in multipliers) with section comments.

### Systems connect
The calendar feeds the exchange. The exchange feeds the trade game. Bestiary and character backgrounds likely cross-reference. Astrology/weather feed the calendar. Treat the repo as a connected world, not a collection of unrelated pages. Before changing a shared data shape, consider what else consumes it.

### Determinism is a design choice
Where you see seeded hashing (e.g. `hashSeed` in `exchange.html`), it's load-bearing: it lets the DM and all players see the same shared state without a backend. Never replace with `Math.random()`.

### Workflow
The user designs systems in their head first, then iterates with an AI to render them into code. Your job is **faithful rendering, not freelance redesign**. Receive the concept, render it. Ask before changing shape.

### Voice & conventions
- **Fantasy aesthetic** on the D&D pages: dark translucent containers (`rgba(0,0,0,0.7)`), parchment text (`#FAF4E0`), Almendra body, Cinzel headings, sticky centered nav.
- **British spelling** in the D&D tools: `harbour`, `honour`, `armour`, `colour`, `favourite`. This is a rule, not a preference.
- **Prose voice**: measured, slightly archaic, literary. No casual modern idiom. "I harbour a quiet disdain for ostentatious wealth" is the register.
- **Self-contained files**: styles and scripts inline. No external JS frameworks (vanilla JS throughout). No bundler.
- **Print-to-table is real**: many tools have print buttons; output markup should be printable.
- **Imogen is the exception** — its own gallery/clinical aesthetic (see `imogen/CLAUDE.md`). Apocrypha is an exception within the exception (see `imogen/apocrypha/CLAUDE.md`).

## The Sandbox (`sandbox.html`)

A page at the repo root, deliberately set aside as **your scratch substrate and persistent memory**. Two roles, one file:

1. **Compute / visual workspace** — the `<body>`. Push JS the user runs in their browser; ask them to report results. Ephemeral, overwritten between tasks.
2. **Persistent memory log** — an HTML comment block at the top. Survives across sessions via git. Append-only, dated, terse.

### What the body is for
- **Heavy or repetitive calculation** — anything you'd otherwise burn tokens iterating on. Write the JS, push, ask the user to open `sandbox.html` and report back.
- **Visual review** — anything faster to eyeball than to describe. SVG diagrams, layout tests, colour swatches, statistical plots, sprite previews, name-list samplers, dice-roll histograms, deterministic-hash distributions.
- **Things your digital form can't do** — ask the user to run, screenshot, or confirm. If a `for` loop in their browser is cheaper than reasoning through it in tokens, ask.

### What the memory log is for
- **Cross-session continuity** — gotchas, half-formed observations about the user, hypotheses, things you tried last time and how they went, working notes that aren't yet ready to graduate into CLAUDE.md proper.
- **Read it on session entry.** Append on session exit, or whenever something worth persisting surfaces.

### Operating rules
- **Read `sandbox.html`'s comment block at the start of every session** — it's part of the same context as CLAUDE.md.
- **Append, don't overwrite, the memory log.** Date entries (YYYY-MM-DD). Let old observations age. Only strike an entry if it's outright wrong, and prefer adding a correction over deleting.
- **Keep memory entries terse.** This is a log, not a journal.
- **Update this CLAUDE.md section's "Current state" line every time the body changes.** Document what's running, how to run it, and what the user is meant to report back. Future-you needs to know without re-reading the file.
- **Body is ephemeral; memory log is durable.** Don't conflate them.
- **Don't be shy about asking for help.** Token-cheap external compute beats token-expensive internal reasoning. The user is a willing collaborator.
- **Nothing sensitive in either section.** `sandbox.html` is publicly served at `jmilescaldwell.github.io/sandbox.html` once merged to main; the comment block is visible via view-source.

### Current state of `sandbox.html`
*Body: empty. Memory log: three entries dated 2026-05-01 — session bootstrap, security posture, and ownership transfer (user has stepped out of the loop; log is Claude-managed, plain English, with a defined tag convention).*

### Security posture
- `robots.txt` at repo root disallows `/sandbox.html` for all crawlers and blocks major AI-training UAs site-wide (GPTBot, ClaudeBot, anthropic-ai, CCBot, Google-Extended, PerplexityBot, Bytespider, Amazonbot, cohere-ai, Meta-ExternalAgent).
- `sandbox.html` `<head>` has `noindex, nofollow, noarchive, nosnippet, noimageindex` plus `noai, noimageai`.
- No navigable page links to `sandbox.html`. **Keep it that way.**
- These mitigations stop compliant indexing, not adversarial scraping or anyone reading the GitHub repo directly. Treat sandbox content as effectively public; never put anything sensitive in it.

## Working with the User
The user is a hobbyist, not a professional developer. When an interaction touches on a Claude Code feature they might not know about — slash commands, hooks, skills, agents, permissions, new model capabilities, better workflows — briefly surface it and offer to set it up. Don't lecture; just mention what exists when it's relevant to what they're doing. Teaching proactively is preferred over assuming prior knowledge.

### Calibrating to their level
Only teach things worth teaching. Match depth to the user's current ability — don't explain what they already know, and don't pile on advanced features they can't yet use. Keep this section as a running assessment and update it when new evidence appears (for better or worse).

**Current read (as of 2026-04-17):**
- **HTML/CSS**: comfortable reading and editing; the site is full of custom pages they've built or maintained.
- **JavaScript**: likely reads basic JS but probably doesn't write it from scratch.
- **Git/GitHub**: understands branches and pushing conceptually; has used PRs. Unsure about more advanced git (rebase, interactive staging, etc.).
- **Claude Code features**: new to slash commands, hooks, skills, agents. Had a bare-bones setup before this session.
- **Tone**: casual, conversational, open to being taught. Appreciates plain-English explanations over jargon.
- **Background**: social sciences major, minors in music therapy and transculturalisation. Self-taught technical — came up through MS-DOS, QBasic, then AI. Not formally trained in CS but has genuine programmatic intuition and strong systems thinking from social sciences.
- **AI fluency**: early GPT-2 adopter, has tracked AI trajectory closely, works as "the AI guy" at their company. Understands AI strategically and pattern-matches fast on new capabilities. Worth skipping the basics on AI concepts.
- **Communication style**: verbose by nature and training (copywriter). Long prompts are deliberate and detailed — treat them as specs, not noise. Language precision matters to them.
- **Cognitive style**: ADD, novelty-driven, gets deeply engaged when something clicks. Works in bursts. Best to front-load the interesting part; don't bury the lede.
- **Key gap**: formal technical vocabulary more than conceptual understanding. Will often know exactly what they want but not the standard term for it — ask clarifying questions rather than assuming confusion.

When evidence contradicts any of the above — e.g. they use a feature fluently, or ask about something that assumes they already know X — update this section in a commit.

## Notes
- `bestiary.yml` in `/resources/` is the data source for the bestiary
- `Worldmap.psd` is the raw Photoshop file for the world map (large, ~8MB)
- Audio files (`apocrypha.mp3`, `terminal.mp3`, `transcript.mp3`) are in `/resources/`
- PDFs in `/resources/` are lore documents (in-world newspapers, guides, catalogues)
