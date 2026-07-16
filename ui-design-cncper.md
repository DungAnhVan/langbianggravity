# UI Design — CNC Performance

## 1. Mục tiêu thiết kế

Trang `/products/cnc-performance/` giới thiệu chương trình CNC theo hướng **technical editorial / container workshop**:

- Cảm giác công nghiệp, chính xác và có khả năng sản xuất theo model, sample hoặc batch.
- Hero không phải một card catalog thẳng hàng; các block được xếp như cụm container trong xưởng: lệch trục, cao thấp riêng nhưng luôn có khoảng hở rõ ràng.
- Blue là màu chủ đạo. Lime chỉ là điểm nhận diện kỹ thuật nhỏ; nền đen giữ vai trò không gian xưởng.
- Nội dung dẫn người xem đến hai hành động chính: gửi yêu cầu fitment hoặc trao đổi batch CNC.

## 2. Nguồn triển khai

| Hạng mục | File nguồn |
| --- | --- |
| Markup trang | `products/cnc-performance/index.html` |
| Theme, layout và responsive | `styles.css` |
| Điều hướng Product mega menu | `products-data.js` |
| Ảnh hero CNC | `assets/images/cnc-inspection.webp` |
| Thư mục để thêm asset CNC mới | `assets/products/cnc-performance/` |

`body` của trang dùng class `cnc-performance-page`. Toàn bộ override màu của trang phải được scope dưới class này hoặc `.product-line-hero-cnc`, để không ảnh hưởng các product line khác.

## 3. Hệ màu CNC

| Token | Giá trị | Vai trò |
| --- | --- | --- |
| `--cnc-ink` | `#090b0a` | Nền chính, header và chữ tối trên block màu |
| `--cnc-paper` | `#f1f0e8` | Dải facts sáng bên dưới hero |
| `--cnc-blue` | `#1687ff` | Blue chủ đạo: headline accent, CTA primary, link accent |
| `--cnc-blue-light` | `#6cc8ff` | Blue sáng của block `Core program` để phân biệt với block context |
| `--cnc-acid` | `#c5ff32` | Accent kỹ thuật: eyebrow, caption, material ring |
| `--cnc-rule` | `rgba(255, 255, 255, 0.17)` | Border/rule trên nền tối |

Gradient context dùng dải blue `#2493ff → #1687ff → #0a4d9e`. Không quay lại dùng orange/red làm màu chủ đạo trên CNC. CTA primary phải dùng `--cnc-blue`; hover chuyển sang `#55a9ff`.

## 4. Hero: cấu trúc container 3 tầng

Hero nằm trong `.cnc-bento`, sử dụng grid 12 cột và 3 hàng. Bản desktop không có khung bao ngoài: mỗi block là một container độc lập có border trắng mờ và shadow đen. Khoảng hở lớn, offset dương và transform nhẹ tạo cảm giác lắp ghép thủ công có kiểm soát.

```text
HÀNG 1
┌──────── Headline (cột 1–7) ────────┐
                   ┌──── Context / CNC 001 (cột 8–12) ────┐

HÀNG 2
      ┌── Metric / 3 (cột 2–5) ──┐
                          ┌── Media / inspection (cột 6–9) ──┐

HÀNG 3
┌── Material / finish (cột 1–5) ──┐
                              ┌── Content + CTA (cột 6–12) ──┐
```

### Quy tắc bất quy tắc

- Headline: lệch nhẹ xuống, xoay `-0.25deg`.
- Context: lệch xuống và sang phải, xoay `0.45deg`.
- Metric: bắt đầu từ cột 2, lệch xuống, xoay `-0.55deg`.
- Media: lệch xuống và sang phải trong hàng 2, xoay `0.55deg`.
- Material: lệch xuống nhẹ ở hàng 3, xoay `0.35deg`.
- Content: lệch xuống và sang phải ở hàng 3, xoay `-0.3deg`.

Không cân thẳng mép trái/phải giữa các block. Tuy vậy, block vẫn theo grid 12 cột để giữ nhịp, và không được dùng margin âm hoặc overlap giữa các container.

## 5. Thành phần hero

### Headline — `.cnc-bento-headline`

- Eyebrow: `01 / CNC Performance`, lime acid, mono-style, uppercase.
- H1: `Made to fit. / Built to run.`; phần thứ hai dùng blue chủ đạo.
- Copy ngắn giải thích sản phẩm CNC được phát triển quanh xe, sample và yêu cầu thực tế.
- Nền graphite với glow blue nhẹ ở góc.

### Context — `.cnc-bento-context`

- Nội dung: `Product line`, `CNC / 001`, `Models · batches · finish`.
- Gradient blue đậm; text đen để tạo block nhận diện mạnh.
- Đây là blue đậm chính của hero.

### Metric — `.cnc-bento-metric`

- Nội dung: `Core program / 3 / cover formats ready for fitment`.
- Nền blue sáng `--cnc-blue-light`, text `--cnc-ink`.
- Số `3` lớn, tạo một mảng đồ họa hơn là bảng dữ liệu.
- Không dùng lime làm nền cho block này.

