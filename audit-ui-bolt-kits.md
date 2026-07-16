# UI/UX Audit — Bolt Kits

**Route:** `/products/bolt-kits/`  
**Ngày audit:** 2026-07-16  
**Phạm vi:** UI, UX, responsive, content/visual consistency, interaction, accessibility cơ bản, performance và metadata/share preview.

## Tóm tắt

Bolt Kits là một trong các trang có art direction rõ nhất: Neo-Swiss editorial, section numbering, rule grid và ảnh bolt kit thật tạo cảm giác kỹ thuật, không bị giống dashboard thương mại điện tử. Cấu trúc nội dung cũng tốt: product system → fitment protocol → sample finder → request/batch supply.

Các vấn đề cần ưu tiên là những chi tiết làm giảm độ tin cậy hoặc gây khó scan: preview share đang dùng ảnh khác hero, accent titanium quá nhạt trên nền sáng, form input/select mất focus ring, raw asset path xuất hiện như text cho người dùng, và fitment results trên mobile tạo một khối cuộn rất dài. Ngoài ra `styles.css` còn nhiều lớp override Bolt Kits chồng lên nhau cùng dead CSS/markup, dễ tạo rác và regression ở lần polish sau.

## Findings

| ID | Mức độ | Khu vực | Phát hiện | Tác động | Đề xuất |
|---|---|---|---|---|---|
| BOLT-01 | P2 | Share preview / metadata | `og:image` đang trỏ tới `/assets/images/product-bench.webp`, trong khi hero thực tế dùng `/assets/products/bolt-kits/bolt-kit-hero.png` (`products/bolt-kits/index.html:18`, `:145`). | Khi share link, preview có thể hiển thị bàn sản phẩm generic thay vì bolt kit hero; trải nghiệm trước khi click không nhất quán với landing page. | Dùng cùng asset hero hoặc tạo riêng một OG image có composition đúng; bổ sung `og:image:width`, `og:image:height`, `og:image:alt`.
| BOLT-02 | P2 | Contrast / visual system | Accent `--bolt-signal: #8c9992` được dùng cho kicker/section number trên nền titanium sáng `#e1e5e2` (`styles.css:7639`, `:7667`, `:7693-7698`). Độ tương phản ước tính chỉ khoảng 2.3:1. | Kicker nhỏ và metadata khó đọc; section number lớn vẫn không đạt ngưỡng contrast phù hợp cho large text. Accent đẹp về tone nhưng hơi chìm khi nằm trên nền sáng. | Dùng signal đậm hơn cho text, hoặc giữ `#8c9992` chỉ cho line/decorative mark và dùng một màu ink phụ cho text accent.
| BOLT-03 | P2 | Fitment / mobile scanability | Fitment results được render ngay khi load (`script.js:523`), sau đó 3 card xếp một cột ở mobile. Đo tại breakpoint mobile cho thấy `.bolt-fitment-results` cao khoảng 2,158 px. | Người dùng chưa search đã gặp một danh sách dài; trên màn hình nhỏ phải cuộn rất nhiều trước khi tới outro/CTA. Mục tiêu “Search sample fitment” bị lẫn với “browse toàn bộ”. | Cho trạng thái ban đầu là hướng dẫn + số sample, hoặc tách “Browse samples” khỏi form. Rút card mobile còn SKU, model/year, type và CTA; đưa spec dài vào modal/disclosure.
| BOLT-04 | P2 | Keyboard accessibility / form | `.bolt-finder-form input, select` đặt `outline: 0` (`styles.css:7456-7457`), trong khi rule page chỉ đổi `outline-color`. Không có border/background focus thay thế riêng cho field. | Người dùng keyboard có thể không nhận ra field đang focus, nhất là trên form nền sáng có nhiều đường kẻ. | Xóa `outline: 0` hoặc thêm `:focus-visible` rõ ràng cho input/select: outline 2 px, underline hoặc background nhẹ; kiểm tra cả select native trên mobile.
| BOLT-05 | P2 | Accessibility / dynamic feedback | Search thay đổi kết quả theo `input`/`change` (`script.js:519-520`) nhưng không có `aria-live`/status thông báo số lượng kết quả. Empty state chỉ là một paragraph (`script.js:447-453`). | Screen reader khó biết kết quả đã thay đổi, có bao nhiêu SKU hoặc vì sao danh sách biến mất. | Thêm vùng status `aria-live="polite"`, thông báo “1 result”, “3 results” hoặc “No exact fitment”. Gắn heading/label có ngữ nghĩa cho empty state.
| BOLT-06 | P3 | Content / visual polish | Figcaption hero hiển thị raw path `/assets/products/bolt-kits/bolt-kit-hero.png` cho người dùng (`products/bolt-kits/index.html:146`). | Đây giống thông tin debug/implementation hơn là technical caption; làm composition editorial mất sạch và tăng noise. | Đổi thành thông tin hữu ích như `400 × 400 / product asset`, `Grade 5 Ti / sample visual`, hoặc bỏ khỏi UI và giữ path trong source/alt.
| BOLT-07 | P3 | Product-card imagery | Rotor bolt sample dùng `assets/products/brake-rotor.png`, còn sprocket bolt và measured kit cùng dùng `assets/images/product-bench.webp` (`products-data.js:344-425`). Ảnh product-bench là ảnh tổng hợp nhiều linh kiện, không phải product-specific. | Card vẫn dùng được nhưng khó tạo khác biệt giữa kit; measured kit và sprocket kit có cảm giác cùng một sản phẩm/placeholder. | Thêm ảnh riêng theo application; nếu chưa có, dùng cùng một visual nhưng thêm badge “reference image” và ưu tiên thông tin application/SKU để phân biệt.
| BOLT-08 | P3 | CSS maintainability / “rác” | `styles.css` có 3 block Bolt Kits override liên tiếp tại khoảng `:7364`, `:7548`, `:7632`; block cuối ghi đè nhiều token và màu của hai block trước. | Khó biết giá trị nào là source-of-truth; sửa một block có thể không có hiệu lực, tăng nguy cơ regression và CSS phình. | Gộp thành một block theme cuối cùng, xóa các palette thử nghiệm cũ và giữ một comment mô tả token hiện hành.
| BOLT-09 | P3 | Dead CSS / dead markup | `.bolt-asset-object` chỉ có CSS (`styles.css:7406-7412`, các override `:7592-7596`, `:7675-7678`) nhưng không có element dùng; `.bolt-asset-grid` vẫn có markup nhưng bị `display: none` tại `styles.css:7733`. | Code và DOM chứa thiết kế cũ không còn hiển thị; làm tăng nhiễu khi debug hero và khiến người khác tưởng grid/object vẫn là phần visual cần duy trì. | Xóa `.bolt-asset-object` và các pseudo child rules; xóa `.bolt-asset-grid` nếu không có kế hoạch bật lại, hoặc giữ một implementation duy nhất có chủ đích.
| BOLT-10 | P3 | Image performance / layout stability | Hero image là asset 400×400 nhưng `img` không khai báo `width`, `height`, `loading` hoặc `decoding` (`products/bolt-kits/index.html:145`). | Browser phải suy ra kích thước từ asset/CSS; có thể gây layout shift hoặc ưu tiên tải không rõ khi hero là vùng LCP. | Thêm `width="400" height="400"`; giữ hero eager nếu đo thấy cần cho LCP và thêm `decoding="async"` theo chiến lược loading chung.
| BOLT-11 | P3 | Structured data | Product JSON-LD có name/material/url nhưng chưa có `image`, `offers` hoặc thông tin sample/quote (`products/bolt-kits/index.html:77-88`). | Search/share context chưa mô tả đầy đủ sản phẩm; không làm hỏng UI nhưng giảm chất lượng metadata của landing page product line. | Bổ sung `image` đúng hero và mô hình hóa đây là product-line/request page một cách nhất quán; tránh tạo offer giả vì site hiện dùng price-on-request.
| BOLT-12 | P3 | Copy / naming consistency | Hero dùng “Request a measured kit”, protocol dùng “send us the measurement set”, outro dùng “Request fitment”; các CTA cùng đi tới `/contact/#contact` nhưng khác nhau về wording. | Không sai chức năng, nhưng hierarchy CTA chưa hoàn toàn thống nhất giữa measured hardware, sample fitment và batch supply. | Đặt primary CTA theo intent ở từng section: `Find sample fitment`, `Send measurements`, `Request batch quote`; dùng microcopy giải thích khi nào chọn mỗi action.

