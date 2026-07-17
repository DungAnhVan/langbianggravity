# Chiến lược SEO — Langbiang Gravity

**Ngày lập:** 2026-07-17  
**Giai đoạn:** SEO Google/GSC trước AI SEO  
**Thời hạn kế hoạch:** 90 ngày

## Mục tiêu

Xây nền SEO có thể đo bằng Google Search Console trước khi đầu tư sâu vào AI SEO:

1. Google crawl và index đúng canonical URL.
2. Tăng impressions và clicks cho các trang sản phẩm/B2B có giá trị thương mại.
3. Mở rộng fitment SEO theo make/model/year dựa trên tín hiệu tìm kiếm thực tế.
4. Hoàn thiện knowledge base thành topical support cho product, finder và quote flow.
5. Tạo baseline về organic conversion để biết SEO có mang lại inquiry hay không.

Thứ tự ưu tiên:

`Indexing → Query mapping → Commercial pages → Fitment pages → Knowledge depth → Authority → AI SEO`

## Baseline GSC hiện tại

Snapshot hiện có kết thúc khoảng 2026-07-06 và còn ít dữ liệu. Các tín hiệu chính:

| URL | Clicks | Impressions | CTR | Position | Nhận định |
| --- | ---: | ---: | ---: | ---: | --- |
| `/products/sprockets/` | 1 | 28 | 3.57% | 4.32 | Commercial page mạnh nhất hiện tại |
| `/` | 0 | 41 | 0% | 1.27 | Cần query data trước khi đổi snippet |
| `/products/bolt-kits/` | 0 | 26 | 0% | 5.81 | Có cơ hội tăng CTR/relevance |
| `/products/cnc-performance/` | 0 | 26 | 0% | 6.31 | Có cơ hội tăng CTR/relevance |
| `/products/brake-rotor/` | 0 | 23 | 0% | 4.17 | Đang gần top, cần củng cố nội dung/CTR |
| `/b2b` | 0 | 18 | 0% | 2.72 | URL slash/non-slash đang xuất hiện riêng |
| `/guides/motocross-gearing-chart/` | 0 | 12 | 0% | 4.08 | Có tiềm năng informational → product |
| Finder query-string | 1 | 4 | 25% | 4.25 | Fitment intent đã tạo click |
| GasGas 85 MC fitment | 1 | 4 | 25% | 4.5 | Xác nhận hướng model-level fitment có tiềm năng |

### Giới hạn dữ liệu

- Query export hiện không có row dữ liệu.
- Page Indexing export hiện chỉ có header.
- Các report page/date/device có tổng impressions chưa đồng nhất.
- Dữ liệu quá nhỏ để thay title hoặc gộp page chỉ dựa trên CTR hiện tại.

Vì vậy, hành động đầu tiên là chuẩn hóa export GSC và tạo baseline mới cùng property, date range và filter.

## Chiến lược 90 ngày

### Giai đoạn 1 — Đo lường và indexability, ngày 1–7

#### 1. Xuất lại dữ liệu GSC

Xuất từ cùng một Domain Property, Search type `Web`:

- Queries: last 28 days và last 3 months.
- Pages: last 28 days và last 3 months.
- Page Indexing.
- Sitemap status.
- Links report.
- Countries và Devices để theo dõi thị trường/thiết bị, không dùng làm tiêu chí nội dung chính khi sample còn nhỏ.

Lưu các export chuẩn vào:

- `seo/gsc/performance-queries-last-3-months.csv`
- `seo/gsc/performance-pages-last-3-months.csv`
- `seo/gsc/page-indexing-export.csv`

#### 2. Chuẩn hóa URL và canonical trên production

Kiểm tra bằng URL thật, không chỉ source code:

- `/b2b` phải permanent redirect sang `/b2b/`.
- Các product URL không slash phải redirect sang clean URL có trailing slash.
- Finder state rỗng như `?make&model&year` phải canonical về `/finder` hoặc được redirect nếu không có state hữu ích.
- Fitment query-string không được cạnh tranh với model-level canonical page.
- Xác minh `/cross-reference/` thực sự thuộc `sprocket.langbianggravity.com` và có trong sitemap đúng host.

#### 3. URL Inspection

Kiểm tra tối thiểu:

- homepage;
- `/products/sprockets/`;
- ba product line còn lại;
- `/b2b/`;
- gearing chart;
- knowledge hub;
- các fitment page đã có impressions;
- hai knowledge page ưu tiên: `what-is-520-sprocket` và `motorcycle-sprocket-fitment`.

Ghi nhận cho mỗi URL:

- indexed/not indexed;
- Google-selected canonical;
- last crawl;
- discovery source;
- render/resource issue nếu có.

#### Kết quả cần đạt

- Một canonical URL cho mỗi nội dung.
- Biết rõ URL nào chưa index và nguyên nhân.
- Main-domain sitemap và sprocket-subdomain sitemap đều được Google đọc thành công.

### Giai đoạn 2 — Commercial pages, tuần 2–4

Ưu tiên theo dữ liệu hiện tại:

