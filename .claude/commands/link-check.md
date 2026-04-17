---
description: Check all internal href and src links across HTML files for broken references
---

Scan every .html file in the repo for internal links (href and src attributes that don't start with http/https/#/mailto) and verify each target exists on the filesystem. Report:
1. Any broken links (file not found), grouped by source file
2. A count of total links checked

Use Grep to find all href= and src= values, filter to relative paths, resolve them relative to the source file's directory, then check existence with Bash(ls) or Glob. Do not fix anything — just report. If everything is clean, say so clearly.
