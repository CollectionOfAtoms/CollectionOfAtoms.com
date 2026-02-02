#!/usr/bin/env python3
import argparse
from pathlib import Path

from PIL import Image


def parse_center(value):
    if "," in value:
        x_str, y_str = value.split(",", 1)
    else:
        raise argparse.ArgumentTypeError("center must be in 'x,y' format")
    return float(x_str.strip()), float(y_str.strip())


def clamp(val, lo, hi):
    return max(lo, min(hi, val))


def resolve_center(center, width, height):
    cx, cy = center
    # If values are between 0 and 1, treat them as percentages.
    if 0 <= cx <= 1 and 0 <= cy <= 1:
        return cx * width, cy * height
    return cx, cy


def make_square_thumb(src, dest, size, center, quality):
    with Image.open(src) as img:
        img = img.convert("RGB") if img.mode not in ("RGB", "L") else img.copy()
        w, h = img.size
        side = min(w, h)

        cx, cy = resolve_center(center, w, h)
        left = clamp(cx - side / 2, 0, w - side)
        top = clamp(cy - side / 2, 0, h - side)
        right = left + side
        bottom = top + side

        cropped = img.crop((int(left), int(top), int(right), int(bottom)))
        thumb = cropped.resize((size, size), Image.LANCZOS)

        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.suffix.lower() in {".jpg", ".jpeg"}:
            thumb.save(dest, quality=quality, optimize=True, progressive=True)
        else:
            thumb.save(dest)


def main():
    parser = argparse.ArgumentParser(
        description="Create a square thumbnail with a configurable center point."
    )
    parser.add_argument(
        "filename",
        help="Filename within public/photos (e.g. 20190608_160812~2.jpg)",
    )
    parser.add_argument(
        "--size",
        type=int,
        default=640,
        help="Thumbnail size in pixels (default: 640)",
    )
    parser.add_argument(
        "--center",
        type=parse_center,
        default=(0.5, 0.5),
        help="Center point as x,y (0-1 for percentages or pixel values). Default: 0.5,0.5",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=72,
        help="JPEG quality (default: 72)",
    )

    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    src = root / "public" / "photos" / args.filename
    dest = root / "public" / "photos" / "thumbs" / args.filename

    if not src.exists():
        raise SystemExit(f"Source file not found: {src}")

    make_square_thumb(src, dest, args.size, args.center, args.quality)
    print(f"Saved thumbnail to {dest}")


if __name__ == "__main__":
    main()
