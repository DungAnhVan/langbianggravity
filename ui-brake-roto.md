# UI design spec — Brake Rotor catalogue

## Mục đích

Tài liệu này là brief độc lập để dựng hoặc review lại route `/products/brake-rotor/`.

Trang không hoạt động như một landing page dài hay lưới SKU. Đây là một **catalogue kỹ thuật hai trang**: người xem tập trung vào một rotor Front hoặc Rear, sau đó đổi trang để xem biến thể còn lại.

**Kết quả mong muốn:** từ header đi thẳng vào catalogue, rồi footer. Không có fitment finder, product card, fact strip, quote/conversion section hoặc CTA kéo người xem xuống dưới.

## Nguyên tắc thiết kế

- Tạo cảm giác catalogue cơ khí cao cấp: mực tối, giấy blueprint sáng, lưới kỹ thuật và đường viền có chủ đích.
- Dùng split-screen chỉ một lần, tại catalogue chính. Không nhân bản kiểu poster này cho các section khác.
- Một thời điểm chỉ ưu tiên một sản phẩm. Front và Rear là hai trang của cùng một vật thể, không phải ba card cạnh nhau.
- Dữ liệu kỹ thuật phải ngắn và kiểm chứng được. Chỉ hiển thị vị trí, đường kính tham chiếu và vật liệu.
- Ảnh kỹ thuật là nhân vật chính; copy hỗ trợ quyết định xem trang, không cạnh tranh với ảnh.
- Motion chỉ hỗ trợ ẩn dụ lật catalogue. Không dùng carousel tự chạy, parallax nặng hoặc horizontal scroll.

## Phạm vi trang

```text
Header chuẩn
└── Catalogue Brake Rotor (nội dung duy nhất của main)
    ├── Trang copy: Front hoặc Rear
    └── Trang hình: Front hoặc Rear
Footer chuẩn
```

Không thêm vào `main`:

- Fitment form hoặc danh sách kết quả/SKU.
- Product cards, card detail, badge, fact strip.
- Quote/conversion banner hoặc CTA `Find by vehicle`.
- Section marketing thứ hai bên dưới catalogue.

Header vẫn có Quote toàn site; đây là điều hướng dùng chung, không phải CTA của nội dung Brake Rotor.

## Cấu trúc desktop

### Khung ngoài

- Nền section: giấy trắng ngà `#f4f2ea`.
- Khoảng đệm trên: `clamp(92px, 7vw, 120px)`; khoảng đệm dưới: `clamp(42px, 4vw, 64px)`.
- `shell` catalogue là một khung duy nhất, viền `1px solid #252a27`.
- Tạo chiều sâu như tấm giấy đặt trên bàn: `22px 22px 0 #d9d7cf` và bóng mềm phía dưới.
- Không dùng bo góc cho catalogue, control hoặc sheet. Chất liệu phải sắc, kỹ thuật và có tính in ấn.

### Tỷ lệ hai cột

- Bên trái (copy): `0.84fr`.
- Bên phải (catalogue stage): `1.16fr`.
- Chiều cao tối thiểu mỗi cột desktop: `640px`.
- Cả hai cột nằm trong cùng một khung, `overflow: hidden`, không được có layer absolute tràn sang section tiếp theo.

### Cột copy — “technical index page”

**Nền và texture**

- Base: `#080a09`.
- Thêm glow cam rất nhẹ từ góc trên trái.
- Chồng lưới 32px bằng các line trắng có opacity thấp (`0.025–0.035`). Texture chỉ tạo chất blueprint, không giảm tương phản chữ.
- Padding: `clamp(38px, 4vw, 64px)`.
- Bố cục flex column, `justify-content: space-between`: copy ở trên/giữa, nút chọn trang neo gần đáy.

**Copy**

1. Eyebrow cam: `ROTOR CATALOGUE / 01—02`.
2. H1 tối đa 11 ký tự theo chiều ngang; `clamp(3rem, 4vw, 4.8rem)`, line-height `0.94`, tracking `-0.065em`, màu `#f4f2ea`.
3. Mô tả một đoạn ngắn, tối đa 43ch, màu xám sáng `#cdd1ca`.
4. Thông số kỹ thuật dùng `dl`, lưới hai cột. Mỗi item có đường dashed ở trên.
5. Nhãn spec: cam, uppercase, 0.64rem, tracking rộng. Giá trị spec: off-white, 0.84rem, đậm vừa.

