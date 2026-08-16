# Website in a Weekend — sales site

Single-page sales website for websiteinaweekend.ie, built to the PRD.
Static, one zero-request file (display font embedded), no framework.

## Before commercial launch (blocking)

1. **Booking + payment** — the "Book your weekend" CTA currently opens a
   pre-filled email to `hello@websiteinaweekend.ie`. Replace with the
   chosen hosted booking/subscription checkout (PRD §28) and confirm the
   email address actually exists.
2. **Billing schedule** — the exact monthly charge behind "€5/day + VAT"
   must be defined before payments are taken (PRD §17, §48).
3. **Sunday Promise conditions** — the guarantee is on the page with
   "Conditions apply — see terms"; the terms document defining those
   conditions must exist before launch (PRD §23).
4. **Legal pages** — /terms, /privacy, /cookies (PRD §9). Footer links
   should be added when the pages exist.
5. **Founder content** — About section ships without founder name/photo
   until supplied (PRD §25).

## Intentionally omitted / handled honestly (PRD-driven)

- **Portfolio** — three concept designs (accountancy, surveying,
  solicitors), each clearly labelled "Concept" per PRD §13. Replace with
  real client work as it exists. The example domains shown in the
  browser-frame chrome are fictional.
- **Before & after section** — omitted; PRD §20 requires real customers
  and forbids fabricated case studies.
- **Testimonials / client logos / scarcity** — none shown; PRD §43–44
  forbid fabricated proof and fake scarcity.

## Analytics

Tracked elements carry `data-event` attributes matching PRD §34 event
names (`cta_book_click`, `booking_start`, `faq_open`, …) plus
`data-location` on CTAs. Wire a consent-respecting analytics tool with
one delegated listener; nothing loads until then (Irish DPC guidance:
analytics cookies normally require consent).

## Structure

- `index.html` — the entire page: markup, inline CSS, JSON-LD
  (Organization), Bricolage Grotesque 800 (SIL OFL) embedded as a
  base64 woff2 latin subset. No JavaScript required for any
  functionality (FAQ uses native `<details>`).
- `robots.txt`
