# Branch Strategy for Caldwell's Repository

## Overview
This repository uses a protective branching strategy to safeguard the main D&D world content while allowing safe experimentation with new features.

## Branch Structure

### `main` - Protected Branch
**DO NOT MODIFY without explicit permission**

This branch contains the core Caldwell's Repository content:
- index.html (main repository page)
- All generator files (commgen.html, encgen.html, ingen.html, mapgen.html, mapgen2.html, dmscreen.html, bestiary.html)
- All location pages (brinealcazar.html, councilhall.html, embassy.html, etc.)
- Travel systems (harbour.html, travel.html)
- Observatory pages (calendar.html, astrology.html)
- Other interactive pages (fortune.html, harmony.html, forge.html, madlab.html)
- All resources in /resources/ directory

### `claude/experimental-apocrypha-*` - Apocrypha Experimental Branch
**Safe to modify**

Use this branch for:
- Modifications to apocrypha.html
- Experimental features related to the Apocrypha section
- Testing new ideas that might be incorporated into Apocrypha

### `claude/experimental-aberrant-works-*` - Aberrant Works Experimental Branch
**Safe to modify**

Use this branch for:
- Modifications to aberrantworks.html
- Experimental features related to the Aberrant Works section
- Testing new ideas that might be incorporated into Aberrant Works

## Workflow

### For Experimental Work:
1. **Switch to the appropriate experimental branch**
   ```bash
   git checkout claude/experimental-apocrypha-*
   # or
   git checkout claude/experimental-aberrant-works-*
   ```

2. **Make your changes**

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push -u origin <branch-name>
   ```

### For Main Repository Changes:
1. **Get explicit permission first**
2. Work on a separate feature branch from main
3. Review changes carefully before merging

## Safety Guidelines

- **Never push directly to main** unless explicitly authorized
- **Always confirm which branch** you're working on before making changes
- **Experimental branches** can be freely modified, broken, and reset
- **Keep experimental work isolated** to prevent accidental modifications to main content

## Branch Naming Convention

- Main branch: `main`
- Experimental branches: `claude/experimental-<area>-<session-id>`
- Feature branches (if needed): `claude/feature-<description>-<session-id>`

---

Last updated: 2025-12-11
