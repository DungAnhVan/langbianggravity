# Design direction — Industrial Editorial Blueprint

Nguồn cảm hứng: reference về một trang “About us” của thương hiệu wheel performance. Mục đích của tài liệu là chắt lọc **nguyên lý thiết kế**, không sao chép nhận diện, nội dung hoặc asset của reference.

## Đọc nhanh

Đây là phong cách **industrial editorial + technical blueprint**: editorial vì copy được dàn như một trang tạp chí/manifesto; industrial vì dùng bản vẽ cơ khí, texture kim loại và cách cắt khung dứt khoát. Cảm giác chính là chính xác, mạnh, có lịch sử chế tạo và hơi hướng motorsport.

## Các thành phần tạo nên phong cách

| Lớp | Quan sát | Vai trò |
| --- | --- | --- |
| Bố cục | Khung nội dung gần vuông, chia hai nửa dọc. Vật thể cơ khí vượt qua đường chia. | Tạo một “poster” có tension rõ ràng, dẫn mắt từ copy sang sản phẩm. |
| Nền trái | Đen sâu, phủ pattern typography cùng tên thương hiệu nhưng opacity rất thấp. | Tăng độ sâu mà không cạnh tranh với copy. |
| Nền phải | Xám nhạt, line-art kỹ thuật lớn, crop mạnh ở cạnh khung. | Cho cảm giác CAD/blueprint, nhấn độ chính xác hơn ảnh quảng cáo thông thường. |
| Điểm giao | Hub/wheel đặt đúng đường chia, có độ tương phản cao nhất. | Là neo thị giác và biểu tượng cho kỹ thuật/sản phẩm. |
| Typography | Heading condensed, uppercase, body nhỏ, line-height chặt; accent đỏ chỉ là vệt ngắn. | Nhịp đọc kiểu technical label, không quá “luxury”. |
| Điều hướng | Dòng chấm, icon tròn, micro-copy ở chân khung. | Giữ cảm giác catalogue/control panel. |
| Vùng trắng ngoài khung | Nền trắng với đường cong lặp rất mảnh. | Tách artwork khỏi trang, thêm chuyển động kín đáo. |

## Công thức bố cục tái sử dụng

```text
section (paper / grid-line surround)
└── framed-panel
    ├── dark-copy-panel (45–52%)
    │   ├── eyebrow + short accent bars
    │   ├── display heading
    │   ├── concise technical story
    │   └── utility links / status rail
    ├── blueprint-panel (48–55%)
    │   └── oversized cropped line drawing or product cutout
    └── crossover-object (absolute, centred on divider)
```

Nguyên tắc: divider phải là nơi **vật thể/chi tiết kỹ thuật chạm qua**, không chỉ là một đường grid. Một focal object là đủ; đừng thêm nhiều badge, card và animation cùng lúc.

## Chuyển hoá cho Langbiang Gravity

Phù hợp nhất cho hero hoặc content block của `/products/sprockets/`, Brake Rotor hoặc OEM/B2B.

- Nửa trái: graphite/black, pattern lặp `LBG`, `520`, `RS`, `RA` hoặc geometry teeth ở opacity 3–7%.
- Nửa phải: bản vẽ line-art của sprocket/rotor, palette giấy xám ấm hoặc steel-grey; crop một phần khỏi cạnh phải để tạo scale.
- Điểm giao: một rear sprocket, rotor carrier hoặc hub/bolt-circle cutout vượt qua divider khoảng 12–20% chiều rộng panel.
- Accent: dùng orange của LBG cho 2–4 thanh nhỏ hoặc callout; lime chỉ dùng cho state/action, không dùng thay orange làm mảng lớn.
- Copy: chuyển từ “About us” sang manifesto kỹ thuật ngắn, ví dụ material, chain platform, tolerance, fitment handoff.
- Footer utility: thay icon décor bằng `Download spec`, `Request fitment`, `Open quote`; mỗi action phải có text rõ ràng.

## Token đề xuất

