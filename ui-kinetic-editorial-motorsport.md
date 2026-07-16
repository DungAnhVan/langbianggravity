# Phong cách UI — Kinetic Editorial Motorsport

## Phạm vi và ý đồ

Reference là một hero landing page có tinh thần **speed editorial**: phần nội dung không đặt trong card thông thường mà được biên tập như bìa tạp chí/advertorial xe hiệu năng cao. Toàn bộ bố cục tạo một đường chuyển động chéo từ người lái, qua xe, xuống vệt đỏ, trong khi các thông tin phụ được neo ở cạnh phải.

Đây là hướng phù hợp cho trang giới thiệu một sản phẩm/line chủ lực, concept vehicle, collection giới hạn hoặc launch page. Nó không phù hợp để dùng lặp lại cho toàn bộ card, listing hoặc form dày dữ liệu.

> Dùng nguyên tắc bố cục và nhịp thị giác; không sao chép logo, tên thương hiệu, wordmark hoặc asset của reference.

## Ý tưởng thị giác cốt lõi

### 1. Khoảng trắng là mặt đường

- Nền trắng gần như tuyệt đối chiếm phần lớn canvas, giúp ảnh xe và mảng đỏ có cảm giác bứt tốc.
- Negative space là một phần của layout, không phải vùng trống cần lấp đầy. Chừa khoảng thở rõ quanh title, menu và khối thông số.
- Đường viền/line dùng rất tiết chế; mọi phần tử đều có chức năng định hướng mắt.

### 2. Trục chéo biểu đạt tốc độ

- Một dải đỏ nghiêng từ trên giữa xuống đáy gần trung tâm là vector chính của bố cục.
- Rider và xe đè lên dải này; bánh xe, thân xe và góc nghiêng tạo cảm giác đang bay qua canvas.
- Trục chéo đối lập với các danh sách chữ canh đứng ở phải, tạo cân bằng giữa năng lượng và tính kỹ thuật.

### 3. Tương phản “museum clean” và “race raw”

| Lớp | Vai trò |
| --- | --- |
| Nền trắng | Gallery sạch, khoảng thở và sự cao cấp |
| Ink/đen than | Typography, ảnh xe, menu, line kỹ thuật |
| Đỏ tín hiệu | Chỉ dùng cho trục chuyển động, CTA và một vài accent |
| Ảnh grayscale | Cho cảm giác kỹ thuật/biên tập, không biến hero thành banner màu quá đà |

## Bố cục desktop

### Canvas và grid

