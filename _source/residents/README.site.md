# Barnhall Meadows residents association: website

Built output. Do not edit files here: edit `_source/residents/` and run `npm run build` there.

Six pages plus a privacy notice, in plain HTML, CSS and JS. It uses no framework, no third-party requests
and no cookies. Every path is relative, so the folder can be served from any URL (with trailing slashes).

- `index.html` Home · `news/` News & Events (plus one page per post) · `events/<slug>/` one page per event, each with an `event.ics`
- `committee/` · `get-involved/` · `documents/` · `contact/` · `privacy/`
- `wonderful-barn/` an interactive 3D model of the Wonderful Barn, with three.js (MIT) and its fonts (SIL OFL) alongside
- `styles.css`, `main.js`, `favicon.svg`, `fonts/` (Fraunces and Public Sans, SIL OFL, via Fontsource)
- `vercel.json`: security headers and `X-Robots-Tag: noindex` until launch. `robots.txt` blocks crawlers until launch.
