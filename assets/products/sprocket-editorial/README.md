# Fusion sprocket asset drop

Thu muc nay la diem nhan asset cho hero va design showcase moi cua `/products/sprockets/`.

## Nguon chinh thuc

- `LBG_R_Mark_I.pdf`: Langbiang Gravity / Rear / Mark I.
- `LBG_R_Mark_II.pdf.pdf`: Langbiang Gravity / Rear / Mark II. Giữ nguyên tên PDF anh đã xuất.
- `LBG_R_Mark_III.pdf`: Langbiang Gravity / Rear / Mark III.

Các file `lbg-r-mark-i.webp`, `lbg-r-mark-ii.webp`, `lbg-r-mark-iii.webp` là bản render, crop tight và tách nền trong suốt từ ba PDF trên, dùng cho design showcase và UI. Không chỉnh tay trực tiếp các WebP này nếu chưa render lại từ PDF.

`fusion-sprocket.webp` là placeholder legacy từ vòng dựng trước; UI hiện tại không còn lấy file này làm nguồn chính.

`sprocket-motion-15s.mp4` là video teaser 15 giây tạo từ `lbg-r-mark-iii.webp`.

## Khi thay bằng bản export Fusion mới

1. Ghi đè đúng PDF Mark tương ứng, giữ quy ước `LBG_R_Mark_I.pdf`, `LBG_R_Mark_II.pdf.pdf`, `LBG_R_Mark_III.pdf`.
2. Render lại ba PDF thành PNG bằng `pdftoppm` ở khoảng 180 dpi.
3. Chạy `python tools/extract-sprocket-showcase.py` để crop lại ba WebP showcase.
4. Chạy `python tools/generate-sprocket-video.py` để render lại video chính diện từ Mark III.

Generator cần Python, Pillow và `imageio-ffmpeg`.

Không bake nền, chữ, logo, glow hoặc shadow vào file Fusion. Các lớp đó được xử lý trong UI.
