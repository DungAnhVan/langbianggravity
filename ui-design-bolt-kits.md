# Bolt Kits — Neo-Swiss Editorial UI

Tài liệu này là source-of-truth cho giao diện `/products/bolt-kits/`. Khi tiếp tục thiết kế hoặc refactor, ưu tiên các nguyên tắc trong file này và đối chiếu thêm `ui-design-neo-swiss-editorial.md` cho ngôn ngữ thiết kế tổng quát.

## 1. Trạng thái hiện tại

- Hướng thiết kế: Neo-Swiss editorial, kỹ thuật, tối giản và có nhịp điệu rõ.
- Tone màu: titanium trắng xám lấy từ banner Bolt Kits trên Home, không lấy palette tổng quát của toàn bộ Home.
- Hero dùng ảnh sản phẩm thật, đặt trực tiếp trên nền titanium; không có card, ô viền hoặc nền xanh.
- Trang đã có motion mở trang và scroll reveal.
- Asset Fusion hoàn chỉnh chưa có; thư mục asset đã được chuẩn bị để thay thế sau.

## 2. File liên quan

- `products/bolt-kits/index.html`: cấu trúc và nội dung trang.
- `styles.css`: toàn bộ style Bolt Kits; block override cuối cùng mang palette titanium là giá trị hiệu lực.
- `script.js`: observer reveal dùng chung, fitment search, quote drawer và product dialog.
- `assets/products/bolt-kits/`: asset hiện tại và nơi nhận export từ Fusion.
- `assets/products/bolt-kits/README.md`: quy ước tên file asset.
- `assets/products/bolt-kits/bolt-kit-hero.png`: ảnh hero hiện tại.
- `ui-design-neo-swiss-editorial.md`: nguyên tắc Neo-Swiss dùng chung.

## 3. Design tokens

```css
--bolt-paper: #e1e5e2;
--bolt-surface: #f3f5f3;
--bolt-ink: #111512;
--bolt-muted: #59645f;
--bolt-rule: rgba(17, 21, 18, 0.24);
--bolt-signal: #8c9992;
```

Vai trò màu:

- `paper`: nền titanium chính của hero và phần lớn trang.
- `surface`: vùng sáng hơn để phân lớp nhẹ mà không tạo cảm giác card UI.
- `ink`: chữ, nút và vùng graphite tương phản cao.
- `muted`: body copy và metadata phụ.
- `rule`: đường kẻ cấu trúc của grid editorial.
- `signal`: outro hoặc mảng nhấn titanium đậm.

Không dùng màu xanh làm nền hero. Tránh gradient trang trí, shadow nặng và màu accent không liên quan đến vật liệu titanium.

## 4. Typography

- Font chính: Inter/system grotesk.
- Headline: sans-serif lớn, nét gọn, line-height chặt, ưu tiên xuống dòng có chủ đích.
- Body: kích thước vừa phải, độ tương phản dịu hơn headline.
- Eyebrow, metadata và index: uppercase, tracking rộng, kích thước nhỏ.
- Không dùng nhiều weight hoặc style trang trí; phân cấp bằng scale, khoảng trắng và vị trí.

## 5. Cấu trúc trang

### Hero / Section 01

Desktop dùng ba vùng:

1. Rail kỹ thuật bên trái.
2. Khối copy và CTA ở giữa.
3. Product visual bên phải.

Hero phải hiển thị section index `01` theo cùng scale lớn và cùng trục dọc bên trái với các section number `02–05`; nhóm nhãn kỹ thuật `LG / 06` và `OFF-ROAD HARDWARE` nằm phía cuối rail.

Ảnh sản phẩm phải nổi trực tiếp trên nền `--bolt-paper`. `.bolt-asset-grid` đang được ẩn; ảnh dùng `mix-blend-mode: multiply`, không có box, border hoặc drop shadow. Figcaption giữ vai trò technical label, không phải card caption.

Hàng metadata dưới hero dùng đường kẻ và các cột ngắn để kết thúc composition.

### Section 02 — Product system

- Giới thiệu cấu trúc bộ kit.
- Tiếp tục nhịp số mục lớn, heading và rule của editorial system.
- Nội dung ưu tiên tính kỹ thuật, không biến thành marketing cards.

### Section 03 — Specification

- Desktop: 4 ô thông số trên cùng một hàng.
- Tablet: 2 cột.
- Mobile: 1 cột.
- Phân tách bằng rule, không dùng card nổi.

### Section 04 — Protocol

- Nền graphite đậm để tạo nhịp tương phản.
- Checklist 4 mục; desktop/tablet có thể chia 2 cột, mobile 1 cột.
- Note kỹ thuật xuất hiện từ cạnh phải khi reveal.

### Section 05 — Finder

- Nền sáng, form fitment là chức năng chính.
- Giữ nguyên `data-fitment-search` và `data-product-line="bolt-kits"`.
- Kết quả, trạng thái rỗng và CTA quote phải tiếp tục dùng logic chung trong `script.js`.
- Fitment result card dùng nền sáng: giá, text và `View Details` dùng `--bolt-ink`; `Add to Quote` dùng nền `--bolt-ink` với chữ `--bolt-paper`.
- Empty state cũng phải dùng text tối và button có tương phản rõ trên nền sáng.

### Outro và footer

