# Liffey Accountancy — artwork &amp; photography

The site now ships with **authored SVG artwork** rather than stock photography:
an engraved cartography of the firm's actual service area — the Royal Canal
drawn as a map line, contour work, and the towns the copy names. It is
licence-free, ownable, and about 50 KB for the whole set.

Regenerate any time with `python3 ../tools/make-artwork.py` (deterministic —
the same output every run). Edit `tools/make-artwork.py` to change it.

Two slots remain **RESERVED for real photographs** and are not artwork:
`founder-portrait` and `team-group`. The PRD requires genuine photographs of
Aoife and the team (§16, §30.5, §44), and no drawing or stock image may stand
in for a named real person.

## What each slot contains

Every slot below is filled with artwork today. The table doubles as the brief
if you ever replace a slot with a real photograph: drop a `.jpg`/`.webp` into
`images/` using the same base name and run
`python3 ../tools/swap-images.py <site-folder> <your-image-dir>`. Ratios are
reserved in CSS, so swapping causes no layout shift.

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

## Sourcing: what to search for

**Licence first.** Only use files you have a commercial licence for. Free and
commercially usable without attribution: **Unsplash**, **Pexels**. Paid and
usually better for Irish specificity: **Stocksy**, **Gallery Stock**, or a local
photographer. Never publish a watermarked comp.

**The trap to avoid.** Searching "accountant" or "accounting" on any stock site
returns calculators, coins, handshakes and glass-tower boardrooms — the exact
list PRD §30.5 bans. Search for the *place and the situation* instead of the
profession.

| Slot | Search instead for |
|------|--------------------|
| `hero-maynooth` | "Maynooth", "Royal Canal Kildare", "Irish market town street", "Irish town evening light" |
| `local-north-kildare` | "Kildare countryside", "Irish farmland hedgerow", "Leixlip", "Irish canal towpath" |
| `office-detail` | "notebook desk daylight", "paperwork close up warm", "small office interior daylight" — no calculators, no stacked coins |
| `founder-portrait` | **Do not search.** Commission a real portrait of Aoife. |
| `team-group` | **Do not search.** Commission the real team photograph. |

**Strong recommendation for the two reserved slots:** a half-day with a local
photographer in Maynooth covers the founder portrait, the team shot and the
office details in one session, and gives you images no competitor can have.
That is the single biggest credibility upgrade available to this site, and the
PRD requires real photography for them regardless.

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
