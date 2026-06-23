# Langbiang Gravity Website

Static hybrid brand-commerce front end for `langbianggravity.com`.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Notes

- The site is split into `index.html`, `products.html`, `b2b.html`, and `contact.html`.
- Shared product data lives in `products-data.js`.
- Product modals, quote list, and inquiry interactions are handled in `script.js`.
- The quote form opens a `mailto:` draft because no production quote server or payment provider is configured yet.
- Visual assets are stored locally under `assets/`.