- Hero lý tưởng tối thiểu bằng chiều cao viewport desktop (`min-height: 760px` hoặc khoảng `92–100vh`).
- Dùng grid 12 cột với padding ngoài `24–32px` desktop; nội dung không cần đều nhau mà ưu tiên cân bằng thị giác.
- Cột trái chiếm khoảng 25–29% cho wordmark, title, copy và CTA.
- Cụm visual ở giữa chiếm khoảng 42–48%; có thể phá grid một chút để bánh xe vượt ra ngoài đường cột.
- Cột phải chiếm khoảng 23–27% cho navigation, teaser video và thông số.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Logo                          rider / bike                  Menu    │
│                                                                      │
│ Display title              ╱ đỏ nghiêng ╲                    Video   │
│ Product subtitle             Visual chính                            │
│ Copy + CTA                                                        │
│                                                                      │
│ All models                                               Specs       │
└──────────────────────────────────────────────────────────────────────┘
```

### Góc trên

- Logo nhỏ, canh trái trên; cần đủ tương phản nhưng không tranh tiêu điểm với title.
- Nhóm menu text nhỏ canh phải trên, xếp dọc. Menu này tạo cảm giác catalogue hơn là nav ngang truyền thống.
- Wordmark/brand phụ canh phải đối diện menu, kích thước vừa phải.
- Không dùng header nền đặc, bóng hoặc viền card. Header phải tan vào nền canvas.

### Cụm nội dung trái

Thứ tự đọc:

1. **Display title**: tên model/collection, chiếm 2–3 dòng, uppercase, có thể italic/slanted.
2. **Subtitle**: loại sản phẩm hoặc concept; nhỏ hơn nhiều, sans trung tính.
3. **Mô tả**: 2–3 dòng, chiều rộng khoảng 28–34ch.
4. **CTA**: hình parallelogram/đường chéo đỏ, chữ uppercase và nghiêng nhẹ.
5. **Secondary link**: neo đáy trái, chỉ text + mũi tên, ví dụ `ALL MODELS ↗`.

Không đặt title trong panel màu; title cần “thở” trên nền trắng. Khu vực text trái không được che bởi bánh xe hoặc mảng visual.

### Cụm visual trung tâm

- Visual chính là cutout chất lượng cao của sản phẩm và/hoặc rider, không nằm trong khung card.
- Có tối thiểu ba lớp: dải đỏ nghiêng phía sau, xe/rider ở giữa, chi tiết bánh xe/chi tiết phụ có thể vượt ra trước.
- Xe nên cắt qua 2–3 vùng grid để tạo scale lớn; bánh trước và bánh sau không cần đều nhau.
- Ảnh black-and-white là base; các accent đỏ chỉ xuất hiện ở dải background hoặc một vài vị trí material/highlight.
- Tránh đổ shadow nặng. Nếu cần tách ảnh khỏi nền, dùng bóng rất mờ hoặc grain/texture trong mảng đỏ.

### Cột phải: nội dung thứ cấp

**Menu**

- Danh sách chữ nhỏ, line-height chặt, đọc như mục lục.
- Active state có thể là underline ngắn hoặc đổi sang đỏ; không cần chip/pill.

**Video teaser**

- Khung ngang 16:9, bắt đầu ở khoảng giữa viewport.
- Một thanh đỏ hẹp ở cạnh trái, icon play trắng, thumbnail grayscale đậm, duration ở góc phải dưới.
- Toàn bộ khung là một target click; không thêm nhiều button bên trong.

**Thông số**

- Neo đáy phải, gồm 3 hàng.
- Giá trị lớn, display italic/technical ở trái; label nhỏ ở phải.
- Mỗi hàng có một đường viền mảnh ở đáy. Dùng thông số thật như capacity, drive, output, range, weight hoặc top speed.

## Typography

### Hệ chữ hai vai trò

| Vai trò | Đặc tính |
| --- | --- |
| Display | Condensed, italic hoặc extended mang cảm giác tốc độ; uppercase; dùng cho tên model và thông số lớn |
| Utility sans | Sans trung tính, dễ đọc; dùng cho menu, subtitle, body, label và duration video |

- Display type là điểm nhấn, không dùng cho đoạn body dài.
- Title có tracking chặt/vừa và line-height khoảng `0.78–0.92` tùy font. Không bóp scale theo chiều ngang bằng CSS trừ khi font cho phép.
- Utility text nên nằm trong khoảng `12–16px` desktop, contrast cao trên nền trắng.
- Nếu chưa có display font được cấp phép, dùng fallback sans italic/oblique rõ ràng thay vì mô phỏng nguyên wordmark reference.

## Màu và vật liệu

```css
--canvas: #f8f8f6;
--ink: #171717;
--signal-red: #ef1c25;
--muted-ink: #5a5a58;
--rule: rgba(23, 23, 23, 0.16);
--white: #ffffff;
```

- Đỏ chỉ chiếm khoảng 8–15% diện tích nhìn thấy. Khi đỏ quá nhiều, layout mất cảm giác editorial.
- Dải đỏ có thể dùng gradient nhẹ hoặc texture/grain rất tinh tế; không dùng glow neon hoặc gradient cầu vồng.
- Ảnh grayscale có contrast cao, nhưng vẫn giữ chi tiết bánh xe, carbon, vải và kim loại.
- Giữ độ tương phản văn bản tối thiểu WCAG AA; đỏ không dùng làm tín hiệu duy nhất cho state.

## Motion và interaction

### Motion khi vào trang

1. Dải đỏ xuất hiện bằng `clip-path` hoặc translate dọc trong 350–500ms.
2. Visual xe/rider fade + translate nhẹ (12–24px), không xoay liên tục.
3. Title xuất hiện theo dòng hoặc mask reveal ngắn.
4. Menu, video, specs fade in sau visual 80–140ms.

Motion tổng thể phải kết thúc trong dưới 700ms và không được làm chậm việc đọc title/CTA.

### Tương tác

- CTA có skew đỏ; hover chỉ dịch ngang 4–6px hoặc tăng contrast, không phóng to mạnh.
- Link `All models` underline animate theo chiều ngang.
- Video teaser hover tăng sáng thumbnail nhẹ và icon play đổi trạng thái; click mở modal/video có control rõ ràng.
- Menu anchor scroll tới section phù hợp nếu trang có nội dung sau hero; nếu hero là trang đơn, dùng route/navigation thật.
- Tôn trọng `prefers-reduced-motion`: bỏ reveal/translate, giữ state hover tức thời.

## Responsive

### Tablet (768–1024px)

- Giữ hero như một câu chuyện duy nhất nhưng hạ visual xuống dưới title nếu có nguy cơ che copy.
- Menu dọc có thể chuyển thành menu ngang gọn hoặc ẩn trong menu chính.
- Video teaser và specs thành hai cột ở cuối hero, vẫn có separator mảnh.
- Giảm scale visual trước khi giảm cỡ chữ title quá mạnh.

### Mobile (<768px)

Ưu tiên thứ tự:

1. Header/logo và menu trigger.
2. Title, subtitle, copy và CTA.
3. Visual xe/cutout, dải đỏ nằm phía sau nhưng không che text.
4. Specs dạng list 1 cột.
5. Video teaser full width.
6. Link secondary.

- Chuyển composition sang normal document flow; không giữ nhiều `position: absolute` khiến rider/xe đè chữ.
- H1 dùng `clamp()` và giới hạn số dòng theo nội dung, không dùng font-size cố định.
- Dải đỏ được crop trong hero, không tạo horizontal overflow.
- Mọi tap target tối thiểu 44 × 44px.
- Giữ một visual hero rõ ràng, không cố tái hiện chính xác overlap desktop trên màn hẹp.

## Accessibility

- Cutout sản phẩm cần alt mô tả ý nghĩa; texture/dải đỏ trang trí dùng `aria-hidden="true"`.
- Video teaser là một link/button có accessible name, ví dụ `Watch Electra concept film, 2 minutes 33 seconds`.
- Specs dùng `dl` hoặc table semantic; không chỉ đặt text tự do.
- Nav menu có landmark và focus style rõ. Không loại bỏ outline mà không có focus thay thế.
- CTA đỏ phải đủ contrast; đảm bảo hover/focus/pressed đều đọc được bằng keyboard.
- Không dùng animation lặp vô hạn hoặc nội dung nhấp nháy.

## Công thức triển khai đề xuất

```html
<section class="kinetic-hero">
  <header class="kinetic-hero__topbar">…</header>
  <div class="kinetic-hero__copy">…</div>
  <div class="kinetic-hero__visual" aria-hidden="true">
    <div class="kinetic-hero__slash"></div>
    <img class="kinetic-hero__rider" alt="" />
    <img class="kinetic-hero__product" alt="Product in motion" />
  </div>
  <aside class="kinetic-hero__aside">
    <nav>…</nav>
    <a class="kinetic-hero__video">…</a>
    <dl class="kinetic-hero__specs">…</dl>
  </aside>
