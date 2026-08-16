# Alder & Frost — website (fictional demo)

Single-page site for **Alder & Frost**, an **entirely fictional** boutique
accountancy practice, built as a design demo. Every name, figure, address and
claim on the page is invented — the stats (140+ companies, €380m, etc.), the
office, the contact details. Nothing here may be reused for a real business
without replacing all of it.

## Design

Based on `../design-reference.md` **#3 "Dark Modern Accountant — Premium Dark
Mode"**: rich black background, deep-green glassmorphism service cards,
emerald `#34d399` accent, large elegant serif headings with an italic accent
word, and a subtle green glow behind the hero. The scrolling sector marquee
comes from reference #8 (Typographic Minimalist) and the centred italic
pull-quote from #6 (Editorial Nature).

Deliberately the opposite of the Liffey Accountancy site in this repo:
dark vs light, single-page vs multi-page, premium-boutique vs local-practice,
emerald-on-black vs navy-on-offwhite, punchy copy vs full brochure.

## Structure

- `index.html` — the whole site: markup and inline CSS, zero JavaScript.
  System fonts only (serif display + sans body), no external requests.
  The marquee animation is CSS-only and stops under `prefers-reduced-motion`.
- `robots.txt` — `Disallow: /` because a fictional business should never be
  indexed.

## Accessibility

Skip link, semantic landmarks, single H1, visible focus styles, AA-checked
contrast on all text (emerald and muted greys on black, white and light green
on the dark-green cards), decorative marquee and card glyphs hidden from
assistive technology.
