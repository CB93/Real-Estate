# Editing this site

The photos are now your real shots from the Google Drive folder — the address, price, and description are still sample text to replace before publishing.

## 1. Photos
All 15 slots are filled with real photos, cropped and lightly color-matched to fit. The original abstract `.svg` mockups are still in `/images` as a backup but are no longer referenced.
If you want to swap any of them for a different shot from your shoot, replace the `.jpg` file in `/images` (keep the same filename) or update the `src="images/....jpg"` path in `index.html` / `photos.html`. Recommended sizes: square slots 1200×1200, wide slots 1600×1000, the big kitchen tile 1600×1600.

Keep the same rough shape for best results:
- Most gallery tiles are square
- Tiles with class `span-2-1` are wide (landscape shots work best)
- The one tile with `span-2-2` is large/square — pick your best kitchen or living shot

## 2. Property details
Search-and-replace these across both HTML files:
- Address: `4128 Aspenwood Terrace` / `Langley, BC` / `V2Y 0K3`
- Price: `$1,648,000`
- Specs: beds, baths, sq ft, lot size, year built (in the spec strip on `index.html`)
- Agent name, phone, email, brokerage (footer, both pages)

## 3. Description & features
The overview copy, pull-quote, and the three feature lists (Interior / Exterior / Systems) on `index.html` are written for a sample home — rewrite them to describe your actual property.

## 4. Colors & fonts
All design tokens live at the top of `styles.css` under `:root` — change `--sage`, `--stone`, etc. to retint the whole site from one place.

## 5. Viewing locally
Just open `index.html` in a browser. To deploy, upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, etc.) — no build step needed.
