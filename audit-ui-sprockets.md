# UI/UX audit — Sprockets product page

Ngày kiểm tra: 2026-07-16
Route: `/products/sprockets/`
Baseline: commit `3e76965` và working tree hiện tại
Phạm vi: visual direction, hierarchy, fitment conversion, responsive, accessibility, motion, performance và phần thừa/rác.

## Kết luận nhanh

Trang hiện có direction rõ: light editorial canvas, typography motorsport, red accent, Fusion drawing set và flow `Materials → Fitment logic → Finder → FAQ`. Logo header/footer đã đúng nền, message steel-only cũng nhất quán hơn trước.

Các vấn đề còn lại tập trung vào khả năng đọc và expectation: autoplay video chưa tôn trọng reduced-motion, red token thiếu contrast cho text nhỏ, ba Mark chưa nói rõ trạng thái sản phẩm, finder cho submit dữ liệu rỗng, ticker tạo horizontal scroller lồng trên mobile, và page vẫn eager-load nhiều media.

## Findings

### P1 — Video autoplay không dừng khi người dùng bật reduced motion

Hero video là decorative nhưng vẫn dùng `autoplay muted loop playsinline`. Media query reduced-motion hiện chỉ dừng animation của slash và hero image; không pause video hoặc chuyển về poster. Vì vậy người dùng đã yêu cầu giảm chuyển động vẫn nhận motion liên tục từ teaser 15 giây.

Evidence:

- `products/sprockets/index.html:235-240` — video autoplay và play glyph decorative.
- `styles.css:1972-1975` — reduced-motion chỉ tắt animation của slash và hero image.

Đề xuất: khi `matchMedia('(prefers-reduced-motion: reduce) matches`, pause video và giữ poster; hoặc bỏ autoplay, dùng nút play thật có accessible name. Nếu vẫn giữ autoplay cho người dùng bình thường, cân nhắc `preload="none"` hoặc poster-first.

### P1 — Red accent chưa đủ contrast cho text nhỏ

`--kinetic-red: #ef1c25` trên canvas `#f8f8f6` có contrast khoảng `4.06:1`, dưới ngưỡng `4.5:1` cho text thường. White text trên red button khoảng `4.32:1`, cũng chưa đạt 4.5:1 cho CTA cỡ nhỏ. Token này đang dùng cho kicker, index, form labels, số thứ tự và CTA.

Evidence: `styles.css:1417-1421`, `:2475-2477`, `:2503-2528` và các caption/label trong vùng `:2071-2226`.

Đề xuất: tách token `--kinetic-red-text` đậm hơn cho text trên nền sáng; dùng red tối hơn hoặc ink background cho button chữ trắng. Có thể giữ red hiện tại cho heading lớn/decorative nếu size thực tế đạt ngưỡng large text.

### P2 — Trạng thái của Mark I/II/III chưa đủ rõ đối với buyer

Section nói “Three marks. One rear system.” và hiển thị `TrussX`, `Hive`, `Voron`; hero dùng Mark III, trong khi Materials dùng lại Mark I làm visual cho racing steel. `current showcase visual` mới chỉ xuất hiện ở một caption, chưa đủ để phân biệt design study, visual evolution hay SKU có thể quote.

Rủi ro là người dùng hiểu đây là ba variant rear sprocket có thể mua, hoặc không biết Mark nào là reference hiện tại.

Evidence: `products/sprockets/index.html:252-310`.

Đề xuất: ghi rõ `Design study / not separate SKU`, `Current visual reference` và `Material reference`; hoặc gom I/II vào một block design evolution và dùng Mark III nhất quán cho hero/material.

### P2 — Finder cho phép submit rỗng hoặc year không hợp lệ

Form có Make, Model, Year và Model type nhưng không field nào có `required`. Year là text với `inputmode="numeric"`, nên người dùng có thể submit rỗng hoặc nhập chuỗi không phải năm rồi bị chuyển thẳng sang external finder bằng GET.

Evidence: `products/sprockets/index.html:359-390`.

Đề xuất: nếu empty search không phải use case, bắt buộc tối thiểu Model/Year; dùng `type="number"` hoặc pattern/range cho year; thêm microcopy rằng form sẽ mở dedicated finder app. Nếu empty search là hợp lệ, cần hiển thị expectation rõ trước khi handoff.

### P2 — Media payload lớn và ảnh below-the-fold chưa lazy-load

Video teaser hiện khoảng `2.25MB`. Ba SVG showcase và ảnh Material được khai báo trực tiếp trong HTML nhưng không có `loading="lazy"`; các ảnh cũng không có intrinsic `width`/`height` trong markup. Hero cần tải sớm, nhưng showcase/material ở dưới fold không nên cùng cạnh tranh initial load.

Evidence:

- `products/sprockets/index.html:221-239` — hero SVG và video.
- `products/sprockets/index.html:260-297` — showcase/material images không lazy-load hoặc khai báo kích thước.
- Asset local: `sprocket-motion-15s.mp4` khoảng `2,248,869 bytes`; Mark I/II/III SVG khoảng `127KB/120KB/182KB`.

Đề xuất: `loading="lazy"` cho ảnh từ showcase trở xuống, thêm kích thước/aspect ratio ổn định, giảm video teaser hoặc chuyển sang poster-first theo connection/reduced-motion. Hero Mark III có thể giữ eager.

### P2 — Display typography còn quá lớn ở tablet 721–980px