| Token | Giá trị gợi ý | Dùng cho |
| --- | --- | --- |
| Surface dark | `#080a09` / `#101412` | Copy panel |
| Surface paper | `#f4f2ea` hoặc `#c9cbca` | Blueprint panel/surround |
| Ink | `#111a15` | Line-art và chữ trên nền sáng |
| Accent primary | `#ff6a1a` | Marker, divider fragment, CTA chính |
| Accent state | `#b8ff2d` | Focus, selected state, quote count |
| Technical line | `rgba(8, 10, 9, 0.24)` | CAD/grid, không dùng đậm hơn text body |
| Border | `1px solid rgba(238, 241, 235, 0.16)` | Khung tối và utility rail |

Typography: display heading 700–900 weight, letter spacing chặt; label/body nên dùng readable sans-serif thay vì condensed font ở cỡ nhỏ. Giữ body tối thiểu 16px trên web, line-height từ 1.45 trở lên.

## Responsive và accessibility

- Desktop: giữ split panel và crossover object, nhưng tránh để copy `sticky` khi card/content phía dưới có thể cuộn đi sau nó.
- Tablet: giảm crossover object, ưu tiên text không bị crop; panel có thể vẫn 2 cột nếu mỗi cột còn đủ 320px.
- Mobile: stack copy trước, blueprint sau; object đặt trong blueprint panel thay vì absolute xuyên qua hai phần. Không dùng horizontal scroll để giữ hiệu ứng crop.
- Contrast: dark copy dùng off-white; panel sáng dùng ink. Texture/pattern chỉ là trang trí, không được làm giảm contrast copy.
- Icon-only control phải có accessible name. Đường chấm và line-art phải `aria-hidden` nếu không truyền tải thông tin.
- Tôn trọng `prefers-reduced-motion`; motion chỉ nên là parallax/translate nhẹ, không dùng chuyển động liên tục trên line-art.

## Ứng dụng: Brake Rotor — catalogue stage

Trang `/products/brake-rotor/` dùng khung blueprint như một **catalogue sản phẩm**, không phải hero dẫn tới nhiều section marketing.

- Khung chính gồm copy kỹ thuật bên trái và một cuốn catalogue bên phải; mỗi lần chỉ ưu tiên một rotor.
- Hai trang cố định: `01 / Front` và `02 / Rear`. Nút chọn phải đổi được nội dung copy, trạng thái `aria-pressed`, số trang và lớp catalogue đang hiển thị.
- Cảm giác lật trang đến từ hai tờ xếp lớp, transform nhẹ quanh gáy trái và bóng giấy; reduced-motion phải bỏ transition này.
- Mỗi trang chỉ dùng 3 dữ kiện dễ kiểm chứng: vị trí, đường kính tham chiếu và vật liệu. Không thêm fact strip, badge hoặc CTA phụ dưới khung.
- Trang Brake Rotor kết thúc phần nội dung ngay sau catalogue. Không giữ fitment finder, card SKU, quote/conversion hay CTA dẫn xuống; footer chuẩn vẫn giữ.
- Mobile xếp copy trước catalogue, không giữ hiệu ứng xoay có thể làm nội dung chồng nhau; catalog stage phải nằm sau copy trong normal document flow.

## Guardrails

- Không dùng logo/pattern chữ của reference; tạo pattern LBG riêng hoặc dùng geometry sprocket.
- Không biến mọi section thành poster split-screen. Chỉ dùng 1–2 section chủ lực mỗi trang để giữ hiệu lực thị giác.
- Không để minh hoạ kỹ thuật thay thế thông tin fitment/spec; UI cần có CTA và data rõ ràng.
- Kiểm tra bounding box sau mỗi breakpoint: copy phải kết thúc trước block tiếp theo, không được có sticky layer đè card như lỗi Fitment Guide trước đó.

## Thành phần nên xây nếu triển khai

1. `IndustrialBlueprintPanel`: split layout, panel surface và divider.
2. `BlueprintArt`: SVG line-art sản phẩm local, có crop/scale an toàn.
3. `TechnicalRail`: utility links hoặc status chips có text.
4. `BrandPattern`: CSS/SVG texture opacity thấp, tắt được trên reduced-motion.

Mức ưu tiên áp dụng: thử trước ở một hero/feature section của Sprockets; chỉ mở rộng sang Rotor hoặc B2B sau khi responsive và readability được xác nhận.