## Đánh giá thẩm mỹ

### Điểm tốt

- Hero có cấu trúc editorial rõ: rail kỹ thuật, copy, product visual và metadata row.
- Ảnh bolt kit thật được đặt trực tiếp trên nền titanium, đúng tinh thần “technical catalogue”, không bị đóng trong card.
- Section 02/03 tạo nhịp tốt bằng rule và chuyển nền sáng ↔ graphite; checklist 4 bước giúp giải thích quy trình quote.
- CTA sử dụng chữ hoa, tracking và arrow nhất quán; trạng thái hover/focus của link/button có phản hồi rõ.
- Motion có chủ đích và đã có `prefers-reduced-motion` để tắt animation/reveal (`styles.css:7739-7816`).

### Điểm cần tiết chế

- Accent signal xám titanium đẹp nhưng đang được dùng như màu chữ chức năng quá nhiều; nên phân biệt rõ màu decorative với màu text cần đọc.
- Raw asset path trong figcaption phá vỡ cảm giác editorial hơn bất kỳ border/shadow nào; đây là chi tiết nên bỏ ngay.
- Hero có grid markup nhưng grid bị ẩn, trong khi CSS cũ vẫn chứa object dựng bằng pseudo-shape. Nên chọn một hướng visual duy nhất để trang sạch và dễ bảo trì.
- Ba lớp palette override cho thấy quá trình thử nghiệm vẫn còn nằm trong stylesheet production; visual cuối có thể đúng nhưng code phía sau đang nặng hơn cần thiết.

