# Alder & Frost — photography brief

Fictional demo — licensed stock is fine. Restraint is the point: two images only.

Drop real files into `images/` using **the same base name** as the placeholder,
in `.jpg` or `.webp`. Then update the `src` in the markup (or run the swap
helper from the repo root — see below). Ratios are already reserved in CSS, so
nothing on the page shifts when the real image loads.

## Shot list

| File | Ratio | Min size | Where it appears | The shot |
|------|-------|----------|------------------|----------|
| `atmosphere-city` | 12:5 | 2400×1000 | Behind the pull-quote band | Dublin at dusk: glass, water, long exposure. Low-key and near-monochrome — the emerald grade supplies the colour. |
| `boardroom-detail` | 4:3 | 1600×1200 | Approach section, right column | Low-key working detail: hands, documents, a table edge in shadow. Moody and expensive. No faces needed. |

## Per-slot technical notes

- **`atmosphere-city`** — Sits under a heavy green+black gradient, so detail in shadow is fine; avoid bright skies.
- **`boardroom-detail`** — Hidden below 900px.

## Direction notes

- Both images are graded into the palette, so anything too warm or too bright will fight the brand.
- Do not add people-heavy 'team' imagery: this brand's confidence comes from restraint and typography.

## Sourcing: what to search for

**Licence first.** Unsplash and Pexels are free for commercial use without
attribution; Stocksy is paid but far less recognisable. Never publish a
watermarked comp.

**Avoid** anything that says "business meeting", "finance", "accountant" or
"teamwork" — that search returns smiling stock people at laptops, which would
destroy this brand's restraint instantly. This site wants *atmosphere*, not
people.

| Slot | Search instead for |
|------|--------------------|
| `atmosphere-city` | "Dublin docklands night", "city dusk long exposure", "architecture reflection dark", "night water city lights" |
| `boardroom-detail` | "documents low light", "hands writing shadow", "dark table edge minimal", "chiaroscuro still life paper" |

Both images sit under heavy black-and-emerald gradients, so choose frames that
are already dark and near-monochrome. A bright, warm, cheerful photograph will
fight the grade and look wrong no matter how it is treated.

## Preparing files

- Export at the min size above (2× that if you want retina headroom), sRGB.
- Compress to WebP where you can; keep hero files under ~250 KB and others
  under ~150 KB (PRD-style performance targets: LCP ≤ 2.5 s).
- Name them exactly as the table's `File` column, e.g. `atmosphere-city.webp`.
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
