#!/usr/bin/env python3
import argparse
import os
from pathlib import Path

from PIL import Image


def iter_images(root: Path):
    exts = {".jpg", ".jpeg", ".png"}
    for path in root.rglob("*"):
        if path.is_file() and path.suffix.lower() in exts:
            yield path


def ensure_dir(path: Path):
    path.mkdir(parents=True, exist_ok=True)


def needs_update(src: Path, dest: Path) -> bool:
    if not dest.exists():
        return True
    return src.stat().st_mtime > dest.stat().st_mtime


def make_thumb(src: Path, dest: Path, max_size: int, quality: int):
    with Image.open(src) as img:
        img = img.copy()
        img.thumbnail((max_size, max_size), Image.LANCZOS)

        ensure_dir(dest.parent)

        if dest.suffix.lower() in {".jpg", ".jpeg"}:
            if img.mode not in ("RGB", "L"):
                img = img.convert("RGB")
            img.save(dest, quality=quality, optimize=True, progressive=True)
        elif dest.suffix.lower() == ".png":
            img.save(dest, optimize=True)
        else:
            img.save(dest)


def main():
    parser = argparse.ArgumentParser(
        description="Generate lightweight thumbnails for photos used in the grid."
    )
    parser.add_argument(
        "--src",
        default="public/photos",
        help="Source photo directory (default: public/photos)",
    )
    parser.add_argument(
        "--dest",
        default="public/photos/thumbs",
        help="Destination directory for thumbnails (default: public/photos/thumbs)",
    )
    parser.add_argument(
        "--max-size",
        type=int,
        default=640,
        help="Max width/height for thumbnail (default: 640)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=72,
        help="JPEG quality (default: 72)",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate all thumbnails even if up to date",
    )

    args = parser.parse_args()
    src_root = Path(args.src)
    dest_root = Path(args.dest)

    if not src_root.exists():
        raise SystemExit(f"Source directory not found: {src_root}")

    count = 0
    for src in iter_images(src_root):
        # Skip thumbnails if we re-run in the thumbs folder.
        if dest_root in src.parents:
            continue

        rel = src.relative_to(src_root)
        dest = dest_root / rel

        if args.force or needs_update(src, dest):
            make_thumb(src, dest, args.max_size, args.quality)
            count += 1

    print(f"Generated {count} thumbnails in {dest_root}")


if __name__ == "__main__":
    main()
