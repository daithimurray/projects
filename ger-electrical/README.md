# Ger Electrical — website

Static four-page marketing site for an independent local electrician in North
Kildare, built to the PRD (`localelectricianwebsiteprd.md`). No framework, no
build step, no third-party requests — deploy the folder to any static host.

**Design:** `../design-reference.md` **#8 "Modern Navy Accountant —
Typographic Minimalist"** (type-first hero, two or three colours, minimal
decoration, built for a single-practitioner brand) crossed with **#9 "Navy
White Accountant"** (hairline borders instead of shadows, one understated
accent) and **#3**'s dark base for the hero and conversion bands. Palette is
graphite + warm neutral + one accent: **copper** — the material of the trade,
so the site can be unmistakably an electrician's without a single lightning
bolt (PRD §10.5, §22.4). Headings use the system grotesque and technical
labels the system monospace, so nothing loads from a font CDN.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, trust strip, seven services, who does the work, areas served, final call CTA |
| `services.html` | Each service as problem → what Ger does → CTA, plus trust and area reminders |
| `about.html` | Ger, how he works, who he works for |
| `contact.html` | Phone first, quote form, what happens next, four common questions |
| `privacy.html` | DRAFT policy, `noindex` until approved |
| `404.html` | Custom not-found page |
| `styles.css` | The whole design system (~28 KB, one file) |
| `robots.txt` / `sitemap.xml` | Domain placeholders pending confirmation |
| `og-image.png` | Default social sharing card, 1200×630 |

Flat-file URLs (`services.html`) can be served extensionless (`/services`) by
any host with pretty-URL rewrites; `sitemap.xml` already assumes that, so
update it if you do not enable rewrites.

## Before launch — blocking

1. **Trading name.** Every page says **Ger Electrical**. That is a
   placeholder standing in for the real trading name (PRD §43 Q1). Replace it
   in the page copy, `<title>`s, Open Graph tags, the JSON-LD block on
   `index.html`, the footer and `og-image.png` (regenerate: see Artwork).
2. **Phone number.** Replace every `+353000000000` (the `tel:` hrefs) and
   every displayed `+353 00 000 0000`. `grep -rn 353000000000 .` finds them all.
3. **Form endpoint.** `contact.html`: point the form `action` at the chosen
   form service or serverless function, and confirm the address that receives
   submissions (PRD §43 Q15). The page already validates client-side, carries a
   honeypot (`website`), submits asynchronously with success and error states,
   and falls back to a native POST without JavaScript.
4. **Trust claims — the big one.** The site currently publishes **only** what
   the brief actually supplied. Registration, insurance and years of
   experience are the strongest signals this business has and they are all
   still unverified (PRD §3.2), so they ship commented out, written and ready,
   in three places:
   - `index.html` — trust strip (three extra `<li>` items)
   - `index.html` — "Who turns up" section (checklist)
   - `about.html` — "The person doing the work" (credentials checklist)
   Once Ger confirms each claim **in his own wording**, uncomment the lines
   that are true, delete the rest, and use the Safe Electric wording exactly as
   PRD §3.3 gives it: *Registered Electrical Contractor with the Safe Electric
   scheme*. If you use all three trust-strip items, change `.spec-list` in
   `styles.css` to `repeat(4, 1fr)` or drop one. Do not add a Safe Electric
   logo or registration number until publication is confirmed as permitted.
5. **Opening hours.** Commented out in `contact.html` and absent from the
   JSON-LD until confirmed (PRD §43 Q13). Nothing about emergency or
   out-of-hours availability appears anywhere.
6. **Domain.** Set canonical + `og:url` + `og:image` in each page's `<head>`
   (TODO comments mark the spots), the `Sitemap:` line in `robots.txt`, and the
   URLs in `sitemap.xml`.
7. **Privacy Policy.** Have it reviewed, name the form provider, fill the
   bracketed gaps, then remove the `noindex` tag, the DRAFT banner, and the
   `Disallow` line in `robots.txt`.
8. **Photography.** The About page has one reserved slot for a real photograph
   of Ger; a second slot for a photograph of the work is written into the page
   as a comment. See `IMAGES.md`. Never substitute stock or generated imagery
   for a real person.
9. **Search Console.** Connect and submit the sitemap after launch.

## Intentionally omitted (PRD-driven)

- **Customer reviews** — none supplied. PRD §15.2 says reviews must be genuine,
  so the section is absent rather than seeded with placeholder quotes. The spot
  it belongs in is marked in `index.html`.
- **Years of experience, Safe Electric / REC status, insurance,
  qualifications** — unverified (PRD §3.2). Written and commented, see step 4.
- **Prices, response times, guarantees, job-size claims, emergency
  availability** — unverified, so nothing on the site implies any of them.
  "How do I get a price?" answers honestly instead.
- **Location landing pages** — PRD §26.4. One Areas Served section covers
  Leixlip, Celbridge and Maynooth; there is no useful local content to justify
  a page each yet.
- **Cookie banner** — the site sets no cookies and loads no trackers, so none
  is required (PRD §37). Revisit if cookie-based analytics is added.

## Analytics

No analytics script is loaded. Every conversion element carries a `data-cta`
attribute (`header-call`, `hero-call`, `hero-quote`, `sticky-call`,
`service-lighting-call`, `footer-quote`, …), so the PRD §29 events wire up with
one delegated click listener:

- `phone_click` → clicks on `[data-cta*="call"]` and `[data-cta$="number"]`
- `quote_click` → clicks on `[data-cta*="quote"]`
- `form_submit` → the marked hook in the `contact.html` submit handler, counted
  only after a successful POST, never on button click

Prefer a cookieless, privacy-compliant tool so no consent banner is needed.

## Artwork

Two authored SVG plates and the social card are generated, not sourced:

```bash
python3 ../tools/make-artwork.py                       # all sites, deterministic
python3 ../tools/svg-to-png.py ger-electrical/images/og-image.svg \
        ger-electrical/og-image.png 1200 630 /tmp      # social card as PNG
```

The hero plate is a domestic wiring plan drawn as a working sheet; the band
under Areas Served is a map of the service area. Both are ours, licence-free,
and about 15 KB together. Regenerate after changing the trading name so the
social card matches.

## Structure notes

- **Conversion hierarchy** (PRD §21.3) is enforced by the design: **Call Ger**
  is the only copper button on the page, appears in the header on every screen
  size, in the hero, after the services, in the areas block, in the final
  section, in the footer, and in a sticky bar on mobile. **Request a Quote** is
  always the outlined secondary. No other CTA labels are used anywhere.
- The sticky mobile call bar is absent from `contact.html`, where the number is
  already the first thing on the page and a form sits below it (PRD §8.3).
- **Accessibility:** skip links, one `<h1>` per page, semantic landmarks,
  labelled fields with inline errors and `aria-invalid`, keyboard-operable nav
  with a no-JS fallback, visible `:focus-visible` rings, 44–52px touch targets,
  `prefers-reduced-motion` respected, and an AA-checked palette (ratios noted
  in `styles.css`).
- **JSON-LD** on `index.html` is an `Electrician` carrying only what the page
  itself shows. Add `telephone`, `url` and `openingHoursSpecification` when
  those are confirmed — and nothing that is not visible on the page (PRD §27).
- **Performance:** one stylesheet, no fonts, no libraries, ~1 KB of inline JS
  per page. The hero plate is the LCP image and is never lazy-loaded; every
  other image is lazy with its ratio reserved in CSS, so nothing shifts.
