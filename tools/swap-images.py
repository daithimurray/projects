#!/usr/bin/env python3
"""Swap placeholder image plates for real photography.

    python3 tools/swap-images.py <site-folder> <source-dir> [--dry-run]

Matches files in <source-dir> to the placeholder slots in <site-folder>/images
by base name (case-insensitive, ignoring separators), copies them in, and
rewrites the src attributes in the site's HTML from .svg to the real extension.

Nothing is guessed: files that match no slot, and slots that receive no file,
are both reported so a swap never happens silently.
"""
import sys, shutil, re
from pathlib import Path

EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.avif')


def key(name: str) -> str:
    return re.sub(r'[^a-z0-9]', '', name.lower())


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    dry = '--dry-run' in sys.argv
    if len(args) != 2:
        print(__doc__)
        return 2

    site, src = Path(args[0]), Path(args[1])
    images = site / 'images'
    if not images.is_dir():
        print(f"error: {images} does not exist")
        return 1
    if not src.is_dir():
        print(f"error: {src} is not a directory")
        return 1

    slots = {key(p.stem): p.stem for p in sorted(images.glob('*.svg'))}
    incoming = [p for p in sorted(src.iterdir())
                if p.is_file() and p.suffix.lower() in EXTS]
    if not incoming:
        print(f"error: no images ({', '.join(EXTS)}) found in {src}")
        return 1

    htmls = sorted(site.glob('*.html'))
    swapped, unmatched, used = [], [], set()

    for f in incoming:
        slot = slots.get(key(f.stem))
        if not slot:
            unmatched.append(f.name)
            continue
        dest = images / f"{slot}{f.suffix.lower()}"
        print(f"  {f.name}  ->  {dest}")
        if not dry:
            shutil.copy2(f, dest)
            for h in htmls:
                text = h.read_text()
                new = text.replace(f'images/{slot}.svg', f'images/{slot}{f.suffix.lower()}')
                if new != text:
                    h.write_text(new)
        swapped.append(slot)
        used.add(slot)

    missing = [s for s in slots.values() if s not in used]

    print()
    print(f"swapped:   {len(swapped)}" + (" (dry run, nothing written)" if dry else ""))
    if unmatched:
        print(f"unmatched files (no slot of that name): {', '.join(unmatched)}")
    if missing:
        print(f"slots still on placeholders: {', '.join(missing)}")
    if swapped and not dry:
        print("\nRemember to delete the unused .svg plates once every slot is real,")
        print("and to re-check alt text in the markup against the actual photographs.")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
