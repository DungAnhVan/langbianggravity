# URL Map

Keep the main site on clean URLs only. Root `.html` files are compatibility fallbacks and should stay aligned with the clean URL pages when content changes.

| URL | Primary target | Search intent | Notes |
| --- | --- | --- | --- |
| `/` | Brand trust, manufacturing capability, off-road parts | Navigational and trust-building | Organization and WebSite JSON-LD live here. |
| `/products/` | Product catalogue and manufacturing categories | Browse and compare product lines | Keep links to sprockets and B2B visible. |
| `/products/sprockets/` | Sprocket product, manufacturing proof, material | Buyer intent, fitment, supplier evaluation | Add product schema only on this page. |
| `/b2b/` | Dealer, rental fleet, OEM/custom fabrication leads | Lead capture for batch supply | Link back to sprockets and contact naturally. |
| `/contact/` | Quote and contact conversion | Conversion | Keep product and finder links close to the form. |
| `/knowledge/` | Knowledge hub and source-of-truth index | AI answer engine and technical reference | Link the article pages back to product, B2B, and finder routes. |
| `/llms.txt` | AI-readable source index | Crawl and citation guidance | Keep concise and aligned with the live clean URLs. |
| `https://sprocket.langbianggravity.com/finder` | Fitment search | Long-tail fitment discovery | Subdomain route owned by the sprocket app. |
| `https://sprocket.langbianggravity.com/cross-reference/` | OEM replacement reference | Part-number cross-reference | Search OEM code -> JT SKU -> LBG SKU. |
| `https://sprocket.langbianggravity.com/fitment/[make-model-year]` | Long-tail fitment SEO | Model-level fitment discovery | Canonical pages should be indexable if the app publishes them. |
| `https://sprocket.langbianggravity.com/sitemap.xml` | Discoverability | Crawling and discovery | Confirm the subdomain sitemap stays current with fitment pages. |

## Supporting Pages

| URL | Role |
| --- | --- |
| `/products/brake-rotor/` | Supporting product line |
| `/products/cnc-performance/` | Supporting product line and custom fabrication proof |
| `/products/bolt-kits/` | Supporting product line |
| `/guides/motocross-gearing-chart/` | Supporting educational content and internal linking |
| `/knowledge/` | Knowledge hub |
| `/knowledge/what-is-520-sprocket/` | AI answer / buyer education page |
| `/knowledge/how-to-choose-dirt-bike-sprocket-ratio/` | AI answer / buyer education page |
| `/knowledge/scm440-sprocket-steel/` | AI answer / buyer education page |
| `/knowledge/7075-t6-aluminium-sprocket/` | AI answer / buyer education page |
| `/knowledge/steel-vs-aluminium-rear-sprocket/` | AI answer / buyer education page |
| `/knowledge/cnc-sprocket-manufacturing/` | AI answer / buyer education page |
| `/knowledge/motorcycle-sprocket-fitment/` | AI answer / buyer education page |
| `/knowledge/oem-sprocket-manufacturing-vietnam/` | AI answer / buyer education page |
| `/knowledge/trail-ride-drivetrain-checklist/` | Trail readiness / drivetrain reliability page |
| `/knowledge/chain-and-sprocket-inspection-before-trail/` | Trail readiness / drivetrain reliability page |
| `/knowledge/sprocket-wear-signs-off-road/` | Trail readiness / drivetrain reliability page |
| `/knowledge/choose-sprocket-ratio-for-trail-riding/` | Trail readiness / drivetrain reliability page |
| `/knowledge/drivetrain-failure-on-trail/` | Trail readiness / drivetrain reliability page |
| `/knowledge/what-tools-to-carry-for-chain-and-sprocket-problems/` | Trail readiness / drivetrain reliability page |

## Private Routes

| URL | Role | Notes |
| --- | --- | --- |
| `https://sprocket.langbianggravity.com/request/` | Private request intake | Keep noindex and out of sitemap if/when the route is published. Use only for direct alias additions or fitment review. |
