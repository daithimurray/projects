# Hedgerow Accounting — photography brief

Fictional demo — licensed stock is fine. This is the image-led site of the three.

Drop real files into `images/` using **the same base name** as the placeholder,
in `.jpg` or `.webp`. Then update the `src` in the markup (or run the swap
helper from the repo root — see below). Ratios are already reserved in CSS, so
nothing on the page shifts when the real image loads.

## Shot list

| File | Ratio | Min size | Where it appears | The shot |
|------|-------|----------|------------------|----------|
| `hero-field` | 4:5 | 1400×1750 | Hero, tall left image | Kilkenny farmland with hedgerow in the foreground. Soft overcast light, unhurried, editorial. |
| `hero-hands` | 4:3 | 1200×900 | Hero, small right image | Something human and close: hands with produce, a gate latch, a ledger on a kitchen table. |
| `season-spring` | 1:1 | 900×900 | Seasons grid | Bare field drying out, first green showing. Cool light. |
| `season-summer` | 1:1 | 900×900 | Seasons grid | Full growth, warm haze, late evening light. |
| `season-autumn` | 1:1 | 900×900 | Seasons grid | Harvest colour, gold and brown, low sun. |
| `season-winter` | 1:1 | 900×900 | Seasons grid | Frost on a bare hedgerow, or kitchen-window light. |
| `about-thomastown` | 3:2 | 1800×1200 | About section | Thomastown, Co. Kilkenny: the farm office, a lane, or the town at a distance. |

## Per-slot technical notes

- **`hero-field`** — LCP image — do not lazy-load.
- **`hero-hands`** — Hidden below 700px.
- **`season-spring`** — One of four; keep the set consistent in light and distance.

## Direction notes

- The four season images are the signature moment — shoot or source them as a set so they read as one year, not four stock photos.
- Every image carries a warm multiply grade to hold it inside the cream/olive palette.
- Avoid glossy agri-machinery hero shots; this brand is quiet and human.

## Preparing files

- Export at the min size above (2× that if you want retina headroom), sRGB.
- Compress to WebP where you can; keep hero files under ~250 KB and others
  under ~150 KB (PRD-style performance targets: LCP ≤ 2.5 s).
- Name them exactly as the table's `File` column, e.g. `hero-field.webp`.
- Set `--focal` on a figure if the subject sits off-centre, e.g.
  `<figure class="fig fig-4x5" style="--focal: 30% 40%">`.

## Swapping placeholders for real files

From the repo root:

```bash
python3 tools/swap-images.py <site-folder> <path-to-your-images>
```

It matches your files to the slots by base name, copies them into `images/`,
and rewrites the `src` attributes from `.svg` to the real extension. Anything
it can't match is listed so nothing swaps silently.
