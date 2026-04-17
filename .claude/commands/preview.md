---
description: Start a local HTTP server for previewing the site
---

Start a local preview server:

1. Run `python3 -m http.server 8000` in the background from the repo root.
2. Tell the user the site is available at http://localhost:8000
3. Remind them to open the browser console and check for errors after navigating.
4. If a specific file was mentioned as $ARGUMENTS, give the direct URL: http://localhost:8000/$ARGUMENTS
