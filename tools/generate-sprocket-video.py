"""Generate the 15-second kinetic sprocket teaser used by the product page."""

from __future__ import annotations

import argparse
import math
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

try:
    import imageio_ffmpeg
except ImportError as exc:
    raise SystemExit("Install imageio-ffmpeg before running this generator.") from exc


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "assets/products/sprocket-editorial/LBG_R_Mark_III.pdf"
DEFAULT_OUTPUT = ROOT / "assets/products/sprocket-editorial/sprocket-motion-15s.mp4"


def build_frame(source: Image.Image, frame: int, frame_count: int, size: tuple[int, int]) -> Image.Image:
    width, height = size
    phase = (frame / frame_count) * math.tau
    canvas = Image.new("RGB", size, "#f8f8f6")
    draw = ImageDraw.Draw(canvas, "RGBA")

    for x in range(0, width, width // 8):
        draw.line((x, 0, x, height), fill=(23, 23, 23, 13), width=1)

    slash_center = width * 0.55 + math.sin(phase) * 18
    slash_width = width * 0.15
    draw.polygon(
        (
            (slash_center - slash_width, -80),
            (slash_center + slash_width * 0.25, -80),
            (slash_center + slash_width, height + 80),
            (slash_center - slash_width * 0.25, height + 80),
        ),
        fill=(239, 28, 37, 255),
    )

    orbit_size = int(height * 0.76)
    orbit_left = int(width * 0.5 - orbit_size * 0.5)
    orbit_top = int(height * 0.5 - orbit_size * 0.5)
    draw.ellipse(
        (orbit_left, orbit_top, orbit_left + orbit_size, orbit_top + orbit_size),
        outline=(23, 23, 23, 42),
        width=2,
    )

    scale = 0.69 + 0.025 * math.sin(phase)
    target = int(height * scale)
    ratio = target / source.height
    product = source.resize((int(source.width * ratio), target), Image.Resampling.LANCZOS)
    angle = 0
    product = product.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    x = int(width * 0.5 - product.width * 0.5 + 15 * math.sin(phase))
    y = int(height * 0.5 - product.height * 0.5 + 7 * math.cos(phase))
    canvas.paste(product, (x, y), product)

    scan_x = int((frame / frame_count) * (width + 240)) - 120
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.polygon(
        ((scan_x - 34, 0), (scan_x, 0), (scan_x + 120, height), (scan_x + 86, height)),
        fill=(255, 255, 255, 24),
    )
    return Image.alpha_composite(canvas.convert("RGBA"), overlay).convert("RGB")


def load_source(source_path: Path) -> Image.Image:
    if source_path.suffix.lower() != ".pdf":
        source = Image.open(source_path).convert("RGBA")
    else:
        renderer = shutil.which("pdftocairo")
        if not renderer:
            raise SystemExit("pdftocairo is required to render a Fusion PDF video source.")
        with tempfile.TemporaryDirectory() as temp_dir:
            base = Path(temp_dir) / "sprocket-video"
            subprocess.run(
                [renderer, "-png", "-r", "600", "-singlefile", str(source_path), str(base)],
                check=True,
                capture_output=True,
            )
            raster = Image.open(base.with_suffix(".png")).convert("RGB")
            luminance = ImageOps.grayscale(raster)
            alpha = luminance.point(lambda value: 255 - value)
            source = Image.new("RGBA", raster.size, (18, 18, 18, 0))
            source.putalpha(alpha)

    alpha_box = source.getchannel("A").getbbox()
    return source.crop(alpha_box) if alpha_box else source


def generate(source_path: Path, output_path: Path, duration: int = 15, fps: int = 24) -> None:
    size = (1280, 720)
    source = load_source(source_path)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    frame_count = duration * fps
    writer = imageio_ffmpeg.write_frames(
        str(output_path),
        size,
        fps=fps,
        codec="libx264",
        pix_fmt_in="rgb24",
        pix_fmt_out="yuv420p",
        quality=7,
        macro_block_size=16,
        ffmpeg_log_level="warning",
        output_params=["-movflags", "+faststart"],
    )
    writer.send(None)
    try:
        for frame in range(frame_count):
            image = build_frame(source, frame, frame_count, size)
            writer.send(image.tobytes())
    finally:
        writer.close()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    generate(args.source.resolve(), args.output.resolve())


if __name__ == "__main__":
    main()
