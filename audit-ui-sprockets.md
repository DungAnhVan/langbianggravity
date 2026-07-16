# UI/UX audit — Sprockets product page

Ngày kiểm tra: 2026-07-16  
Route: `/products/sprockets/`  
Phạm vi: visual design, information architecture, fitment handoff, responsive, accessibility, motion, performance và các phần lặp/thừa.

## Kết luận nhanh

Đây là một product showcase có direction thị giác rõ: nền graphite, accent đỏ/cyan, CAD sprocket, HUD và motion story tạo đúng cảm giác race-engineering. Header, skip link, FAQ native và form labels cơ bản đều hoạt động đúng; kiểm tra local không ghi nhận console error/warning và không có document-level horizontal overflow ở desktop/mobile.

Điểm yếu chính nằm ở conversion và accessibility: trang quá dài cho một product page, nội dung “fitment/material/520” lặp qua nhiều section, form handoff thiếu trường `type` dù copy hứa có trường này, và reduced-motion làm mất phần lớn motion story khỏi màn hình.

## Findings

### P1 — Reduced motion làm ẩn bước 02 và 03

Khi `prefers-reduced-motion: reduce`, `setupSprocketMotion()` chỉ set `.is-active` cho step đầu tiên rồi `return`. Trong CSS mặc định, `.motion-step` có `opacity: 0` và `pointer-events: none`; media query reduced-motion chỉ tắt transition, không đưa các step còn lại về trạng thái hiển thị.

Rủi ro: người dùng đã chủ động tắt animation không thể nhìn thấy hai phần nội dung “Material choice” và “Fitment guidance”. Đây là mất nội dung, không chỉ là khác biệt thẩm mỹ.

Evidence:

- `script.js:990-997` — reduced-motion chỉ active index `0`.
- `styles.css:3094-3117` — step inactive bị opacity `0`; chỉ step active được opacity `1`.
- `styles.css:3778-3789` — reduced-motion chỉ tắt animation/transition.

Đề xuất: trong reduced-motion hiển thị cả ba step theo layout tĩnh giống mobile, hoặc đổi motion story thành nhóm tab/button không animation để người dùng có thể chọn 01/02/03.

### P1 — Fitment promise không khớp với form thực tế

Page nhiều lần nói finder tìm theo make, model, year và model type. Signal trong finder cũng hiển thị `make / model / year / type / fitment link`, nhưng form thực tế tại section cuối chỉ có ba input: Make, Model và Year. Form submit tới external finder cũng chỉ gửi các field này; không có `type`.

Rủi ro: người dùng kỳ vọng lọc được model type nhưng không có cách nhập lựa chọn đó, dẫn tới kết quả rộng hơn hoặc phải nhập lại trong app kế tiếp.

Evidence:

- `products/sprockets/index.html:293` và `:406-409` — copy cam kết tìm theo model type.
- `products/sprockets/index.html:444-474` — signal có `type` nhưng form chỉ render Make/Model/Year.
- `products/sprockets/index.html:452` — form handoff sang `https://sprocket.langbianggravity.com/finder`.

Đề xuất: thêm select `Model type` nếu finder backend hỗ trợ; hoặc bỏ `type` khỏi signal, FAQ và copy trên landing page nếu trường này chỉ xuất hiện ở bước sau. Nếu là bước sau, nói rõ “chọn type trong finder app” để expectation đúng.

### P2 — Motion story quá dài và đẩy finder xuống rất sâu

Desktop measurement cho thấy document cao khoảng `8,729px`; section motion story riêng có `min-height: 320vh`. Finder section bắt đầu khoảng `y=7,411px`, form khoảng `y=8,305px`. Hero có anchor “Find Your Sprocket” nên vẫn có đường tắt, nhưng người dùng đọc theo luồng tự nhiên phải đi qua một đoạn storytelling rất dài trước khi đến hành động chính.

Rủi ro: scroll fatigue, giảm khả năng tiếp cận finder và làm product page giống campaign microsite hơn là catalogue có intent fitment rõ.

Evidence:

- `styles.css:2882-2885` — motion story đặt `min-height: 320vh`.
- Desktop runtime: `scrollHeight ≈ 8729px`; finder section tại `y ≈ 7411px`.
- `products/sprockets/index.html:439` — chính copy cũng xác nhận “Scroll ends at the finder”.

Đề xuất: rút motion story còn khoảng 140–200vh, đưa một compact sticky/inline “Find fitment” CTA xuất hiện sau hero, hoặc đưa form finder lên trước technical narrative. Giữ animation như điểm nhấn nhưng không để nó là đường dẫn chính duy nhất.

### P2 — H1 desktop quá cao, chiếm vai trò poster nhiều hơn product index

Ở desktop runtime, H1 đo khoảng `584 × 572px` trong copy column rộng khoảng `584px`, tương đương khoảng tám dòng với font lớn và line-height `0.92`. Hình ảnh CAD, CTA và metrics bị đẩy thấp; người dùng phải đọc một headline rất cao trước khi thấy các thông tin scan nhanh.

Evidence:

- `styles.css:2659-2664` — H1 dùng `font-size: clamp(3.45rem, 5vw, 5.55rem)`.
- Desktop runtime measurement: hero copy width `584px`, H1 height `572px`.

Đề xuất: nới copy column hoặc tăng nhẹ max-width của H1, giảm font tối đa ở desktop khoảng 10–15%, giữ treatment hiện tại trên mobile nếu vẫn đúng art direction.

### P2 — Visual và claim kỹ thuật lặp nhiều, tạo cảm giác “rác”/dàn trải

