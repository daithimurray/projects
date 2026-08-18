# Ger, Electrician, North Kildare

Four-page static marketing site built to the supplied PRD. No framework, no
build step, no dependencies. Deploy the contents of this directory to any
static host.

```
/            index.html          Home
/services/   services/index.html Services
/about/      about/index.html    About
/contact/    contact/index.html  Contact, quote form
/privacy/    privacy/index.html  Privacy Policy
assets/      site.css, site.js, Archivo woff2, images
robots.txt   sitemap.xml
```

The pages use root-relative asset paths (`/assets/...`), so the site must be
served from the root of a domain, not from a subfolder.

---

## Before this goes live (blocking)

Nothing on the site is a real business detail yet. Every item below appears
as an obvious placeholder and must be replaced.

1. **Telephone number.** Grep for `353870000000` (the `tel:` links) and
   `087 000 0000` (the printed number). Both appear on all five pages, in
   the header, the sticky mobile bar, the body copy and the footer. There
   is also one in the JSON-LD block at the bottom of `index.html`.
2. **Email address.** Grep for `enquiries@example.ie`. It appears on the
   contact page twice, once as the visible link and once as the form's
   `data-mailto` attribute, and once on the privacy page.
3. **Domain.** Grep for `example.ie`. It appears in every page's
   `<link rel="canonical">` and Open Graph tags, in `robots.txt`, and in
   `sitemap.xml`.
4. **Trading name.** The site currently calls the business "Ger,
   Electrician" because PRD §43 question 1 is unanswered. If Ger trades
   under a registered name, replace it in the wordmark, the footer, the
   `og:site_name` tags and the JSON-LD.

---

## Claims Ger must confirm before publishing

The PRD (§3.2, §3.3, §38.2) forbids publishing these until Ger confirms
them. They are written into the pages as draft copy for his review and are
tagged in the markup with `data-unverified` so you can find them:

```
grep -rn 'data-unverified' .
```

| Tag | Claim on the page | What to confirm |
|---|---|---|
| `rec-status` | "Registered Electrical Contractor, Safe Electric scheme" | That he currently holds this registration. **Do not add the registration number or the Safe Electric logo** until he confirms both accuracy and permission to publish (PRD §3.3). |
| `insurance` | "Fully insured, public liability cover" | That cover is current, and what it actually covers. |
| `years` | "Around 30 years in the trade" | The real figure. Replace "around thirty years" on the About page too. |

Also unconfirmed and therefore **left off the site entirely** rather than
guessed at:

- **Opening hours.** PRD §19.2 says show only confirmed information, so the
  contact page has no hours block. Add one when Ger gives them.
- **Emergency or out-of-hours availability.** Not mentioned anywhere.
- **Commercial electrical work.** The hero says "for homes" rather than the
  PRD's draft "for homes and businesses", because PRD §10.2 and §5.2 forbid
  positioning him as a commercial contractor until he confirms it. The About
  page mentions small businesses for maintenance and installation only.
- **Qualifications.** No specific qualification is named.
- **Guarantees and response times.** None claimed. The form confirmation
  deliberately does not promise a reply time (PRD §19.5).
- **Service areas beyond Leixlip, Celbridge and Maynooth.** Only those three
  plus "surrounding North Kildare" appear, because those are the only ones
  the PRD supplies. Add more only if Ger actually covers them.

### Deliberately omitted

- **Customer reviews.** There are none on hand. PRD §15.2 forbids inventing
  them and says to remove the section rather than fill it, so there is no
  reviews section. There is an HTML comment marking where it goes in
  `index.html` when real testimonials with permission exist.
- **Location landing pages.** PRD §26.4 forbids near-duplicate
  `/electrician-leixlip` style pages. Not created.
- **Cookie banner.** The site sets no cookies and loads no third-party
  scripts, so none is needed (PRD §37).

---

## Photographs

Ger's real photographs are confirmed to exist but were not supplied. Every
image slot currently holds a **labelled placeholder** that states what
belongs there. Nothing is stock and nothing is AI-generated, so no image
pretends to be Ger or his work (PRD §10.5, §34).

Replace these files, keeping the same filenames, and no markup changes are
needed:

