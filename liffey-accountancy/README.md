# Liffey Accountancy — website

Static multi-page marketing site for Liffey Accountancy (Maynooth,
Co. Kildare), built to the PRD. No framework, no build step — deploy the
folder to any static host.

**Design:** based on `../design-reference.md` **#4 "Green Accountant Modern —
Organic Minimalist"** (deep forest green + warm off-white + charcoal, serif
headings, green section labels, pill buttons, rounded hero container), which
matches the PRD §30 direction exactly. The FAQ accordion comes from reference
#10 and the dual-CTA pattern from #4/#10/#11. Greens were darkened slightly
from the reference hexes so all text passes WCAG 2.2 AA contrast.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, positioning, 6 services, problems, differentiators, who we help, about, local section, FAQ, final CTA |
| `services.html` | All six services with tasks, audience and CTA per service |
| `who-we-help.html` | Five customer groups with practical needs per group |
| `about.html` | Founder, team, how we work, firm direction |
| `contact.html` | "Tell us about your business" — process, contact details, consultation form |
| `privacy.html` / `cookies.html` | DRAFT legal pages, `noindex` until approved |
| `404.html` | Custom not-found page |
| `styles.css` | Shared design system (single stylesheet, ~9 KB) |
| `robots.txt` / `sitemap.xml` | Domain placeholders pending confirmation |

Resources is **omitted from navigation** per PRD §10.2 Option B — no reviewed
articles exist yet. The flat-file URLs (`services.html`) can be served
extensionless (`/services`) by any static host with pretty-URL rewrites;
update internal links and the sitemap if you enable that.

## Before launch (blocking)

1. **Phone number** — replace every `+353000000000` (in `tel:` hrefs) and
   every displayed `+353 00 000 0000` across all pages.
2. **Email address** — replace every `hello@liffeyaccountancy.example`.
3. **Form endpoint** — `contact.html`: point the form `action` at the chosen
   form service or serverless endpoint (currently
   `https://example.com/REPLACE-WITH-FORM-ENDPOINT`). The page already does
   client-side validation, a honeypot (`website` field), async submit with
   success/error states, and falls back to a native POST without JS.
4. **Domain** — set canonical + `og:url` in each page's `<head>` (TODO
   comments mark the spots), the `Sitemap:` line in `robots.txt`, and the
   URLs in `sitemap.xml`.
5. **Legal pages** — have the business approve `privacy.html` and
   `cookies.html`, name the form provider in the Privacy Notice, then remove
   the `noindex` tags and DRAFT banners.
6. **Photography** — none supplied yet. The design works without photos, but
   the PRD prefers real founder/team photography (§12.1, §16, §30.5); TODO
   comments in `about.html` mark the slots. Never use stock finance imagery.
7. **OG image** — create a social sharing image and wire up `og:image`
   (PRD §35).
8. **Search Console** — connect and submit the sitemap after launch.

## Intentionally omitted (PRD-driven)

- **Testimonials** — the supplied Michael O'Connor quote is fictional
  (PRD §17); the section is removed rather than shipped with placeholder
  content. Add a section once a genuine, approved testimonial exists.
- **Team names/bios/qualifications** — not supplied/verified (PRD §23, §50).
  Only the supplied founder facts appear.
- **Pricing tables** — no confirmed prices (PRD §21); the site says "fixed
  monthly fees, agreed before work starts" only.
- **Cookie consent banner** — the site sets no cookies and loads no
  trackers, so none is required (PRD §38). Revisit if cookie-based
  analytics is added.
- **Chartered/ACCA/CPA claims, awards, client counts, review scores** —
  unverified (PRD §50).

## Analytics

No analytics script is loaded (nothing may load pre-consent, PRD §38).
Every conversion element carries a `data-cta` attribute
(`hero-consultation`, `header-call`, `footer-email`,
`service-payroll-consultation`, …). To wire up the PRD §37 events with one
delegated click listener:

- `consultation_cta_click` → clicks on `[data-cta$="consultation"]`
- `phone_click` → clicks on `[data-cta$="call"]`
- `email_click` → clicks on `[data-cta$="email"]`
- `consultation_form_start` / `consultation_form_submit` → marked comment
  hooks in the `contact.html` form script. Submissions are only counted
  after a successful POST, never on button click (PRD §27).

Prefer a cookieless, privacy-compliant tool (no consent banner needed);
if a cookie-based tool is chosen, add a blocking consent control first.

## Structure notes

- JSON-LD `AccountingService` on `index.html` contains only supplied facts
  (founded 2017, founder, Maynooth, service area, office hours). Add `url`,
  `telephone` and `email` once confirmed.
- Accessibility: skip links, one H1 per page, semantic landmarks, labelled
  form fields with inline errors, keyboard-operable nav (with a no-JS
  fallback where links simply wrap), `:focus-visible` styles,
  `prefers-reduced-motion` respected, AA-checked palette.
- Fonts are system stacks (Georgia serif headings / system-ui body) — zero
  network requests, no GDPR exposure from remote font CDNs. Swap in a
  self-hosted brand face later if desired.
