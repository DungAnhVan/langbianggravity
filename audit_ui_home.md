# UI/UX audit — Homepage

Ngày kiểm tra: 2026-07-16
Route: `/`
Phạm vi: visual design, hierarchy, CTA, content consistency, responsive, accessibility, performance và phần thừa/rác.

## Kết luận nhanh

Homepage hiện đã có cấu trúc rõ hơn cho một technical manufacturer: hero editorial mạnh, bốn product lanes full-card, proof rail `Fitment before fabrication` và B2B band cuối trang. Palette graphite/paper với orange, lime và blue tạo phân cấp tốt; CTA fitment và B2B cũng đã đi tới route phù hợp hơn.

Các vấn đề còn lại chủ yếu là mobile scanability và performance: proof cells trong hero quá hẹp, mỗi product card mobile khá dài, bốn ảnh lineup dưới fold tải eager và chưa khai báo kích thước. Claim cũ về 7075-T6/aluminium và CTA fitment trỏ sai đã được loại khỏi trạng thái hiện tại.

## Findings

### P2 — Hero proof rail vẫn giữ ba cột rất hẹp trên mobile

`home-race-hero__proof` luôn dùng `repeat(3, minmax(0, 1fr))`. Ở breakpoint mobile, padding giảm còn `12px 10px` và text giảm xuống `0.71rem/0.66rem`, nhưng rail vẫn không stack. Với viewport 320–390px, mỗi cell chỉ còn khoảng một phần ba chiều rộng nội dung, khiến `42CrMo4`, `Verified` và `Quote-led` dễ bị nén, khó đọc và khó phân biệt label/value.

Evidence: `styles.css:587-614` và mobile override `:1282-1295`.

Đề xuất: stack thành một cột, hoặc dùng layout `2 + 1` ở mobile; giữ ba proof nhưng tăng kích thước label/value và khoảng cách giữa chúng.

### P2 — Product lineup mobile có cognitive/scroll cost cao

Mỗi lane là full-card link tốt cho discoverability, nhưng ở mobile card có `min-height: 465px`, gồm visual 190px, title lớn, index, hai dòng spec và `Open line`. Bốn card liên tiếp tạo một đoạn vertical block dài trước khi người dùng tới proof rail/B2B. Đây là lựa chọn editorial hợp lý về hình ảnh, nhưng chưa tối ưu cho người dùng chỉ muốn chọn nhanh một product line.

Evidence: `index.html:130-220`; `styles.css:799-1008` và mobile `:1321-1368`.

Đề xuất: giữ full-card interaction nhưng rút mỗi panel còn một proof chính + CTA; đưa spec phụ vào trang product hoặc disclosure nhỏ. Có thể giữ card cao hiện tại ở desktop và giảm mạnh ở mobile.

### P2 — Ảnh lineup dưới fold chưa lazy-load và chưa có intrinsic dimensions

Hero background được dùng cho first view, nhưng bốn ảnh product lineup đều là `<img>` eager và không có `loading="lazy"`, `width` hoặc `height`. Asset hiện tại gồm SVG Mark III, brake rotor cutout PNG, CNC WebP và product-bench WebP; việc tải sớm toàn bộ làm initial page nặng hơn và tăng rủi ro layout adjustment.

Evidence: `index.html:143-207`; các selector ảnh tương ứng ở `styles.css:818-879`.

Đề xuất: giữ ảnh đầu tiên nếu muốn preload visual đầu tiên, thêm `loading="lazy"` cho các ảnh từ card thứ hai trở xuống, khai báo kích thước/aspect ratio và dùng asset nhẹ hơn cho rotor cutout nếu chất lượng vẫn đủ.

### P3 — Lặp lại “four lines/04” tạo cảm giác hơi dư ở tầng thông điệp

Hero nói `Four lines`, plate bên phải hiển thị số `04` và danh sách bốn line, sau đó lineup lại mở bằng `04 product lines` rồi lặp bốn card. Đây không phải lỗi usability; nó là một motif editorial nhất quán. Tuy nhiên, ở viewport thấp hoặc khi người dùng scan nhanh, repetition này chiếm khá nhiều diện tích trước khi tới proof.

Đề xuất: giữ motif `04` ở hero, nhưng rút label ở lineup thành một câu lợi ích hoặc bỏ số lặp nếu cần giảm cảm giác poster.

### P3 — Hero vẫn rất “poster-first”, cần kiểm tra kỹ vùng 320–390px

H1 dùng `clamp(3.8rem, 18vw, 5.2rem)`, action row chuyển thành grid hai cột và proof rail nằm ngay sau CTA. Direction này tạo impact tốt, nhưng khi text copy dài hoặc font fallback rộng, secondary links và proof có thể đẩy hero plate khá sâu xuống. Cần kiểm tra visual scan và focus order ở viewport nhỏ, đặc biệt khi mobile Quote button cố định xuất hiện.

Evidence: `styles.css:1282-1307` và hero markup `index.html:89-126`.

Đề xuất: giữ một primary CTA full width; giới hạn copy hero khoảng 2–3 dòng mobile; xác nhận focus target cuối hero không bị fixed Quote che.

## Các điểm đạt / lỗi cũ đã được xử lý

- Homepage hiện không còn claim `7075-T6 Race Aluminum`; hero proof dùng `42CrMo4`, `Verified` và `Quote-led` (`index.html:109-122`).
- CTA `Find sprocket fitment` trỏ trực tiếp tới `/products/sprockets/#find-your-sprocket`; B2B có route riêng `/b2b/` (`index.html:114-126`).
- Bốn product lane là full-card anchor với label, alt text và target route rõ (`index.html:141-220`). Finding cũ về card chỉ có text link đã đóng.
- Proof rail hiện đã có ba bước `Verify bike`, `Lock spec`, `Quote program`, nên không còn thiếu hoàn toàn lớp trust giữa lineup và B2B (`index.html:227-237`).
- B2B band đã dùng flow gọn với `View B2B supply` và `Send inquiry`, không còn card marketing dư.
- Mobile footer/B2B có bottom padding cho fixed Quote và shared navigation có skip link/nav toggle.
- Hero media và lineup images có alt/role phù hợp; primary CTA có focus/hover state.

## Trade-off theo design direction

Hero tối, số `04`, typography Impact và bốn lane màu là hệ nhận diện mạnh; không cần biến homepage thành catalogue đầy đủ. Các đề xuất nên tập trung vào scanability, payload và mobile fit, không làm mất nhịp editorial hoặc phân tầng audience retail/B2B.

## Thứ tự đề xuất xử lý

1. Sửa proof rail mobile thành stack hoặc layout dễ đọc hơn.
2. Rút gọn card panel trên mobile và giữ một proof chính mỗi lane.
3. Lazy-load ảnh lineup dưới fold, thêm dimensions/aspect ratio.
4. Re-check hero ở 320–390px với fixed Quote và keyboard focus.
5. Chỉ giảm motif `Four lines/04` nếu muốn page ngắn và ít poster hơn.

## Verification

- Static inspection: `index.html`, shared homepage selectors trong `styles.css`, `script.js` và route targets.
- Local HTTP smoke check với `python -m http.server 4173`: homepage, CSS, JS, Brake Rotor/Sprockets routes và asset chính đều trả `200`.
- Đã đối chiếu các route nội bộ chính của homepage và asset editorial đang được gọi trong markup.
- Browser automation không khả dụng trong phiên audit này; cần re-check trực quan ở desktop, 820px, 620px và mobile 320–390px sau khi xử lý P2.
