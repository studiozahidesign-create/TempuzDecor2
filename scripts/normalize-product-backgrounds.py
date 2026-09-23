"""Build lossless, uniform-background derivatives; retain original photography.

Run with Pillow and numpy installed. Only near-background pixels connected to
the outside of the photograph are normalized; enclosed product highlights stay.
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/images/products"
OUTPUT = SOURCE / "uniform"
BACKGROUND = (247, 247, 247)


def normalize(source):
    rgba = Image.open(source).convert("RGBA")
    canvas = Image.new("RGBA", rgba.size, BACKGROUND + (255,))
    canvas.alpha_composite(rgba)
    rgb = np.array(canvas.convert("RGB"))
    corners = np.concatenate([rgb[:8, :8].reshape(-1, 3), rgb[:8, -8:].reshape(-1, 3),
                              rgb[-8:, :8].reshape(-1, 3), rgb[-8:, -8:].reshape(-1, 3)])
    base = np.median(corners, axis=0)
    if base.min() < 235 or base.max() - base.min() > 5:
        raise ValueError(f"Background needs manual review: {source.name}: {base}")
    distance = np.max(np.abs(rgb.astype(float) - base), axis=2)
    # Flood from a padded exterior to avoid changing upholstery highlights.
    candidate = (distance <= 18).astype(np.uint8) * 255
    padded = Image.new("L", (rgba.width + 2, rgba.height + 2), 255)
    padded.paste(Image.fromarray(candidate), (1, 1))
    ImageDraw.floodfill(padded, (0, 0), 128, thresh=0)
    exterior = np.array(padded)[1:-1, 1:-1] == 128
    blend = np.clip((18 - distance) / 14, 0, 1) * exterior
    normalized = rgb.astype(float) + (np.array(BACKGROUND) - base) * blend[..., None]
    # Remove tiny JPEG variations from the flat background, not from the object.
    flat = exterior & (distance <= 8)
    normalized[flat] = BACKGROUND
    return Image.fromarray(np.clip(np.rint(normalized), 0, 255).astype(np.uint8))


def main():
    OUTPUT.mkdir(exist_ok=True)
    catalog = json.loads((SOURCE / "catalog.json").read_text(encoding="utf-8"))
    mapping = {}
    sheet = Image.new("RGB", (1200, 170 * 11), "white")
    draw = ImageDraw.Draw(sheet)
    for index, product in enumerate(catalog["products"]):
        original = product.get("originalImage", product["image"])
        source = ROOT / "public" / original.lstrip("/")
        result = normalize(source)
        target = OUTPUT / (source.stem + ".png")
        result.save(target, optimize=True)
        url = "/images/products/uniform/" + target.name
        mapping[original] = url
        product["originalImage"] = original
        product["image"] = url
        thumb = result.copy()
        thumb.thumbnail((190, 142))
        x, y = (index % 6) * 200, (index // 6) * 170
        sheet.paste(thumb, (x + (200 - thumb.width) // 2, y))
        draw.text((x + 5, y + 146), source.stem[:26], fill="black")
    (ROOT / "tmp").mkdir(exist_ok=True)
    sheet.save(ROOT / "tmp/product-background-review.jpg")
    (SOURCE / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # Mechanical URL migration across all consumers, including Figma imports.
    for source in (ROOT / "src").rglob("*"):
        if source.suffix not in (".tsx", ".ts", ".css", ".json"):
            continue
        previous = source.read_text(encoding="utf-8")
        updated = previous
        for original, replacement in mapping.items():
            updated = updated.replace(original, replacement)
        if updated != previous:
            source.write_text(updated, encoding="utf-8")
    print(f"Normalized {len(mapping)} product images to #F7F7F7; originals retained.")


if __name__ == "__main__":
    main()
