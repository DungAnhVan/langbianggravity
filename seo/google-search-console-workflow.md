# Quy trình Google Search Console — Langbiang Gravity

**Mục đích:** dùng tài liệu này sau mỗi lần sửa page, đổi URL, thêm page hoặc thêm tính năng có thể ảnh hưởng đến crawl, index, snippet, structured data, trải nghiệm trang hoặc organic traffic.

**Phạm vi:** main site `https://langbianggravity.com/` và các route/subdomain liên quan, đặc biệt `https://sprocket.langbianggravity.com/` nếu URL đó có trong canonical, sitemap hoặc luồng fitment.

**Nguyên tắc:** Google Search Console (GSC) là công cụ quan sát và chẩn đoán cách Google Search thấy website. GSC không đảm bảo page được index, không đảm bảo thứ hạng và không thay thế kiểm tra production, analytics hoặc test người dùng.

## 1. Google Search Console là gì?

Google Search Console là dịch vụ miễn phí của Google để:

- xác nhận Google có thể tìm, crawl và đọc website;
- xem URL nào được index, URL nào bị loại và lý do;
- kiểm tra một URL cụ thể bằng URL Inspection;
- gửi sitemap và theo dõi sitemap có được đọc hay không;
- xem impressions, clicks, CTR, position và query/page tạo traffic từ Google Search;
- theo dõi rich results/structured data, Core Web Vitals và các vấn đề trải nghiệm;
- nhận cảnh báo về manual action, security issue, indexing spike hoặc lỗi lớn.

GSC khác Google Analytics:

| Công cụ | Trả lời câu hỏi chính |
| --- | --- |
| Google Search Console | Google Search đã thấy, index và hiển thị website như thế nào? |
| Google Analytics | Người dùng đã vào site rồi thì họ làm gì, đi qua funnel nào, chuyển đổi ra sao? |
| PageSpeed Insights/Lighthouse | Một URL đang tải và render nhanh/chậm thế nào trong một lần test? |

Không cần GSC để website được Google đưa vào kết quả tìm kiếm. GSC giúp phát hiện vấn đề, xác nhận thay đổi và đo tín hiệu Search. Dữ liệu GSC có thể trễ, được xử lý khác Analytics và không phải lúc nào cũng liệt kê mọi URL trong mọi report.

## Thiết lập một lần trước khi vận hành

Đây là phần setup, không cần lặp lại sau mỗi page change nhưng phải kiểm tra lại khi đổi domain, host hoặc quyền truy cập.

- [ ] Tạo/giữ đúng property cho `langbianggravity.com`.
- [ ] Ưu tiên Domain property nếu team kiểm soát DNS; dùng URL-prefix property khi cần giới hạn protocol/host/path.
- [ ] Xác minh ownership bằng DNS hoặc phương thức phù hợp; không coi việc URL mở được trong browser là đã xác minh GSC.
- [ ] Bảo vệ Google account bằng 2-Step Verification.
- [ ] Cấp quyền Owner/Full user cho người chịu trách nhiệm deploy và SEO; cấp quyền hạn chế hơn cho người chỉ cần đọc report.
- [ ] Bật email notification của GSC cho indexing, manual action, security và các cảnh báo quan trọng.
- [ ] Xác nhận property bao phủ đúng `https://langbianggravity.com/`; không phân tích lẫn `http`, `www` hoặc subdomain nếu không có chủ đích.
- [ ] Xác định có cần property riêng cho `sprocket.langbianggravity.com` để theo dõi/triage route fitment hay không.
- [ ] Submit sitemap production đúng host và ghi nhận lần đọc đầu tiên.
- [ ] Lưu baseline ngày setup: số URL public, sitemap, index status, top pages/queries, canonical và các cảnh báo đang tồn tại.

Chỉ người có quyền truy cập production mới có thể hoàn tất các bước này. Không ghi token, password, verification code hoặc thông tin nhạy cảm vào repo.

## 2. Các khái niệm phải phân biệt

### Crawl, render, index, ranking

