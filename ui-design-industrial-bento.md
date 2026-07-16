# UI Design Analysis — Industrial Bento Dashboard

## Tên phong cách

**Industrial bento dashboard** — giao diện dashboard/portfolio tối giản, lấy cấu trúc từ bento grid nhưng dùng viền đen dày, mảng màu cảnh báo và chất liệu kim loại để tạo cảm giác kỹ thuật, chính xác và có trọng lượng vật lý.

Nó nằm giữa **Swiss editorial minimalism**, **industrial product design** và **soft skeuomorphism rất tiết chế**. Đây không phải glassmorphism: chiều sâu đến từ khung, bóng đổ và vật liệu, không phải blur trong suốt.

## Ý tưởng thị giác cốt lõi

Một card vuông lớn được chia thành các module bất đối xứng, giống một bảng điều khiển máy móc hoặc một poster thông tin. Phần lớn diện tích giữ trắng/ngà để nội dung thở; cam bão hòa chỉ đánh dấu KPI; đen là “khung kết cấu” gắn các phần lại với nhau.

```text
┌─────────────────────────┬───────┐
│ Headline display         │ metal │
├────────┬────────────────┴───────┤
│ striped│ controls / context      │
├────────┤                         │
│ KPI     │ title + explanation    │
│ orange  │                         │
└────────┴─────────────────────────┘
```

## Bố cục và tỷ lệ

- **Một khối trung tâm:** card gần vuông, đặt giữa một khoảng nền rất rộng. Negative space ngoài card khiến module trông như vật thể có giá trị.
- **Bento grid không đồng đều:** hàng đầu thấp, KPI chiếm cột hẹp bên trái, nội dung chính chiếm vùng lớn bên phải; sự bất đối xứng có kỷ luật tạo hứng thú.
- **Đường phân cách là cấu trúc:** các border đen khoảng 4–6 px vừa phân vùng vừa là ngôn ngữ thương hiệu. Không cần divider mảnh bên trong.
- **Góc bo vừa phải:** khoảng 20–28 px ở viền ngoài; các ô trong có bán kính nhỏ hơn hoặc kế thừa theo góc card. Nó làm vật thể hiện đại nhưng vẫn “cứng”.
- **KPI neo ở đáy:** con số lớn nằm thấp trong cột cam, tạo trọng tâm thị giác và cân bằng với vùng chữ lớn phía trên.

## Phân cấp thị giác

1. **Headline:** `Impact.` rất lớn, đậm, tối; dấu chấm cam là chi tiết nhận diện nhỏ nhưng đắt giá.
2. **KPI:** nền cam lớn + số 72 cỡ display, đọc gần như đồng thời với headline.
3. **Tiêu đề kết quả:** hai dòng chữ đen, trọng lượng medium/bold, tạo kết luận cho số liệu.
4. **Mô tả:** xám trung tính, cỡ nhỏ hơn rõ rệt, chỉ giải thích chứ không cạnh tranh.
5. **Điều khiển/context:** mũi tên và nhãn `client: NOVA` mảnh, ở tầng phụ.
6. **Vật liệu/texture:** núm kim loại, sọc chéo chỉ là tín hiệu cảm xúc, không mang thông tin chính.

Một module chỉ nên có **một vai trò**: headline, KPI, điều hướng, texture hoặc nội dung. Không đặt nhiều loại thông tin ngang cấp vào cùng một ô.

## Typography

- **Display:** sans-serif grotesk đậm, gọn, có thể dùng Inter, Helvetica Now, Neue Haas Grotesk, Satoshi hoặc Manrope. Heading không cần condensed quá mạnh.
- **KPI:** weight regular/medium ở cỡ rất lớn để giữ vẻ hiện đại; không dùng bold quá đậm khiến số trông nặng nề.
- **Content:** medium/bold cho title, regular cho mô tả; contrast chủ yếu bằng cỡ chữ và màu, không phải thêm nhiều font.
- **Technical labels:** mono font cho metadata ngắn như client, ID, date hoặc trạng thái. Chỉ dùng ở thông tin phụ để tránh biến toàn UI thành terminal.
- **Dấu chấm/đơn vị:** accent color chỉ nhấn một ký tự hoặc badge; ví dụ dấu `.` cam, icon `%` trong vòng tròn đen.

## Màu sắc và vật liệu

| Vai trò | Hướng dùng |
| --- | --- |
| Nền | Trắng ấm/xám rất nhạt, có noise hoặc paper grain cực nhẹ. |
| Khung/chữ chính | Gần đen, không cần đen tuyệt đối. |
| Accent KPI | Cam signal / safety orange bão hòa. Dùng cho 1–2 vùng quan trọng. |
| Text phụ | Xám trung bình; vẫn phải đủ tương phản để đọc. |
| Vật liệu | Bạc/brushed metal, gradient hướng tâm hoặc linear tinh tế. |

Cam trong mẫu là màu của **điểm dữ liệu ưu tiên**, không phải màu nền mặc định. Giữ diện tích accent khoảng 10–20% card sẽ làm nó tiếp tục có lực.

