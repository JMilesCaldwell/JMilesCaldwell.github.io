# Phoenix — Claude Context

## What This Is
Work tooling for an ecommerce site migration/redirect project. Not D&D, not Imogen — this is professional work stuff.

## Purpose
Tools and data for managing URL redirects and title cleanup across a multilingual ecommerce platform. Supports 6 languages: EN, DE, FR, ES, IT, NL.

## File Map
| File | Purpose |
|------|---------|
| `urlgen.html` | Localized URL handle generator — takes xlsx input, outputs redirect mappings |
| `redirectupdate.html` | Redirect update tool |
| `titleclean.html` | Title cleaning/normalization tool |
| `SitemapEN.aspx` | English sitemap |
| `work.md` | Notes on this folder's purpose |
| `*_handles.xlsx` | Per-language handle data files (EN/DE/FR/ES/IT/NL) |
| `*_Titles_*.xlsx` | Per-language title data files |
| `product_redirects_*.csv` | Generated redirect CSVs, per language |
| `product_redirects_*_updated.csv` | Updated versions of redirect CSVs |

## Tech
- Plain HTML tools with vanilla JS
- Uses [SheetJS/xlsx.js](https://sheetjs.com/) from CDN for reading Excel files
- Styling: Calibri font, purple brand color (`#68437B`), pink accent (`#ca427e`)
- No connection to Jekyll or the main D&D site

## Notes
- The xlsx and csv files are data artifacts — treat as reference, don't modify
- This folder is largely self-contained; tools process files locally in the browser