Ba tầng nội dung cùng nói về gần như một nhóm claim: hero metrics nói `RS / RA / 520`, motion story nói material và fitment, Technical Product Stack lặp lại chain/material/SKU, sau đó Fitment Coverage và Fitment Guide tiếp tục nhắc lại front/rear/520. Cùng một asset `sprocket-cad-alpha.webp` cũng được dùng ở hero, motion machine và model visual (`:234`, `:256`, `:341`).

Rủi ro: page dài nhưng lượng thông tin mới trên mỗi screen thấp; phần “technical” trông như nhiều phiên bản của một card thay vì một hierarchy rõ ràng.

Đề xuất: chọn một section làm “technical proof” chính; gộp metrics + Technical Product Stack thành một comparison block; giữ Fitment Guide cho decision support. Dùng các asset có sẵn `sprocket-rs-steel.webp` và `sprocket-ra-aluminium.webp` cho material sections, thay vì lặp CAD chung.

### P2 — External handoff chưa đủ rõ và thiếu trạng thái tại chỗ

Hero, guide và finder có nhiều link sang `sprocket.langbianggravity.com`; form cũng submit trực tiếp sang domain đó trong cùng tab. Copy có nói “dedicated finder” nhưng label hành động chưa nhất quán: `Find Your Sprocket`, `Open Sprocket Finder`, `Open full finder`. Không có inline state cho việc form sẽ rời landing page, cũng không có validation UX cho year/model trước khi handoff.

Evidence:

- `products/sprockets/index.html:210`, `:429`, `:452`, `:477-478` — nhiều external destinations.
- Các external link hiện không có `target`/context label bổ sung.

Đề xuất: dùng một label thống nhất kiểu `Open fitment finder`, thêm microcopy “opens the dedicated finder app”, preserve query parameters như hiện tại, và validate nhẹ year/model nếu backend yêu cầu. Nếu mở tab mới, phải thêm `rel="noopener"` và thông báo rõ; nếu giữ cùng tab, vẫn nên cho biết người dùng sẽ rời trang này.

### P3 — HUD, metrics và signal dùng nhiều chữ uppercase rất nhỏ

Các label như HUD, hero metrics và finder signal dùng cỡ khoảng `0.68–0.74rem`, font nặng và uppercase. Trên nền nhiều grid/gradient, các nhãn này dễ bị đọc như texture hơn là thông tin. Đây chưa phải lỗi contrast đã xác nhận, nhưng là điểm polish và scanability cần xem lại ở màn hình laptop nhỏ.

Đề xuất: giảm số label trang trí, tăng cỡ các label mang thông tin thật, và chỉ giữ một cấp micro-label cho mỗi visual.

### P3 — Cross-reference xuất hiện nhiều lần trong cùng một route

`Cross-reference OEM code(s)` xuất hiện ở hero, guide links và finder links; finder cũng có cả `Open full finder` lẫn button submit cùng đi tới app. Các entry point có thể hữu ích cho use case khác nhau, nhưng hiện chưa có hierarchy rõ nên tạo cảm giác CTA bị rải.

Đề xuất: giữ một CTA chính ở hero và một nhóm secondary links ở cuối; trong guide chỉ giữ link nội bộ liên quan trực tiếp đến nội dung guide.

## Các điểm đạt

- Hero có CTA anchor tới `#find-your-sprocket`, không buộc người dùng phải tự tìm form ở cuối.
- Form labels là label thật, select có option rõ; FAQ dùng native `<details>/<summary>` nên có keyboard semantics tốt.
- Visual-only CAD được đặt trong vùng `aria-hidden="true"` với `alt=""`, phù hợp với vai trò trang trí.
- Skip link, header navigation, Quote button và footer dùng đúng shared site pattern.
- Mobile chuyển hero, motion steps và finder form sang một cột; runtime check không có document-level horizontal overflow.
- `prefers-reduced-motion` đã được nhận diện trong JS và tắt animation hero; cần sửa thêm trạng thái visibility của các motion steps như P1 ở trên.
- Local preview không ghi nhận console error/warning; các asset sprocket chính load thành công.

## Trade-off theo design direction, chưa xem là lỗi bắt buộc

HUD, grid, scan line, ring và motion CAD tạo ra một trải nghiệm branded rõ và phù hợp với race-engineering positioning. Cropping CAD/teeth ở mobile cũng là lựa chọn art direction có chủ ý; không nên loại bỏ nếu visual impact là mục tiêu. Các đề xuất trên ưu tiên làm rõ hierarchy và đường dẫn fitment, không phải làm trang thành catalogue phẳng.

## Thứ tự đề xuất xử lý

1. Sửa reduced-motion để mọi motion step vẫn nhìn thấy và đọc được.
2. Đồng bộ promise `model type` với form/backend.
3. Rút ngắn motion story hoặc thêm CTA finder cố định sau hero.
4. Gộp các block claim lặp và thay một phần CAD bằng asset RS/RA chuyên biệt.
5. Tinh chỉnh H1 desktop, external handoff copy và mật độ micro-label.

## Verification

- Preview local: `python -m http.server 4176`.
- Desktop: kiểm tra hero, H1 height, section order, motion story và vị trí finder.
- Mobile breakpoint: kiểm tra tại viewport breakpoint `max-width: 720px`, form một cột, motion steps hiển thị và document width.
- Interaction: kiểm tra anchor `Find Your Sprocket`, external finder/cross-reference destinations, native FAQ và motion active state khi scroll.
- Static/runtime: kiểm tra `prefers-reduced-motion`, DOM controls, loaded images, console logs và overflow.
