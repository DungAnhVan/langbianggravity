# Audit Knowledge Base — Langbiang Gravity

**Ngày audit:** 2026-07-17  
**Phạm vi:** `knowledge/index.html` và 14 trang article dưới `knowledge/*/index.html`.  
**Mục tiêu:** xác định những việc cần xử lý thêm để knowledge base có giá trị SEO, answer-engine, topical authority và chuyển đổi tốt hơn.

## Kết luận nhanh

Knowledge base đã có nền tảng route và metadata khá sạch:

- 15/15 page có title, meta description, canonical, Open Graph URL/image và `lang="en"`.
- 15/15 page có đúng một H1.
- 14 article page có `TechArticle` JSON-LD; tất cả 30 block JSON-LD của knowledge base parse được.
- 15/15 canonical URL đã có trong `sitemap.xml` và `llms.txt`.
- Không phát hiện local `href`/`src` hỏng trong các page knowledge.
- Title và meta description đều unique trong cluster.

Điểm yếu chính nằm ở content depth, entity/date signals và cấu trúc liên kết nội bộ:

1. 14 article page không có `datePublished`, `dateModified`, `mainEntityOfPage`, `inLanguage` hoặc `image` trong structured data.
2. 14 article page không link contextual sang article knowledge khác; chỉ knowledge hub link xuống các bài.
3. 8 page dùng cùng skeleton H2: `Definition`, `Practical use`, `Material notes`, `Common mistakes`, `When to contact Langbiang Gravity`.
4. 8/14 article page có dưới 200 từ nội dung chính; trung bình toàn cluster article là khoảng 184 từ/page.
5. Hai page về sprocket ratio có intent gần nhau và cần phân ranh rõ để tránh cannibalization.
6. Một số title/meta quá dài; toàn bộ knowledge base thiếu Twitter Card và `og:image:alt`.

## Kiểm tra tổng quan

| Hạng mục | Kết quả | Đánh giá |
| --- | ---: | --- |
| Knowledge HTML | 15 page | 1 hub + 14 article |
| Canonical | 15/15 | Đúng clean URL dưới `/knowledge/` |
| Sitemap | 15/15 | Đã bao phủ hub và 14 article |
| `llms.txt` | 15/15 | Đã liệt kê hub và toàn bộ article |
| Title unique | 15/15 | Không trùng title |
| Description unique | 15/15 | Không trùng description |
| H1 | 15/15 có đúng 1 | Tốt |
| BreadcrumbList | 15/15 | Có breadcrumb JSON-LD |
| TechArticle | 14/14 article | Syntax hợp lệ |
| Article dates | 0/14 | Thiếu tín hiệu freshness |
| Article image trong schema | 0/14 | Thiếu image property |
| Twitter Card | 0/15 | Thiếu social metadata |
| Article-to-article links trong main | 0/14 | Cluster chưa được nối ngang |

## Findings ưu tiên cao

### P1 — Bổ sung tín hiệu tác giả, ngày cập nhật và entity cho 14 article

Các `TechArticle` hiện có `headline`, `description`, `url`, `author` và `publisher`, nhưng không có:

- `datePublished`;
- `dateModified`;
- `mainEntityOfPage`;
- `inLanguage`;
- `image`;
- thông tin reviewer hoặc subject-matter owner.

Điều này không làm page mất index, nhưng làm bài khó thể hiện freshness, provenance và entity clarity. Đặc biệt với các chủ đề kỹ thuật như SCM440, 7075-T6, fitment và drivetrain safety, người dùng cần biết nội dung được viết/cập nhật khi nào và ai chịu trách nhiệm.

Khuyến nghị:

- thêm ngày publish và ngày sửa thật, không dùng ngày giả;
- nếu có người phụ trách kỹ thuật, thêm `author` và `reviewedBy` bằng thông tin thật;
- thêm `mainEntityOfPage` trỏ về canonical page;
- thêm `image` cho article nếu page có ảnh đại diện thực sự;
- dùng `inLanguage: "en"` đồng nhất với HTML;
- hiển thị ngày cập nhật trên giao diện nếu ngày đó được khai báo trong schema.

