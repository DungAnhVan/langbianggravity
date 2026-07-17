# UI/UX audit — Brake Rotor catalogue

Ngày kiểm tra: 2026-07-16
Route: `/products/brake-rotor/`
Phạm vi: visual design, Front/Rear interaction, responsive, accessibility, conversion, asset/performance và phần thừa.

## Kết luận nhanh

Route hiện tại đã gọn và đúng hướng catalogue kỹ thuật một màn hình: split layout rõ, Front/Rear là state dễ hiểu, copy và spec thay đổi theo state, còn visual Rear đã dùng asset Rear riêng thay vì mirror ảnh Front. Đây là một cải thiện quan trọng so với audit trước.

Các việc còn đáng ưu tiên là bảo toàn toàn bộ bản vẽ trong frame, đưa CTA fitment/quote vào ngay catalogue, đồng bộ ảnh dùng cho social/structured data với asset đang hiển thị, và dọn một vài semantic/shared markup thừa.

## Findings

### P2 — Technical drawing đang bị ép crop bởi `object-fit: cover`

Hai asset hiện tại có kích thước portrait `1190 × 1684`, nhưng sheet desktop có chiều cao cố định `580px` và ảnh được đặt `width: 100%`, `height: 100%`, `object-fit: cover`. Frame catalogue có tỷ lệ gần vuông/ngang hơn asset nguồn nên phần biên trên/dưới bị cắt. Với hình kỹ thuật, đây là rủi ro trực tiếp: nếu bản vẽ có thêm kích thước, callout hoặc vùng an toàn, thông tin có thể bị mất khỏi viewport.

Evidence:

- `products/brake-rotor/index.html:196-220` — Front/Rear dùng asset portrait và khai báo kích thước nguồn.
- `styles.css:3862-3885` — book cao `580px`, sheet fill toàn frame, ảnh dùng `object-fit: cover`.
- `assets/products/brake-rotor/LBG-F-KR94.webp` và `LBG-R-KR94.webp` — asset nguồn đều portrait.

Đề xuất: dùng `object-fit: contain` trên sheet kỹ thuật, hoặc đổi book sang tỷ lệ portrait phù hợp; giữ nền/grid để phần khoảng trắng vẫn có chủ ý. Kiểm tra lại cả desktop, tablet và mobile sau khi đổi.

### P2 — Catalogue thiếu CTA chuyển đổi ngay trong nội dung chính

Phần catalogue chỉ có hai nút chuyển Front/Rear. Người dùng muốn gửi thông tin fitment hoặc yêu cầu quote phải tự nhận ra nút `Quote` ở header hoặc đi xuống footer `Contact`; không có action nằm cạnh spec để nối từ “xem rotor” sang “gửi bike/bolt pattern”.

Đây có thể là lựa chọn đúng nếu brief chỉ muốn một product index tối giản, nhưng nó làm giảm khả năng chuyển đổi của product page. Nên có một CTA phụ như `Request rotor fitment` hoặc `Add to quote` ngay dưới controls, kèm một dòng giải thích ngắn về thông tin cần cung cấp.

Evidence: `products/brake-rotor/index.html:134-234` — nội dung catalogue và controls không có link/action fitment hoặc quote riêng.

### P2 — OG/Product image vẫn trỏ tới PNG legacy nặng và khác visual đang hiển thị

Trang hiển thị hai WebP mới khoảng `55KB` và `42KB`, nhưng `og:image` và Product JSON-LD vẫn trỏ tới `assets/products/brake-rotor/LBG-F-KR94.webp` khoảng `2.8MB`. Preview chia sẻ vì vậy có thể khác catalogue hiện tại, đồng thời metadata tiếp tục tham chiếu asset nặng hơn nhiều.

Evidence:

