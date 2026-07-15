# UI/UX audit — Brake Rotor catalogue

Ngày kiểm tra: 2026-07-15  
Route: `/products/brake-rotor/`  
Phạm vi: visual design, Front/Rear catalogue interaction, responsive, accessibility, asset/performance và các thành phần thừa.

## Kết luận nhanh

Trang đang đi đúng hướng catalogue kỹ thuật một màn hình: split-screen rõ, palette graphite/paper/orange nhất quán, Front/Rear là state dễ hiểu, không có section marketing thừa. Desktop, tablet và mobile không có document-level horizontal scroll; chuyển trang, hash deep-link và accessibility state cơ bản hoạt động.

Finding quan trọng nhất là ảnh Rear hiện vẫn là cùng asset với Front, chỉ mirror/filter bằng CSS. Với một catalogue kỹ thuật, điều này có thể làm người xem hiểu nhầm geometry thực tế của rotor Rear.

## Findings

### P1 — Visual Rear không phải asset Rear thực tế

Ảnh Front và Rear cùng trỏ tới `/assets/images/brake-rotor-blueprint-hero.webp`. State Rear chỉ dùng `scaleX(-1)`, scale và grayscale/contrast để tạo cảm giác là một trang khác. Cách này giữ được visual continuity nhưng không cung cấp thông tin kỹ thuật khác nhau; phần caption lại khẳng định rõ `REAR ROTOR`/`MOUNTING · CLEARANCE · HEAT`.

Rủi ro: buyer có thể nghĩ hình đang thể hiện đúng bolt pattern, offset hoặc hình học Rear, trong khi đây chỉ là biến thể hình ảnh của cùng một rotor.

Evidence:

- `products/brake-rotor/index.html:196-220` — hai sheet dùng cùng asset.
- `styles.css:1344-1346` — Rear được mirror/filter bằng CSS.
- `assets/images/brake-rotor-blueprint-hero.webp` — asset hiện có là ảnh dùng chung.

Đề xuất: ưu tiên asset Rear thật nếu có. Nếu chưa có, ghi rõ `Rear reference / visual placeholder` hoặc đổi caption để không tạo cảm giác đây là bản vẽ Rear đã xác minh.

### P2 — H1 desktop hơi quá dọc, làm layout mang tính poster hơn catalogue

H1 bị giới hạn `max-width: 11ch` với font tối đa `4.8rem`, nên ở desktop tạo khoảng 4 dòng: `Front / braking, / dialled to / the hub.`. Đây là chủ ý thiết kế có trong brief và tạo chất editorial mạnh, nhưng nó làm phần copy cao, giảm diện tích để người xem scan specs và khiến trang phụ thuộc nhiều vào scroll.

Evidence:

- `styles.css:1182-1189` — giới hạn chiều rộng và font H1.
- Preview desktop: copy column khoảng 494px rộng, H1 khoảng 366×257px.

Đề xuất nếu muốn catalogue “technical index” hơn: nới H1 lên khoảng 13–15ch hoặc giảm nhẹ font ở desktop; giữ mobile hiện tại vì mobile đã xuống khoảng 3 dòng và vẫn rõ.

### P2 — Live region chưa có status text rõ ràng cho screen reader

`aria-live="polite"` đang đặt trên toàn bộ `.rotor-catalog-stage`, nhưng chuyển Front/Rear chủ yếu thay đổi CSS state, `aria-hidden` và hình ảnh. Screen reader có thể không nhận được thông báo ngắn, ổn định kiểu “Rear page selected”; `aria-pressed` trên button vẫn đúng nhưng chưa truyền đầy đủ ngữ cảnh thay đổi.

Evidence:

- `products/brake-rotor/index.html:193-223` — stage live region bao quanh cả book.
- `script.js:1045-1053` — state cập nhật attribute và page index.

Đề xuất: thêm một status element visually-hidden, ví dụ `Front catalogue page selected`/`Rear catalogue page selected`, và cập nhật nó trong `setPage()`. Có thể bỏ `aria-live` khỏi vùng hình ảnh để tránh announce nhiễu.

### P3 — Product dialog là markup thừa trên route catalogue

Trang không có `data-open-product` hoặc `data-open-fitment`, nên người dùng không có đường nào mở product dialog. Dialog vẫn tồn tại trong DOM và shared script vẫn có logic modal, dù brief của route này chủ ý loại bỏ product cards/SKU detail.

