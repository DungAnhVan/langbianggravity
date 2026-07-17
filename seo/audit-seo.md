# SEO Audit — Langbiang Gravity

**Ngày audit:** 2026-07-17  
**Phạm vi:** static source audit trong repository, gồm HTML, metadata, structured data, internal references, robots.txt, sitemap.xml và các file GSC hiện có.  
**Phương pháp:** kiểm tra mã nguồn tự động kết hợp review thủ công các route SEO chính. Chưa chạy crawl production, Lighthouse/PageSpeed hoặc kiểm tra rich result trực tiếp trên Google.

## Tóm tắt

Website có nền tảng SEO kỹ thuật tốt: 28/28 file HTML có title, meta description, canonical, Open Graph URL/image, Twitter Card, viewport và `lang="en"`; 27/28 có BreadcrumbList; 77 block JSON-LD đều parse được; không phát hiện local `href`/`src` bị hỏng.

Các việc còn nên ưu tiên trong sprint kế tiếp:

1. Xác minh route `/cross-reference/` thực sự được publish trên subdomain `sprocket.langbianggravity.com`, vì canonical và sitemap đang dùng subdomain trong khi source HTML nằm trong repo main site.
2. Bổ sung dữ liệu GSC thật cho query, page indexing và sitemap để audit hiệu suất đầy đủ hơn.
3. Chuẩn hóa dimensions/loading của ảnh và mở rộng các knowledge page còn mỏng theo intent.

## Những điểm đang đạt

| Hạng mục | Kết quả | Nhận xét |
| --- | ---: | --- |
| HTML pages | 28 | Bao gồm 3 cặp clean URL/fallback `.html` |
| Title | 28/28 | Không thiếu; không còn title vượt 65 ký tự trong audit này |
| Meta description | 28/28 | Không thiếu; không còn description vượt 160 ký tự trong audit này |
| Canonical | 28/28 | Các fallback trỏ về clean URL tương ứng |
| Open Graph URL/image | 28/28 | Có thông tin chia sẻ cơ bản |
| Twitter Card + OG image alt | 28/28 | Có card metadata và alt text |
| Viewport + `lang` | 28/28 | Có `viewport`, tất cả đang là `en` |
| BreadcrumbList | 27/28 | Homepage không có breadcrumb là chấp nhận được |
| JSON-LD syntax | 77/77 block hợp lệ | Chưa thay thế cho kiểm tra schema validator/rich results |
| Local `href`/`src` | 0 lỗi phát hiện | Đã kiểm tra các tham chiếu local trong HTML |
| Sitemap | 26 URL | Bao phủ clean routes và `llms.txt`; không đưa fallback `.html` vào sitemap |
| Robots | Allow-all + sitemap | Không thấy rule chặn crawl trong `robots.txt` |
| Fallback parity | 3/3 cặp khớp | `products`, `b2b`, `contact` normalized-content giống nhau |

## Findings và mức độ ưu tiên

### Đã xử lý — Cấu trúc H1 trang Brake Rotor

`products/brake-rotor/index.html` trước đây có hai H1 ở hai state front/rear. Đã thêm một H1 cấp trang `Off-road motorcycle brake rotors` và chuyển hai state headline thành H2. Cần giữ kiểm tra này khi chỉnh lại catalog state.


### P1 — Cần xác minh host của Cross-reference

`cross-reference/index.html` khai báo:

- canonical: `https://sprocket.langbianggravity.com/cross-reference/`
- Open Graph URL: cùng subdomain
- sitemap: cùng subdomain

Điều này đúng nếu page được deploy trên sprocket app/subdomain. Nếu page thực tế được phục vụ từ main site, đây là canonical/sitemap mismatch và có thể làm Google bỏ qua bản HTML trong repo main site. Cần xác nhận một URL production trả HTTP 200, canonical cùng host và route đó có trong sitemap của đúng property.

### P1 — Dữ liệu GSC chưa đủ để kết luận về query/indexing

Các file sau hiện chỉ có header hoặc template, nên chưa thể audit query, cannibalization và trạng thái index:

- `seo/gsc/performance-queries-last-3-months.csv`
- `seo/gsc/performance-pages-last-3-months.csv`
- `seo/gsc/page-indexing-export.csv`

File `seo/gsc/Trang.csv` có một snapshot page-level đến khoảng 2026-07-06. Tín hiệu đáng chú ý:

- `/products/sprockets/`: 1 click, 28 impressions, vị trí trung bình 4.32.
- Trang chủ: 0 click, 41 impressions, vị trí trung bình 1.27.
- `/products/bolt-kits/`: 0 click, 26 impressions, vị trí trung bình 5.81.
- `/products/cnc-performance/`: 0 click, 26 impressions, vị trí trung bình 6.31.
- `/products/brake-rotor/`: 0 click, 23 impressions, vị trí trung bình 4.17.

Sau khi có export đầy đủ, ưu tiên các page có impressions cao nhưng CTR thấp, rồi đối chiếu với query thực tế và canonical/indexing status.

### Đã xử lý — Title dài hơn ngưỡng khuyến nghị

Title không phải giới hạn cứng, nhưng các title dài dễ bị cắt trên SERP. Đã rút gọn 6 title được phát hiện trong pass trước:

| Trang | Title sau khi rút gọn |
| --- | ---: |
| `guides/motocross-gearing-chart/` | `Motocross Gearing Chart for Dirt Bike Sprockets | Langbiang Gravity` |
| `products/bolt-kits/` | `Titanium Motorcycle Bolt Kits | Langbiang Gravity` |
| `knowledge/what-tools-to-carry-for-chain-and-sprocket-problems/` | `Trail Tools for Dirt Bike Chain Problems | Langbiang Gravity` |
| `knowledge/choose-sprocket-ratio-for-trail-riding/` | `Dirt Bike Sprocket Ratio for Trail Riding | Langbiang Gravity` |
| `knowledge/drivetrain-failure-on-trail/` | `Dirt Bike Drivetrain Problems on Trail | Langbiang Gravity` |
| `knowledge/chain-and-sprocket-inspection-before-trail/` | `Inspect Dirt Bike Chain and Sprockets | Langbiang Gravity` |

