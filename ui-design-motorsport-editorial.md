# UI Design Analysis — Motorsport Editorial

## Tên phong cách

**Motorsport editorial / race-data poster** — giao diện thông tin lấy ngôn ngữ thị giác của poster đua xe, bảng đội hình và broadcast graphics. Nó ưu tiên cảm giác tốc độ, tính cạnh tranh và khả năng nhận diện đội hơn là vẻ tối giản trung tính.

## Ấn tượng cốt lõi

Mẫu biến một danh sách đội hình thành một khung hình có nhịp điệu: mắt đọc tiêu đề lớn, quét xe ở cột trái, rồi nhận diện từng đội qua mảng màu, tên tay đua và logo ở cột phải. Mỗi hàng là một “team card” nhưng tất cả ghép lại thành một poster liền mạch.

Các từ khóa: **tốc độ, cơ khí, cao cấp, thể thao, broadcast, sưu tầm, dữ liệu có cá tính**.

## Công thức bố cục

```text
Nền tối có đường race-track / cơ khí
                Tiêu đề chữ display cực lớn

Xe nhìn từ trên xuống |  Thẻ thông tin đội màu nhận diện + logo
Xe nhìn từ trên xuống |  Thẻ thông tin đội màu nhận diện + logo
Xe nhìn từ trên xuống |  Thẻ thông tin đội màu nhận diện + logo
...
```

- **Khung dọc 2 cột:** cột xe chiếm khoảng 30–35%; cột dữ liệu chiếm 65–70%.
- **Module lặp theo hàng:** xe và thẻ dữ liệu đặt chung một cao độ, tạo cảm giác bảng xếp hạng/line-up.
- **Thẻ thông tin bo góc vừa phải:** đủ mềm để hiện đại, nhưng không quá tròn vì sẽ làm giảm chất cơ khí.
- **Chồng lớp có chủ ý:** xe lấn nhẹ vào mép thẻ để nối hình ảnh sản phẩm với dữ liệu đội.
- **Khoảng cách đều và chặt:** nhịp giữa các hàng nhỏ hơn chiều cao thẻ; toàn bộ danh sách hoạt động như một khối thống nhất.

## Phân cấp thị giác

1. **Tiêu đề:** chữ in hoa, rất đậm, độ nén cao; là điểm vào của poster.
2. **Màu đội:** mảng màu lớn giúp nhận biết mỗi hàng trước cả khi đọc chữ.
3. **Tên tay đua:** họ/tên chính được làm đậm hơn phần còn lại để tạo nhịp đọc nhanh.
4. **Xe:** cung cấp ngữ cảnh thể thao và chiều sâu; đóng vai trò neo thị giác bên trái.
5. **Logo:** một điểm xác nhận thương hiệu ở đầu hoặc cuối thẻ, không cạnh tranh với tên.
6. **Nền:** chỉ tạo năng lượng và chiều sâu, không mang thông tin chính.

Quy tắc quan trọng: trong mỗi thẻ chỉ nên có **một** điểm nhấn chữ mạnh nhất. Ở mẫu này đó là tên họ được in đậm.

## Typography

- **Heading:** sans-serif display cực đậm, chữ hoa, tracking hơi chặt, line-height thấp. Phù hợp với các font như Anton, Archivo Black, Druk Condensed, Bebas Neue (cần tăng weight/size) hoặc một grotesk condensed bản đậm.
- **Body/name phụ:** sans-serif hình học hoặc hơi futuristic, trọng lượng medium/regular, để tương phản với heading.
- **Tên chính:** kết hợp một phần regular + một phần extra-bold cùng baseline. Ví dụ: `Lucas CORREIA`.
- **Cỡ chữ:** heading phải lớn hơn đáng kể so với nội dung; không cố làm mọi chữ đều “mạnh”.

Tránh dùng script font, serif cổ điển, letter-spacing quá rộng hoặc nhiều hơn hai cấp trọng lượng trong một thẻ.

## Màu sắc và độ tương phản

- Nền chính là **đen/charcoal**, tạo sân khấu cho màu đội.
- Mỗi đội dùng một **màu nhận diện bão hòa** trên toàn bộ thẻ: xanh teal, cyan, burgundy, navy, đỏ, cam, xanh đậm.
- Trên thẻ sáng, chữ/logo dùng đen; trên thẻ tối, ưu tiên trắng hoặc màu accent sáng có độ tương phản đủ cao.
- Một lớp gradient tối hoặc mảng chéo ở cạnh thẻ tạo chiều sâu mà không cần đổ bóng nặng.
- Màu nhấn chỉ nên xuất phát từ dữ liệu thương hiệu (team/product/status), không thêm màu ngẫu nhiên.

Kiểm tra khả năng đọc theo WCAG: text nhỏ trên nền màu đội cần độ tương phản tối thiểu 4.5:1; logo không nên là nguồn thông tin duy nhất.

## Chất liệu đồ họa