Evidence:

- `products/brake-rotor/index.html:240-243` — dialog không có trigger trên page.
- `products/brake-rotor/index.html:196-223` — catalogue không render product card/action.
- `script.js:1082-1088` — chỉ gắn handler nếu trigger tồn tại.

Đề xuất: giữ cart drawer dùng chung, nhưng có thể bỏ riêng `<dialog>` khỏi route này để DOM và contract rõ hơn. Không cần bỏ `products-data.js`/`script.js` vì navigation và Quote vẫn dùng shared data/logic.

### P3 — OG/structured-data image đang dùng PNG nặng hơn nhiều so với page asset

Page render bằng WebP khoảng 193KB, nhưng `og:image` và Product JSON-LD trỏ tới PNG khoảng 2.8MB. PNG có thể giữ vì compatibility của social preview, nhưng payload lớn hơn đáng kể và không đồng nhất với asset render chính.

Evidence:

- `products/brake-rotor/index.html:19-22` và `:89` — dùng PNG cho OG/Product image.
- `products/brake-rotor/index.html:198` — page render dùng WebP.
- Asset size: PNG khoảng 2,802,301 bytes; WebP khoảng 193,426 bytes.

Đề xuất: dùng WebP cho structured data nếu workflow crawler cho phép; với OG, giữ PNG nếu cần tương thích nhưng nên tạo một bản social crop nhẹ hơn thay vì dùng ảnh vuông gốc 1254×1254.

### P3 — Nhóm control nên có semantic group rõ hơn

`aria-label="Choose a brake rotor catalogue page"` đang đặt trên một `div` generic. DOM snapshot vẫn đọc được label và hai button có tên rõ, nhưng nhóm control chưa được expose như một group semantic.

Evidence: `products/brake-rotor/index.html:181-189`.

Đề xuất: thêm `role="group"` cho `.rotor-catalog-controls`; giữ label hiện tại.

## Các điểm đạt

- Front là state mặc định; Rear cập nhật đúng copy, index `02`, `aria-pressed` và `aria-hidden`.
- Deep-link `/products/brake-rotor/#rear-brake-rotor` khởi tạo đúng Rear.
- Hai control là button thật, vùng chạm mobile rộng và rõ state active màu orange.
- Mobile chuyển đúng thứ tự copy → stage; tablet chuyển đúng layout một cột theo breakpoint.
- Không có horizontal overflow ở responsive check; Quote cố định không che footer của route này.
- Hình ảnh có `width`/`height`, Front có `fetchpriority="high"`, Rear có `loading="lazy"`.
- Alt text Front/Rear khác nhau và mô tả đúng ngữ cảnh hiển thị.
- `prefers-reduced-motion: reduce` tắt transition của sheet/control.
- Header, skip link, nav toggle, Quote và footer giữ đúng hệ thống shared site.
- Preview không có console warning/error; các ảnh local đều load thành công.

## Trade-off theo design brief, chưa xem là lỗi

Route cố ý chỉ có một catalogue section, không có fitment finder, SKU grid, CTA conversion hoặc marketing section thứ hai. Đây là đúng với brief `ui-brake-roto.md`; đường Quote vẫn tồn tại ở header như affordance dùng chung toàn site. Nếu mục tiêu conversion thay đổi, cần thêm một CTA rõ trong catalogue thay vì bắt người dùng tìm Quote ở header.

## Thứ tự đề xuất xử lý

1. Thay hoặc gắn nhãn rõ cho visual Rear placeholder.
2. Bổ sung status text cho Front/Rear state change.
3. Quyết định có bỏ product dialog thừa khỏi route hay không.
4. Tối ưu OG/structured-data image.
5. Nới H1 desktop và thêm `role="group"` nếu muốn polish tiếp.

## Verification

- Preview local bằng `python -m http.server 4175`.
- Desktop: kiểm tra layout split-screen, hero height, stage/book framing và footer.
- Tablet/mobile: kiểm tra copy → stage flow, button sizing và document width.
- Interaction: Front → Rear, `aria-pressed`, `aria-hidden`, index text và hash deep-link.
- Static/runtime: image natural dimensions, local asset load, console logs, visible H1 và overflow.