Không nên thêm tên tác giả, chứng nhận, thông số hoặc claim sản xuất nếu chưa có nguồn nội bộ xác nhận.

### P1 — Article page chưa có liên kết ngang trong topical cluster

`knowledge/index.html` link đến 14 article, nhưng trong `<main>` của từng article không có link contextual nào đến article knowledge khác. Các bài chủ yếu chỉ trỏ đến `/products/sprockets/`, `/b2b/`, `/contact/` và sprocket finder.

Hệ quả:

- người đọc khó chuyển từ câu hỏi này sang câu hỏi liên quan;
- crawler nhận ít tín hiệu về quan hệ giữa các chủ đề;
- authority của hub chưa được phân phối tốt xuống cluster;
- các bài gần intent không có cơ chế tự phân biệt rõ.

Mỗi article nên có 2–4 link nội dung liên quan, đặt ngay trong phần giải thích hoặc một block `Related technical pages` trước CTA. Link text nên mô tả đích, không hiển thị raw path như `/products/sprockets/`.

Mapping đề xuất:

| Page | Nên link đến |
| --- | --- |
| `what-is-520-sprocket` | `motorcycle-sprocket-fitment`, `steel-vs-aluminium-rear-sprocket`, `/products/sprockets/` |
| `motorcycle-sprocket-fitment` | `what-is-520-sprocket`, sprocket finder, `how-to-choose-dirt-bike-sprocket-ratio` |
| `how-to-choose-dirt-bike-sprocket-ratio` | `choose-sprocket-ratio-for-trail-riding`, gearing chart, `motorcycle-sprocket-fitment` |
| `choose-sprocket-ratio-for-trail-riding` | `trail-ride-drivetrain-checklist`, `sprocket-wear-signs-off-road`, gearing chart |
| `scm440-sprocket-steel` | `steel-vs-aluminium-rear-sprocket`, `cnc-sprocket-manufacturing`, `/products/sprockets/` |
| `7075-t6-aluminium-sprocket` | `steel-vs-aluminium-rear-sprocket`, `scm440-sprocket-steel`, `/products/sprockets/` |
| `steel-vs-aluminium-rear-sprocket` | cả hai bài material, `/products/sprockets/`, B2B |
| `cnc-sprocket-manufacturing` | `scm440-sprocket-steel`, `oem-sprocket-manufacturing-vietnam`, B2B |
| `oem-sprocket-manufacturing-vietnam` | `cnc-sprocket-manufacturing`, `motorcycle-sprocket-fitment`, B2B |
| Trail cluster | liên kết chéo giữa checklist, inspection, wear, failure, tools và trail gearing |

### P1 — Tách intent của hai page sprocket ratio

Hai URL hiện tại:

- `/knowledge/how-to-choose-dirt-bike-sprocket-ratio/`
- `/knowledge/choose-sprocket-ratio-for-trail-riding/`

Keyword map đã định hướng page đầu là ratio guidance tổng quát/enduro/motocross và page sau là technical trail gearing. Đây là hướng đúng, nhưng nội dung hiện tại vẫn khá gần nhau: cùng nói front/rear tooth count, gearing feel, chain length, fitment và cùng link đến gearing chart/finder.

Nên giữ cả hai URL nếu có đủ nội dung khác biệt, với ranh giới:

| URL | Vai trò cần giữ |
| --- | --- |
| `/knowledge/how-to-choose-dirt-bike-sprocket-ratio/` | Công thức, front vs rear change, acceleration/top speed, motocross/enduro comparison, worked examples |
| `/knowledge/choose-sprocket-ratio-for-trail-riding/` | Lower vs taller gearing theo steep climbs, rocks, mud, open trail, loaded bike, slow technical riding và trail checklist |

Không nên dùng canonical gộp ngay. Trước hết hãy viết lại phần thân để mỗi page trả lời một câu hỏi khác nhau, link qua lại có chủ đích và theo dõi GSC query/page sau khi publish.