</section>
```

CSS cần ưu tiên Grid cho layout chính và chỉ dùng absolute cho các lớp visual trong `.kinetic-hero__visual`. Không đặt toàn bộ hero bằng pixel absolute, vì sẽ hỏng ở breakpoint trung bình.

## Guardrails

- Không copy wordmark, shape chữ, logo, asset xe/rider hay brand reference.
- Không dùng quá ba kiểu animation trong một hero.
- Không biến mọi block thành skew đỏ; accent đỏ chỉ có hiệu lực khi hiếm.
- Không dùng card bo góc, glassmorphism, drop shadow dày hoặc gradients nhiều màu; chúng phá tinh thần editorial/industrial.
- Không để visual che title, CTA, focus ring hoặc thông tin specs ở bất kỳ breakpoint nào.
- Không thay data kỹ thuật thật bằng số marketing nếu trang hướng tới buyer/technical audience.

## Checklist nghiệm thu

- [ ] Title, copy và CTA đọc rõ trước khi người xem chạm vào bất kỳ control nào.
- [ ] Trục chéo đỏ dẫn mắt qua visual nhưng không che chữ.
- [ ] Hero có đủ negative space, không biến thành collage kín toàn bộ màn hình.
- [ ] Desktop: visual vượt grid có chủ đích nhưng không gây horizontal scroll.
- [ ] Mobile: visual không overlap text; mọi phần tử theo document flow hợp lý.
- [ ] Video teaser, nav, CTA và link secondary có keyboard focus rõ.
- [ ] Specs có semantic structure và dùng dữ liệu thực.
- [ ] Reduced motion vẫn cho phép hiểu cấu trúc và thao tác đầy đủ.
- [ ] Không có yếu tố nhận diện, asset hoặc wordmark sao chép từ reference.