1. **Crawl:** Googlebot tìm và request URL.
2. **Fetch:** Google tải HTML và resource như CSS, JS, image.
3. **Render:** Google cố gắng hiển thị page để hiểu nội dung sau khi tải resource.
4. **Index:** Google phân tích và lưu page đủ điều kiện trong hệ thống tìm kiếm.
5. **Ranking/serving:** Google quyết định page có xuất hiện cho query cụ thể hay không và ở vị trí nào.

Page có thể crawl được nhưng chưa index. Page đã index vẫn có thể không xuất hiện cho query mong muốn. `Request indexing` chỉ gửi tín hiệu ưu tiên crawl lại, không phải lệnh ép index hoặc ép ranking.

### Property

- **Domain property:** bao phủ domain và các protocol/subdomain theo cấu hình xác minh DNS.
- **URL-prefix property:** chỉ bao phủ đúng prefix như `https://langbianggravity.com/`.
- Cần chọn đúng property trước khi đọc report; khác host, protocol hoặc subdomain có thể cho số liệu khác.
- Với site này, phải kiểm tra rõ main domain và các URL dùng host `sprocket.langbianggravity.com`. Không tự coi hai host là một property nếu quyền truy cập/report chưa xác nhận.

### Metrics

- **Impression:** kết quả chứa link tới site được hiển thị trong Google Search hoặc sản phẩm Google liên quan.
- **Click:** người dùng click vào kết quả dẫn tới site.
- **CTR:** clicks chia cho impressions.
- **Position:** vị trí trung bình theo cách GSC tổng hợp; không phải cam kết vị trí cố định cho mọi người dùng/query.
- **Query:** câu tìm kiếm được báo cáo theo dữ liệu Google cho phép hiển thị.
- **Page:** URL nhận impression/click; cần chuẩn hóa slash, protocol và canonical trước khi nhóm dữ liệu.

Không so sánh trực tiếp một con số GSC với Analytics hoặc công cụ rank tracker mà không kiểm tra date range, timezone, property, filter và cách mỗi công cụ xử lý dữ liệu.

## 3. Những report cần kiểm tra

### Overview

Kiểm tra cảnh báo tổng quan: indexing, performance, enhancements, manual actions, security và Core Web Vitals nếu property có dữ liệu.

### URL Inspection

Dùng cho một URL cụ thể. Kiểm tra hai trạng thái:

- **Google index view:** Google biết gì từ lần crawl trước;
- **Live test:** Google có thể fetch/render phiên bản production hiện tại hay không.

Luôn ghi nhận:

- URL được inspect;
- index status;
- lý do không index nếu có;
- Google-selected canonical;
- user-declared canonical;
- last crawl nếu có;
- sitemap/discovery source;
- HTTPS, mobile/render/resource issue;
- structured data hoặc enhancement phát hiện được.

### Page indexing

Dùng để nhìn toàn site theo nhóm:

- Indexed;
- Not indexed;
- lỗi server/4xx/5xx;
- blocked by robots.txt;
- excluded by `noindex`;
- duplicate/canonical khác;
- discovered/crawled nhưng chưa index;
- soft 404 hoặc redirect.

Không xem `Not indexed` là lỗi trong mọi trường hợp. Route private, empty finder state, duplicate fallback hoặc page cố ý `noindex` có thể đúng. Với mỗi URL, phải đối chiếu với ý định indexability trước khi sửa.

### Sitemaps

Theo dõi sitemap đã submit, thời điểm Google đọc lần cuối, số URL discovered/indexed và lỗi parse/fetch.

Sitemap chỉ nên chứa canonical public URL có thể trả HTTP 200. Không đưa vào sitemap:

- URL redirect;
- fallback `.html` đã canonical về clean URL;
- URL query state không có giá trị SEO;
- route private `/request/`;
- page `noindex`;
- URL sai host hoặc môi trường staging.

### Performance → Search results

Theo dõi theo cùng property và date range:

- Queries;
- Pages;
- Countries;
- Devices;
- Search appearance;
- Dates.

Ưu tiên đọc theo thứ tự:

1. query/page có impressions tăng nhưng CTR thấp;
2. page đang position 4–10 có intent đúng;
3. query đang vào sai page hoặc nhiều page cùng nhận một query;
4. page mới có impressions nhưng canonical/landing page không đúng;
5. click/impression giảm đột ngột sau deploy.

