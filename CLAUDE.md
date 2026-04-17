# CLAUDE.md — JMilesCaldwell.github.io

## What this repo is

A personal GitHub Pages site (~57 single-file HTML tools) with no build process. Deployed via Jekyll (`_config.yml`). Everything runs in the browser as static files.

The repo has two distinct purposes:

### 1. D&D / Evershroud Isles Worldbuilding (primary)
Tools to run a tabletop RPG campaign set in a custom world called the Evershroud Isles. Categories:
- **Merchant shops** — alchemist, artificer, black-market, general-store, smithy, clothier: randomized inventory with 60-minute refresh cycles backed by localStorage
- **Generators** — commgen, encgen, isekaid: NPC/encounter generators with randomized traits, names, and stats
- **Combat tools** — bestiary (YAML-based creature tracker with initiative sorting), dmscreen (multi-panel DM companion with Google CSE)
- **World tools** — calendar (Berynian calendar + weather), astrology (constellation carousel), mapgen2 (procedural battle map generator)
- **Location pages** — tavern, embassy, guildhall, harbour, tower, temple, brinealcazar, shop-district, council-hall
- **Lore/narrative** — apocrypha (memetic horror theme with glitch effects), entry1, entry2, terminal
- **3D simulator** — templesimulator.html (Three.js Buddhist temple with NPC dialogue)
- **Game** — chonkinvaders.html (canvas Space Invaders variant with cats, mobile controls, fullscreen, Dreamlo leaderboard via CORS proxy)

### 2. Shopify Redirect CSV Tooling (work exception)
Built as a one-off on this personal account, run in parallel with a professional account to get more done in a short time. Three browser-based tools for managing multilingual (EN/DE/ES/FR/IT/NL) Shopify product redirect CSVs:
- **urlgen.html** — URL generation
- **titleclean.html** — language-aware product title-to-handle converter with XLSX export
- **redirectupdate.html** — ingests new product handles and patches missing rows across existing redirect CSVs

This work is complete and was a specific exception — this account is normally for personal projects only.

---

## Tech stack

| Aspect | Detail |
|--------|--------|
| Language | HTML5 + Vanilla JavaScript (ES5/ES6) |
| Styling | Inline CSS per file, no external stylesheets |
| State | localStorage + in-memory variables |
| Layout | CSS Grid, Flexbox |
| Frameworks | None |
| Build | None — files served as-is |
| Deployment | GitHub Pages (Jekyll) |
| External libs | Three.js (templesimulator), js-yaml (bestiary), XLSX (madlab2-4, titleclean, redirectupdate) |

---

## Conventions

**File structure:** One HTML file per tool. All CSS and JS is inline. No shared stylesheet or script files.

**Fonts:** Cinzel (headings) + Almendra (body) from Google Fonts — used across all D&D tools.

**Color scheme (D&D tools):**
- Text: `#FAF4E0` (parchment)
- Backgrounds: `resources/*.png` with `rgba(0,0,0,0.7)` overlay
- Action color: `#8B0000` (dark red)

**Store refresh pattern:**
```javascript
const nextRefresh = lastRefreshTime + (60 * 60 * 1000);
localStorage.setItem('store-key', JSON.stringify(stock));
setInterval(updateCountdown, 1000);
```

**Dynamic content:** Direct DOM manipulation via `innerHTML` + `.map().join('')`. No virtual DOM.

**Persistence:** localStorage only. No backend, no accounts.

---

## Assets

`/resources/` contains background images, battle maps (10–16MB each), PDFs, and audio. Referenced directly by HTML files via relative paths.

`/5eCharacters/` contains character sheet PDFs and HTML sheets.

`/catgame/` and `/imogen/` are subdirectories with their own assets.
