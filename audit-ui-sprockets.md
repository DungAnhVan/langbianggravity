# UI/UX audit — Sprockets product page

Ngày kiểm tra: 2026-07-16  
Route: `/products/sprockets/`  
Baseline: commit `2c5171d` — steel-only / kinetic editorial redesign  
Phạm vi: visual design, hierarchy, content clarity, fitment conversion, responsive, accessibility, motion và performance.

## Kết luận nhanh

Phiên bản hiện tại có direction rõ hơn audit trước: light editorial canvas, typography motorsport, red accent và ba Fusion marks tạo cảm giác premium/technical. Product story cũng đã tập trung đúng vào 42CrMo4 racing steel và form finder đã có đủ Make / Model / Year / Model type.

Các vấn đề cần ưu tiên hiện nay là lỗi nhận diện logo do dùng sai màu logo trên header/footer, contrast của màu đỏ chưa đủ cho text nhỏ và CTA, video autoplay chưa được xử lý theo reduced-motion, và phần “ba marks” chưa nói rõ đâu là concept progression/visual reference hay sản phẩm có thể mua. Ngoài ra page đang tải video teaser 2.2MB cùng nhiều ảnh below-the-fold ngay từ đầu.

## Findings

### P1 — Logo header/footer gần như biến mất vì dùng sai phiên bản màu

Header của page dùng nền sáng `#f8f8f6` nhưng vẫn render `/assets/brand/logo-white.png`. Footer dùng nền tối `#171717` nhưng lại render `/assets/brand/logo-black.png`. Hai logo có thể vẫn tồn tại trong DOM và có alt text, nhưng màu logo không phù hợp với nền nên brand mark không còn là điểm nhận diện nhìn thấy được.

Evidence:

- `products/sprockets/index.html:163-164` — header dùng `logo-white.png`.
- `products/sprockets/index.html:436-438` — footer dùng `logo-black.png`.
- `styles.css:413-432` — header light theme.
- `styles.css:1674-1677` — footer dark background.

Đề xuất: dùng `logo-black.png` cho header và `logo-white.png` cho footer, sau đó kiểm tra cả desktop/mobile ở trạng thái header scrolled.

### P1 — Contrast màu đỏ không đạt cho text nhỏ và CTA chính

Màu `--kinetic-red: #ef1c25` trên canvas `#f8f8f6` có contrast khoảng `4.06:1`, thấp hơn ngưỡng WCAG AA `4.5:1` cho text thường. Màu này được dùng cho các label nhỏ `0.62–0.68rem`, số thứ tự, kicker và cả CTA có chữ trắng trên nền đỏ.

Rủi ro: các label kỹ thuật và chữ trong CTA chính có thể khó đọc với người dùng low-vision hoặc màn hình ánh sáng kém. Heading lớn màu đỏ có thể vẫn đạt ngưỡng large text, nhưng không nên suy rộng điều đó cho microcopy.

Evidence:

- `styles.css:413-416` — màu canvas, ink và red.
- `styles.css:569-579` — CTA trắng trên nền đỏ.
- `styles.css:989-999` và `:1471-1475` — label nhỏ dùng màu đỏ.
- Contrast calculation: `#ef1c25` ↔ `#f8f8f6` ≈ `4.06:1`.

Đề xuất: dùng đỏ đậm hơn cho text trên nền sáng, ví dụ một token riêng cho small text; với button có thể dùng đỏ tối hơn hoặc nền ink + chữ trắng. Giữ đỏ hiện tại cho decoration/large headings nếu muốn bảo toàn art direction.

### P1 — Video autoplay vẫn chạy khi người dùng bật reduced motion

Video hero là `<video autoplay muted loop playsinline>` và được đặt `aria-hidden="true"`. Media query `prefers-reduced-motion` chỉ tắt animation của slash và hero image; không pause hoặc thay video bằng poster. Người dùng đã yêu cầu giảm chuyển động vẫn phải nhận motion từ teaser 15 giây.

Evidence:

- `products/sprockets/index.html:235-238` — video autoplay loop.
- `styles.css:968-972` — reduced-motion chỉ tắt hai animation hero.

Đề xuất: thêm JS kiểm tra `matchMedia('(prefers-reduced-motion: reduce)')` để pause video và giữ poster; hoặc bỏ autoplay và biến video thành nút play thật có controls/label. Nên cân nhắc `preload="none"` nếu video chỉ là visual decoration.

### P2 — Ba Mark đang bị hiểu như ba product option, trong khi hierarchy chưa nói rõ trạng thái

