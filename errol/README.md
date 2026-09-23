# Errol Brennan Painting: website

Single-page static site for Errol Brennan Painting (painter & decorator, Leixlip, Co. Kildare).
Intended URL: https://getawebsite.ie/errol/

Plain HTML, CSS and JS. No build step. Design source and chat history: `_source/errol/`.
Deploy runbook: `_source/errol/DEPLOY.md`.

- `index.html`: markup and JSON-LD (HousePainter)
- `styles.css`: styles (tokens from `_source/errol/project/tokens.json`)
- `main.js`: menu drawer, before/after slider, work filter, 3-step quote form
- `vercel.json`: headers, including `X-Robots-Tag: noindex` (see below)

Asset paths are relative, so the page must be served at `/errol/` **with** the trailing slash.
The getawebsite.ie redirect in the runbook handles `/errol` → `/errol/`.

## Before launch (blocking)

1. **Confirm facts with Errol.** These are design placeholders and are not verified
   (see `_source/errol/project/uploads/errol-brennan-painting-dossier.md`):
   - phone 087 875 3433 (from one directory only)
   - all prices and the "Most booked" badge
   - "Fully insured" badge and the VAT line
   - the six project titles, years and paint brands
   - service area, "within 20 km", reply-within-one-working-day promise
2. **Search indexing is off.** `vercel.json` sends `X-Robots-Tag: noindex` so the placeholder
   claims don't get indexed. Remove it once step 1 is done.
3. **Quote form backend.** Set `QUOTE_ENDPOINT` at the top of `main.js` (e.g. a Formspree URL).
   Until then, on a live domain the form tells visitors to ring instead, so no request is lost.
4. **Photos.** Add images to `img/` and a `data-src` on the matching slot, e.g.
   `<div class="photo" data-photo="job-1" data-src="img/job-1.jpg" ...>`.
   Slots: `home-hero`, `svc-interior`, `svc-exterior`, `svc-decor`, `svc-commercial`,
   `compare-before`, `compare-after`, `job-1` … `job-6`.
5. **Privacy / Accessibility** footer links point to `#`.
6. **Client sign-off** to publish on getawebsite.ie.
