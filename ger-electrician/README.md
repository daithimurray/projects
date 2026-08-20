# Ger, Electrician — North Kildare

A five-page static marketing site built to the supplied PRD. No framework, no
build step, no dependencies, no third-party requests. Deploy the contents of
this directory to any static host.

```
/            index.html           Home
/services/   services/index.html  Services
/about/      about/index.html     About
/contact/    contact/index.html   Contact, quote form
/privacy/    privacy/index.html   Privacy Policy
             404.html             Not-found page
assets/      site.css, site.js, IBM Plex woff2, favicon, OG card
robots.txt   sitemap.xml
```

Asset and navigation paths are **relative**, so the site works served from a
domain root *or* from a subfolder (a GitHub Pages project path, a staging
directory). The one exception is `404.html`, which is entirely self-contained
— it can be served from any URL depth, so it links to nothing relative and
loads no external file.

Total weight, all five pages plus every asset: **328 KB**, of which 85 KB is
the four self-hosted font files. No page requests anything from another
server.

---

## Before this goes live (blocking)

Nothing on the site is a real business detail yet. Every item below is an
obvious placeholder and must be replaced.

1. **Telephone number.** Grep for `+353870000000` (the `tel:` links) and
   `087 000 0000` (the printed number). Both appear on all six pages — in the
   header, the sticky mobile bar, the hero, the body copy, the closing call
   band and the footer. There is one more in the JSON-LD block at the bottom
   of `index.html`, and one in the `<title>` of the contact page.