- `products/brake-rotor/index.html:19-22` và `:89` — OG/Product image dùng `assets/products/brake-rotor/LBG-F-KR94.webp`.
- `products/brake-rotor/index.html:196-220` — visual thực tế dùng `LBG-F-KR94.webp` và `LBG-R-KR94.webp`.
- Asset size local: PNG `2,802,301 bytes`; Front WebP `55,140 bytes`; Rear WebP `41,602 bytes`.

Đề xuất: tạo một social crop nhẹ, hoặc dùng Front WebP nếu crawler/social workflow chấp nhận; đồng bộ Product/OG image với visual hiện tại.

### P3 — Nhóm Front/Rear nên expose semantic group rõ hơn

`aria-label="Choose a brake rotor catalogue page"` hiện đặt trên `div` generic. Hai button đã có tên, `type="button"` và `aria-pressed` đúng, nhưng nhóm điều khiển chưa được expose rõ như một control group.

Evidence: `products/brake-rotor/index.html:181-189`.

Đề xuất: thêm `role="group"` hoặc dùng `fieldset/legend` nếu muốn label nhóm được đọc nhất quán hơn.

### P3 — Product dialog shared còn tồn tại dù route không có trigger

Route catalogue không render product card hay `data-open-product`, nhưng shared dialog markup vẫn nằm trong DOM và shared script vẫn khởi tạo logic liên quan. Đây không gây lỗi trực tiếp, nhưng là phần thừa làm contract của route kém rõ và thêm một surface phải kiểm tra khi thay đổi shared UI.

Evidence: phần dialog cuối `products/brake-rotor/index.html`; trigger product không xuất hiện trong route.

Đề xuất: nếu route này tiếp tục là catalogue một màn hình, bỏ dialog riêng khỏi page; giữ cart drawer và shared navigation.

## Các điểm đạt / lỗi cũ đã được xử lý

- Front và Rear hiện dùng hai asset kỹ thuật riêng: `LBG-F-KR94.webp` và `LBG-R-KR94.webp`; không còn finding “Rear chỉ là ảnh Front mirror bằng CSS”.
- State Front/Rear cập nhật copy, index, `aria-pressed`, `aria-hidden` và live status; `script.js` cập nhật `Front catalogue page selected` / `Rear catalogue page selected`.
- Hash `#front-brake-rotor` và `#rear-brake-rotor` được xử lý trong `setupRotorCatalog()`.
- Hình có `width`/`height`; Front có `fetchpriority="high"`, Rear có `loading="lazy"`.
- Reduced-motion đã tắt transition của sheet/control.
- Mobile chuyển copy trước, stage sau; controls mở rộng thành hai vùng bấm rõ.
- Header, skip link, nav toggle, Quote drawer và footer dùng shared site pattern.

## Trade-off theo design brief

Trang cố ý chỉ có một catalogue section, không có SKU grid, fitment form hay marketing block dài. Điều này giữ được tính technical/editorial và tránh rác nội dung. Tuy nhiên, nếu mục tiêu business là tạo lead từ product page, nên thêm một CTA inline nhỏ thay vì bắt người dùng tìm `Quote` ở header.

## Thứ tự đề xuất xử lý

1. Đổi framing ảnh kỹ thuật để không crop bản vẽ.
2. Thêm CTA fitment/quote ngay cạnh Front/Rear controls.
3. Đồng bộ OG/Product image với asset hiện tại và tạo social crop nhẹ nếu cần.
4. Thêm semantic group cho controls.
5. Dọn product dialog shared nếu route không có kế hoạch dùng product modal.

## Verification

- Static inspection: `products/brake-rotor/index.html`, `styles.css`, `script.js` và asset brake rotor.
- Local HTTP smoke check với `python -m http.server 4173`: `/`, `/products/brake-rotor/`, `/products/sprockets/`, CSS, JS và hai asset Front/Rear đều trả `200`.
- Đã kiểm tra trực tiếp hai asset WebP để đối chiếu tỷ lệ portrait với frame hiện tại.
- Browser automation không khả dụng trong phiên audit này; cần re-check trực quan ở desktop, khoảng 980px và mobile sau khi xử lý P2 crop.