| File | Size | Used on | Current alt text |
|---|---|---|---|
| `assets/img/ger-at-work.jpg` | 1200x900, 4:3 | Home hero | "Ger working on a domestic consumer unit" |
| `assets/img/ger-portrait.jpg` | 800x1000, 4:5 | Home, About | "Ger, the electrician" |
| `assets/img/work-consumer-unit.jpg` | 900x675, 4:3 | About | "A consumer unit rewired and labelled by Ger" |
| `assets/img/work-lighting.jpg` | 900x600, 3:2 | Home services grid, About | "Ceiling lights fitted in a kitchen by Ger" |
| `assets/img/van.jpg` | 900x675, 4:3 | About | "Ger's work van" |
| `assets/img/og-default.jpg` | 1200x630 | Social sharing card, all pages | n/a |

Update the alt text if a photograph shows something different. Compress
before committing. Do not publish photographs showing a customer's house
number, alarm panel or any other identifying detail (PRD §34).

---

## The quote form

The form composes a `mailto:` message rather than posting to a form service,
which is what you asked for. Consequences worth knowing:

- There is no server, no third-party endpoint and no spam endpoint. The
  honeypot field and in-page validation are still there.
- Nothing is sent until the visitor presses send in their own mail app. The
  confirmation message says exactly that rather than claiming the enquiry
  was delivered.
- Some visitors, particularly on desktop webmail, have no mail client
  configured and nothing will happen. This is why the phone number and the
  email address are both printed as plain selectable text beside the form.
- If enquiry volume matters more than avoiding a dependency, swap the
  `submit` handler in `assets/site.js` for a POST to Formspree, Netlify
  Forms or similar. The field names are already sensible.

---

## Analytics

Nothing is installed and no cookies are set. Every call to action carries
`data-cta` (`call` or `quote`) and `data-cta-location` (`hero`, `header`,
`sticky`, `footer`, `final-band`, and so on). `assets/site.js` has a single
delegated click listener that pushes the three PRD §29 events,
`phone_click`, `quote_click` and `form_submit`, into `window.dataLayer` if
something defines it. Install a consent-respecting analytics tool and
define `window.dataLayer = []` before it, and the events start flowing.

Irish DPC guidance normally requires consent for analytics cookies, so
choose a cookieless tool or add a consent gate before switching one on.

---

## Design notes

The visual world is the vitreous enamel utility plate, the kind bolted to
ESB kiosks around Irish towns: a deep enamel field, a hairline keyline set
in from the edge, heavy grotesque lettering. It was chosen because those
signs are built to stay legible outdoors for decades, which is the claim
this business makes about its work, and because it reads as electrical
infrastructure without a lightning bolt anywhere (PRD §10.5, §22.4).

- **Colour roles are fixed.** `--ink` is the ground, `--enamel` is the
  brand field, `--paper` is a light panel, and `--signal` orange is the only
  accent. Signal belongs to actions and status, nothing else.
- **Corners.** Plates and panels take `--r-plate`, controls take `--r-ctl`.
  Nothing uses any other radius.
- **Type.** Archivo, one family, weights 400 to 800, self-hosted as a 35KB
  variable woff2 subset shared across all five pages. No request leaves the
  site.
- **Motion.** One authored moment: the hero settles as the page opens.
  Nothing else animates on entry, and the whole thing is behind
  `prefers-reduced-motion` (PRD §25).

## Accessibility

Built to WCAG 2.2 AA (PRD §24). Semantic landmarks, one `<h1>` per page,
logical heading order, a skip link, visible focus rings on the accent
colour, labels tied to every field, errors that name the problem and are
signalled by icon and text as well as colour, 52px minimum control height,
and alt text on every meaningful image. Verified no horizontal overflow at
320, 390, 414, 768, 1024 and 1440 CSS pixels.

The one thing worth re-testing with real content: the trust register and
service names were checked against the placeholder copy. If Ger's confirmed
wording is much longer, re-check the register at 320px.

## Local preview

```
python3 -m http.server 8412
```

Then open `http://127.0.0.1:8412/`. Opening the files directly with
`file://` will not work, because the asset paths are root-relative.
