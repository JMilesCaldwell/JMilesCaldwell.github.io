# Imogen — Claude Context

## What This Is
The Imogen suite: a collection of labs, experiments, and finished mini-projects. Distinct from the main D&D site — different aesthetic, different purpose.

## Aesthetic: Clinical, Sterile, Gallery
Imogen is **the art gallery**. Think museum wall text, curator's office, white-cube exhibition space. Not the fantasy parchment of the D&D site, not the homemade warmth of other sections.

Design language:
- **Font:** `Inter` (clean, neutral humanist sans). Never Almendra, Cinzel, or anything decorative.
- **Palette:** soft light backgrounds (`#FAFAFA`, `#F5F5F5`), dark slate text (`#2F4F4F`), white card containers.
- **Restraint:** subtle shadows, fine borders (`#E8E8E8`), generous whitespace. No decorative flourishes, no patterned backgrounds, no color blocking for its own sake.
- **Sticky top nav** with centered links — institutional, not playful.
- **Tone of copy:** neutral, observational. Titles state what something is. No exclamation points.

If a design choice would look at home in a high-end portfolio or a contemporary art museum's website, it fits Imogen. If it would look at home on a D&D wiki or a late-90s GeoCities page, it does not.

## The Exception: Apocrypha
**`apocrypha/` is an art piece inside the gallery and has its own rules.** It intentionally breaks the clinical aesthetic in service of its own horror-archive fiction: Cyrillic, amber terminals, glitch overlays, degradation filters, no favicon, ambient audio. See `apocrypha/CLAUDE.md` for its instructions. Do not apply the gallery aesthetic to Apocrypha, and do not apply Apocrypha's aesthetic to anything else in Imogen.

## File Map
| File | Purpose |
|------|---------|
| `index.html` | Imogen hub — links to all projects |
| `chonkinvaders.html` | Chonk Invaders mini-game (Space Invaders variant with cats) |
| `rastamanjan.html` | Music player page with scrolling titles + album download |
| `lab1.html`–`lab4.html` | Numbered lab experiments |
| `lab5-backup.html` | Backup/older version of a lab — scratch file |
| `staging-1.html` | "Signal.01: Iterative Memetics Sandbox" — staging experiment |
| `staging-2.html` | Lab staging page — scratch file |
| `password-protection-component.html` | Reusable password gate component |
| `apocrypha/` | Apocrypha sub-project — its own aesthetic (see `apocrypha/CLAUDE.md`) |
| `catgame/` | Assets for Chonk Invaders |
| `resources/` | Imogen-specific images/assets |

## Notes
- All internal links in `imogen/` use relative paths — keep them that way.
- `lab5-backup.html` and `staging-*.html` are WIP/scratch files; may not be linked from the hub.
- When adding a new lab, add it to `index.html` too — but only once it's ready to be shown in the gallery.
- Audio files for Apocrypha live at `/resources/` (root), not inside `imogen/`.
