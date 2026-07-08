# Langbiang Gravity - ghi nho lam viec cho Codex

Muc tieu cua file nay: moi lan bat dau lam viec trong repo, doc file nay truoc de tiet kiem token, tranh ra soat lan man, va chi mo dung nhung file lien quan den viec dang lam.

## Quy tac bat dau moi phien

1. Doc `CODEX_WORKFLOW.md` truoc.
2. Chi doc `README.md` neu can preview/deploy notes hoac workflow context co ve cu.
3. Chay `git status --short --branch` de biet co thay doi dang treo khong.
4. Chi doc file theo khau can sua. Neu khong can, dung mo toan bo repo.
5. Truoc khi sua file, xac dinh ro file goc va file fallback/ban sao co can dong bo khong.
6. Sau khi sua, chay preview local neu co thay doi giao dien hoac JS:

```powershell
python -m http.server 4173
```

Mo `http://localhost:4173/`.

## Ban do repo

- `index.html`: trang home chinh.
- `products/index.html`: trang tong san pham clean URL.
- `products.html`: fallback compatibility cho trang products.
- `b2b/index.html`, `contact/index.html`: clean URL pages.
- `b2b.html`, `contact.html`: fallback compatibility, can dong bo khi sua noi dung tuong ung.
- `products/*/index.html`: trang landing tung nhom san pham.
- `knowledge/index.html` va `knowledge/*/index.html`: knowledge base source-of-truth pages cho AI answers va buyer education.
- `knowledge/trail-*/index.html`: trail readiness / drivetrain reliability cluster pages.
- `guides/motocross-gearing-chart/index.html`: trang guide/SEO.
- `products-data.js`: nguon du lieu product group va product card/modal.
- `fitment-data.js`: du lieu SKU fitment mock cho search theo dong san pham.
- `script.js`: logic chung cho navigation, mega menu, product modal, quote cart, fitment search, form contact, scroll/reveal.
- `styles.css`: style toan site.
- `llms.txt`: AI-readable site map va source-of-truth index o root public.
- `sitemap.xml`, `robots.txt`: SEO/deploy metadata.
- `vercel.json`: redirect normalization cho slashless clean URLs.
- `seo/keyword-map.md`, `seo/url-map.md`: lightweight SEO planning docs cho keyword map va route strategy.
- `seo/gsc/`: GSC export templates va notes de uu tien SEO sprint tiep theo.
- `assets/`: brand, product, va image assets local.

## Cac khau lam viec ro rang

### Khau 1 - Noi dung va cau truc trang

Dung khi sua copy, CTA, section, heading, metadata, hoac them bot block HTML.

File hay dung:
- `index.html`
- `products/index.html` va `products.html`
- `b2b/index.html` va `b2b.html`
- `contact/index.html` va `contact.html`
- `products/*/index.html`
- `knowledge/index.html` va `knowledge/*/index.html`
- `knowledge/trail-*/index.html`
- `guides/motocross-gearing-chart/index.html`

Can check:
- Clean URL page va fallback `.html` co noi dung khop nhau neu la cung mot trang.
- Link noi bo dung dang `/products/`, `/b2b/`, `/contact/`.
- Canonical, `og:url`, breadcrumb JSON-LD, va sitemap neu them/xoa URL.

Muc do on dinh: kha on dinh. Can can than nhat o cac cap trang co ban duplicate.

### Khau 2 - Du lieu san pham va fitment

Dung khi them/sua product, group, SKU, material, options, hoac search result.

File hay dung:
- `products-data.js`
- `fitment-data.js`
- Trang group lien quan trong `products/*/index.html` neu can copy landing page.

Can check:
- `slug`, `group`, `subgroup`, `line`, va `productSlug` phai khop voi JS va HTML.
- Anh san pham phai ton tai trong `assets/`.
- Neu them group moi, cap nhat mega menu data trong `products-data.js` va tao trang neu can.
- Quote price hien dang la `Price on request`, chua co checkout/payment.

Muc do on dinh: trung binh. Du lieu la nguon chung nen sua nho co the anh huong nhieu trang.

### Khau 3 - Tuong tac JS

Dung khi sua cart quote, modal, fitment search, menu mobile/mega menu, form contact, reveal/motion.

File hay dung:
- `script.js`
- HTML co `data-*` lien quan.
- `products-data.js`, `fitment-data.js` neu logic doc data.

