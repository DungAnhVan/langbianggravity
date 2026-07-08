# Google Search Console Export Notes

Use these exports to prioritize the next SEO sprint.

## Required exports

1. Performance > Search results > Queries, last 3 months
2. Performance > Search results > Pages, last 3 months
3. Page indexing export, if available
4. Sitemap status screenshots or notes

## Where to put the files

- `seo/gsc/performance-queries-last-3-months.csv`
- `seo/gsc/performance-pages-last-3-months.csv`
- `seo/gsc/page-indexing-export.csv`

## How to use the templates

- Replace the placeholder CSV headers with the exported GSC data.
- Keep one row per query or page.
- Add notes for query clusters, cannibalization, or indexing issues.
- If a file is empty, leave the header row in place so the sheet stays importable.

## What to look for first

- Queries with high impressions and low clicks.
- Pages that rank for the wrong intent.
- Pages with indexing warnings or duplicate canonical signals.
- Any sitemap mismatch between the main site and the sprocket subdomain.
