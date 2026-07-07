# AGENTS.md

Instructions for Codex agents working in this repository.

## First steps every session

1. Read `CODEX_WORKFLOW.md` first.
2. Read `README.md` only for preview/deploy notes or if workflow context is stale.
3. Run `git status --short --branch` before editing.
4. Use `rg` / `rg --files` to locate code. Do not scan the whole repo unless needed.

## Working style

- Save tokens: open only files related to the current task.
- Prefer small, local changes that match the current static-site structure.
- Do not rewrite unrelated pages, formatting, copy, or assets.
- Do not revert user changes or uncommitted work unless the user explicitly asks.
- Before edits, identify whether a clean URL page has a root `.html` fallback that must stay in sync.
- Update `CODEX_WORKFLOW.md` when a new stable rule, route, file role, or recurring checklist item is discovered.

## Project shape

- This is a static website. There is no required build pipeline in the current repo.
- Preview locally with:

```powershell
python -m http.server 4173
```

- Visit `http://localhost:4173/`.
- Main shared files:
  - `products-data.js`: product groups and product data.
  - `fitment-data.js`: mock fitment SKU data.
  - `script.js`: shared navigation, modal, quote cart, form, fitment search, and motion logic.
  - `styles.css`: shared site styles.

## Duplicate page rule

Keep these pairs aligned when editing equivalent page content:

- `products/index.html` and `products.html`
- `b2b/index.html` and `b2b.html`
- `contact/index.html` and `contact.html`

Clean URL pages are primary. Root `.html` files are compatibility fallbacks.

## Verification

- HTML/CSS/JS changes: preview the affected page locally.
- Product or fitment data changes: check relevant card, modal, search result, and quote flow.
- SEO or route changes: check canonical URL, Open Graph URL, breadcrumbs/JSON-LD, and `sitemap.xml`.
- End each task by checking `git status --short`.