Can check:
- Khong doi ten `data-*` neu chua sua ca HTML va JS.
- Cart dung `localStorage` key `lg-cart`.
- Pending quote dung `lg-pending-quote`.
- Contact form co `data-web3forms-form`; fallback/hanh vi form nam trong `script.js`.
- Sau khi sua JS, test toi thieu: open cart, add quote, product modal, fitment search, mobile nav.

Muc do on dinh: can than. Day la lop chia se toan site.

### Khau 4 - Giao dien CSS

Dung khi sua layout, responsive, animation, mau sac, card, nav, drawer, form.

File hay dung:
- `styles.css`
- HTML cua trang dang xem de biet class thuc te.

Can check:
- Desktop va mobile width.
- Header fixed/sticky, cart drawer, dialog, mega menu khong bi che nhau.
- Khong tao theme mot mau qua nang; palette hien tai: graphite/black + orange/lime/blue.
- Neu sua hero/section lon, test tren viewport mobile va desktop.

Muc do on dinh: trung binh. CSS tap trung mot file lon, nen tim selector bang `rg` truoc khi sua.

### Khau 5 - SEO, route, deploy

Dung khi them trang, doi URL, doi anh OG, doi canonical, robots/sitemap.

File hay dung:
- HTML page head.
- `llms.txt`
- `sitemap.xml`
- `robots.txt`
- `README.md` neu doi cach preview/deploy.

Can check:
- Canonical dung domain `https://langbianggravity.com/`.
- Clean URL route co file `index.html` trong folder.
- Fallback root `.html` chi giu cho compatibility, khong phai trang chinh.
- Sitemap phai co URL moi neu page public.
- Knowledge base pages should stay on clean folder URLs under `/knowledge/`.

Muc do on dinh: kha on dinh. De sai khi them URL moi ma quen sitemap.

## Viec dang on dinh

- Repo la static site, khong thay `package.json` hay build pipeline bat buoc.
- Local preview bang `python -m http.server 4173`.
- Shared product data da tach ra `products-data.js`.
- Shared fitment mock data da tach ra `fitment-data.js`.
- Shared interactions tap trung trong `script.js`.
- Root `llms.txt` va `/knowledge/` la source-of-truth surfaces cho AI answer engines.
- Visual assets dung local trong `assets/`.

## Viec can luu y / no ky thuat

- Co cac cap duplicate: `products/index.html` voi `products.html`, `b2b/index.html` voi `b2b.html`, `contact/index.html` voi `contact.html`. Khi sua noi dung mot trang fallback, can dong bo cap con lai neu no van duoc dung.
- Quote hien la request/inquiry, khong phai ecommerce checkout.
- README noi quote form mo `mailto:` draft, nhung HTML hien co dau hieu Web3Forms (`data-web3forms-form`). Khi lam form, phai doc `script.js` va contact page de xac nhan hanh vi thuc te truoc khi sua.
- Mot so link ngoai tro toi `https://sprocket.langbianggravity.com/...`; khong tu y doi neu khong co yeu cau.
- `styles.css` lon, nen dung `rg "ten-class"` truoc khi doc/sua.

## Checklist truoc khi ket thuc mot viec

- `git status --short` de biet dung nhung file minh da sua.
- Neu sua HTML/CSS/JS: preview local va kiem tra trang lien quan.
- Neu sua data product/fitment: test card/modal/search/quote lien quan.
- Neu sua route/SEO: check canonical, breadcrumb, sitemap.
- Cap nhat file nay neu phat hien quy tac moi hoac khau lam viec thay doi.

## Cach tiet kiem token khi lam viec

- Neu task nho: chi doc `CODEX_WORKFLOW.md`, `README.md`, `git status`, roi file lien quan.
- Neu task lien quan UI: doc HTML trang lien quan + selector CSS bang `rg`, khong doc het `styles.css`.
- Neu task lien quan product: doc block slug trong `products-data.js`/`fitment-data.js`, khong doc toan bo file neu khong can.
- Neu task lien quan behavior: doc function trong `script.js` bang `rg "functionName|data-attribute"`.
- Moi lan phat hien trang/logic nao da on dinh, ghi lai ngan gon vao file nay.
- Neu task la landing page visual polish: chi lam 1 visual layer trong 1 phien, vi du hero, CTA, mobile, motion section, product cards, hoac SEO. Khong polish toan page cung luc.
- Moi phien Codex nen ket thuc bang: files changed, what improved, what was checked, next smallest step.
