# UI Design — Sprocket / Kinetic Editorial Motorsport

## 1. Mục tiêu

Thiết kế lại hoàn toàn route `/products/sprockets/` theo hướng kinetic editorial motorsport. Trang cũ không còn là nền tảng bố cục; audit cũ không được dùng làm checklist triển khai.

Ngôn ngữ chính:

- Editorial grid rộng, đường kẻ kỹ thuật và khoảng trắng có chủ ý.
- Typography condensed, viết hoa, tương phản kích thước mạnh.
- Nền off-white, mực đen và một màu đỏ race làm tín hiệu hành động.
- Hình sprocket là tâm thị giác; UI phụ đóng vai trò dữ liệu kỹ thuật.
- Không dùng hệ card bo tròn và panel tối của thiết kế cũ.

## 2. Route và file triển khai

- Trang: `products/sprockets/index.html`
- Style dùng chung: `styles.css`
- Visual và video: `assets/products/sprocket-editorial/`
- Video generator: `tools/generate-sprocket-video.py`

Route này không có root `.html` fallback cần đồng bộ.

## 3. Asset contract

### Visual trung tâm và nguồn Fusion

Nguồn chính thức là ba bản vẽ Fusion:

- `LBG_R_Mark_I.pdf` = Langbiang Gravity / Rear / Mark I.
- `LBG_R_Mark_II.pdf.pdf` = Langbiang Gravity / Rear / Mark II.
- `LBG_R_Mark_III.pdf` = Langbiang Gravity / Rear / Mark III.

Từ PDF, asset render/crop/tách nền trong suốt dùng trong UI là:

- `lbg-r-mark-i.webp`
- `lbg-r-mark-ii.webp`
- `lbg-r-mark-iii.webp`

Hero và video hiện lấy Mark III, chính diện không nghiêng; showcase hiển thị đủ cả ba phiên bản. `fusion-sprocket.webp` chỉ còn là placeholder legacy từ vòng dựng trước. Hero chỉ render nét design trên alpha trong suốt, không có nền trắng, không có circular backing; vạch đỏ nằm phía sau và nhìn xuyên qua các khoảng rỗng của bản vẽ.

Khi có bản Fusion cập nhật:

- Ghi đè PDF Mark tương ứng và giữ nguyên tên file.
- Render lại PNG, chạy `tools/extract-sprocket-showcase.py` để crop WebP.
- Nền giấy trắng được tách thành alpha trong bước crop WebP.
- Không bake nền, logo, chữ, glow hoặc shadow vào bản vẽ.

### Video teaser

Tên file: `assets/products/sprocket-editorial/sprocket-motion-15s.mp4`

Thông số hiện tại:

- H.264 / yuv420p.
- 1280 × 720, 24 fps.
- Thời lượng đúng 15 giây.
- Autoplay, muted, loop, playsinline.
- Chuyển động: zoom/pan nhẹ, không tilt, orbit kỹ thuật, nhát đỏ, scan line.

Sau khi thay visual Fusion, chạy lại generator để video lấy đúng Mark III mới.

## 4. Cấu trúc trải nghiệm

### Hero — Race Sprocket System

Hero dùng grid ba vùng:

1. Cột trái: kicker, headline condensed, mô tả ngắn và CTA.
2. Trung tâm: nét Fusion sprocket trên alpha trong suốt, vòng orbit và nhát cắt đỏ ở phía sau.
3. Cột phải: mục lục trang, video teaser 15 giây và ba thông số nhanh.

Headline có ba nhịp `Race / Sprocket / System`; chữ `System` nghiêng màu đỏ để tạo cảm giác tốc độ. Trên tablet, vùng thông tin phải chuyển thành một hàng bên dưới. Trên mobile, mọi vùng xếp dọc.

### Materials — Material follows load

Hai vật liệu được trình bày như hai spread editorial cân bằng:

- RS Racing Steel / 42CrMo4: endurance, hard service, mud và training volume.
- RA Racing Aluminium / 7075-T6: race response và reduced rotating mass.

Ảnh là khối lớn grayscale; màu đỏ chỉ xuất hiện ở caption và tín hiệu nhấn. Thông số nằm trong các hàng tuyến tính, không dùng card.

### Fusion drawing showcase — Three marks / one rear system

Ngay sau hero là showcase ba bản vẽ rear sprocket. Mỗi figure ghi rõ Mark và tên showcase tương ứng: TrussX, Hive, Voron. Mark II được xử lý trên nền tối để tạo nhịp tương phản giữa ba bản vẽ linework.

### Fitment Logic — Geometry decides fit

Section nền đen tạo điểm gãy nhịp. Một nhát đỏ xuyên qua nền và ba bước kiểm tra được xếp thành sequence:

1. Chain platform / 520 pitch.
2. Mechanical interface / countershaft, hub, bolt circle, center bore, clearance.
3. Bike application / make, model, year, model type.

Ticker đỏ cuối section liệt kê Honda CRF, Yamaha YZ, Kawasaki KX, KTM SX-F và Suzuki RM-Z.

### Finder — Bike in. Fitment out.

Form giữ action hiện có sang app `sprocket.langbianggravity.com/finder`. Bốn input gồm make, model, year và model type. CTA màu đỏ chiếm trọn chiều rộng form.

Ba đường dẫn phụ:

- Cross-reference OEM code.
- Dealer / OEM batch supply.
- Motocross gearing guide.

### Field Notes và Outro

FAQ được giữ để khớp nội dung dữ liệu có cấu trúc FAQPage, nhưng được đổi sang accordion tuyến tính. Outro là một dải đỏ toàn chiều rộng với CTA lớn quay lại finder.

## 5. Hệ màu và typography

- Canvas: `#f8f8f6`
- Ink: `#171717`
- Race red: `#ef1c25`
- Muted copy: `#5a5a58`
- Rule: `rgba(23, 23, 23, 0.16)`

Display typography dùng stack condensed hệ thống: Impact, Haettenschweiler, Arial Narrow. Body và control tiếp tục dùng font stack chung của site để không phát sinh request font ngoài.

## 6. Motion và accessibility

- Hero visual và nhát đỏ có entrance motion ngắn.
- Material image chỉ scale nhẹ khi hover.
- Video không có âm thanh và không chiếm focus.
- `prefers-reduced-motion: reduce` tắt entrance animation của hero.
- Heading, landmark, label form và link navigation có semantic HTML đầy đủ.
- Màu chữ và control giữ tương phản cao trên nền sáng, nền đen và nền đỏ.

## 7. Responsive behavior

- Desktop: hero ba cột; materials hai cột; finder split intro/form.
- Tablet: hero hai cột và aside thành hàng ngang; section chính giảm còn một hoặc hai cột.
- Mobile: tất cả xếp dọc; ticker có thể cuộn ngang; form một cột; CTA và target tương tác đủ lớn.

## 8. Checklist khi nhận asset Fusion chính thức

1. Ghi đè đúng PDF Mark tương ứng.
2. Render/crop lại ba WebP bằng `tools/extract-sprocket-showcase.py`.
3. Chạy lại `tools/generate-sprocket-video.py` để tạo MP4 mới từ Mark III.
4. Kiểm tra crop của visual tại desktop 1440 px và mobile 390 px.
5. Kiểm tra video autoplay muted và loop trên trình duyệt thật.