Section hiển thị `Mark I / TrussX`, `Mark II / Hive`, `Mark III / Voron` dưới headline “Three marks. One rear system.” Hero dùng Mark III, nhưng section Materials lại dùng Mark I làm visual cho Racing Steel. Copy có “current showcase visual” nhưng không nói rõ Mark I/II là concept iteration, design study hay SKU có thể quote.

Rủi ro: buyer có thể tưởng ba hình là ba rear sprocket variants hoặc ba lựa chọn đặt hàng; sự chuyển từ Mark III ở hero sang Mark I ở material card làm giảm cảm giác một sản phẩm đang được mô tả.

Evidence:

- `products/sprockets/index.html:255-277` — ba marks và các tên TrussX/Hive/Voron.
- `products/sprockets/index.html:296` — Mark I được dùng lại cho steel reference.
- `products/sprockets/index.html:276` — Mark III được gọi là current showcase visual.

Đề xuất: gắn nhãn rõ `Design study / not separate SKU`, `Current visual reference` và `Material reference`; hoặc chỉ dùng Mark III trong hero/material, giữ I/II ở một block “design evolution” riêng.

### P2 — Payload video lớn và media below-the-fold chưa lazy-load

Video teaser `sprocket-motion-15s.mp4` có kích thước khoảng `2.2MB` và được autoplay trong hero. Ba WebP showcase cộng thêm ảnh material được render trong HTML nhưng không có `loading="lazy"`, `width` hoặc `height` attributes. Với page thiên về editorial, visual nhiều là hợp lý, nhưng initial load đang phải trả thêm payload không cần thiết cho người chưa scroll.

Evidence:

- `assets/products/sprocket-editorial/sprocket-motion-15s.mp4` — khoảng `2,218,011 bytes`.
- `products/sprockets/index.html:262-296` — ảnh showcase/material không khai báo lazy loading.
- `products/sprockets/index.html:236` — video dùng `preload="metadata"` nhưng vẫn autoplay.

Đề xuất: `loading="lazy"` cho ảnh từ showcase trở xuống, thêm kích thước intrinsic để tránh layout shift, dùng poster ở initial state và chỉ play video khi hero visible/connection phù hợp. Nếu cần autoplay, cung cấp một bản teaser nhẹ hơn hoặc giới hạn frame rate/duration.

### P2 — Typography display quá lớn ở tablet và các section giữa

Headline dùng Impact với line-height khoảng `0.8` và cỡ tối đa `8.8rem`; Fitment heading lên tới `11rem`. Breakpoint `max-width: 980px` chủ yếu đổi grid nhưng chưa giảm đáng kể cỡ heading; breakpoint mobile mới hạ về `clamp(4rem, 19vw, 6.3rem)`. Ở khoảng 721–980px, layout đã chuyển thành một cột nhưng display type vẫn rất lớn, khiến section title chiếm nhiều chiều cao và đẩy thông tin fitment xuống thấp.

Evidence:

- `styles.css:523-536` — hero H1 `clamp(4.6rem, 7.4vw, 8.8rem)` và `text-wrap: nowrap`.
- `styles.css:1007-1017` — section headings tối đa `8.8rem`.
- `styles.css:1344-1346` — Fitment heading tối đa `11rem`.
- `styles.css:1680-1705` — tablet chỉ đổi column/ẩn stamp, chưa có scale type tương ứng.

Đề xuất: thêm type scale riêng cho 721–980px, giảm line-height cực đoan ở heading nhiều dòng và cho hero H1 wrap tự nhiên sớm hơn. Giữ Impact treatment nhưng giảm “poster height” để scan thông tin nhanh hơn.

### P2 — Mobile có nested horizontal scroller cho model families nhưng không có affordance rõ

Model ticker dùng `white-space: nowrap` và ở mobile chuyển sang `overflow-x: auto`. Đây là horizontal scroll thứ hai bên trong vertical page; không có scrollbar styling hoặc chỉ dẫn rằng còn nội dung bên phải. `aria-label` trên `div` cũng không làm nó trở thành một region điều hướng rõ ràng cho mọi assistive technology.

Evidence:

- `products/sprockets/index.html:344` — ticker chứa năm motorcycle families.
- `styles.css:1402-1412` — `white-space: nowrap`, `overflow: hidden` ở base.
- `styles.css:1802-1805` — mobile đổi sang `overflow-x: auto`.