- Outro dùng `--bolt-signal` để kết thúc trang bằng một mảng titanium đậm.
- Footer quay về nền sáng và giữ cấu trúc navigation chung của site.

## 6. Asset direction

Ảnh hiện tại:

```text
/assets/products/bolt-kits/bolt-kit-hero.png
```

Khi có asset Fusion:

- Ưu tiên PNG/WebP nền trong suốt hoặc nền neutral dễ hòa vào `--bolt-paper`.
- Giữ product scale và góc nhìn phù hợp với khoảng trống bên phải hero.
- Không đóng sẵn khung, shadow hoặc màu nền vào file nếu không thật sự cần.
- Có thể thay bằng `bolt-kit-hero.webp` sau khi kiểm tra chất lượng và dung lượng.
- Asset detail bổ sung phải theo quy ước trong `assets/products/bolt-kits/README.md`.

## 7. Motion system

Motion phải có cảm giác chính xác, cơ khí và editorial; không bounce, không elastic và không parallax quá mạnh.

### Hero entrance

- Rail đi vào nhẹ từ trái.
- Eyebrow, headline, body và CTA đi lên theo stagger.
- Product visual fade/translate vào sau copy, rồi chuyển sang floating rất nhẹ.
- Figcaption và hàng metadata xuất hiện cuối nhịp hero.
- Easing chính: `cubic-bezier(0.22, 1, 0.36, 1)`.

Keyframes hiện có:

- `boltHeroEnter`
- `boltRailEnter`
- `boltAssetEnter`
- `boltAssetFloat`

### Scroll reveal

Markup dùng:

```html
data-reveal
data-bolt-motion="grid|side|line"
data-bolt-delay="1|2|3|4"
```

Quy ước:

- Mặc định: fade + translate nhẹ từ dưới.
- `grid`: đi ngang nhẹ từ trái, phù hợp section grid.
- `side`: đi ngang nhẹ từ phải, phù hợp note phụ.
- `line`: fade nhẹ và kéo rule theo trục X.
- Delay dùng để tạo stagger ngắn giữa các cell; không kéo dài khiến người dùng phải chờ nội dung.
- Heading rule được draw từ trái sang phải khi section trở thành visible.

Không thêm thư viện motion mới. Tiếp tục dùng observer `[data-reveal]` đã có trong `script.js`.

### Accessibility và fallback

- `prefers-reduced-motion: reduce` phải tắt animation/transition và hiển thị nội dung ngay.
- Khi JavaScript không chạy, nội dung và heading rule vẫn phải hiện.
- Motion không được chặn click, focus, fitment result hoặc quote flow.

## 8. Responsive

### Desktop — từ khoảng 1020px

- Hero đủ ba vùng: rail, copy, visual.
- Specs 4 cột.
- Finder form dùng layout ngang nhiều cột.

### Tablet — 620px đến dưới 1020px

- Giảm độ rộng rail và khoảng cách grid.
- Specs 2 cột.
- Finder form chuyển về 2 cột khi cần.

### Mobile — dưới 620px

- Bỏ rail.
- Hero thành một cột, copy trước và visual sau.
- Ảnh giới hạn khoảng 390px và luôn nằm trong viewport.
- CTA có thể full width.
- Specs, checklist và finder form về 1 cột.
- Heading không được tràn ngang; metadata có thể wrap theo hàng.

## 9. Functional contracts

Không thay đổi hoặc xóa các hook sau khi chỉnh UI:

- `data-fitment-search`
- `data-product-line="bolt-kits"`
- Các hook của quote drawer và product dialog dùng chung.
- `data-reveal` và class `.is-visible` của reveal observer.

Mọi thay đổi asset phải giữ `alt` mô tả sản phẩm. CTA và field form phải có focus state rõ ràng.

## 10. Do / Don't

Do:

- Dùng grid, rule, index và khoảng trắng để tạo nhịp.
- Giữ palette titanium trắng xám nhất quán với banner Bolt Kits trên Home.
- Cho ảnh sản phẩm hòa trực tiếp vào nền.
- Dùng motion ngắn, stagger có kiểm soát và chuyển động nhỏ.

Don't:

- Không đưa lại ô/card bao quanh ảnh hero.
- Không đổi hero sang xanh hoặc palette unrelated.
- Không thêm glassmorphism, gradient bóng, shadow dày hoặc bo góc kiểu app dashboard.
- Không dùng animation liên tục mạnh làm mất cảm giác sản phẩm kỹ thuật.
- Không sửa logic fitment/quote chỉ để phục vụ layout.

## 11. Checklist trước khi bàn giao

- [ ] Hero có cùng tone titanium với Bolt Kits banner trên Home.
- [ ] Ảnh hero không có ô nền, viền hoặc shadow ngoài ý muốn.
- [ ] Entrance motion chạy đúng thứ tự và scroll reveal chỉ chạy khi section vào viewport.
- [ ] Reduced-motion hiển thị toàn bộ nội dung ngay.
- [ ] Desktop, tablet và mobile không tràn ngang.
- [ ] Specs, checklist và finder chuyển cột đúng breakpoint.
- [ ] Fitment search trả kết quả và quote flow vẫn hoạt động.
- [ ] Console không có lỗi.
- [ ] Asset path, `alt` và technical caption đúng.
- [ ] Kiểm tra `git diff --check` và `git status --short`.