- **Đường cong track / sọc tốc độ** màu xám rất tối phía sau tạo chuyển động ngang và chiều sâu.
- **Outline kỹ thuật** mảnh, bán trong suốt, gợi blueprint/cơ khí. Chỉ nên dùng ở biên khung để tránh nhiễu.
- **Gradient góc hoặc diagonal cut** trong từng thẻ giúp các mảng màu phẳng bớt đơn điệu.
- **Ảnh sản phẩm top-down** có bóng nhẹ, tách nền tốt và giữ cùng tỉ lệ giữa các hàng.

Chất liệu phụ phải có opacity thấp. Nếu người xem đọc được họa tiết trước khi đọc tên đội, nền đã quá mạnh.

## Component có thể tái sử dụng

### `RaceLineupCard`

Nội dung tối thiểu:

- ảnh phương tiện/sản phẩm;
- `teamColor` và `teamDarkColor` cho nền/gradient;
- tên đầy đủ của 1–2 người;
- phần tên cần in đậm;
- logo đội/brand và alt text;
- thứ hạng, trạng thái hoặc CTA tùy ngữ cảnh.

Biến thể hữu ích: `default`, `featured`, `compact`, `result`, `out-of-stock`. Không thay đổi cấu trúc mỗi hàng chỉ vì khác màu đội.

### Quy ước dữ liệu

```js
{
  team: 'Ferrari',
  colors: { base: '#ee1d25', shade: '#c81525', text: '#0b0b0b' },
  logo: '/assets/teams/ferrari.svg',
  drivers: [
    { firstName: 'Leonardo', lastName: 'LOPEZ' },
    { firstName: 'Thiago', lastName: 'LIMA' }
  ],
  vehicleImage: '/assets/cars/ferrari-top.png'
}
```

Tách dữ liệu khỏi layout giúp UI tự sinh hàng, giữ nhịp đồng nhất và dễ cập nhật đội hình.

## Chuyển đổi thành UI web

- Đặt tiêu đề và một mô tả ngắn ở đầu section; không nhồi thêm navigation vào vùng poster.
- Các thẻ nên là semantic list (`ul > li`) hoặc `article`, không phải chỉ là ảnh nền.
- Nếu thẻ có thể bấm, toàn bộ card là một link/button với focus state rõ ràng.
- Ở hover: tăng sáng nền 4–8%, dịch xe hoặc logo 4–8 px, không dùng animation quay/phóng quá mạnh.
- Motion nên mô phỏng quán tính: `200–300ms`, easing nhanh khi vào và chậm khi dừng.
- Logo cần bản SVG/raster sắc nét; luôn có `alt` và tên đội dạng text trong thẻ.

## Responsive

| Viewport | Bố cục nên dùng |
| --- | --- |
| Desktop (>= 1024px) | Giữ xe bên trái, thẻ dài bên phải; tiêu đề lớn 2 dòng. |
| Tablet (640–1023px) | Thu hẹp cột xe; logo nhỏ hơn; giảm khoảng cách dọc nhưng giữ cấu trúc 2 cột. |
| Mobile (< 640px) | Xếp xe phía trên hoặc thu nhỏ thành thumbnail ở mép thẻ; thông tin và logo nằm trong một card full-width; tiêu đề giảm mạnh nhưng vẫn display. |

Trên mobile, không cố giữ xe cùng kích thước desktop vì nó sẽ ép tên quá nhỏ. Ưu tiên khả năng đọc tên, trạng thái và CTA.

## Khi phong cách này phù hợp

- team line-up, giải đấu, lịch thi đấu, kết quả, leaderboard;
- catalogue xe/parts, sản phẩm hiệu năng cao, launch collection;
- brand story cần cảm giác tốc độ, kỹ thuật hoặc cạnh tranh;
- dashboard gamified có dữ liệu ít nhưng cần cá tính mạnh.

Không phù hợp cho form dài, nội dung pháp lý, bảng dữ liệu dày, hoặc luồng mua hàng cần sự yên tĩnh và dễ quét.

## Checklist triển khai

- Mỗi hàng có cùng chiều cao, lề trái/phải và vị trí logo nhất quán.
- Cột xe không che tên, logo hoặc focus outline.
- Màu chữ luôn đủ tương phản với màu đội.
- Ảnh xe dùng cùng góc nhìn, tỉ lệ và ánh sáng.
- Background graphics ở tầng thấp, không cản nội dung hay tương tác.
- Tên vẫn đọc được khi ảnh hoặc logo không tải.
- Mobile chuyển về một luồng đọc đơn giản, không giữ bố cục poster bằng mọi giá.

## Tóm tắt thiết kế

Đây là UI **data-rich nhưng không data-dense**: số lượng thông tin trong từng hàng ít, song được mã hóa bằng màu đội, ảnh xe, weight chữ và logo để người xem quét nhanh. Muốn tái tạo đúng tinh thần, hãy giữ một grid lặp chặt chẽ, nền tối tiết chế, typography đậm có tương phản, và dùng màu thương hiệu làm hệ thống phân loại chứ không chỉ là trang trí.