### Media — `.cnc-bento-media`

- Ảnh: `/assets/images/cnc-inspection.webp`.
- Overlay đen ở đáy để caption luôn đọc được.
- Caption mono: `Inspection desk` và `Billet / CNC / Fitment`; từ khóa thứ hai dùng lime.
- Hover desktop chỉ zoom ảnh rất nhẹ (`scale(1.03)`).

### Content — `.cnc-bento-content`

- Eyebrow: `Engineered around fitment`.
- H2: `Fitment is the starting point.`
- Nội dung tập trung vào model, cover profile, bolt pattern, sealing surface và finish.
- CTA chính: `Start a Fitment Request` → `/contact/#contact`.
- CTA phụ: `Custom CNC Batch` → `/b2b/`.
- Nền graphite. CTA primary blue; CTA secondary là outline sáng và hover sang lime.

### Material — `.cnc-bento-material`

- Block trang trí, `aria-hidden="true"`.
- Nền stripe kim loại tối, label `Material / finish`, số `7075` và `6061`.
- Ring kim loại dùng viền lime để tạo chi tiết workshop.

## 6. Background, header và chiều sâu

- Hero background là `--cnc-ink` có grid 92px, diagonal rule mờ và radial glow blue tại phía phải.
- Header của CNC dùng dark translucent background và blur giống Home.
- Shadow của từng container là đen mềm; không dùng khung lớn bao toàn bộ hero.
- Mục tiêu là tạo chiều sâu như các khối container đặt trên nền xưởng, không phải một dashboard phẳng.

## 7. Phần sau hero

### Fact strip

- Nền `--cnc-paper`, chữ đen, border đen mờ.
- Các fact: Clutch Cover, Water Pump Cover, Engine Side Cover, Billet Aluminum, Model fitment, Price on request.
- Ba product type đầu dùng blue chủ đạo.
- Trình bày dạng rail ngang có các vạch dọc, không dùng card bo tròn.

### Conversion section

- Nền tối, rule trên màu trắng mờ.
- Heading: `Request CNC fitment.`
- Copy hướng người dùng gửi model, sample, drawing và finish.
- Link inline đến B2B dùng lime; hover blue.
- CTA: `Request Fitment` và `All Product Lines`.

### Nội dung đã loại bỏ

Không đưa lại `Sample SKU search`, form Brand/Model/Year/Type hoặc ba card SKU mẫu vào trang CNC. Luồng hiện tại là request fitment trực tiếp thay vì tìm SKU mẫu.

## 8. Responsive

### Desktop: trên 900px

- Giữ grid 12 cột, 3 hàng và các transform/margin lệch.
- Đây là trải nghiệm container-house chủ đạo.

### Tablet: 621px–900px

- Chuyển thành grid 2 cột.
- Gỡ margin âm và transform để tránh chồng chữ/ảnh.
- Headline và media/content chạy full hai cột; context và metric đứng cạnh nhau.
- Material ẩn để ưu tiên thông tin và CTA.

### Mobile: 620px trở xuống

- Một cột, các block xếp tuần tự với gap 14px.
- Mỗi block vẫn giữ border riêng; không tạo outer card.
- Headline và content padding `30px 24px`.
- Context tối thiểu 142px; metric tối thiểu 210px; media cao 280px.
- H1 giảm theo viewport; H2 content ở mức 3.2rem để còn lực thị giác nhưng không tràn.

## 9. Nguyên tắc khi chỉnh tiếp

1. Giữ blue là màu chính của CNC. Lime chỉ là accent, không dùng làm mảng nền lớn.
2. Không căn mọi block vào một trục dọc; giữ cảm giác lệch có chủ đích trên desktop, nhưng luôn chừa khoảng hở giữa các block.
3. Mỗi block hero cần có border/shadow riêng. Không khôi phục outer container kín.
4. Nếu thêm block mới, đặt vào một trong ba tầng với offset riêng; không biến hero thành lưới card đồng đều.
5. Nếu thay ảnh CNC, ưu tiên asset tại `assets/products/cnc-performance/`; cập nhật `alt` text theo đúng sản phẩm hiển thị.
6. Khi đổi CTA hoặc section, kiểm tra các link `#...` để không tạo anchor hỏng.
7. Luôn kiểm tra desktop và mobile sau khi thay đổi layout/transform.

## 10. Checklist QA

- [ ] Blue `#1687ff` là màu CTA/context/headline accent.
- [ ] Metric dùng blue sáng, không lime.
- [ ] Desktop có đúng ba tầng, block lệch trục và không chồng lấn.
- [ ] Media caption đọc rõ trên overlay.
- [ ] CTA primary và secondary dẫn đúng `/contact/#contact` và `/b2b/`.
- [ ] Không còn form hoặc card Sample SKU.
- [ ] Tablet/mobile không còn rotation hoặc margin gây overlap.
- [ ] Không có lỗi console sau khi reload trang.