## Chất liệu và chiều sâu

- **Paper grain:** noise mịn trên nền sáng, opacity thấp, tạo cảm giác in ấn thay vì nền phẳng vô trùng.
- **Drop shadow thực:** card có bóng lớn, mềm, lệch xuống; shadow nằm ngoài viền đen để card giống một tấm panel nổi.
- **Metal disk:** một mô-đun trang trí có highlight quay tâm, gợi vật liệu gia công CNC. Dùng asset/gradient có kiểm soát, không đặt trên text.
- **Hatched panel:** sọc chéo cam trên nền tối như ký hiệu hazard/technical drawing, dùng làm texture của một ô nhỏ.
- **Không dùng shadow cho từng ô:** các ô được giữ bằng border chung; shadow lặp lại sẽ khiến bento grid trở thành UI card generic.

## Component tái sử dụng

### `IndustrialBentoCard`

Các ô hợp lý:

- `headline`: tên chiến dịch, insight hoặc câu định vị;
- `metric`: giá trị, đơn vị và nhãn;
- `contextNav`: previous/next + metadata;
- `content`: tiêu đề kết quả và mô tả;
- `material`: metal, hatch hoặc visual asset thuần trang trí.

Mỗi card nên khai báo template grid riêng theo biến thể thay vì để nội dung quyết định kích thước ngẫu nhiên.

```js
{
  headline: 'Impact.',
  accent: '#f45100',
  metric: { value: 72, unit: '%', label: 'Engagement lift' },
  context: { label: 'client', value: 'NOVA' },
  title: 'Campaign success',
  description: 'Performance score and engagement statistics for Q2.',
  decoration: 'brushed-metal'
}
```

## Chuyển thành UI web

- Dùng CSS Grid cho card tổng; tránh absolute positioning cho text chính vì sẽ khó responsive.
- Thiết kế theo grid token: `border`, `radius`, `gap`, `accent`, `surface`, `ink` là các biến chung.
- Thẻ có tương tác nên là `article > a` hoặc `button`, với focus ring nằm ngoài border đen và không bị clip.
- Hover phù hợp: nâng card 2–4 px, tăng shadow nhẹ, xoay/đổi highlight vật liệu rất ít. Tránh scale toàn card quá lớn.
- Nếu dùng slider, mũi tên là điều khiển thật có label rõ ràng; không dùng chúng chỉ để trang trí.
- Không dùng texture kim loại hoặc noise để truyền tải thông tin bắt buộc: luôn có text/label tương đương.

## Responsive

| Viewport | Cách giữ tinh thần thiết kế |
| --- | --- |
| Desktop (>= 1024px) | Giữ card gần vuông, khoảng nền rộng và cấu trúc 2 cột/3 hàng. |
| Tablet (640–1023px) | Card full-width trong container; giữ KPI ở cột trái nếu text còn đủ chỗ. |
| Mobile (< 640px) | Chuyển thành grid 1 cột hoặc 2 cột gọn: headline → context → KPI → content. Material tile có thể thu nhỏ hoặc ẩn nếu chỉ trang trí. |

Trên mobile, không cố tái tạo nguyên tỷ lệ poster. Giữ border, cam accent, thứ bậc chữ và nhịp module là đủ để nhận ra phong cách.

## Khi nên dùng

- portfolio case study, agency showcase, campaign report;
- dashboard KPI có ít chỉ số quan trọng;
- product feature highlight, launch recap, report card;
- microsite công nghệ/kiến trúc/thương hiệu sáng tạo cần vẻ “engineered”.

Không phù hợp cho dashboard nhiều bảng/phân tích dày đặc, CRUD form, nội dung dài hoặc e-commerce listing có hàng chục sản phẩm.

## Checklist triển khai

- Border, gap và radius đồng nhất giữa mọi tile.
- Headline/KPI vẫn là hai điểm vào rõ nhất khi thu nhỏ ảnh.
- Accent cam chỉ đánh dấu trạng thái hoặc số liệu quan trọng.
- Text phụ đạt contrast tối thiểu 4.5:1 trên nền sáng.
- Shadow chỉ xuất hiện ở container cấp cao, không bị nhân bản ở từng ô.
- Texture không làm giảm khả năng đọc hoặc làm nhiễu focus state.
- Mobile chuyển thành thứ tự đọc logic, không để KPI hoặc context bị mắc kẹt trong một cột hẹp.

## Tóm tắt thiết kế

Industrial bento dashboard dùng **kết cấu mạnh + nội dung ít nhưng rõ**. Sức hấp dẫn của nó không đến từ nhiều hiệu ứng, mà từ tỉ lệ khoảng trắng, khung đen chính xác, một màu safety orange có chủ đích và vài chi tiết vật liệu được dùng như dấu câu. Muốn tái sử dụng hiệu quả, hãy giữ grid nghiêm, để mỗi ô có một nhiệm vụ, và dùng chiều sâu vật lý tiết chế thay cho hiệu ứng trang trí dày đặc.
