# David's Driving School — website

Static single-page marketing site for David's Driving School (Leixlip,
Celbridge & Maynooth, County Kildare). Built to the PRD: mobile-first, no
framework, no build step — deploy `index.html` and `robots.txt` to any
static host.

## Before launch (blocking)

1. **Phone number** — replace every instance of `+353000000000` in
   `index.html` (grep for `353000000000`, including `tel:` and `sms:`
   links and the footer display number).
2. **Domain** — set the canonical URL and `og:url` in `<head>`, and the
   Sitemap line in `robots.txt`.
3. **Verify with David** — the site currently publishes only confirmed
   facts (per PRD §2/§39). Do **not** add ADI status, lesson types (EDT,
   pre-test, manual/automatic), prices, hours, photos, or testimonials
   until David confirms them.

## Intentionally omitted (PRD-driven)

- **Testimonials section** — none exist yet; PRD §17 says remove rather
  than fabricate.
- **Pricing table** — replaced with the "Contact David for prices"
  variant per PRD §16.
- **Trust signals (ADI number, experience)** — unconfirmed (PRD §39).
- **Photos of David / the car** — none supplied yet (PRD §34).

## Analytics

Every CTA has a `data-cta` attribute (`hero-call`, `sticky-text`,
`final-call`, …). Wire the chosen privacy-conscious analytics tool with a
single delegated click listener; nothing is tracked until then (PRD §30).

## Structure

- `index.html` — the entire site: markup, inline CSS, JSON-LD. No JS
  required for any functionality (FAQ uses native `<details>`).
  The display face (Petrona 600, SIL OFL) is embedded as a base64 woff2
  latin subset, so the page stays a single zero-request file.
- `robots.txt`
