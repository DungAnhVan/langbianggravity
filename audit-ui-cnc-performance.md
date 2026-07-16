# UI/UX Audit — CNC Performance

**Route:** `/products/cnc-performance/`  
**Ngày audit:** 2026-07-16  
**Phạm vi:** UI, UX, responsive, content/visual consistency, interaction, accessibility cơ bản, metadata liên quan trải nghiệm chia sẻ.

## Tóm tắt

Trang có hướng art-direction tốt: bento hero, palette đen–kim loại–cam và thông điệp “fitment first” tạo cảm giác kỹ thuật, khác biệt với các trang product line còn lại. Search fitment và modal chi tiết đã hoạt động đúng.

Các vấn đề cần ưu tiên nằm ở khu vực SKU: hình ảnh không đại diện cho từng sản phẩm, trạng thái ban đầu chưa định hướng rõ, kết quả dài và nặng khi xuống mobile, đồng thời thông tin “3 cover formats” chưa khớp rõ với 4 product records trong data. Đây là các điểm làm giảm độ tin cậy và tăng chi phí scan trước khi người dùng gửi quote.

## Findings

| ID | Mức độ | Khu vực | Phát hiện | Tác động | Đề xuất |
|---|---|---|---|---|---|
| CNC-01 | P2 | Fitment results / visual | Cả 3 CNC sample SKU đều dùng cùng `assets/images/cnc-inspection.webp`. Ảnh hero còn tập trung vào một bánh sprocket và bàn đo, không cho thấy clutch cover, water pump cover hay engine side cover. | Người dùng khó phân biệt sản phẩm; visual đang hứa hẹn “CNC covers” nhưng ảnh không chứng minh đúng nhóm hàng, làm giảm trust khi chuẩn bị quote. | Thêm ảnh product-specific cho từng cover. Nếu chưa có ảnh thật, dùng một ảnh generic nhưng gắn nhãn rõ “Sample / inspection reference”, đồng thời tránh lặp cùng một ảnh cho 3 card.
| CNC-02 | P2 | Fitment flow | Kết quả 3 SKU được render ngay khi load (`script.js:523`), dù heading gọi đây là “Sample SKU search”. | Người dùng chưa nhập gì đã gặp một khối card dài; mục tiêu “lọc để tìm” bị lẫn với “browse toàn bộ”, đặc biệt bất lợi trên mobile. | Chọn một trạng thái mặc định rõ: hiển thị hướng dẫn + số mẫu, hoặc hiển thị toàn bộ nhưng thêm label “All sample SKUs” và tách nhóm “Browse samples” khỏi form.
| CNC-03 | P2 | Mobile / scanability | Mỗi result card chứa ảnh, mô tả, khoảng 6 dòng thông số và 2 action. Với 3 kết quả, trang trở thành một stack dài cần cuộn nhiều lần (`styles.css:4292`, mobile chuyển về 1 cột tại `styles.css:5330`). | Khó so sánh nhanh giữa các SKU; CTA bị đẩy xa, tăng cognitive load trên màn hình nhỏ. | Card mobile nên ưu tiên SKU, tên, brand/model/year, type và CTA. Cho các thông số còn lại vào modal hoặc disclosure “View specs”; cân nhắc compact list/table cho desktop.
| CNC-04 | P2 | Content / IA | Hero ghi `Core program: 3 cover formats`, fact strip cũng liệt kê 3 cover; nhưng `products-data.js:199-306` có thêm `Custom CNC Cover Program` là product record thứ 4. | Người dùng có thể hiểu sai rằng custom program không thuộc CNC Performance hoặc số lượng sản phẩm bị thiếu. | Ghi rõ “3 sample cover formats + custom CNC program”, hoặc đổi metric thành “3 fitment samples / 1 custom program” và phản chiếu cách gọi này ở section SKU.
| CNC-05 | P2 | Accessibility / feedback | Form có label nhưng không có vùng status/live region, thông báo lỗi hoặc thông báo số lượng kết quả. Kết quả đổi khi input/change (`script.js:519-520`) nhưng screen reader không được báo. | Người dùng dùng assistive technology khó biết search đã chạy, có bao nhiêu kết quả hoặc vì sao danh sách thay đổi. | Thêm `aria-live="polite"` cho vùng kết quả/status; announce “3 results” / “No matching fitment”. Giữ thông báo empty state có heading hoặc text đủ định danh.
| CNC-06 | P3 | Form quality | Brand và Type có option “Any”, Model/Year là text input và không có `required`, helper text hoặc validation rõ (`products/cnc-performance/index.html:200-226`). | Có thể submit một truy vấn rỗng mà không hiểu kết quả là “tất cả mẫu” hay “chưa tìm thấy”; year free text làm format nhập không nhất quán. | Thêm helper text ngắn (“Leave blank to browse samples”), chuẩn hóa year range hoặc dùng pattern/input mode phù hợp; hiển thị query summary sau khi search.
| CNC-07 | P3 | Navigation / anchors | Các fact `Clutch Cover`, `Water Pump Cover`, `Engine Side Cover` có `id` để mega menu link tới, nhưng bản thân fact strip chỉ là `span`, không có affordance để biết đây là điểm điều hướng (`products-data.js:34-36`, `products/cnc-performance/index.html:188-193`). | Người dùng vào giữa trang có thể coi đây chỉ là tag trang trí; hệ thống anchor thiếu ngữ nghĩa “section/product target”. | Nếu muốn giữ deep-link, đổi thành heading/anchor có cấu trúc hoặc thêm section target rõ ràng; nếu chỉ là facts thì bỏ `id` và không đưa chúng vào menu như link nội dung.
| CNC-08 | P3 | Performance / media | Hero image dùng `img` không có `width`/`height`, `loading` hoặc `decoding` (`products/cnc-performance/index.html:154`). | Có rủi ro layout shift và tải ảnh chưa được ưu tiên theo vai trò hero; ảnh 136 KB không lớn nhưng vẫn nên có kích thước nội tại. | Thêm intrinsic dimensions đúng asset, `decoding="async"`; giữ hero eager nếu muốn ưu tiên LCP và tối ưu `fetchpriority` theo kết quả đo thực tế.
| CNC-09 | P3 | Share metadata | Có `og:image` nhưng thiếu `og:image:width`, `og:image:height`, `og:image:alt`; Product JSON-LD cũng chưa có `image` (`products/cnc-performance/index.html:19`, `:70-84`). | Preview khi share và dữ liệu sản phẩm kém đầy đủ; không trực tiếp làm hỏng UI nhưng ảnh hưởng cảm nhận trước khi click và khả năng hiểu nội dung. | Bổ sung OG image metadata và map ảnh/offer phù hợp nếu page được dùng như product-line landing page.
| CNC-10 | P3 | Motion / responsive | Hover hero scale ảnh chỉ có hover rule (`styles.css:4118`) và không thấy xử lý `prefers-reduced-motion` trong phạm vi CNC. | Người dùng giảm chuyển động hoặc thiết bị touch có thể nhận trải nghiệm không nhất quán; hiệu ứng scale không mang nhiều giá trị task. | Bọc transition/transform trong media query phù hợp hoặc thêm `@media (prefers-reduced-motion: reduce)` để tắt transition.