Đề xuất: ưu tiên wrap thành hai hàng hoặc grid trên mobile. Nếu giữ ticker, thêm `role="region"`, tên rõ, `tabindex="0"` và cue thị giác nhẹ như “swipe for more”.

### P2 — Finder form cho phép submit rỗng hoặc year không hợp lệ

Form đã có đủ bốn field và đúng với FAQ, nhưng Make/Model/Year/Type đều không `required`; Year là `type="text"` với `inputmode="numeric"`. Người dùng có thể bấm submit khi chưa nhập gì hoặc nhập chuỗi không phải năm, sau đó bị handoff thẳng sang external finder bằng GET mà không có feedback tại chỗ.

Evidence:

- `products/sprockets/index.html:359-390` — form action external, field không có validation constraint.

Đề xuất: quyết định rõ search rỗng có hợp lệ không. Nếu không, required tối thiểu Model/Year; đổi Year thành input có `pattern`/`min`/`max` hoặc validation inline. Thêm microcopy “opens the dedicated finder app” cạnh button để expectation về handoff rõ hơn.

### P3 — Play icon là affordance giả

Video có vòng tròn play bằng `<span>` nhưng không có button, không có pause control và không có tương tác click. Vì icon nằm giữa video, người dùng dễ hiểu đây là video có thể play/pause.

Evidence: `products/sprockets/index.html:239-240` và `styles.css:751-765`.

Đề xuất: hoặc biến thành control thật có accessible name và pause state, hoặc bỏ biểu tượng play và thay bằng nhãn nhỏ `15s loop / decorative visual`.

### P3 — Hai CTA finder trong cùng luồng chưa cùng naming

Hero dùng `Find your fitment`, form dùng `Open fitment finder`, outro dùng `Find your sprocket`; các label đều hợp lý riêng lẻ nhưng không tạo một verbal anchor nhất quán cho hành động chính.

Evidence: `products/sprockets/index.html:212`, `:390`, `:431`.

Đề xuất: thống nhất một primary label, ví dụ `Open fitment finder`, và dùng các biến thể còn lại cho secondary context hoặc heading, không dùng cả ba như action label.

## Các điểm đạt

- Steel-only message đã nhất quán trong visible page và ProductGroup JSON-LD; form đã bổ sung Model type.
- Hero có navigation “On this page” tới Materials, Fitment logic và Finder; CTA không bị giấu trong footer.
- Section có heading hierarchy rõ từ một H1 đến các H2/H3 có `aria-labelledby`; FAQ dùng native `<details>/<summary>`.
- Các ảnh Fusion có alt text riêng cho Mark I/II/III; video decorative được `aria-hidden`.
- Mobile có breakpoint riêng, chuyển hero thành một cột, form thành một cột và các finder links thành stack.
- Light editorial palette và dark fitment section tạo nhịp thị giác rõ; `kinetic-model-ticker` là một điểm nhận diện mạnh cho nhóm model.
- Local server trả 200 cho HTML, CSS, JS, video và hai logo asset chính.

## Trade-off theo design direction, chưa xem là lỗi bắt buộc

Typography Impact lớn, clip-path CTA, slash đỏ, monochrome Fusion drawings và ticker là lựa chọn art direction có chủ ý. Không nên làm chúng giống catalogue form thông thường. Các đề xuất ưu tiên làm rõ trạng thái sản phẩm, khả năng đọc và đường dẫn fitment trong khi vẫn giữ editorial motorsport character.

## Thứ tự đề xuất xử lý

1. Đổi logo header/footer về đúng màu.
2. Sửa contrast token cho red text và CTA.
3. Pause/disable video khi reduced-motion và giảm autoplay payload.
4. Gắn nhãn rõ status của Mark I/II/III và thống nhất visual reference hiện tại.
5. Lazy-load media below-the-fold, bổ sung dimensions và scale typography cho tablet.
6. Làm rõ nested ticker và validation/handoff của finder form.

## Verification

- Preview local: `python -m http.server 4173`.
- Static DOM/CSS inspection: `products/sprockets/index.html`, `styles.css`, `script.js`.
- Asset inspection: ba Fusion WebP, video teaser, logo header/footer và file sizes.
- HTTP smoke check: HTML/CSS/JS/video/logo assets đều trả `200`.
- Contrast calculation: `#ef1c25` trên `#f8f8f6` ≈ `4.06:1`.
- Browser automation không khả dụng trong phiên cập nhật này; responsive visual cần được re-check trực tiếp ở desktop, 980px, 720px và mobile sau khi xử lý P1/P2.
