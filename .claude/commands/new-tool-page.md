---
description: Scaffold a new tool page from an existing template
argument-hint: <filename-without-extension> <page-title>
---

Create a new tool page at $1.html by:
1. Copying an existing simple tool page (tavern.html is a decent template) as the starting structure.
2. Replacing the `<title>` with "$2".
3. Stripping tool-specific JS from the body, leaving the nav + container shell.
4. Confirming the nav links still point at real files.
5. Asking the user what the tool should do before writing any logic.

Do NOT push to main. Work on the current feature branch.