1. `/products/sprockets/`
2. `/products/brake-rotor/`
3. `/products/bolt-kits/`
4. `/products/cnc-performance/`
5. `/b2b/`
6. `/guides/motocross-gearing-chart/`

Title, meta description, Twitter Card và H1 đã được xử lý trong technical pass gần nhất. Không đổi title liên tục khi chưa có query export mới.

#### On-page actions

Mỗi commercial page cần làm rõ trong phần đầu:

- sản phẩm là gì;
- đối tượng/use case;
- material hoặc manufacturing proof;
- fitment/ordering path;
- CTA tiếp theo.

Bổ sung theo page:

| Page | Nội dung cần củng cố | CTA chính |
| --- | --- | --- |
| Sprockets | 520 fitment, front/rear, steel/aluminium, geometry, QA | Open finder / request quote |
| Brake Rotor | diameter, BCD, offset, material, front/rear fitment | Request fitment |
| Bolt Kits | Grade 5 titanium, application, kit scope, batch supply | Request kit/quote |
| CNC Performance | drawing review, material, machining, inspection, custom program | Send drawing/inquiry |
| B2B | MOQ assumptions, sample, QA, packaging, dealer/OEM workflow | Send B2B inquiry |
| Gearing Chart | calculation, worked examples, limits, fitment handoff | View sprockets / open finder |

#### Internal linking

Commercial flow:

`Product page → supporting knowledge → finder/contact/B2B`

Knowledge flow:

`Knowledge answer → product proof → finder/quote`

Không dùng raw path làm anchor text nếu có thể viết anchor có nghĩa, ví dụ `View off-road sprockets` thay cho `/products/sprockets/`.

#### Performance actions

- Thêm intrinsic `width`/`height` cho ảnh.
- Lazy-load ảnh below-the-fold.
- Giữ hero/LCP image ở eager/default khi cần.
- Dùng WebP/AVIF hợp lý và tránh ảnh lớn hơn kích thước hiển thị.
- Kiểm tra LCP, CLS và mobile usability trên production.

#### Kết quả cần đạt

- Commercial pages có nội dung đủ để trả lời query và thuyết phục buyer.
- Internal links phân phối authority đúng intent.
- Không có regression về title/canonical/H1.

### Giai đoạn 3 — Fitment SEO, tuần 3–8

Fitment là nhánh đã tạo click dù impressions còn thấp, nên được ưu tiên hơn content blog tổng quát.

Triển khai 10 page đầu từ `seo/fitment-priority.md`:

1. GasGas 85 MC 19/16 2022–2024.
2. Honda CR125R 2002.
3. Honda CRF250R 2014–2017.
4. Honda CRF450R 2013–2016.
5. Yamaha YZ250F 2014–2018.
6. Yamaha WR155R 2020–2026.
7. KTM SX-F 250 2020–2024.
8. KTM EXC-F 350 2020–2024.
9. Husqvarna FE 250 2020–2024.
10. Suzuki RM-Z450 2018–2024.

#### Yêu cầu cho mỗi fitment page

- Canonical model-level URL duy nhất.
- Make, model, year range và model type rõ ràng.
- Front/rear application.
- Chain size, tooth options hoặc trạng thái cần xác minh.
- Fitment notes riêng, không chỉ thay tên model trong template.
- Link đến finder, sprocket product page và contact.
- Không index empty finder states hoặc parameter combinations không có search value.

#### Expansion rule

Sau 28–45 ngày:

- Page có impressions/clicks: mở rộng sibling models cùng family.
- Page index nhưng không có impressions: kiểm tra query intent và uniqueness.
- Page không index: xử lý canonical, crawlability, thin/duplicate content trước khi tạo thêm page.

### Giai đoạn 4 — Knowledge base, tuần 3–8

Không sản xuất thêm hàng loạt trước khi hoàn thiện 14 article hiện có.

#### Ưu tiên xử lý

1. `motorcycle-sprocket-fitment`
2. `what-is-520-sprocket`
3. `how-to-choose-dirt-bike-sprocket-ratio`
4. `choose-sprocket-ratio-for-trail-riding`
5. Nhóm SCM440 / 7075-T6 / steel-vs-aluminium
6. CNC manufacturing / OEM Vietnam
7. Trail readiness cluster

#### Content actions

- Mở rộng 8 page còn dưới 200 từ theo intent, không theo word count máy móc.
- Viết lại 8 outline dùng chung `Definition / Practical use / Material notes`.
- Phân biệt ratio tổng quát với trail-specific ratio.
- Thêm bảng, worked example, checklist và evidence thật.
- Giữ 2–4 contextual links sang article liên quan.
- Đổi raw URL anchor còn lại thành descriptive anchor.
- Thêm `datePublished`, `dateModified` và reviewer khi có dữ liệu xác thực.
- Không tạo claim kỹ thuật, chứng nhận hoặc test result chưa được xác nhận.

#### Reading paths

Sprocket basics:

`What is 520 → Fitment → Ratio → Product/Finder`

Materials:

`SCM440 ↔ 7075-T6 → Steel vs Aluminium → Product/B2B`

Trail readiness:

`Checklist → Inspection → Wear signs → Failure response → Tools → Trail gearing`

### Giai đoạn 5 — Authority và links, tuần 6–12

Chỉ bắt đầu outreach khi landing page đã đủ thông tin và conversion path hoạt động.

Ưu tiên nguồn liên kết có liên quan:

- dealer hoặc distributor thật;
- đội đua, rider hoặc workshop có quan hệ thật;
- technical/manufacturing partners;
- customer case study;
- industry supplier profile và business citation;
- technical drawing/reference có giá trị trích dẫn.

Tránh:

- mua backlink số lượng lớn;
- directory không liên quan;
- guest post chỉ để đặt anchor;
- exact-match anchor lặp hàng loạt;
- nội dung AI hàng loạt không có dữ liệu gốc.

## GSC operating cadence

### Hàng tuần

- Kiểm tra indexing errors và sitemap status.
- Theo dõi click/impression bất thường.
- Ghi lại page mới được index.
- Không thay đổi metadata chỉ vì dao động vài ngày.

### Mỗi 14 ngày

- Export Queries và Pages.
- So sánh 28 ngày gần nhất với 28 ngày trước.
- Gắn query cluster vào target URL.
- Kiểm tra query overlap giữa các page.
- Xem page nào tăng impressions nhưng CTR thấp.

### Mỗi 28–45 ngày

- Quyết định giữ, mở rộng, gộp hoặc redirect nội dung.
- Mở rộng fitment family từ những page đã có signal.
- Đánh giá organic conversion, không chỉ rankings.

## Quy tắc ra quyết định

Chỉ tối ưu CTR/content khi sample đủ lớn:

| Tình trạng | Hành động |
| --- | --- |
| Position 1–3, CTR thấp, ≥100 impressions | Kiểm tra query intent, title và description |
| Position 4–10, ≥100 impressions | Tăng content depth, internal links, proof và snippet relevance |
| Position 11–20 | Củng cố relevance, topical support và authority |
| Indexed 30–45 ngày, không có impressions | Viết lại intent, gộp hoặc loại khỏi ưu tiên |
| Hai URL nhận cùng query | Phân intent; nếu trùng thực sự thì consolidate/redirect |
| URL parameter/slash variant có impressions | Kiểm tra redirect và Google-selected canonical |

Không đổi title hàng tuần. Sau thay đổi lớn, chờ ít nhất 2–4 tuần và đo bằng cùng date range.

## KPI

### Technical

- 100% money pages và knowledge pages ưu tiên được index.
- Không có canonical mismatch giữa source, production và Google-selected canonical.
- Không phát sinh impressions mới trên slash/non-slash duplicates hoặc empty query states.
- Sitemap main domain và subdomain được xử lý thành công.

### Search performance

- Tăng non-brand impressions theo tháng.
- Commercial CTR mục tiêu 3–5% khi page nằm top 1–5 và có tối thiểu 100 impressions.
- 10 fitment priority pages được index.
- Mỗi fitment family mới chỉ mở rộng sau khi có signal hoặc có demand/buyer evidence.
- Knowledge pages bắt đầu nhận impressions cho đúng target query, không cannibalize product pages.

### Conversion

Cần đo tối thiểu:

- `finder_open`;
- `fitment_result_view`;
- `quote_start`;
- `quote_submit`;
- `b2b_inquiry`;
- organic landing page → finder/quote conversion.

SEO thành công khi tạo qualified fitment lookup hoặc inquiry, không chỉ tăng impressions.

## Điều kiện chuyển sang AI SEO

Chỉ mở rộng mạnh AI SEO khi đạt phần lớn các điều kiện sau:

- canonical/redirect/indexing ổn định;
- có query-to-URL map từ GSC;
- commercial pages đủ proof và conversion path;
- fitment cluster có page thắng thực tế;
- knowledge pages đủ sâu, có liên kết và provenance;
- brand/entity information nhất quán;
- có baseline organic conversion.

Sau đó mới tập trung thêm vào:

- answer blocks và citation-ready passages;
- entity/reviewer/provenance signals;
- `llms.txt` và AI source routing;
- AI answer tests;
- retrieval/citation monitoring;
- nội dung phục vụ cả search engine và answer engine.

`llms.txt` và schema hiện tại là lớp hỗ trợ. Chúng không thay thế indexability, content quality, links, buyer intent và GSC measurement.

## Không làm trong giai đoạn này

- Không sản xuất hàng loạt bài AI mỏng.
- Không tạo hàng nghìn fitment URL từ dữ liệu chưa xác minh.
- Không đổi title/meta liên tục khi sample nhỏ.
- Không mua backlink số lượng lớn.
- Không index finder parameter states rỗng.
- Không tối ưu theo ranking mà bỏ qua quote/finder conversion.
- Không dùng canonical để che nội dung overlap nếu có thể phân intent hoặc consolidate rõ ràng.

## Tài liệu liên quan

- `seo/audit-seo.md`
- `seo/audit-knowledge-base.md`
- `seo/fitment-priority.md`
- `seo/keyword-map.md`
- `seo/url-map.md`
- `seo/gsc/README.md`

