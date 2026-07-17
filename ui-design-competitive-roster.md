# UI Design Analysis — Competitive Roster

## Tên phong cách

**Competitive roster poster** là hệ UI/visual dành cho team lineup, nhân vật, đội đua hoặc catalogue cạnh tranh. Nó kết hợp ảnh chủ thể cắt nền, typography display mạnh, mảng màu nhận diện và các module lặp để người xem nhận ra từng đối tượng trong vài giây.

Hai biến thể trong mẫu tham khảo:

1. **Esports neo-brutalist character roster** — đỏ/đen/trắng, halftone, khung dọc, cảm giác comic/cyberpunk.
2. **Motorsport color-block team lineup** — các cột màu theo đội, ảnh xe, grid sạch hơn, tinh thần broadcast thể thao.

## Ý tưởng chung

Thông tin được tổ chức như poster thi đấu, không phải danh sách sản phẩm thông thường. Người xem quét theo thứ tự: **màu đội/nhân vật → ảnh chủ thể → tên → trạng thái hoặc nhóm**. Các card lặp lại tạo cảm giác roster, nhưng mỗi cột/hàng vẫn có nhận diện riêng.

```text
Tên sự kiện / giới thiệu ngắn

┌─────────┬─────────┬─────────┬─────────┐
│ Team A  │ Team B  │ Team C  │ Team D  │  ← màu nhận diện
│ subject │ subject │ subject │ subject │  ← nhân vật/xe cut-out
│ NAME    │ NAME    │ NAME    │ NAME    │  ← display label
└─────────┴─────────┴─────────┴─────────┘
```

## Phân cấp thị giác

1. **Màu cột/card:** cho phép nhận diện team hoặc class trước khi đọc.
2. **Chủ thể:** nhân vật, xe hoặc sản phẩm là bằng chứng trực quan của dữ liệu.
3. **Tên:** in hoa, condensed, kích thước lớn; là nhãn chính của từng module.
4. **Tiêu đề section:** dùng display type rất lớn, thường bị crop có chủ ý ở mép khung.
5. **Meta:** hashtag, logo, số, role, tab hoặc trạng thái xuất hiện ở cỡ nhỏ.
6. **Texture:** halftone, diagonal speed lines, outline kỹ thuật chỉ làm nền năng lượng.

Mỗi card chỉ nên có một thông điệp lớn nhất: tên team/nhân vật hoặc chỉ số. Không đưa mô tả dài, nhiều CTA và nhiều badge ngang cấp vào cùng module.

## Biến thể 1 — Esports Neo-Brutalist Character Roster

### Đặc điểm

- Palette **đỏ signal + đen + trắng** có độ tương phản cực cao.
- Text display condensed, in hoa, mang tính poster/cover art.
- Character art được crop dọc trong khung hẹp, có xu hướng lấn mép và vượt grid.
- Nền trắng có halftone/grain đen; chữ outline cỡ khổng lồ bị che một phần phía sau card.
- Những mảng đỏ dày tạo nhịp xen kẽ; rìa thô và texture khiến giao diện có độ “combat”.

### Cảm xúc

Năng lượng cao, ngông, trẻ, game/esports, comic sci-fi. Đây là visual phù hợp để ra mắt skin, squad, tournament hoặc character class hơn là để trình bày dữ liệu cần đọc lâu.

### Quy tắc triển khai

- Giữ 1 accent chính là đỏ; không thêm neon xanh/tím/vàng cùng lúc.
- Chủ thể cần PNG/WebP trong suốt hoặc mask tốt, với ánh sáng nhất quán.
- Halftone dùng opacity thấp và đặt sau nội dung; không đặt trực tiếp dưới text nhỏ.
- Nếu chữ outline nằm sau chủ thể, nó là decorative layer với `aria-hidden`, không phải heading duy nhất.
- Không dùng border radius mềm; góc vuông hoặc bo rất nhẹ hợp tinh thần hơn.

## Biến thể 2 — Motorsport Color-Block Team Lineup

### Đặc điểm

- Một cột/một card là một team: mỗi team có màu đại diện riêng.
- Xe nhìn từ trên xuống tạo sự đồng nhất về góc nhìn và tỷ lệ.
- Nền màu có diagonal stripe/speed line tone-on-tone để gợi chuyển động.
- Intro section nền đen, chữ trắng; lineup màu xuất hiện như một dải dữ liệu trực quan.
- Team name nằm đầu cột, vehicle/driver name ở dưới; cấu trúc rất dễ quét.

### Cảm xúc

Chính xác, thể thao, có tính broadcast và tin cậy hơn biến thể esports. Nó phù hợp với race lineup, team directory, bảng kết quả, catalogue xe/parts hiệu năng cao.

### Quy tắc triển khai

- Màu phải xuất phát từ team/brand token thực, không chỉ để làm đẹp.
- Tất cả vehicle image dùng cùng camera angle, scale và shadow.
- Với màu nền sáng, tự động đổi ink sang đen; với nền tối, dùng trắng và kiểm tra contrast.
- Không để logo đội thay thế tên team; logo chỉ là dấu xác nhận.
- Có thể dùng card click-through mở team detail, nhưng giữ mọi cột cùng cấu trúc.

