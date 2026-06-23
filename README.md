# Langbiang Gravity Website

Static hybrid brand-commerce front end for `langbianggravity.com`.

## Local preview

Serve the folder so clean URLs such as `/products/`, `/b2b/`, and `/contact/` resolve correctly:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Notes

- The primary clean URL pages are `index.html`, `products/index.html`, `b2b/index.html`, and `contact/index.html`.
- Root `.html` pages are kept as compatibility fallbacks.
- Shared product data lives in `products-data.js`.
- Product modals, quote list, and inquiry interactions are handled in `script.js`.
- The quote form opens a `mailto:` draft because no production quote server or payment provider is configured yet.
- Visual assets are stored locally under `assets/`.
