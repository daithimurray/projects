# Leixlip Tarmac website

Production build of the single-page design in `../project/ui_kits/website/index.html`.
Astro renders the page to static HTML. React hydrates only the parts that need it.

## Run

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

Copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT` before going live.

## Layout

- `src/pages/index.astro`: page shell, meta tags, LocalBusiness JSON-LD, section order
- `src/components/sections.jsx`: static sections (no JS shipped)
- `src/components/islands.jsx`: hydrated parts: navbar scroll-spy and mobile menu, project filter, estimator, FAQ, consultation form
- `src/data.js`: all copy and sample data
- `src/ds/`: design-system components, copied from `../project/components/`
- `src/styles/`: design-system tokens, copied from `../project/tokens/`, plus `site.css`

## Differences from the prototype

- No in-browser Babel or unpkg React. Fonts are self-hosted via Fontsource.
- CTAs are real `#anchor` and `tel:` links, so they work before JS loads. `scroll-margin-top` replaces the JS scroll offset.
- The form validates, posts to `PUBLIC_FORM_ENDPOINT`, and has a honeypot field.
- FAQ answers stay in the HTML when collapsed, so search engines can read them.
- Phone numbers in the contact table are tap-to-call links.
- Footer Privacy/Terms/Accessibility links are removed until those pages exist.
- Phone-width fixes in `site.css`. The prototype scrolled sideways by about 125px at 390px wide, and the topbar phone number wrapped. Port these back to the design system.

## Before launch

- Add a privacy notice. The form collects names and phone numbers.
- Set the form endpoint.
- Replace the striped placeholders (hero photo, map, project cards) with the client's photos.
- Confirm with the client: "35 years", the client names list, and whether to show the Leixlip address.