### P1 — Loại bỏ skeleton H2 dùng chung cho các intent khác nhau

8 article dùng cùng chính xác bộ H2:

`Definition` → `Practical use` → `Material notes` → `Common mistakes` → `When to contact Langbiang Gravity`.

Skeleton này phù hợp với bài glossary/material ngắn, nhưng không phù hợp với ratio, fitment, CNC manufacturing hoặc OEM sourcing. Ví dụ:

- page ratio có `Material notes` dù material không phải câu hỏi chính;
- page fitment cần các mục như chain size, hub/spline, bolt circle, offset, model year và verification workflow;
- page OEM cần MOQ, drawing/spec intake, QA, finish, packaging, sample approval và lead-time assumptions;
- page CNC cần process, datum/geometry, toolpath, heat treatment và inspection evidence.

Khuyến nghị tạo outline theo intent thay vì copy template. CTA `When to contact...` nên giữ, nhưng phần technical middle phải là nội dung riêng của từng page.

## Content depth và page-level audit

Số từ dưới đây là ước lượng text trong `<main>`, không tính script/style. Đây không phải ngưỡng ranking cứng; mục tiêu là xác định page đang quá ngắn so với intent.

| Page | Từ trong main | Title | Ưu tiên | Việc cần làm |
| --- | ---: | ---: | --- | --- |
| `what-is-520-sprocket` | 166 | 43 ký tự | P1 | Thêm pitch, chain dimensions, 428 vs 520, compatibility checklist và ví dụ fitment |
| `how-to-choose-dirt-bike-sprocket-ratio` | 174 | 58 | P1 | Thêm công thức, ví dụ đổi tooth count, front/rear trade-off và ranh giới với page trail |
| `scm440-sprocket-steel` | 152 | 41 | P1 | Thêm material target, heat treatment, hardness/QA language và giới hạn claim |
| `7075-t6-aluminium-sprocket` | 157 | 46 | P1 | Thêm rotating mass, wear conditions, finish/anodizing và replacement decision |
| `steel-vs-aluminium-rear-sprocket` | 144 | 52 | P1 | Thêm bảng decision theo race, enduro, fleet, rental, mud và replacement interval |
| `cnc-sprocket-manufacturing` | 154 | 46 | P1 | Thêm process từ drawing đến inspection, datum/geometry và buyer inputs |
| `motorcycle-sprocket-fitment` | 158 | 47 | P0 | Thêm fitment checklist, model/year examples và handoff sang finder |
| `oem-sprocket-manufacturing-vietnam` | 154 | 54 | P1 | Thêm MOQ, QA, sample, packaging, finish, private-label và inquiry brief |
| `trail-ride-drivetrain-checklist` | 209 | 61 | P1 | Thêm thứ tự kiểm tra, pass/fail signals và stop-riding criteria |
| `chain-and-sprocket-inspection-before-trail` | 219 | 84 | P1 | Rút title; thêm slack measurement, alignment, tooth/chain wear và photo guidance |
| `sprocket-wear-signs-off-road` | 220 | 54 | P1 | Thêm dấu hiệu hooked teeth, chain lift, noise, replacement threshold và diagnosis limits |
| `choose-sprocket-ratio-for-trail-riding` | 207 | 75 | P1 | Rút title; thêm terrain matrix, loaded bike và link phân biệt với page ratio tổng quát |
| `drivetrain-failure-on-trail` | 224 | 71 | P1 | Rút title; thêm failure → immediate action → do-not-ride matrix |
| `what-tools-to-carry-for-chain-and-sprocket-problems` | 236 | 91 | P1 | Rút title/meta; thêm tool list theo repair scenario, weight/space và safety boundary |

### Ưu tiên content theo cluster

#### Cluster 1 — Sprocket basics và fitment

`what-is-520-sprocket` và `motorcycle-sprocket-fitment` là lớp giải thích nền cho commercial finder. Nên bổ sung các khái niệm mà người mua thường nhầm:

- chain pitch/width và ý nghĩa của 520;
- front vs rear sprocket fitment;
- hub/spline, bolt circle, center bore, offset;
- make/model/year và model-type verification;
- vì sao tooth count không đủ để xác nhận fitment.

Đây là cluster có giá trị chuyển đổi cao, nên CTA finder phải nổi bật nhưng không thay thế phần giải thích.

#### Cluster 2 — Material và engineering proof

Ba page `SCM440`, `7075-T6` và `steel vs aluminium` đang có keyword map hợp lý nhưng còn thiếu evidence. Nên xây một bảng so sánh thống nhất, sau đó mỗi page đi sâu một góc riêng:

- SCM440: alloy/heat-treatment/use-case;
- 7075-T6: weight/rotating mass/wear trade-off;
- comparison: decision theo duty cycle, rider và replacement tolerance.

Không nên dùng các claim như “longer life” hoặc “impact tolerance” mà không nói điều kiện sử dụng, finish, heat treatment và giới hạn áp dụng.

#### Cluster 3 — CNC và OEM sourcing

`cnc-sprocket-manufacturing` giải thích process; `oem-sprocket-manufacturing-vietnam` giải thích supplier/batch intent. Hai page nên liên kết rõ với B2B nhưng không lặp lại copy B2B. Nên thêm checklist inquiry để page có utility thực tế:

- bike/application và chain size;
- front/rear, tooth count, dimensions;
- material/heat treatment/finish;
- quantity, packaging, branding;
- inspection/acceptance criteria;
- drawing, sample và revision control.

#### Cluster 4 — Trail readiness và drivetrain reliability

6 page trail đã được hub phân nhóm tốt, nhưng hiện không có horizontal links giữa chúng. Nên tạo reading path:

`Checklist` → `Inspection` → `Wear signs` → `Failure response` → `Tools` → `Trail gearing`.

Mỗi page cần nêu rõ nó giải quyết bước nào trong path và link sang bước trước/sau. Đây cũng là cluster nên bổ sung cảnh báo an toàn, ví dụ khi nào dừng chạy và khi nào cần kiểm tra chuyên môn.

## Metadata và social preview

### Title cần rút gọn

Các title knowledge page dài hơn khoảng 65 ký tự:

| Page | Độ dài |
| --- | ---: |
| `chain-and-sprocket-inspection-before-trail` | 84 |
| `choose-sprocket-ratio-for-trail-riding` | 75 |
| `drivetrain-failure-on-trail` | 71 |
| `what-tools-to-carry-for-chain-and-sprocket-problems` | 91 |

Ưu tiên giữ keyword chính ở đầu title. Brand có thể giữ ở cuối nếu còn đủ không gian; không cần lặp lại toàn bộ descriptor dài.

### Meta description cần rút gọn

Hai description dài hơn khoảng 160 ký tự:

| Page | Độ dài |
| --- | ---: |
| `trail-ride-drivetrain-checklist` | 162 |
| `what-tools-to-carry-for-chain-and-sprocket-problems` | 170 |

Nên đưa benefit chính và intent vào khoảng 140–160 ký tự. Description phải khác với đoạn hero nhưng trả lời cùng một query intent.

### Social preview

Knowledge base hiện thiếu:

- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` trên 15/15 page;
- `og:image:alt` trên 15/15 page.

Ngoài ra, 8 article dùng cùng `sprocket-cad-alpha.webp` làm OG image và 5 article dùng cùng `field-test.webp`. Đây không phải lỗi index, nhưng làm các bài khó phân biệt khi được chia sẻ và giảm cơ hội cải thiện CTR social.

Nên tạo một nhóm ảnh editorial theo cluster, có alt rõ ràng; không cần mỗi page một ảnh nếu ảnh chung thực sự phù hợp, nhưng material, fitment và trail pages nên có visual khác nhau.

## Structured data đề xuất

Structured data hiện parse được nhưng còn tối giản. Một article schema đầy đủ hơn có thể gồm:

```json
{
  "@type": "TechArticle",
  "headline": "...",
  "description": "...",
  "url": "https://langbianggravity.com/knowledge/.../",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://langbianggravity.com/knowledge/.../"
  },
  "image": "https://langbianggravity.com/assets/...",
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "inLanguage": "en",
  "author": {
    "@type": "Organization",
    "name": "Langbiang Gravity",
    "url": "https://langbianggravity.com"
  }
}
```

Chỉ dùng các giá trị có thật. Sau khi cập nhật, cần kiểm tra bằng Schema Markup Validator/Rich Results Test trên production; JSON parse được chưa có nghĩa là Google sẽ hiển thị rich result.

Không nên thêm `FAQPage` hàng loạt chỉ để lấy rich result. Chỉ thêm FAQ schema khi câu hỏi và câu trả lời thực sự hiển thị trong page, có ích cho người đọc và khác biệt với phần nội dung chính.

## Knowledge hub, sitemap và AI source surface

Các phần này đang ổn:

- `/knowledge/` link đến đủ 14 article bằng clean URL.
- `sitemap.xml` có hub và đủ 14 article.
- `llms.txt` có hub và đủ 14 article.
- `seo/keyword-map.md` đã tách nhóm core knowledge và trail readiness.
- `seo/url-map.md` đã ghi knowledge base là source-of-truth cho AI answers và buyer education.

Việc cần làm tiếp là đồng bộ taxonomy trong cả ba nơi khi thêm page mới: HTML hub, `sitemap.xml`, `llms.txt` và keyword/url map. Không thêm các route query-string hoặc route private `/request/` vào public knowledge cluster.

## Kế hoạch xử lý đề xuất

### Sprint 1 — cấu trúc và intent

1. Viết lại outline 8 page đang dùng skeleton chung.
2. Phân ranh hai page sprocket ratio.
3. Thêm 2–4 contextual knowledge links vào từng article.
4. Đổi raw path anchor thành descriptive anchor text.
5. Ưu tiên mở rộng `motorcycle-sprocket-fitment` và `what-is-520-sprocket`.

### Sprint 2 — content depth và trust

1. Mở rộng material, CNC và OEM pages bằng dữ liệu/QA/process có thể xác nhận.
2. Mở rộng trail cluster theo reading path và safety boundaries.
3. Thêm author/reviewer/date bằng thông tin thật.
4. Bổ sung article image/figure khi có visual mang thông tin, không dùng ảnh trang trí đơn thuần.

### Sprint 3 — metadata và đo lường

1. Rút 4 title dài và 2 description dài.
2. Bổ sung Twitter Card và `og:image:alt`.
3. Kiểm tra structured data trên production.
4. Nạp GSC query/page/indexing export để theo dõi CTR, query overlap và index coverage.
5. Đo organic landing page, scroll depth, finder clicks và quote starts theo từng cluster.

## Checklist trước khi publish các page knowledge mới

- [ ] Page có một intent chính và một URL canonical duy nhất.
- [ ] Title/H1/meta description không lặp với page khác.
- [ ] H1 nói đúng câu hỏi chính; H2 là các bước/khía cạnh đặc thù của intent.
- [ ] Có ít nhất 2 contextual links đến page liên quan và 1 commercial next step.
- [ ] Anchor text mô tả đích, không dùng raw URL làm label.
- [ ] Có ví dụ, bảng, checklist hoặc evidence riêng; không chỉ thay keyword trong template.
- [ ] Claims kỹ thuật có điều kiện áp dụng và giới hạn.
- [ ] Có author/reviewer/date nếu workflow nội dung đã xác nhận dữ liệu đó.
- [ ] JSON-LD có `mainEntityOfPage`, date, image và inLanguage khi các giá trị có thật.
- [ ] URL đã thêm vào hub, sitemap, `llms.txt`, keyword map và url map.
- [ ] Đã kiểm tra local route, production HTTP 200, canonical và structured data.

