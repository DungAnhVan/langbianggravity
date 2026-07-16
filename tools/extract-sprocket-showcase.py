"""Export Fusion PDFs to tightly framed, transparent SVG artwork for the sprocket UI."""

from __future__ import annotations

import re
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets/products/sprocket-editorial"
RENDER_DPI = 600
PADDING_RATIO = 0.075
MARKS = {
    "I": ("LBG_R_Mark_I.pdf", "lbg-r-mark-i.svg"),
    "II": ("LBG_R_Mark_II.pdf.pdf", "lbg-r-mark-ii.svg"),
    "III": ("LBG_R_Mark_III.pdf", "lbg-r-mark-iii.svg"),
}


def find_renderer() -> str:
    renderer = shutil.which("pdftocairo")
    if not renderer:
        raise SystemExit("pdftocairo is required to export Fusion PDF assets.")
    return renderer


def drawing_box_in_points(pdf: Path, renderer: str) -> tuple[float, float, float, float]:
    """Find the linework bounds at high resolution, then map them to the PDF page."""
    with tempfile.TemporaryDirectory() as temp_dir:
        base = Path(temp_dir) / "drawing"
        subprocess.run(
            [renderer, "-png", "-r", str(RENDER_DPI), "-singlefile", str(pdf), str(base)],
            check=True,
            capture_output=True,
        )
        image = Image.open(base.with_suffix(".png")).convert("RGB")
        mask = ImageOps.grayscale(image).point(lambda value: 255 if value < 245 else 0)
        bbox = mask.getbbox()
        if not bbox:
            raise ValueError(f"No linework found in {pdf.name}")

        # Fusion's current PDFs are A4: 595 x 842 points.
        page_width, page_height = 595.0, 842.0
        left, top, right, bottom = bbox
        x = left / image.width * page_width
        y = top / image.height * page_height
        width = (right - left) / image.width * page_width
        height = (bottom - top) / image.height * page_height
        pad_x = width * PADDING_RATIO
        pad_y = height * PADDING_RATIO
        return x - pad_x, y - pad_y, width + pad_x * 2, height + pad_y * 2


def export_mark(pdf: Path, output: Path, renderer: str) -> None:
    subprocess.run([renderer, "-svg", str(pdf), str(output)], check=True, capture_output=True)
    x, y, width, height = drawing_box_in_points(pdf, renderer)
    svg = output.read_text(encoding="utf-8")
    root_attributes = f'width="{width:.3f}pt" height="{height:.3f}pt" viewBox="{x:.3f} {y:.3f} {width:.3f} {height:.3f}"'
    cropped_svg, count = re.subn(r'width="[^"]+" height="[^"]+" viewBox="[^"]+"', root_attributes, svg, count=1)
    if count != 1:
        raise ValueError(f"Could not set cropped viewBox in {output.name}")
    output.write_text(cropped_svg, encoding="utf-8")
    print(f"{output.name}: vector / transparent / viewBox {width:.1f} x {height:.1f}pt")


def main() -> None:
    renderer = find_renderer()
    for pdf_name, svg_name in MARKS.values():
        export_mark(ASSET_DIR / pdf_name, ASSET_DIR / svg_name, renderer)


if __name__ == "__main__":
    main()