Breakpoint tablet chủ yếu đổi grid và ẩn stamp, nhưng nhiều heading vẫn giữ clamp desktop: section heading tối đa `8.8rem`, Fitment tối đa `11rem`. Khi layout đã thành một cột, display type này làm section title chiếm quá nhiều chiều cao và đẩy thông tin fitment xuống sâu.

Evidence: `styles.css:2011-2027`, `:2348-2350`, `:2728-2750`.

Đề xuất: thêm type scale riêng cho 721–980px, giảm line-height cực đoan ở heading nhiều dòng và cho hero/section title wrap sớm hơn. Giữ Impact treatment nhưng giảm poster height để scan nhanh hơn.

### P2 — Model ticker trở thành nested horizontal scroller trên mobile

Ticker dùng `white-space: nowrap` và ở mobile đổi sang `overflow-x: auto`. Đây là một horizontal scroll thứ hai bên trong vertical page, nhưng chưa có cue “swipe for more”, scrollbar styling hoặc semantic region rõ; `aria-label` trên `div` chưa đủ nhất quán cho assistive technology.

Evidence:

- `products/sprockets/index.html:345` — ticker chứa năm motorcycle families.
- `styles.css:2406-2426` và `:2806-2809` — base nowrap và mobile overflow-x.

Đề xuất: ưu tiên wrap thành grid/2 hàng ở mobile. Nếu giữ ticker, thêm `role="region"`, tên rõ, `tabindex="0"` và cue thị giác nhẹ cho nội dung còn bên phải.

### P3 — Play icon là affordance giả

Video có glyph play ở giữa nhưng glyph chỉ là `<span>`, không có click/pause control và không có trạng thái. Người dùng dễ hiểu đây là video có thể tương tác nhưng không có hành động nào.

Evidence: `products/sprockets/index.html:235-240`.

Đề xuất: hoặc biến thành button play/pause thật với accessible name và state, hoặc bỏ glyph và thay bằng nhãn `15s loop / decorative visual`.

### P3 — Ba CTA cho cùng finder chưa có verbal anchor thống nhất

Hero dùng `Find your fitment`, form dùng `Open fitment finder`, outro dùng `Find your sprocket`. Các câu đều hợp ngữ cảnh, nhưng action label chính thay đổi ba lần nên lực dẫn đường không hoàn toàn nhất quán.

Evidence: `products/sprockets/index.html:212`, `:390`, `:431`.

Đề xuất: thống nhất action label chính, ví dụ `Open fitment finder`; giữ các biến thể còn lại cho heading/context.

### P3 — Social/structured-data image chưa theo visual hiện tại

OG image, `primaryImageOfPage` và ProductGroup image vẫn trỏ tới `assets/products/sprocket-cad-alpha.webp`, trong khi visual hiện tại đã chuyển sang ba SVG Mark I/II/III. Asset legacy vẫn tồn tại nên đây không phải broken path, nhưng preview chia sẻ và metadata không phản ánh đúng art direction hiện tại.

Evidence: `products/sprockets/index.html:19`, `:92` và `:104`; visual hiện tại ở `:221`, `:262-297`.

Đề xuất: tạo một social crop ổn định từ Mark III hoặc hero composition rồi dùng nhất quán cho OG/structured data; không dùng nguyên SVG nếu crawler/social pipeline không hỗ trợ tốt.

## Các điểm đạt / lỗi cũ đã được xử lý

- Header light dùng `/assets/brand/logo-black.png`; footer dark dùng `/assets/brand/logo-white.png` (`products/sprockets/index.html:163-164`, `:438`). Finding logo sai màu đã đóng.
- Steel-only message nhất quán trong visible page, description và ProductGroup JSON-LD; không còn claim aluminium trong flow chính.
- Hero có `On this page` navigation tới Materials, Fitment logic và Finder.
- H1/H2/H3 có hierarchy và `aria-labelledby`; FAQ dùng native `details/summary`.
- Fusion SVG có alt riêng cho Mark I/II/III; video được đánh dấu `aria-hidden` vì là visual decorative.
- Mobile đã có breakpoint riêng cho hero, showcase, form và finder links.
- Local HTTP smoke check hiện trả `200` cho HTML/CSS/JS, video/legacy poster và ba SVG editorial assets.

## Trade-off theo design direction

Impact typography, red slash, monochrome drawings, ticker và whitespace lớn là lựa chọn art direction có chủ ý. Không nên biến route thành catalogue form thông thường. Các đề xuất ưu tiên ở trên nhằm làm rõ trạng thái sản phẩm, khả năng đọc và handoff fitment mà vẫn giữ motorsport character.

## Thứ tự đề xuất xử lý

1. Pause video khi reduced-motion và cân nhắc poster-first.
2. Sửa contrast token cho small text/CTA.
3. Gắn nhãn rõ trạng thái Mark I/II/III và reference hiện tại.
4. Thêm validation/handoff copy cho finder.
5. Lazy-load media dưới fold và thêm tablet type scale.
6. Làm rõ ticker mobile, play affordance và metadata image.

## Verification

- Static inspection: `products/sprockets/index.html`, `styles.css`, `script.js` và asset editorial.
- Contrast calculation: red/paper khoảng `4.06:1`; white/red button khoảng `4.32:1`.
- Local HTTP smoke check với `python -m http.server 4173`: route, CSS, JS, video, poster và Mark I/II/III SVG đều trả `200`.
- Browser automation không khả dụng trong phiên audit này; cần re-check trực quan ở desktop, 980px, 720px và mobile sau khi xử lý P1/P2.