**Nội dung trang Front**

| Trường | Nội dung |
| --- | --- |
| H1 | `Front braking, dialled to the hub.` |
| Mô tả | Model-specific front rotor; kiểm theo diameter, bolt circle, offset và caliper clearance. |
| Position | `Front / model specific` |
| Reference | `260 mm sample` |
| Material | `SUS420 rotor steel` |

**Nội dung trang Rear**

| Trường | Nội dung |
| --- | --- |
| H1 | `Rear braking, measured at every mount.` |
| Mô tả | Compact rear rotor; kiểm theo bolt pattern, offset, hardware và heat exposure. |
| Position | `Rear / model specific` |
| Reference | `220 mm sample` |
| Material | `SUS420 rotor steel` |

### Điều khiển trang

- Có đúng hai nút: `01 Front` và `02 Rear`.
- Kích thước tối thiểu desktop: rộng `94px`; padding `10px 12px`.
- Trạng thái nghỉ: viền off-white 28%, nền đen trong suốt, chữ `#d9ddd5`.
- Trạng thái hover/active: nền và viền cam thương hiệu; chữ và số chuyển sang màu ink `#080a09`.
- Dùng `aria-pressed="true"` cho trang đang chọn, `false` cho trang còn lại.
- Dùng ID ổn định `#front-brake-rotor` và `#rear-brake-rotor` để các link nội bộ vẫn chọn đúng trang catalogue.
- Không có CTA thứ ba trong khung này.

### Catalogue stage — “blueprint product page”

**Nền stage**

- Nền xám blueprint `#c9cbca`, lưới 28px bằng line đen opacity thấp.
- Padding `30px`; khung line-art inset 15px, không bắt chuột.
- Nhãn nhỏ nằm góc phải trên: `BRAKE ROTOR / PRODUCT PAGES`, uppercase, 0.62rem, tracking rộng.

**Cuốn catalogue**

- Vùng book cao `580px`, có `perspective: 1800px`.
- Mỗi sheet phủ kín book, nền xanh-đen `#111713`, viền `#202420`, bóng 14px/18px như tấm giấy xếp lớp.
- Điểm xoay ở gáy trái: `transform-origin: left center`.
- `backface-visibility: hidden` để không lộ mặt sau khi lật.
- Asset chính: `/assets/images/brake-rotor-blueprint-hero.webp`, tỷ lệ nguồn `1254 × 1254`, `object-fit: cover`.
- Có overlay gradient tối nhẹ từ trên xuống dưới để chữ nhãn ở góc dưới luôn đọc được.

**Nhãn sheet**

- Canh phải, đáy: 20px / 18px desktop.
- Dòng 1 off-white: `01 / FRONT ROTOR` hoặc `02 / REAR ROTOR`.
- Dòng 2 cam nhạt: `DIAMETER · BCD · OFFSET` hoặc `MOUNTING · CLEARANCE · HEAT`.
- Uppercase, tracking rộng, không thêm mô tả dài trong sheet.

## Hành vi lật trang

`data-catalog-page` trên phần tử catalogue là state nguồn:

| State | Copy hiển thị | Sheet trên | Sheet nền |
| --- | --- | --- | --- |
| `front` | Front | Front: `rotateY(0deg)`, opacity 1 | Rear: dịch phải 18px, scale 0.97, `rotateY(-4deg)`, opacity 0.56 |
| `rear` | Rear | Rear: `rotateY(0deg)`, opacity 1 | Front: `rotateY(-166deg)`, opacity 0 |

- Sheet dùng transition transform 560ms với easing gần cảm giác giấy lật: `cubic-bezier(0.2, 0.72, 0.2, 1)`.
- Opacity chuyển nhanh hơn, 260ms, để mặt sau không gây nhiễu.
- Khi đổi state phải đồng bộ cả: copy hiển thị, `aria-pressed`, `aria-hidden` trên sheet và số trong eyebrow (`01`/`02`).
- Nếu URL hash là `#front-brake-rotor` hoặc `#rear-brake-rotor`, state phải chọn trang tương ứng lúc load và khi hash thay đổi.
- Không tự đổi trang theo timer.

## Ảnh Front và Rear

- Front dùng asset gốc với `fetchpriority="high"`.
- Rear tái dùng asset nhưng mirror ngang `scaleX(-1) scale(1.04)` và chỉnh `grayscale(0.18) contrast(1.08)` để có cảm giác một trang khác mà không cần ảnh trùng lặp.
- Cần alt riêng, mô tả đúng ngữ cảnh Front/Rear.
- Nếu có asset Rear thật, có thể thay ảnh Rear; vẫn giữ framing, overlay, label và motion như trên.

