# Liffey Accountancy — photography brief

Real client site — photography rules are strict (PRD §16, §30.5, §42, §44).

Drop real files into `images/` using **the same base name** as the placeholder,
in `.jpg` or `.webp`. Then update the `src` in the markup (or run the swap
helper from the repo root — see below). Ratios are already reserved in CSS, so
nothing on the page shifts when the real image loads.

## Shot list

| File | Ratio | Min size | Where it appears | The shot |
|------|-------|----------|------------------|----------|
| `hero-maynooth` | 4:5 | 1200×1500 | Homepage hero, right column | Maynooth: a street, the canal, or the college wall in early or late light. Real, identifiable local place. Calm and warm. People, if any, distant and incidental. |
| `local-north-kildare` | 8:3 | 2400×900 | Homepage, 'Where we work' band | Wide North Kildare: fields, a town edge, the canal. Quiet enough to sit under body copy. |
| `office-detail` | 4:3 | 1200×900 | About, above 'How we work' | A real working detail: notes, a laptop with actual work on screen, a desk corner. Shot in the actual office. |
| `founder-portrait` | 4:5 | 1200×1500 | About, founder section | **RESERVED — REAL PHOTOGRAPH REQUIRED.** Aoife Byrne, natural light, at her desk or in Maynooth. Relaxed, direct to camera. |
| `team-group` | 3:2 | 1800×1200 | About, team section | **RESERVED — REAL PHOTOGRAPH REQUIRED.** The five-person team, unposed, in the office. |

## Per-slot technical notes

- **`hero-maynooth`** — LCP image — do not lazy-load.
- **`local-north-kildare`** — Crops to 3:2 under 780px.
- **`office-detail`** — Runs full-width as a band.
- **`founder-portrait`** — Never substitute stock or AI imagery for a named real person. The frame shows an 'Awaiting approved photograph' badge until replaced.
- **`team-group`** — Same rule as above.

## Direction notes

- Avoid entirely (PRD §30.5): coins, calculators, handshakes, generic charts, skyscrapers, stock office teams, people pointing at graphs.
- Alt text is already written for each slot; update it if the subject changes.
- The two RESERVED slots carry a visible badge and empty alt text so assistive tech skips them until real photography lands.

## Preparing files

- Export at the min size above (2× that if you want retina headroom), sRGB.
- Compress to WebP where you can; keep hero files under ~250 KB and others
  under ~150 KB (PRD-style performance targets: LCP ≤ 2.5 s).
- Name them exactly as the table's `File` column, e.g. `hero-maynooth.webp`.
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