### Đã xử lý — Meta description dài hơn khoảng hiển thị thông thường

Các description dài của homepage, trail checklist và trail tools đã được rút gọn còn dưới 160 ký tự, giữ benefit, đối tượng và CTA/fitment intent.

### Đã xử lý — Twitter Card metadata toàn site

28 file HTML hiện khai báo `twitter:card`, `twitter:title`, `twitter:description` và `twitter:image`. Đây không phải lỗi ranking trực tiếp; vẫn nên kiểm tra preview thực tế trên production.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### P2 — Image dimensions/loading chưa được chuẩn hóa

Audit thấy 74 thẻ `<img>`, trong đó 72 thẻ không có `width`/`height`, chỉ 1 thẻ khai báo `loading="lazy"` và chưa có thẻ nào khai báo `decoding="async"`. Điều này có thể làm tăng CLS hoặc tải dư ảnh below-the-fold, đặc biệt ở các trang catalogue/editorial.

Nên:

- thêm `width` và `height` theo intrinsic dimensions;
- dùng `loading="lazy"` cho ảnh dưới fold, giữ ảnh hero cần thiết ở eager/default;
- cân nhắc `decoding="async"` cho ảnh nội dung;
- xác nhận lại bằng Lighthouse hoặc PageSpeed trên production.

### P2 — Một số knowledge page còn mỏng về nội dung

Có 8 trang knowledge có dưới 200 từ nội dung chính sau khi loại HTML chrome. Đây không tự động là thin content, nhưng các chủ đề cạnh tranh như material, fitment và manufacturing sẽ có cơ hội tốt hơn nếu bổ sung dữ liệu gốc, bảng thông số, ví dụ theo model/year, lỗi thường gặp, nguồn tham chiếu và liên kết sang trang sản phẩm.

Nên mở rộng theo intent thay vì kéo dài chung chung:

- fitment: chain size, hub/spline, bolt circle, offset, model year và quy trình xác minh;
- material: trade-off wear/weight, điều kiện sử dụng và giới hạn;
- OEM: MOQ, QA, finish, packaging, sample approval và thông tin cần gửi khi hỏi giá.

## Structured data

Đã kiểm tra và parse thành công 77 block JSON-LD. Các type chính gồm `Organization`, `WebSite`, `BreadcrumbList`, `TechArticle`, `Product`, `ProductGroup`, `FAQPage`, `Service` và `CollectionPage`. 14 `TechArticle` hiện có thêm `mainEntityOfPage`, `image` và `inLanguage`; `datePublished`/`dateModified` vẫn chưa thêm vì repo chưa có ngày xác thực.

Điểm cần duy trì:

- Không thêm `Product`/`Offer` giả nếu site chỉ nhận quote và chưa có checkout/giá public.
- Chỉ dùng `FAQPage` khi câu hỏi và câu trả lời thực sự hiển thị trên page.
- Sau khi sửa schema, chạy Schema Markup Validator hoặc Rich Results Test trên URL production; syntax JSON hợp lệ chưa đảm bảo eligibility.

## Internal linking và route

15 page trong knowledge cluster đều đã có link đến `/products/sprockets/`, `/contact/`, `/b2b/` và sprocket finder. Đây là cấu trúc tốt cho luồng informational → commercial.

Sitemap hiện có 26 URL, gồm 25 clean public routes và `llms.txt`. Ba fallback root `.html` không xuất hiện trong sitemap, phù hợp với canonical clean URL. Cần tiếp tục cập nhật sitemap khi thêm page knowledge hoặc fitment landing page.

## Kế hoạch triển khai đề xuất

### Sprint 1 — technical cleanup

1. Đã chuẩn hóa H1 trang Brake Rotor.
2. Đã rút gọn 6 title và 3 meta description nêu trên.
3. Xác minh production host/canonical cho Cross-reference.
4. Đã bổ sung Twitter Card; tiếp tục kiểm tra preview trên production.

### Sprint 2 — performance và content depth

1. Bổ sung image dimensions/loading theo từng template.
2. Mở rộng 8 knowledge page dưới 200 từ bằng dữ liệu và ví dụ cụ thể.
3. Bổ sung `lastmod` có kiểm soát vào sitemap nếu workflow deploy có ngày cập nhật đáng tin cậy.

### Sprint 3 — GSC measurement

1. Nạp export Queries, Pages và Page indexing đầy đủ.
2. Gắn query cluster vào URL map/keyword map.
3. Theo dõi CTR của homepage, product pages và knowledge pages có vị trí 1–8.
4. Kiểm tra sitemap status và canonical/indexing của cả main domain và sprocket subdomain.

## Checklist kiểm tra lại

- [ ] Mỗi canonical URL trả đúng host và HTTP 200.
- [x] Mỗi page indexable có đúng một H1 cấp trang trong static audit.
- [x] Title và description không vượt ngưỡng audit nội bộ; vẫn cần kiểm tra theo query thực tế.
- [ ] Description có unique copy và CTA phù hợp intent.
- [ ] OG/Twitter preview đúng ảnh, title và URL trên production.
- [ ] Sitemap chỉ chứa canonical public URLs.
- [ ] Rich Results Test/Schema Validator không báo lỗi.
- [ ] Lighthouse kiểm tra LCP, CLS và ảnh below-the-fold.
- [ ] GSC exports được cập nhật trước khi đánh giá CTR/query.