## Ưu tiên xử lý

### P0 — blocker

- Không phát hiện lỗi chặn luồng hoặc lỗi console trong lần kiểm tra này.

### P1 — nên xử lý trong vòng sửa UI kế tiếp

- BOLT-01: đồng bộ OG image với hero.
- BOLT-02 + BOLT-04 + BOLT-05: sửa contrast, focus ring và feedback cho fitment search.
- BOLT-03: giảm độ dài/độ nặng của sample results trên mobile.
- BOLT-06: bỏ raw asset path khỏi caption người dùng.

### P2 — cleanup và polish

- BOLT-07 đến BOLT-12: imagery theo application, gộp CSS override, xóa dead CSS/markup, image dimensions, structured data và chuẩn hóa CTA.

## Kiểm tra đã thực hiện

- Mở route local `/products/bolt-kits/` bằng browser in-app; kiểm tra snapshot nội dung và hierarchy.
- Đo desktop: không có horizontal overflow; 3 result cards render ở trạng thái ban đầu.
- Đo breakpoint mobile: CSS chuyển hero/specs/checklist/finder về layout một cột; không có horizontal overflow ở effective client width 576 px.
- Chọn Brand = KTM: còn đúng 1 result; mở `View Details`: modal có SKU và compatibility specs.
- Chọn Brand = Honda: empty state xuất hiện đúng với CTA `Request Fitment`.
- Kiểm tra console: không ghi nhận error/warning.
- HTTP smoke check route, CSS, JS, contact và asset hero đều trả về `200`.
- Asset hero tồn tại tại `assets/products/bolt-kits/bolt-kit-hero.png`, kích thước 400 × 400 px, dung lượng khoảng 58 KB.

## Kết luận

Bolt Kits đã có nền visual tốt và đáng giữ hướng Neo-Swiss editorial. Sprint tiếp theo nên tập trung vào độ tin cậy và độ sạch của trải nghiệm: ảnh/share preview đúng nhau, text accent đủ tương phản, field có focus state, kết quả fitment gọn hơn trên mobile, và dọn các lớp CSS/markup đã bị thay thế. Không cần thêm hiệu ứng mới trước khi hoàn tất các điểm này.
