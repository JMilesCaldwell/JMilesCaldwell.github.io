# Imogen — Claude Context

## What This Is
The Imogen suite: a collection of labs, experiments, and finished mini-projects. Distinct from the main D&D site — different aesthetic, different purpose.

## Aesthetic
Clean, modern, minimal. Opposite of the main site's fantasy parchment look.
- Font: `Inter` (not Almendra/Cinzel)
- Colors: light backgrounds (`#FAFAFA`, `#F5F5F5`), dark slate text (`#2F4F4F`)
- White card containers, subtle shadows
- No dark/parchment theme here

## File Map
| File | Purpose |
|------|---------|
| `index.html` | Imogen hub — links to all projects |
| `chonkinvaders.html` | Chonk Invaders mini-game (Space Invaders variant with cats) |
| `rastamanjan.html` | Music player page with scrolling titles + album download |
| `lab1.html`–`lab4.html` | Numbered lab experiments |
| `lab5-backup.html` | Backup/older version of a lab |
| `staging-1.html` | "Signal.01: Iterative Memetics Sandbox" — staging experiment |
| `staging-2.html` | Lab staging page |
| `password-protection-component.html` | Reusable password gate component |
| `apocrypha/` | Apocrypha sub-project (see below) |
| `catgame/` | Assets for Chonk Invaders |
| `resources/` | Imogen-specific images/assets |

## Apocrypha (`apocrypha/`)
A cryptic, atmospheric experiment — fake transcripts, terminal aesthetic.
- `apocrypha/index.html` — entry page with cryptic entries
- `apocrypha/terminal.html` — terminal-style interface
- `apocrypha/entry1.html`, `entry2.html` — individual transcript entries
- Audio: `transcript.mp3`, `terminal.mp3`, `apocrypha.mp3` live in `/resources/` (root)

## Notes
- All internal links in `imogen/` use relative paths — keep them that way
- `lab5-backup.html` and `staging-*.html` are WIP/scratch files, may not be linked from the hub
- When adding a new lab, add it to `index.html` too