Không đổi title hoặc gộp page chỉ vì vài ngày dữ liệu nhỏ. Với thay đổi lớn, so sánh cùng date range trước/sau và thường chờ 2–4 tuần trước khi kết luận, trừ lỗi kỹ thuật nghiêm trọng.

### Enhancements và structured data

Theo dõi report tương ứng nếu Google nhận diện type đó. JSON-LD parse được ở local không đồng nghĩa rich result sẽ được Google hiển thị.

Sau khi sửa schema:

- kiểm tra JSON parse local;
- kiểm tra page thật bằng URL Inspection;
- kiểm tra enhancement report nếu có;
- xác nhận structured data nằm trên nội dung thực sự hiển thị;
- không thêm `FAQPage`, `Product`, `Offer`, review, author, date hoặc claim không có dữ liệu thật.

### Links

Dùng Links report để kiểm tra internal links và external links ở mức tổng quan. Đây là tín hiệu hỗ trợ, không phải danh sách realtime tuyệt đối. Sau khi thêm page mới, kiểm tra page đó có được link từ hub/parent page và không bị cô lập trong site.

### Crawl Stats (nếu property có report)

Với static site nhỏ, đây không phải report cần kiểm tra mỗi ngày. Dùng nó khi có dấu hiệu crawl spike, 5xx, timeout hoặc deploy làm Googlebot request resource bất thường. Đối chiếu với hosting/server logs; không tạo thêm page chỉ để tăng crawl.

### Removals

Chỉ dùng khi cần ẩn kết quả tìm kiếm trong tình huống khẩn cấp và có phê duyệt. Removals không thay thế việc xử lý lâu dài bằng `noindex`, redirect, 404/410 hoặc cập nhật nội dung.

### Core Web Vitals và HTTPS

Core Web Vitals trong GSC là dữ liệu thực tế được nhóm theo URL/device khi Google có đủ dữ liệu; không phải công cụ kiểm tra một URL duy nhất. Dùng PageSpeed/Lighthouse để chẩn đoán từng URL, sau đó dùng GSC để theo dõi pattern theo template.

Kiểm tra:

- mobile và desktop;
- LCP, CLS và INP nếu report có dữ liệu;
- nhóm URL bị ảnh hưởng chung;
- thay đổi ảnh, font, JS, hero, layout hoặc third-party script;
- HTTPS và redirect protocol.

### Manual Actions và Security Issues

Kiểm tra ngay khi có cảnh báo hoặc traffic giảm bất thường:

- **Manual action:** vấn đề liên quan spam policy/quality do Google đánh giá; có thể làm page/site bị hạ hoặc loại khỏi kết quả.
- **Security issue:** dấu hiệu hacked, phishing, malware hoặc nội dung có thể gây hại người dùng.

Không gửi reconsideration/request review khi chưa sửa nguyên nhân, ghi nhận bằng chứng và kiểm tra toàn bộ phạm vi bị ảnh hưởng.

## 4. Quy trình bắt buộc sau mỗi thay đổi

### Bước 0 — Ghi lại thay đổi

Trước khi sửa, ghi tối thiểu:

```text
Date:
Owner:
Change type: content | metadata | URL | new page | feature | schema | performance | removal
Affected URLs:
Old canonical:
New canonical:
Expected SEO effect:
Risk:
Rollback plan:
```

### Bước 1 — Kiểm tra trước khi deploy

