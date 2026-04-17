# Branch Strategy for Caldwell's Repository

> Claude also reads CLAUDE.md for quick context.

## Overview
This repository uses a protective branching strategy to safeguard the main D&D world content while allowing safe experimentation with new features.

## Branch Structure

### `main` - Protected Branch
**DO NOT MODIFY without explicit permission**

This branch contains all live site content:
- `index.html` — root landing page
- `caldwell-repo.html` — D&D hub (Evershroud Isles tools and lore)
- All generator files (`commgen.html`, `encgen.html`, `ingen.html`, `mapgen.html`, `mapgen2.html`, `dmscreen.html`, `bestiary.html`)
- All location pages (`brinealcazar.html`, `councilhall.html`, `embassy.html`, etc.)
- Travel systems (`harbour.html`, `travel.html`)
- Observatory pages (`calendar.html`, `astrology.html`)
- Other interactive pages (`fortune.html`, `harmony.html`, `forge.html`, `madlab.html`)
- All resources in `/resources/`
- `imogen/` — Imogen suite (labs, Chonk Invaders, Apocrypha)
- `lifestyle/` — lifestyle sub-project
- `phoenix/` — Phoenix sub-project

### `claude/feature-*` — Feature Branches
**Safe to modify**

Session branches follow the pattern `claude/<description>-<session-id>`. Use these for:
- New tool pages or major changes to existing ones
- Structural or navigation changes
- Work on any subproject (`imogen/`, `phoenix/`, `lifestyle/`)

All Claude work goes here by default. PRs from these branches into `main` require explicit user approval.

## Workflow

### For All Claude Work:
1. **Confirm the current branch** — the SessionStart hook prints it automatically
2. **Make your changes** on the feature branch
3. **Commit and push**
   ```bash
   git add <specific files>
   git commit -m "Description of changes"
   git push -u origin <branch-name>
   ```
4. **Open a PR** only when the user explicitly asks

### For Main Repository Changes:
1. **Get explicit permission first**
2. Work on a feature branch, never directly on `main`
3. Review changes carefully before merging

## Safety Guidelines

- **Never push directly to `main`** unless explicitly authorized
- **Always confirm which branch** you're working on before making changes
- **Feature branches** can be freely modified, broken, and reset
- **Keep work isolated** to prevent accidental modifications to main content

## Branch Naming Convention

- Main branch: `main`
- Session/feature branches: `claude/<description>-<session-id>`

---

Last updated: 2026-04-17
