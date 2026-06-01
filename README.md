# Langbiang Gravity Website

Static brand-commerce front end for `langbianggravity.com`.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173/`.

## Notes

- Product, cart, and B2B inquiry interactions are handled in `script.js`.
- The quote form opens a `mailto:` draft because no production backend or payment provider is configured yet.
- Visual assets are stored locally under `assets/`.