- [ ] Xác định page là public/indexable hay private/noindex.
- [ ] Xác định một URL canonical duy nhất.
- [ ] Kiểm tra `<title>`, meta description, H1, canonical, `og:url`, OG image, Twitter Card và `lang`.
- [ ] Nếu là article: kiểm tra `TechArticle`, `mainEntityOfPage`, image, `inLanguage`, author/date chỉ khi dữ liệu có thật.
- [ ] Kiểm tra breadcrumb JSON-LD nếu route thuộc cluster có breadcrumb.
- [ ] Kiểm tra internal links tới page mới và link từ hub/parent page.
- [ ] Nếu thêm public URL: cập nhật `sitemap.xml`, `llms.txt`, hub/parent navigation và keyword/url map khi phù hợp.
- [ ] Nếu đổi URL: chuẩn bị redirect permanent từ URL cũ, cập nhật canonical, sitemap, internal links và references.
- [ ] Nếu xoá URL: chọn redirect liên quan, `410`, hoặc giữ page; không để soft 404 mơ hồ.
- [ ] Nếu sửa cặp compatibility: đồng bộ `products/index.html` ↔ `products.html`, `b2b/index.html` ↔ `b2b.html`, `contact/index.html` ↔ `contact.html`.
- [ ] Không đưa query-string, fallback, staging hoặc `/request/` private vào sitemap.

### Bước 2 — Kiểm tra local/static

Chạy trong repo:

```powershell
git status --short --branch
git diff --check
rg -n "canonical|og:url|twitter:card|application/ld\+json|noindex" <affected-files>
python -m http.server 4173
```

Kiểm tra bằng browser hoặc `Invoke-WebRequest`:

- route trả 200;
- không có redirect bất ngờ trên clean URL;
- HTML source có metadata mong muốn;
- H1 đúng số lượng;
- link mới không 404;
- nội dung chính vẫn có trong rendered page;
- feature không che/hide nhầm phần nội dung quan trọng.

Local test không thay thế production URL Inspection. GSC không inspect `localhost`.

### Bước 3 — Smoke test production sau deploy

Chỉ bắt đầu GSC verification sau khi deploy đã hoàn tất:

- [ ] Mở URL public thật bằng HTTPS.
- [ ] Kiểm tra HTTP status, redirect chain và trailing slash.
- [ ] Kiểm tra canonical trả về đúng host/path.
- [ ] Kiểm tra `robots.txt` và `sitemap.xml` production.
- [ ] Kiểm tra page không bị `noindex` ngoài ý muốn.
- [ ] Kiểm tra CSS/JS/image quan trọng không bị 403/404.
- [ ] Kiểm tra source/render có nội dung, links và structured data mới.
- [ ] Nếu đổi host/subdomain, kiểm tra đúng Search Console property.

### Bước 4 — URL Inspection

Với page mới hoặc page có thay đổi SEO đáng kể:

1. Chọn đúng property.
2. Dán **URL production đầy đủ**, không dán URL local hoặc URL fallback nếu canonical là clean URL.
3. Đọc Google index view.
4. Chạy **Test live URL**.
5. Kiểm tra availability, indexing, canonical, rendered page và enhancements.
6. Nếu page quan trọng và đã live ổn định, chọn **Request indexing** một lần cho URL đó.
7. Lưu kết quả vào change log; không gửi lại liên tục để thay thế việc sửa link/sitemap/crawlability.

Request indexing phù hợp nhất cho page mới hoặc page vừa có thay đổi quan trọng. Thay đổi chỉ về màu, spacing hoặc animation thường không cần request indexing; vẫn cần kiểm tra Core Web Vitals nếu ảnh hưởng performance.

### Bước 5 — Sitemap

Nếu thêm/xoá/đổi public URL:

- cập nhật file sitemap trong repo;
- deploy sitemap;
- kiểm tra sitemap production có URL canonical chính xác;
- mở report Sitemaps trong GSC;
- submit hoặc refresh đúng sitemap nếu cần;
- ghi nhận `last read`, discovered và indexed count;
- điều tra parse/fetch error thay vì submit lặp lại.

Không cần submit lại sitemap cho mỗi lần đổi một đoạn copy nếu danh sách URL không đổi.

### Bước 5A — Social preview và image cache

Facebook/Meta đọc `og:title`, `og:description`, `og:image`, `og:image:alt` và URL production; nó không đọc ảnh local hoặc ảnh đang nằm trong browser cache của người deploy.

Sau khi đổi ảnh preview:

