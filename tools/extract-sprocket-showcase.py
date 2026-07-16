"""Tight-crop Fusion PDF renders into web-ready sprocket showcase assets."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets/products/sprocket-editorial"
MARKS = {
    "I": "lbg-r-mark-i.webp",
    "II": "lbg-r-mark-ii.webp",
    "III": "lbg-r-mark-iii.webp",
}


def crop_mark(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGB")
    grayscale = ImageOps.grayscale(image)
    mask = grayscale.point(lambda value: 255 if value < 245 else 0)
    bbox = mask.getbbox()
    if not bbox:
        raise ValueError(f"No sprocket linework found in {source}")

    left, top, right, bottom = bbox
    width = right - left
    height = bottom - top
    pad_x = int(width * 0.075)
    pad_y = int(height * 0.075)
    crop = image.crop((max(0, left - pad_x), max(0, top - pad_y), min(image.width, right + pad_x), min(image.height, bottom + pad_y)))
    crop = ImageEnhance.Contrast(crop).enhance(1.08)
    crop.thumbnail((1600, 1600), Image.Resampling.LANCZOS)

    # Fusion PDF renders are white-backed line drawings. Convert paper white
    # to alpha while retaining anti-aliased edge pixels on the black ink.
    luminance = ImageOps.grayscale(crop)
    alpha = luminance.point(lambda value: 255 - value)
    transparent = Image.new("RGBA", crop.size, (18, 18, 18, 0))
    transparent.putalpha(alpha)
    output.parent.mkdir(parents=True, exist_ok=True)
    transparent.save(output, "WEBP", quality=94, method=6)
    print(f"{output.name}: {transparent.size} / transparent")


def main() -> None:
    for mark, filename in MARKS.items():
        crop_mark(ASSET_DIR / f"LBG_R_Mark_{mark}.png", ASSET_DIR / filename)


if __name__ == "__main__":
    main()
