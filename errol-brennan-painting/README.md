# Errol Brennan Painting · website

Static single-page site built from `project/site/Errol-Brennan-Painting.dc.html`. It has no build step and no dependencies.

- `index.html`: markup
- `styles.css`: styles (tokens from `project/tokens.json`)
- `main.js`: menu drawer, before/after slider, work filter, 3-step quote form

Run it locally with `python3 -m http.server` from this folder. Deploy the folder as-is to Netlify, Cloudflare Pages, GitHub Pages or any static host.

## Before launch

1. **Quote form backend.** Set `QUOTE_ENDPOINT` at the top of `main.js` (for example a Formspree URL). Until it is set, the form only pretends to send on localhost. On a live domain it tells visitors to ring instead, so no lead is silently lost.
2. **Photos.** Put images in `img/` and add `data-src` to the matching slot, e.g.
   `<div class="photo" data-photo="job-1" data-src="img/job-1.jpg" ...>`.
   Slots: `home-hero`, `svc-interior`, `svc-exterior`, `svc-decor`, `svc-commercial`, `compare-before`, `compare-after`, `job-1` … `job-6`. Update the `data-alt` text to describe the real photo.
3. **Confirm with Errol.** These are design placeholders and are not verified (see `project/uploads/errol-brennan-painting-dossier.md`):
   - phone 087 875 3433 (it comes from one directory only)
   - all prices and the "Most booked" badge
   - the "Fully insured" badge and "VAT status" line
   - the six project titles, years and paint brands
   - the service area and the "within 20 km" radius
   - the reply-within-one-working-day promise
4. **Privacy and Accessibility links** in the footer point to `#`.
5. **Search indexing is off.** `vercel.json` sends `X-Robots-Tag: noindex` so Google doesn't index the placeholder prices and claims. Remove that header once step 3 is done.

## Hosting on Vercel (subdomain of getawebsite.ie)

1. Vercel → Add New → Project → import this GitHub repo.
2. Set **Root Directory** to `errol-brennan-painting`. Framework preset: **Other**. Leave the build command empty.
3. Deploy. Every push to the production branch redeploys.
4. Project → Settings → Domains → add the subdomain, e.g. `errolbrennan.getawebsite.ie`.
5. At the DNS provider for getawebsite.ie, add the record Vercel shows: `CNAME errolbrennan → cname.vercel-dns.com`. If getawebsite.ie already uses Vercel nameservers, this step is automatic.
