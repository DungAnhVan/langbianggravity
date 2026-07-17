from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/images/hero-test-rig-social-hq.png"
FONT_IMPACT = Path(r"C:\Windows\Fonts\impact.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\arialbd.ttf")
FONT_REGULAR = Path(r"C:\Windows\Fonts\arial.ttf")

W, H = 2400, 1260


def font(path, size):
    return ImageFont.truetype(str(path), size)


def contain(image, box):
    max_w, max_h = box
    ratio = min(max_w / image.width, max_h / image.height)
    return image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)


def dark_line_art_on_white(source_path):
    source = Image.open(source_path).convert("L")
    alpha = source.point(lambda value: max(0, min(255, (245 - value) * 5)))
    image = Image.new("RGBA", source.size, (255, 255, 255, 0))
    image.putalpha(alpha)
    return image


def light_line_art_on_dark(source_path):
    source = Image.open(source_path).convert("L")
    alpha = source.point(lambda value: max(0, min(255, (value - 105) * 2)))
    image = Image.new("RGBA", source.size, (255, 255, 255, 0))
    image.putalpha(alpha)
    return image


def remove_white_background(source_path):
    source = Image.open(source_path).convert("RGBA")
    luminance = source.convert("L")
    alpha = luminance.point(lambda value: max(0, min(255, (248 - value) * 5)))
    source.putalpha(alpha)
    return source


def composite_in_card(canvas, card_mask, source, x, y, max_w, max_h):
    art = contain(source, (max_w, max_h))
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    layer.alpha_composite(art, (round(x + (max_w - art.width) / 2), round(y + (max_h - art.height) / 2)))
    layer.putalpha(Image.composite(layer.getchannel("A"), Image.new("L", canvas.size), card_mask))
    canvas.alpha_composite(layer)


def draw_label(draw, xy, text, text_font, fill, spacing=0):
    draw.text(xy, text, font=text_font, fill=fill, spacing=spacing)


def main():
    canvas = Image.new("RGBA", (W, H), "#090c0c")
    draw = ImageDraw.Draw(canvas)

    # Header: keep it deliberately quiet so the four product lines are dominant.
    logo = Image.open(ROOT / "assets/brand/logo-white.png").convert("RGBA")
    logo = contain(logo, (350, 90))
    canvas.alpha_composite(logo, (70, 42))
    draw.text((W - 70, 62), "FOUR LINES / ONE RACE SYSTEM", font=font(FONT_BOLD, 28), fill="#f2f5f3", anchor="ra")
    draw.line((70, 132, W - 70, 132), fill="#56605f", width=2)

    cards = [
        {
            "number": "01", "kicker": "DRIVE SYSTEM", "name": "SPROCKET", "detail": "42CRM04 / 520 PLATFORM",
            "spec": "MODEL / YEAR / HUB", "tag": "LBG / 04", "color": "#fa4b20", "ink": "#06090a",
            "art": dark_line_art_on_white(ROOT / "assets/products/sprocket-editorial/LBG_R_Mark_III.png"), "art_box": (385, 430),
        },
        {
            "number": "02", "kicker": "BRAKING SYSTEM", "name": "BRAKE\nROTOR", "detail": "SUS420 / ROTOR PROGRAM",
            "spec": "DIAMETER / BOLT PATTERN", "tag": "LBG / 04", "color": "#bbf92c", "ink": "#070a08",
            "art": Image.open(ROOT / "assets/products/brake-rotor/LBG-F-KR94-cutout.png").convert("RGBA"), "art_box": (400, 430),
        },
        {
            "number": "03", "kicker": "MACHINED PROTECTION", "name": "CNC\nPERFORMANCE", "detail": "CLUTCH COVER / DESIGN CONTROL",
            "spec": "MODEL / DRAWING / FINISH", "tag": "LBG / 04", "color": "#0969bd", "ink": "#f8fbff",
            "art": light_line_art_on_dark(ROOT / "assets/products/cnc-performance/clutch-cover-design.webp"), "art_box": (430, 410),
        },
        {
            "number": "04", "kicker": "RACE HARDWARE", "name": "BOLT\nKITS", "detail": "TI-6AL-4V / APPLICATION-LED",
            "spec": "THREAD / LENGTH / TORQUE", "tag": "LBG / 04", "color": "#d8dfdc", "ink": "#0a0d0d",
            "art": remove_white_background(ROOT / "assets/products/bolt-kits/bolt-kit-hero.png"), "art_box": (340, 360),
        },
    ]

    card_y, card_h, card_w, gap, first_x = 165, 980, 500, 38, 145
    for index, card in enumerate(cards):
        x = first_x + index * (card_w + gap)
        polygon = [(x + 16, card_y), (x + card_w, card_y), (x + card_w - 16, card_y + card_h), (x, card_y + card_h)]
        mask = Image.new("L", (W, H), 0)
        ImageDraw.Draw(mask).polygon(polygon, fill=255)
        base_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(base_layer).polygon(polygon, fill=card["color"])
        canvas.alpha_composite(base_layer)

        card_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        card_draw = ImageDraw.Draw(card_layer)
        # Restrained diagonal tonal fields retain the established technical character without fine detail.
        card_draw.polygon([(x + 205, card_y), (x + 300, card_y), (x + 150, card_y + card_h), (x + 55, card_y + card_h)], fill=(255, 255, 255, 18))
        card_draw.text((x + card_w - 18, card_y + 85), card["number"], font=font(FONT_IMPACT, 250), fill=(255, 255, 255, 25), anchor="ra")
        canvas.alpha_composite(card_layer)
        draw = ImageDraw.Draw(canvas)

        draw.text((x + 32, card_y + 40), card["number"], font=font(FONT_IMPACT, 68), fill=card["ink"])
        draw.text((x + card_w - 32, card_y + 55), card["kicker"], font=font(FONT_BOLD, 20), fill=card["ink"], anchor="ra")
        draw.line((x + 32, card_y + 155, x + card_w - 32, card_y + 155), fill=card["ink"], width=2)

        composite_in_card(canvas, mask, card["art"], x + 50, card_y + 175, *card["art_box"])
        draw = ImageDraw.Draw(canvas)

        name_y = card_y + 720 if "\n" not in card["name"] else card_y + 660
        draw.multiline_text((x + 32, name_y), card["name"], font=font(FONT_IMPACT, 82), fill=card["ink"], spacing=-12)
        draw.text((x + 32, card_y + 865), card["detail"], font=font(FONT_BOLD, 17), fill=card["ink"])
        draw.line((x + 32, card_y + 900, x + card_w - 32, card_y + 900), fill=card["ink"], width=2)
        draw.text((x + 32, card_y + 930), card["spec"], font=font(FONT_BOLD, 16), fill=card["ink"])
        draw.text((x + card_w - 32, card_y + 930), card["tag"], font=font(FONT_BOLD, 16), fill=card["ink"], anchor="ra")

    draw.line((70, 1180, W - 70, 1180), fill="#56605f", width=2)
    draw.text((70, 1210), "FITMENT-LED HARD PARTS / DA LAT, VIETNAM", font=font(FONT_BOLD, 24), fill="#f0f3f1")
    draw.text((W - 70, 1210), "LANGBIANGGRAVITY.COM", font=font(FONT_BOLD, 24), fill="#f0f3f1", anchor="ra")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT, format="PNG", optimize=True, compress_level=9)
    print(OUT)


if __name__ == "__main__":
    main()
