# Fusion sprocket asset drop

Thu muc nay la diem nhan asset cho hero va design showcase moi cua `/products/sprockets/`.

## Nguon chinh thuc

- `LBG_R_Mark_I.pdf`: Langbiang Gravity / Rear / Mark I.
- `LBG_R_Mark_II.pdf.pdf`: Langbiang Gravity / Rear / Mark II. Giữ nguyên tên PDF anh đã xuất.
- `LBG_R_Mark_III.pdf`: Langbiang Gravity / Rear / Mark III.

Các file `lbg-r-mark-i.svg`, `lbg-r-mark-ii.svg`, `lbg-r-mark-iii.svg` là bản vector crop tight, nền trong suốt từ ba PDF trên. UI dùng trực tiếp SVG để giữ nguyên nét Fusion; không chỉnh tay trực tiếp các SVG này nếu chưa export lại từ PDF.

`fusion-sprocket.webp` là placeholder legacy từ vòng dựng trước; UI hiện tại không còn lấy file này làm nguồn chính.

`sprocket-motion-15s.mp4` là video teaser 15 giây render trực tiếp từ `LBG_R_Mark_III.pdf` ở 600 dpi.

## Khi thay bằng bản export Fusion mới

1. Ghi đè đúng PDF Mark tương ứng, giữ quy ước `LBG_R_Mark_I.pdf`, `LBG_R_Mark_II.pdf.pdf`, `LBG_R_Mark_III.pdf`.
2. Chạy `python tools/extract-sprocket-showcase.py` để export lại ba SVG crop tight.
3. Chạy `python tools/generate-sprocket-video.py` để render lại video chính diện từ Mark III ở 600 dpi.

Generator cần Python, Pillow và `imageio-ffmpeg`.

Không bake nền, chữ, logo, glow hoặc shadow vào file Fusion. Các lớp đó được xử lý trong UI.
