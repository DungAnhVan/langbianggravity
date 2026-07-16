# UI Design Analysis — Neo-Swiss Editorial

## Nguồn tham khảo

- [The Secret Project — Aristide Benoist (Pinterest)](https://www.pinterest.com/pin/139893132164917102/)

## Tên phong cách

**Neo-Swiss editorial / grid-based corporate case study** — phong cách web tối giản kế thừa Swiss Style: typography sans-serif, lưới nghiêm ngặt, khoảng trắng lớn và hệ phân cấp thông tin rõ ràng. Phiên bản này mang tính đương đại hơn nhờ navigation dạng metadata, nhịp chuyển động tinh tế và bố cục case-study cho agency/B2B.

Các từ khóa: **editorial, architectural, systematic, quiet confidence, high-end agency, annual report**.

## Ấn tượng cốt lõi

Mẫu không cố gây chú ý bằng ảnh lớn, màu rực hay hiệu ứng. Thay vào đó, nó làm người xem tin vào sự chuyên nghiệp thông qua trật tự: một grid rõ, đường viền mảnh, con số lớn, copy được dàn như một ấn phẩm và lượng khoảng trống rất rộng.

```text
┌───────┬───────────────────────────────────────────────────────┐
│ mark  │  01 Services   02 Work   03 Company   04 Careers       │
│       │                                               Contact → │
├───────┼───────────────────────────────────────────────────────┤
│ rail  │                  section label                         │
│ social│  01             Heading ─────────────────              │
│ icons │                 subheading + editorial body copy       │
│       │                                                        │
└───────┴───────────────────────────────────────────────────────┘
```

## Bố cục

- **Container lớn có viền:** toàn bộ trang được xem như một artboard/ấn phẩm thay vì tập hợp card riêng lẻ.
- **Left rail cố định:** khu vực hẹp bên trái chứa logo, social icon hoặc thông tin phụ; nó tạo một trục dọc ổn định.
- **Header như index:** các mục điều hướng có số thứ tự hai chữ số, ngắn, trải theo một hàng; cho cảm giác bảng mục lục.
- **Nội dung bám grid:** số section lớn, title và paragraph có các cột rõ ràng; line ngang căn với title để nối các khối.
- **Không gian âm là cấu trúc:** phần trống không phải vùng còn lại mà chủ ý làm chậm nhịp đọc và tăng giá trị cho nội dung.

Không nên lấp đầy các ô grid. Chỉ dùng grid để căn và kiểm soát tương quan giữa những khối nội dung thật sự quan trọng.

## Phân cấp thị giác

1. **Số section:** `01` thật lớn, làm neo thị giác và chỉ vị trí trong câu chuyện.
2. **Heading:** đen, sans-serif, cỡ vừa/lớn; được nhấn bởi horizontal rule.
3. **Subheading:** nhãn nội dung ngắn đặt sát heading, giúp người xem quét nhanh.
4. **Body copy:** cột văn bản hẹp, density vừa phải và màu xám để không lấn title.
5. **Navigation/meta:** cỡ nhỏ ở vùng header/rail; có ích nhưng không chiếm spotlight.
6. **Accent:** một vệt màu nhạt hoặc chi tiết cực nhỏ, chỉ đóng vai trò định hướng.

## Typography

- Dùng một sans-serif grotesk sạch, chẳng hạn Inter, Helvetica Now, Neue Haas Grotesk, Suisse Int'l, Arial hoặc Manrope.
- Weight và size là công cụ phân cấp chính; không cần nhiều font family.
- Heading dùng weight bold/semibold và line-height chặt; body dùng regular với line-height thoáng hơn.
- Số section có thể rất lớn, nhưng để regular/medium để giữ vẻ biên tập thay vì quảng cáo.
- Nhãn navigation dùng cỡ nhỏ, có số thứ tự và alignment cẩn thận; không dùng all-caps quá nhiều.

## Màu sắc và đường nét

- Nền: trắng ngà hoặc xám lạnh rất nhạt, không phải trắng tinh.
- Ink: gần đen/charcoal, đủ mềm hơn `#000` tuyệt đối.
- Text phụ: xám trung tính, vẫn cần đạt tương phản đọc được.
- Accent: chỉ một màu muted như salmon, đỏ gạch hoặc xanh signal; diện tích rất nhỏ.
- Border: `1px` xám đen, thống nhất toàn hệ. Border thay thế card shadow và hiệu ứng trang trí.

Phong cách này mạnh nhất khi hạn chế palette xuống 2–3 màu. Thêm nhiều màu trạng thái sẽ phá cảm giác ấn phẩm có chủ đích.

## Chi tiết UI đặc trưng

- **Section index:** số `01`, `02`, `03` làm navigational landmark và nhận diện visual.
- **Horizontal rule:** không chỉ để chia nội dung; nó kéo mắt từ title sang cột copy.
- **Vertical rail:** tạo chiều cao, neo social/progress/navigation phụ ở cùng một trục.
- **Micro-navigation:** `Contact →`, biểu tượng nhỏ, nhãn ngắn; bố cục chính giữ yên tĩnh.
- **Fade/chuyển cảnh:** phù hợp với slide ngang, reveal theo grid hoặc thay section rất nhẹ; animation không nên làm biến dạng layout.

## Cách triển khai trên web

- Dùng CSS Grid 12 cột (hoặc 6 cột trên tablet) với một cột rail riêng.
- Xây token cho `--page-gutter`, `--grid-line`, `--ink`, `--muted`, `--accent`, `--rail-width` để các trang đồng nhất.
- Desktop nên giữ container có border; trên mobile có thể đưa rail thành header strip hoặc bỏ social icons để tiết kiệm diện tích.
- Content text nên có `max-width` khoảng 55–75 ký tự một dòng; đừng trải paragraph hết bề ngang grid.
- Navigation có tương tác cần focus state dễ thấy, không được chỉ dựa vào underline/animation.
- Dùng semantic `nav`, `main`, `section`, heading tuần tự và text label thực; các số lớn chỉ là hỗ trợ thị giác, không thay heading.

## Responsive

| Viewport | Bố cục nên dùng |
| --- | --- |
| Desktop (>= 1024px) | Rail dọc + header ngang + grid nhiều cột; giữ khoảng trắng lớn. |
| Tablet (640–1023px) | Rail thu hẹp; navigation có thể scroll ngang; title/copy còn 2 cột. |
| Mobile (< 640px) | Chuyển rail thành top bar; nội dung theo một cột, số section thu nhỏ; giữ border và thứ bậc chữ. |

Trên mobile, ưu tiên thứ tự đọc `section number → title → subheading → copy`. Không giữ left rail nếu nó làm cột nội dung quá hẹp.

## Khi phong cách này phù hợp

- agency, studio sáng tạo, architecture/interior, consultancy;
- portfolio và case study dự án;
- annual report, impact report, company profile;
- SaaS/B2B cao cấp muốn cảm giác có hệ thống và đáng tin.

Không phù hợp cho ecommerce listing dày đặc, landing page khuyến mại, dashboard thời gian thực nhiều trạng thái hoặc thương hiệu cần cảm xúc vui nhộn/đại chúng.

## Checklist triển khai

- Grid line, rail, heading và paragraph căn đúng cùng một hệ cột.
- Mỗi section có một neo rõ: số lớn hoặc heading, không phải cả hai đều quá lớn.
- Copy dài bị giới hạn chiều rộng để dễ đọc.
- Accent chỉ xuất hiện ở điểm có ý nghĩa, không lặp lại như màu trang trí.
- Không dùng card shadow, glass blur hoặc gradient mạnh.
- Nav và icon nhỏ vẫn đủ contrast, focusable và có aria-label khi cần.
- Mobile giữ nhịp biên tập, nhưng chuyển thành luồng một cột đơn giản.

## Tóm tắt thiết kế

Neo-Swiss editorial tạo cảm giác cao cấp bằng **kỷ luật hơn là hiệu ứng**. Grid, đường line mảnh, typography một font và khoảng trắng lớn làm nội dung trông đáng tin và có chiều sâu. Muốn tái tạo đúng tinh thần, hãy thiết kế như đang dàn một báo cáo hoặc catalogue: mỗi thành phần có vị trí rõ, màu sắc tiết chế và mọi chi tiết phụ đều phục vụ thứ bậc đọc.