## Đánh giá thẩm mỹ

### Điểm tốt

- Bento hero có hierarchy rõ: headline → context → metric → inspection image → fitment CTA.
- Palette đen, off-white, metallic gray và orange nhất quán với định vị industrial/performance.
- Typography lớn và line-break có chủ đích; cụm “Made to fit. Built to run.” dễ nhớ.
- CTA chính “Search Fitment” xuất hiện sớm và lặp lại ở conversion section, phù hợp với hành vi B2B cần xác nhận fitment.
- Modal “View Details” có đủ thông số và action quote; test interaction xác nhận mở được khi chọn một SKU.

### Điểm cần tiết chế

- Khung bento dùng border 4 px, shadow offset lớn và nhiều nền texture cùng lúc. Đây là lựa chọn cá tính nhưng khá nặng về thị giác; nên giữ hero là điểm nhấn và làm fact strip/results phẳng, nhẹ hơn để trang có nhịp nghỉ.
- Material block `7075 / 6061` đang thiên về trang trí. Nếu đây là thông tin quyết định mua hàng, nên thêm một dòng giải thích ngắn; nếu không, giảm độ nổi để tránh cạnh tranh với CTA.
- Ảnh inspection hiện đang gánh cả vai trò hero, proof và product-card image. Cần tách vai trò hình ảnh để trang bớt cảm giác template lặp lại.

## Ưu tiên xử lý

### P0 — trước khi đưa traffic vào trang

- Không có lỗi chặn luồng hoặc lỗi console được phát hiện trong lần kiểm tra này.

### P1 — nên xử lý trong vòng sửa UI kế tiếp

- CNC-01: thay/định danh lại ảnh SKU để tránh mismatch giữa ảnh và sản phẩm.
- CNC-02 + CNC-03: thiết kế lại trạng thái ban đầu và mật độ card, ưu tiên mobile scanability.
- CNC-04: thống nhất cách đếm và gọi sample SKU/custom program.
- CNC-05: bổ sung feedback cho kết quả tìm kiếm và empty state.

### P2 — polish sau khi ổn định UX

- CNC-06 đến CNC-10: form guidance, anchor semantics, intrinsic image size, share metadata và reduced-motion.

## Kiểm tra đã thực hiện

- Mở route local `/products/cnc-performance/` bằng browser in-app; kiểm tra DOM desktop/mobile breakpoint.
- Chọn Brand = Yamaha: kết quả lọc còn 2 SKU Yamaha.
- Mở `View Details`: modal hiển thị đúng tên, SKU, specs và action.
- Kiểm tra console: không ghi nhận error/warning.
- HTTP smoke check: route CNC, CSS, JS, ảnh CNC và contact đều trả về `200`.
- Asset `assets/images/cnc-inspection.webp` tồn tại, dung lượng khoảng 136 KB.

## Kết luận

Nền tảng visual của trang tốt và có khả năng trở thành landing page mạnh cho nhóm CNC. Việc cần làm trước tiên không phải thêm hiệu ứng, mà là làm cho sample SKU đáng tin và dễ scan hơn: ảnh đúng sản phẩm, trạng thái search rõ, card gọn trên mobile, và cách đếm sample/custom nhất quán.
