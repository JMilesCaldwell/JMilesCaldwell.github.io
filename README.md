# J. Miles Caldwell — GitHub Pages

Central hub site at `JMilesCaldwell.github.io`. Static HTML/CSS/JS, no build step, served by GitHub Pages.

## Projects

### Caldwell's Repository (`caldwell-repo.html`)
Interactive tools and lore for **The Evershroud Isles** tabletop RPG campaign.

- NPC/Commoner generators (`commgen.html`, `genericcommgen.html`)
- Encounter generator (`encgen.html`)
- Map generators (`mapgen.html`, `mapgen2.html`)
- DM Screen (`dmscreen.html`)
- Monster Bestiary (`bestiary.html`)
- In-game calendar with weather/sea conditions (`calendar.html`)
- Astrology/stars tool (`astrology.html`)
- Simulated stock exchange (`exchange.html`, `evershroudtradesimulator2000.html`)
- Location pages: tavern, forge, smithy, temple, harbour, guild hall, and more
- Fortune telling, crystal harmony, isekai'd game, and other oddities

### Imogen Suite (`imogen/`)
Labs, experiments, and finished mini-projects.

- `imogen/chonkinvaders.html` — Chonk Invaders mini-game
- `imogen/apocrypha/` — Apocrypha: a cryptic transcript experiment with terminal interface
- `imogen/rastamanjan.html` — music player page

### Phoenix (`phoenix/`)
Redirect and URL tooling for an ecommerce migration project.

### Lifestyle (`lifestyle/`)
Miscellaneous lifestyle project pages.

## Local Preview

Quick (no Jekyll):
```
python3 -m http.server 8000
```

Full Jekyll (matches GitHub Pages exactly):
```
bundle exec jekyll serve
```

## Stack
- Plain HTML/CSS/JS — no npm, no bundler
- Google Fonts: Almendra (body), Cinzel (headings)
- Jekyll `_config.yml` with minima theme (most pages are fully custom HTML)
