# Ger Electrical — artwork &amp; photography

The site ships with **authored SVG artwork** rather than stock photography: a
domestic wiring plan drawn as a working sheet, and a map of the service area.
Licence-free, ownable, about 15 KB for the set.

Regenerate any time (deterministic — same output every run):

```bash
python3 ../tools/make-artwork.py
```

## What each slot holds

| File | Ratio | Min size | Where | What it is |
|------|-------|----------|-------|------------|
| `hero-circuit-plan` | 4:5 | 1200×1500 | Home hero, right column | **Artwork.** Wiring plan: circuits from a board to sockets and lights, with a title block. The LCP image — never lazy-load it. |
| `areas-north-kildare` | 8:3 | 2400×900 | Home, under Areas Served | **Artwork.** Service-area map marking Leixlip, Celbridge and Maynooth. Crops to 3:2 under 780px. |
| `ger-portrait` | 4:5 | 1200×1500 | About, and Home "Who turns up" | **RESERVED — REAL PHOTOGRAPH REQUIRED.** Shows an "Awaiting approved photograph" frame until replaced. |
| `work-detail` | 8:3 | 2400×900 | About (markup commented out) | **RESERVED — REAL PHOTOGRAPH REQUIRED.** Uncomment the `<figure>` in `about.html` when the photograph exists. |
| `og-image` | 1200×630 | — | Social sharing | **Artwork.** Regenerate the PNG after any change to the trading name. |

## The two photographs worth taking

PRD §22.5 puts real photographs of Ger and of Ger's work at the top of the
hierarchy, and §10.5 rules out cartoon electricians, giant bolts and AI images
passed off as real work. Two shots carry the whole site:

1. **Ger.** Daylight, on a job or beside the van, looking at the camera. Not a
   studio portrait, not a stock tradesman. This is the single biggest
   credibility upgrade available to this site — a customer deciding whether to
   let someone into their house wants to see who is coming.
2. **The work.** One finished job that looks tidy and deliberate: a neat run,
   a finished board, new sockets in a real room. No customer's name, address,
   or private information visible in the frame (PRD §34).

An hour with a local photographer, or a careful phone camera in good light,
covers both.

**Never** substitute stock or generated imagery for Ger himself. The reserved
frames carry a visible badge and empty `alt` text so assistive technology skips
them until real photography lands.

## Preparing files

- Export at the min size above (2× for retina headroom), sRGB.
- WebP where you can; keep the hero under ~250 KB, others under ~150 KB.
- Name them exactly as the `File` column, e.g. `ger-portrait.webp`, and update
  the `src` and `alt` in the page (`alt` must describe what the photo shows).
- Ratios are reserved in CSS, so swapping causes no layout shift.
- Off-centre subject? Set the focal point on the figure:
  `<figure class="fig fig-4x5" style="--focal: 40% 30%">`.
- Remove the `fig-reserved` class from a figure once its real photograph is in
  place — that class draws the dashed frame and the badge.