1. Deploy HTML và asset mới.
2. Mở [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
3. Dán URL production cần kiểm tra.
4. Chọn `Debug`, đọc URL ảnh mà Meta đang thấy, rồi chọn `Scrape Again` sau khi HTML đã cập nhật.
5. Kiểm tra preview ở cả URL clean và trường hợp link được share lại trong một bài test mới.

Đổi `og:image` sang filename mới hoặc thêm version query như `?v=...` giúp tạo URL ảnh mới cho crawler, nhưng không tự xóa cache/index cũ nếu chưa scrape lại.

Google Images không phải Facebook cache. Ảnh cũ có thể còn xuất hiện một thời gian sau khi page đã đổi ảnh. Để xử lý đúng:

- thay mọi `<img>`, CSS background, OG image và JSON-LD image đang trỏ asset cũ;
- giữ alt text mô tả đúng ảnh mới;
- cập nhật page chứa ảnh và gửi URL Inspection cho page quan trọng;
- nếu asset cũ thực sự bị loại bỏ, redirect asset cũ sang ảnh mới hoặc trả 404/410 có chủ đích;
- không đổi tên ảnh nhưng để asset cũ vẫn được link từ page khác;
- theo dõi Google Images sau khi Google crawl lại, không coi kết quả cũ trong ngày deploy là lỗi deploy mới.

### Bước 6 — Theo dõi sau thay đổi

| Thời điểm | Việc cần làm |
| --- | --- |
| Ngay sau deploy | Smoke test production, URL Inspection live test, kiểm tra sitemap nếu route thay đổi |
| 24 giờ | Kiểm tra lỗi server, robots/noindex, security/manual action và availability |
| 3–7 ngày | Kiểm tra Page Indexing, sitemap discovered/indexed, canonical và URL mới |
| 7–14 ngày | Export Pages/Queries, xem impressions/clicks/CTR/position theo URL và query |
| 28–45 ngày | So sánh trước/sau cùng date range; quyết định giữ, mở rộng, sửa intent hoặc rollback |

Khoảng thời gian trên là nhịp theo dõi, không phải cam kết Google sẽ index trong thời gian đó.

## 5. Ma trận theo loại thay đổi

### Sửa nội dung hoặc metadata trên page hiện có

- Kiểm tra title, description, H1, canonical và duplicate copy.
- Kiểm tra internal links và intent.
- Deploy rồi URL Inspection live test.
- Request indexing nếu thay đổi có ý nghĩa với câu trả lời/query.
- Theo dõi page/query trước và sau; không kết luận từ một ngày dữ liệu.

### Thêm page public mới

- Tạo clean URL với một canonical.
- Thêm link từ hub/parent page.
- Thêm sitemap và `llms.txt` nếu phù hợp.
- Đảm bảo page có nội dung hữu ích, title/H1/meta unique, structured data đúng loại.
- Kiểm tra HTTP 200, robots, canonical và render production.
- URL Inspection live test + request indexing một lần.
- Theo dõi Page Indexing và Performance.

### Đổi URL hoặc slug

- Ghi old URL/new URL.
- Redirect permanent từ old → new nếu nội dung tương đương.
- Cập nhật canonical, sitemap, internal links, breadcrumbs, OG URL, JSON-LD, `llms.txt`, keyword map và AI answer tests nếu liên quan.
- Inspect URL mới; inspect URL cũ để xác nhận redirect.
- Theo dõi old/new URL trong Performance và Page Indexing.
- Không tạo hai page cạnh tranh chỉ vì quên redirect hoặc canonical.

### Xoá page

- Kiểm tra impressions, clicks, backlinks, conversion và internal links trước khi xoá.
- Nếu có page thay thế thật sự liên quan: redirect permanent.
- Nếu nội dung không còn và không có thay thế: xử lý 404/410 có chủ đích.
- Xoá khỏi sitemap, hub, `llms.txt`, navigation và references.
- Inspect URL cũ sau deploy và theo dõi lỗi Not found.
- Không dùng `noindex` như cách xoá nhanh nếu URL cần redirect hoặc cần trả 404/410.

### Thêm tính năng JavaScript/UI

Ví dụ: search, filter, modal, cart, finder, tab, accordion, form, lazy load.

- Xác định feature có tạo URL mới, query parameter, content mới hoặc thay đổi link không.
- Nội dung SEO chính không được chỉ tồn tại sau click nếu Google/user cần thấy ngay.
- Kiểm tra keyboard/accessibility, mobile, no-JS fallback nếu nội dung quan trọng.
- Kiểm tra rendered HTML, canonical và URL parameter behavior.
- Kiểm tra JS error, resource status, LCP/CLS/INP và form/CTA.
- Không request indexing cho mỗi thay đổi UI thuần túy; request khi feature làm thay đổi nội dung, link hoặc page intent.
- Nếu feature tạo nhiều URL/filter state: quyết định rõ state nào indexable; state rỗng/private phải canonical/noindex/redirect theo thiết kế.

### Sửa structured data

- Đảm bảo schema mô tả nội dung thực sự hiển thị.
- Không bịa `datePublished`, `dateModified`, review, rating, price, author hoặc claims.
- Parse JSON-LD local.
- Kiểm tra source và rendered page production.
- URL Inspection để xem Google có nhận enhancement không.
- Theo dõi enhancement report và lỗi Unparsable structured data.

### Sửa ảnh hoặc performance

- Kiểm tra URL ảnh, status, MIME type, dimensions, alt và OG image.
- Giữ ảnh LCP/hero ưu tiên hợp lý; lazy-load ảnh below-the-fold.
- Kiểm tra page speed trên mobile và desktop.
- Theo dõi Core Web Vitals theo template, không chỉ một URL.
- Không đổi ảnh OG mà quên `og:image:alt`, Twitter image và social preview.

### Thêm route private hoặc request flow

- Không đưa route private vào public navigation, sitemap hoặc `llms.txt`.
- Giữ authentication/noindex/robots behavior theo thiết kế.
- Không request indexing.
- Kiểm tra route không bị link công khai ngoài ý muốn.

## 6. Cách đọc lỗi index phổ biến

| Trạng thái | Cách hiểu | Việc kiểm tra |
| --- | --- | --- |
| URL is on Google | Google index view có page | Vẫn kiểm tra canonical, content và performance |
| URL is not on Google | Chưa có trong index hoặc bị loại | Đọc lý do cụ thể, inspect live, sửa nguyên nhân |
| Discovered — currently not indexed | Google biết URL nhưng chưa crawl/index | Internal links, sitemap, quality, duplicate, crawl demand |
| Crawled — currently not indexed | Đã crawl nhưng chưa chọn index | Content uniqueness, intent, canonical, thin/duplicate signals |
| Duplicate, Google chose different canonical | Google không chọn canonical đã khai báo | Nội dung duplicate, internal links, redirects, canonical consistency |
| Excluded by `noindex` | Có chỉ thị không index | Xác nhận có chủ đích hay gỡ `noindex` |
| Blocked by robots.txt | Google bị chặn crawl | Kiểm tra robots; robots không phải cách index private content |
| Server error 5xx | Production không phục vụ ổn định | Hosting, logs, deploy, timeout, resource dependency |
| Soft 404 | Page trông như không có nội dung dù status có thể là 200 | Content, status code, redirect và empty state |
| Page with redirect | URL không phải landing canonical | Inspect URL đích; sitemap chỉ dùng URL cuối |

## 7. Cách điều tra traffic drop

Không kết luận từ một screenshot hoặc một ngày. Làm theo thứ tự:

1. Xác nhận đúng property, search type, country/device filter và date range.
2. So sánh 28 ngày với 28 ngày trước và cùng kỳ nếu đủ dữ liệu.
3. Tách toàn site và từng page/query.
4. Kiểm tra click, impression, CTR, position; xem giảm do visibility hay do snippet.
5. Kiểm tra deploy history, URL change, canonical, robots, noindex, 5xx, redirect và JS/render.
6. Kiểm tra sitemap, Page Indexing, Manual Actions và Security Issues.
7. Kiểm tra seasonality, query demand và SERP changes trước khi sửa copy.
8. Chỉ thay một nhóm nguyên nhân có giả thuyết rõ; ghi baseline và ngày thay đổi.
9. Chờ đủ dữ liệu rồi đánh giá; rollback chỉ khi có lỗi kỹ thuật hoặc business impact rõ.

## 8. File và dữ liệu cần lưu trong repo

Các file hiện có:

- `seo/gsc/performance-queries-last-3-months.csv`
- `seo/gsc/performance-pages-last-3-months.csv`
- `seo/gsc/page-indexing-export.csv`
- `seo/gsc/README.md`
- `seo/audit-seo.md`
- `seo/audit-knowledge-base.md`
- `seo/ai-answer-tests.md`

Khi export GSC:

- dùng cùng property, search type và date range cho một lần so sánh;
- giữ header và đơn vị gốc;
- không trộn query export với page export;
- ghi ngày export, timezone/filter và property trong commit note hoặc audit;
- giữ dữ liệu đủ để so sánh, không ghi đè baseline chưa lưu;
- thêm ghi chú về query cluster, cannibalization, canonical hoặc indexing issue;
- nếu chưa có data, giữ header template và ghi rõ `no data`, không tự điền số.

## 9. Mẫu ghi nhận mỗi lần thay đổi

Copy block này vào issue/PR/release note hoặc audit tương ứng:

```markdown
## GSC change record

- Date:
- Deploy/release:
- Owner:
- Property checked:
- Change type:
- Affected URL(s):
- Old URL/canonical:
- New URL/canonical:
- Sitemap changed: yes/no
- `llms.txt`/hub/URL map changed: yes/no/not applicable
- Expected effect:
- Risk and rollback:

### Local checks

- [ ] `git diff --check`
- [ ] Local route/status
- [ ] Title/meta/H1/canonical
- [ ] Robots/noindex
- [ ] JSON-LD parse
- [ ] Internal links/assets
- [ ] Mobile/desktop feature check

### Production checks

- [ ] HTTP 200/redirect chain
- [ ] Production canonical
- [ ] URL Inspection — Google index view
- [ ] URL Inspection — Live test
- [ ] Request indexing if warranted
- [ ] Sitemap submitted/read if route list changed
- [ ] Page Indexing checked
- [ ] Manual Actions/Security Issues checked
- [ ] Performance baseline recorded
- [ ] Follow-up date:

### Result

- Indexing status:
- Google-selected canonical:
- Last crawl:
- Sitemap status:
- Enhancement/structured data status:
- Performance observation:
- Follow-up action:
```

## 10. Checklist kết thúc một SEO change

Một thay đổi chỉ được xem là đã kiểm tra đủ khi:

- [ ] File source đã được review và không có thay đổi ngoài phạm vi.
- [ ] Clean URL/fallback parity đã được kiểm tra nếu có cặp tương ứng.
- [ ] Page có đúng indexability chủ đích.
- [ ] Canonical, redirect, sitemap, internal links và host nhất quán.
- [ ] Production trả đúng status và render nội dung quan trọng.
- [ ] URL Inspection live test đã chạy cho page mới hoặc thay đổi SEO đáng kể.
- [ ] Request indexing chỉ dùng khi có lý do, không lạm dụng.
- [ ] Page Indexing/Sitemaps không có lỗi mới.
- [ ] Structured data đã parse và không có claim thiếu dữ liệu.
- [ ] Performance/security/manual action đã được xem xét khi thay đổi có thể ảnh hưởng.
- [ ] GSC result và ngày follow-up đã được ghi lại.
- [ ] `git status --short` đã được kiểm tra trước khi bàn giao.

## 11. Tài liệu chính thức của Google

- [About Search Console](https://support.google.com/webmasters/answer/9128668)
- [Getting started with Search Console](https://support.google.com/webmasters/answer/10267942)
- [About Search Console data](https://support.google.com/webmasters/answer/96568)
- [URL Inspection](https://support.google.com/webmasters/answer/12482179)
- [Performance report](https://support.google.com/webmasters/answer/10268906)
- [Manual Actions report](https://support.google.com/webmasters/answer/9044175)
- [Security Issues report](https://support.google.com/webmasters/answer/9044101)
- [Core Web Vitals report](https://support.google.com/webmasters/answer/9205520)

Các link trên là nguồn giải thích chức năng GSC; kết quả thực tế của website vẫn phải được kiểm tra trong property production đúng host.