2. **Email address.** Grep for `enquiries@example.ie`. It appears on the
   contact page three times (the visible link, the form's `action`, and the
   form's `data-mailto` attribute), in every footer, and twice on the privacy
   page.
3. **Domain.** Grep for `example.ie`. It appears in every page's
   `<link rel="canonical">` and Open Graph tags, in `robots.txt`, and in
   `sitemap.xml`.
4. **Trading name.** The site calls the business "Ger, Electrician" because
   PRD §43 question 1 is unanswered. If Ger trades under a registered name,
   replace it in the wordmark, the footers, the `og:site_name` tags and the
   JSON-LD.
5. **Social sharing card.** `assets/img/og-default.png` carries the
   placeholder phone number. Regenerate it once the real number is known.

---

## Claims Ger must confirm before publishing

PRD §3.2, §3.3 and §38.2 forbid publishing these until Ger confirms them.
They are on the pages as draft copy for his review, and every one is tagged
in the markup:

```
grep -rn 'data-unverified' .
```

| Tag | What is on the page | What to confirm |
|---|---|---|
| `rec-status` | "Registered Electrical Contractor, Safe Electric scheme" | That he currently holds this registration. **Do not add the registration number or the Safe Electric logo** until he confirms both accuracy and permission to publish (PRD §3.3). |
| `insurance` | "Public liability insured" | That cover is current, and what it actually covers. |
| `years` | "Around 30 years in the trade" | The real figure. Also appears as "around thirty years" in the About page copy. |
| `areas` | "Leixlip, Celbridge, Maynooth and around North Kildare" | That he actually covers all three, and whether anywhere else should be listed. This is the most widespread tag (19 places) because the service area appears in every footer and every call band. |
| `service-list` | The seven services | That he does all seven, and that nothing he does is missing. |
| `customers` | "Homeowners, landlords, property managers" | That he takes landlord and property-manager work. |
| `scope` | "installation work on existing homes rather than full rewires or new builds" | That this is the right boundary to draw publicly. |
| `approach` | The three-step "How the work goes" register on the About page | Not a factual claim, but it describes how Ger works and he should agree it is accurate before it speaks for him. |
| `about-copy` | The whole first-person About statement | Same — it is written in his voice and signed "— Ger". He should read it and change anything that does not sound like him. |
| `controller` | "Ger, Electrician, North Kildare" as the data controller | A GDPR privacy notice should name the controller properly. Add the legal name and business address. |

### Unconfirmed, and therefore left off the site entirely

- **Opening hours.** PRD §19.2 says show only confirmed information, so the
  contact page has no hours. There is a comment marking exactly where the row
  goes, and a note to add `openingHours` to the JSON-LD at the same time.
- **Emergency or out-of-hours availability.** Not mentioned anywhere.
- **Commercial electrical work.** The hero says "for homes", not the PRD's
  draft "for homes and businesses", because PRD §10.2 and §5.2 forbid
  positioning him as a commercial contractor until he confirms it.
- **Qualifications.** No specific qualification is named.
- **Guarantees, response times, prices, job counts.** None claimed anywhere.
  The form confirmation deliberately does not promise a reply time (PRD
  §19.5); there is a test asserting it never starts to.

### Deliberately omitted

- **Customer reviews.** There are none on hand. PRD §15.2 forbids inventing
  them and says to remove the section rather than fill it, so there is no
  reviews section. An HTML comment in `index.html` marks where it belongs and
  what pattern to build it in.
- **Location landing pages.** PRD §26.4 forbids near-duplicate
  `/electrician-leixlip` pages. Not created.
- **Cookie banner.** The site sets no cookies and loads no third-party
  scripts, so none is needed (PRD §37).

---

## Photographs

No photograph has been supplied. Rather than ship stock, or an AI-generated
image pretending to be Ger's work, every image slot holds a **drawn empty
slot** — a hatched frame captioned with exactly what belongs in it. Nothing
on the site pretends to be a photograph of anybody (PRD §10.5, §34).

The one drawn image on the site is the hero schematic in `index.html`: an
inline SVG of a domestic consumer unit and three circuits. It is decorative,
`aria-hidden`, and desktop-only.

To put a real photograph in, replace the `<div class="fig__slot">…</div>`
with the `<img>` that is already written out in a comment beside it:

| Slot | Suggested size | Page | Alt text in the comment |
|---|---|---|---|
| Ger at work | 800×1000, 4:5 | Home §02 | "Ger, the electrician" |
| Ger portrait | 800×1000, 4:5 | About §01 | "Ger, the electrician" |
| Consumer unit | 900×675, 4:3 | About §03 | "A consumer unit rewired and labelled by Ger" |
| Kitchen lighting | 900×675, 4:3 | About §03 | "Ceiling lights fitted in a kitchen by Ger" |
| Work van | 900×675, 4:3 | About §03 | "Ger's work van" |

Compress before committing, keep the stated aspect ratio so the frame does
not jump, and update the alt text if the photograph shows something else. Do
not publish a photograph showing a customer's house number, alarm panel or
any other identifying detail (PRD §34).

---

## The quote form

`assets/site.js` has one constant at the top that decides where enquiries go:

```js
var FORM_ENDPOINT = null;
```

**As shipped (`null`)** the form composes the message in the visitor's own
email app. No server, no third party, nothing leaves the device until they
press send themselves. The confirmation says exactly that — it does not claim
the enquiry was delivered, because it has not been. The privacy policy
describes this behaviour, so if you change it, change the policy too.

**Set it to a URL** (Formspree, Netlify Forms, a small serverless function)
and the form POSTs the fields as JSON instead, with a proper sending state,
success panel and failure message that falls back to "ring Ger". The field
names are already sensible: `name`, `phone`, `email`, `location`, `work`,
`message`.

Either way you get in-page validation, a honeypot (`company`) that fails
silently so a bot cannot tell it was caught, errors that name the field and
are signalled by icon and text as well as colour, and focus moved to the
first problem. Without JavaScript the browser's own `required` and `type`
checks still apply — `novalidate` is only set once the script is known to be
running — and the phone number and email address are printed as plain
selectable text beside the form for anyone the form fails.

The phone validation is deliberately forgiving (7–15 digits, any
punctuation). Irish numbers get written a dozen ways and rejecting a real one
costs an enquiry.

---

## Analytics

Nothing is installed and no cookies are set. Every call to action carries
`data-cta` (`call` or `quote`) and `data-cta-location` (`header`, `hero`,
`sticky`, `footer`, `final-band`, `areas`, `service-repairs`, and so on). A
single delegated listener in `assets/site.js` pushes the three PRD §29
events — `phone_click`, `quote_click`, `form_submit` — into
`window.dataLayer` if something defines it. If nothing does, it is a no-op.

To switch analytics on: define `window.dataLayer = []` before a
consent-respecting, cookieless tool loads, and the events start flowing.
Irish DPC guidance normally requires consent for analytics cookies, so choose
a cookieless tool or add a consent gate — and update the privacy policy,
which currently states that the site runs no analytics.

---

## Design

The full system is in `DESIGN.md`. In short: the world is **the drawing
set** — the annotated schematic an electrician actually works from. Content
is organised by hairline rules and mono reference numbers rather than cards,
corners are square, no element casts a shadow, and one deep signal red is
reserved for things the visitor can press or facts they could go and verify.

Type is IBM Plex Sans with IBM Plex Mono for the technical layer, self-hosted
as four latin-subset woff2 files (85 KB total, SIL OFL, licence in
`assets/fonts/OFL.txt`). Nothing loads from Google Fonts — partly for speed,
partly because sending an Irish visitor's IP to a third party to fetch a font
is a GDPR problem this site does not need.

Motion: there is no entrance animation anywhere. Nothing moves that the
visitor did not touch, and the hover and focus transitions that exist are
behind `prefers-reduced-motion`.

---

## Accessibility

Built to WCAG 2.2 AA (PRD §24). Semantic landmarks, one `<h1>` per page, no
skipped heading levels, a skip link as the first tab stop, visible focus
rings that switch colour on dark ground, labels tied to every field, errors
that name the problem, and a 44 px minimum height on every control including
the header's printed phone number.

Verified in Chromium at 390, 768 and 1440 CSS pixels: no horizontal overflow
on any page, no console errors, and every rendered text node meets AA
contrast against its actual computed background.

---

## Performance

Static HTML, one 32 KB stylesheet, one 12 KB script loaded `defer`, four
preloaded font subsets, one PNG (the OG card, which no page renders). No
images to lazy-load yet — add `loading="lazy"` and explicit `width`/`height`
to real photographs, as the commented-out `<img>` tags already do.

---

## Local preview

```
python3 -m http.server 8412
```

Then open `http://127.0.0.1:8412/`. Opening the files directly over `file://`
mostly works because the paths are relative, but directory URLs like
`/services/` will not resolve, so use the server.