## Responsive

### Từ 1080px trở xuống

- Catalogue chuyển từ 2 cột thành một cột theo thứ tự: copy trước, stage sau.
- Đặt `row-gap: 1px` để hai mảng vẫn có đường phân tách rõ ràng.
- Bỏ `min-height: 640px` của copy và stage để chiều cao theo nội dung.
- Copy padding: `56px clamp(28px, 8vw, 68px)`.
- Book cao `min(64vw, 500px)`.
- Không giữ copy/stage bằng absolute hoặc sticky; stage luôn bắt đầu sau khi copy kết thúc trong normal document flow.

### Từ 720px trở xuống

- Section padding: `84px 0 42px`.
- Copy padding: `42px 26px`.
- H1: `clamp(2.7rem, 13vw, 4rem)` để không tràn ngang.
- Specs giữ hai cột nhưng gap giảm còn 12px; nếu nội dung thay đổi dài, có thể chuyển một cột thay vì ép chữ chồng lên nhau.
- Footer trong copy đổi thành cột; control chiếm toàn bộ chiều rộng và mỗi nút `flex: 1`.
- Stage padding 18px; inner frame inset 8px; nhãn stage giảm 0.58rem.
- Book cao `max(290px, min(96vw, 430px))`.
- Nhãn sheet dịch về `right: 14px; bottom: 12px`; dòng phụ giảm 0.64rem.
- Cấm horizontal scroll. Kiểm tra `document.documentElement.scrollWidth <= innerWidth`.

## Accessibility và motion

- Hai control là button thật, không dùng `div` có click handler.
- `aria-label` trên vùng điều khiển: `Choose a brake rotor catalogue page`.
- State dùng `aria-pressed`; sheet không active có `aria-hidden="true"`.
- Stage dùng `aria-live="polite"` để thay đổi Front/Rear được thông báo vừa phải.
- Texture grid, line-art inset và overlay là trang trí, không được thêm vào accessibility tree.
- Tôn trọng `prefers-reduced-motion: reduce`: bỏ transition của `.rotor-catalog-sheet` và `.rotor-catalog-control`; state vẫn đổi ngay lập tức.
- Tương phản tối thiểu: copy màu off-white trên nền `#080a09`; mô tả không thấp hơn màu `#cdd1ca`.

## Hợp đồng triển khai

| Vai trò | File / contract |
| --- | --- |
| Markup route | `products/brake-rotor/index.html` |
| State và đồng bộ Front/Rear | `setupRotorCatalog()` trong `script.js` |
| Layout, sheet, breakpoint | `.rotor-catalog*` trong `styles.css` |
| Asset catalogue | `assets/images/brake-rotor-blueprint-hero.webp` |
| Ảnh OG dự phòng | `assets/images/brake-rotor-blueprint-hero.png` |
| Nguyên tắc thiết kế tổng quát | `design-ui.md` |

Giữ các data attribute sau nếu sửa markup để JavaScript không mất liên kết:

```html
data-rotor-catalog
data-catalog-page
data-catalog-copy
data-catalog-control
data-catalog-sheet
data-catalog-index
```

## Checklist nghiệm thu

- [ ] Main có đúng một section catalogue, sau đó là footer.
- [ ] Không còn `#fitment`, `data-fitment-search`, `data-fitment-results`, product card hoặc CTA `Find by vehicle` trên route này.
- [ ] Front là state mặc định; click Rear đổi đúng copy, sheet, số trang, `aria-pressed` và `aria-hidden`.
- [ ] Link `/products/brake-rotor/#front-brake-rotor` và `#rear-brake-rotor` chọn đúng trang.
- [ ] Desktop: hai cột cân bằng, text không đè lên ảnh hay control.
- [ ] Tablet/mobile: copy nằm hoàn toàn trước stage; không có layer chồng lên vùng hình.
- [ ] Mobile: không tràn ngang và nút Front/Rear dễ chạm.
- [ ] Reduced motion: đổi state không có animation lật trang.
- [ ] Asset Front tải ưu tiên; asset Rear lazy load hoặc dùng asset riêng đã tối ưu.
- [ ] Không có lỗi JavaScript hoặc lỗi console sau refresh.
