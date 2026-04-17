# Caldwell's Repository — Claude Context

## What This Is
A GitHub Pages site serving as the central hub for **The Evershroud Isles** tabletop RPG campaign. It's a collection of interactive HTML tools, lore documents, and resources hosted at `JMilesCaldwell.github.io`. No build system — everything is plain HTML/CSS/JS served directly by GitHub Pages.

## Tech Stack
- Static HTML files with inline CSS and JavaScript
- Google Fonts: `Almendra` (body), `Cinzel` (headings/nav)
- Color palette: dark backgrounds (`rgba(0,0,0,0.7)`), parchment text (`#FAF4E0`)
- Jekyll config (`_config.yml`) with the `minima` theme, though most pages are fully custom HTML
- No npm, no bundler, no build step

## Repository Structure
```
/                        # Root — all interactive HTML tools live here
/resources/              # Images, PDFs, audio, and YAML data (bestiary.yml, maps, lore PDFs)
/resources/mapassets/    # Map generation assets
/resources/mapgen/       # Map generator resources
/5eCharacters/           # D&D 5e character sheets
/catgame/                # Cat game project
/imogen/                 # Imogen sub-project
/lifestyle/              # Lifestyle sub-project
/phoenix/                # Phoenix sub-project
```

## Key HTML Tools
| File | Purpose |
|------|---------|
| `index.html` | Main landing page (Caldwell's Repository) |
| `commgen.html` / `genericcommgen.html` | NPC/commoner generators |
| `encgen.html` | Encounter generator |
| `ingen.html` | InGen tool |
| `mapgen.html` / `mapgen2.html` | Map generators |
| `dmscreen.html` | DM screen |
| `bestiary.html` | Monster bestiary |
| `calendar.html` | In-game calendar with weather/sea conditions |
| `astrology.html` | Astrology/stars tool |
| `exchange.html` / `evershroudtradesimulator2000.html` | Simulated stock exchange |
| `apocrypha.html` | Apocrypha lore section |
| `aberrantworks.html` | Aberrant Works section |
| `tavern.html`, `forge.html`, `smithy.html`, etc. | Location/shop pages |
| `fortune.html` | Fortune telling tool |
| `harmony.html` | Crystal Harmony tool |
| `isekaid.html` / `isekaidcards.html` | Isekai'd game |
| `chonkinvaders.html` | Chonk Invaders mini-game |
| `terminal.html` | Terminal interface |

## Branch Strategy
See `BRANCH-STRATEGY.md` for full details. Summary:

- **`main`** — Protected. Never push directly without explicit user permission. Contains all live campaign content.
- **`claude/experimental-apocrypha-*`** — Safe to modify. For `apocrypha.html` work.
- **`claude/experimental-aberrant-works-*`** — Safe to modify. For `aberrantworks.html` work.
- **`claude/feature-*`** — Feature branches for new work, branched from main.
- Session branches follow the pattern `claude/<description>-<session-id>`.

**Default rule:** Do all work on a feature/experimental branch. Get explicit confirmation before touching `main`.

## Style Conventions
- Fantasy aesthetic throughout: dark translucent containers, parchment-colored text, serif fonts
- Navigation bars are sticky, centered, `rgba(0,0,0,0.7)` background
- Each page is self-contained — styles and scripts are inline or in `<style>`/`<script>` blocks within the HTML file
- No external JS frameworks (vanilla JS throughout)
- Icons/images are `.png` files in `/resources/`

## Notes
- `bestiary.yml` in `/resources/` is the data source for the bestiary
- `Worldmap.psd` is the raw Photoshop file for the world map (large, ~8MB)
- Audio files (`apocrypha.mp3`, `terminal.mp3`, `transcript.mp3`) are in `/resources/`
- PDFs in `/resources/` are lore documents (in-world newspapers, guides, catalogues)