## Typography

- **Display:** font sans-serif condensed hoặc grotesk đậm, ví dụ Anton, Archivo Narrow/Black, Bebas Neue, Druk Condensed hoặc một font brand tương đương.
- **Labels:** uppercase, line-height chặt, tracking vừa phải. Tên ngắn nên có thể đọc từ xa.
- **Metadata:** sans-serif trung tính hoặc mono font cho mã, role, hashtag và số thứ tự.
- **Tương phản:** dùng size/weight trước, sau đó mới dùng màu. Đừng làm tất cả text bold.

## Màu sắc và texture

| Thành phần | Esports neo-brutalist | Motorsport color-block |
| --- | --- | --- |
| Base | Trắng/đen tương phản mạnh | Đen/charcoal ở intro, màu team ở lineup |
| Accent | Đỏ signal duy nhất | Màu nhận diện cho từng team |
| Texture | Halftone, grain, large outlined type | Diagonal stripe, speed line, gradient nhẹ |
| Border | Khung vuông/thô | Grid/card rõ, có thể bo rất nhẹ |
| Mục tiêu | Tạo attitude và hype | Phân loại nhanh, dữ liệu có cá tính |

Texture chỉ là tầng phụ. Khi nhìn ở kích thước mobile, tên và chủ thể vẫn phải đọc được ngay cả khi texture bị tắt.

## Component đề xuất

### `RosterCard`

```js
{
  id: 'team-ferrari',
  kind: 'motorsport', // hoặc 'character'
  group: 'Ferrari',
  label: 'Ferrari',
  accent: '#ee1d25',
  foreground: '#101010',
  image: '/assets/roster/ferrari.webp',
  imageAlt: 'Ferrari race car, top view',
  title: 'Ferrari',
  subtitle: 'Constructor team',
  href: '/teams/ferrari/'
}
```

Các biến thể: `character`, `team`, `vehicle`, `featured`, `compact`. Biến thể có thể đổi tỷ lệ card nhưng không nên đổi logic đọc tên/màu/ảnh.

## Tương tác và motion

- Hover card: nâng sáng nền 4–8%, dịch ảnh 4–10 px hoặc animate background stripe; `180–280ms` là đủ.
- Card được chọn: border/outline rõ và label trạng thái dạng text, không chỉ thay màu.
- Carousel ngang chỉ nên dùng trên mobile; desktop nên hiển thị grid/strip rõ số lượng item.
- Tôn trọng `prefers-reduced-motion`: tắt parallax, slide hoặc reveal có tính trang trí.

## Responsive

| Viewport | Hành vi nên dùng |
| --- | --- |
| Desktop (>= 1024px) | 4–8 card/cột trên một hàng hoặc bento grid; ảnh chủ thể lớn. |
| Tablet (640–1023px) | 3–4 cột; rút bớt texture, giảm chữ outline nền. |
| Mobile (< 640px) | 2 cột hoặc horizontal snap carousel; label ở đáy card vẫn đủ lớn, không crop mất chủ thể. |

Trên mobile, không thu nhỏ poster desktop thành nhiều cột hẹp. Ưu tiên hình + tên, cho phép người dùng scroll ngang nếu roster có giá trị so sánh theo dải.

## Accessibility và nội dung

- Image phải có alt mô tả chủ thể; tên/card phải có text thật, không dính vào ảnh.
- Màu team không phải cách duy nhất để phân biệt item: luôn có tên/nhãn.
- Text trên background màu cần contrast tối thiểu 4.5:1 ở cỡ thường.
- Card click được phải focusable, có focus outline nhìn thấy trên mọi nền.
- Nếu có nhiều entity, dùng semantic list (`ul > li`) hoặc grid danh sách, không dựng toàn bộ bằng ảnh canvas.

## Khi nên dùng

- esports roster, hero/character selection, game launch;
- team lineup, league, race team directory, standings;
- brand ambassador, speaker lineup, artist roster;
- catalogue sản phẩm theo collection/color/team có ít item nổi bật.

Không phù hợp với form, hướng dẫn dài, so sánh kỹ thuật dày, checkout hoặc danh sách hàng trăm sản phẩm.

## Checklist triển khai

- Ảnh chủ thể cùng scale, góc nhìn và chất lượng.
- Màu, label và card order phản ánh dữ liệu thật.
- Grid vẫn đọc tốt khi một ảnh không tải.
- Texture nằm sau text và không cạnh tranh với title.
- Không dùng nhiều hơn một accent tự do trong biến thể esports.
- Cột team không quá hẹp khiến tên/callout phải xuống quá nhiều dòng.
- Tương tác hover/focus vẫn rõ trên nền đỏ, đen và các màu team sáng.

## Tóm tắt thiết kế

Competitive roster là UI kể câu chuyện bằng **hệ thống nhận diện lặp lại**. Điểm mạnh đến từ việc cân bằng consistency (grid, camera angle, typography) với individuality (màu team, character art, texture). Chọn biến thể esports khi cần hype và attitude; chọn motorsport color-block khi cần phân loại dữ liệu đội nhanh, sạch và mang cảm giác chuyên nghiệp.
