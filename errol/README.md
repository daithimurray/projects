# Errol Brennan Painting: website

Single-page static site for Errol Brennan Painting (painter and decorator, Leixlip, Co. Kildare).
Intended URL: https://getawebsite.ie/errol/

Plain HTML, CSS and JS. No build step, no third-party requests (fonts are self-hosted), no cookies,
no forms. Design source and chat history: `_source/errol/`. Deploy runbook: `_source/errol/DEPLOY.md`.

- `index.html`: markup and JSON-LD (HousePainter)
- `styles.css`: styles (tokens from `_source/errol/project/tokens.json`)
- `main.js`: menu drawer, photo loading, before/after slider
- `fonts/`: Figtree 400–700 and Newsreader 500, latin subset (SIL OFL, via Fontsource)
- `vercel.json`: headers, including `X-Robots-Tag: noindex` (see below)

Asset paths are relative, so the page must be served at `/errol/` **with** the trailing slash.

## How quotes arrive

There is no form. Every quote button leads to the Get a quote section, which offers
WhatsApp (pre-filled message), Call and Text to 087 875 3433. Nothing is collected by the site,
so there is no backend to run and no personal data to hold.

## Photos

The site shows no photo sections until real photos exist. Add images to `img/` and a `data-src`
on the matching slot:

- Before/after slider: `compare-before` and `compare-after`. Shown only when both load.
- Recent jobs: `job-1` … `job-6`. The section appears once at least 3 load. Add `data-alt`
  (what the photo shows) and `data-caption` (the line under it, e.g. "Hall, stairs and landing, Leixlip").

Example: `<div class="photo" data-photo="job-1" data-src="img/job-1.jpg" data-alt="Repainted hall and stairs" data-caption="Hall, stairs and landing, Leixlip"></div>`

## Before launch: confirm with Errol

Credential and proof claims (insurance, "most booked", invented jobs, reply-time promises, the
"60%" line) have been removed. These remain and still need his sign-off:

1. Phone 087 875 3433 (from one directory listing only) and that it takes **WhatsApp and texts**.
2. All prices: the service "from" lines, the guide price table, and the example quote in the hero
   (€620 + €220 = €840, consistent with the living room row).
3. Paint brands (Dulux Trade, Fleetwood, Colourtrend, Farrow & Ball, Little Greene).
4. Service area and "about 20 km", April to October exterior season, day estimates.
5. That he comes out to measure bigger jobs, and gives start and finish dates in writing.
6. Permission to publish on getawebsite.ie.

Then remove the `X-Robots-Tag: noindex` header from `vercel.json`.

## Known detector notes

`impeccable detect` reports 6 findings, all checked in a browser and judged false positives:
5 "cramped padding" (padding lives on the inner `.container`) and 1 hover contrast (no hovered
element renders navy on navy).
