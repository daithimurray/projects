# Amptech website

Production build of the Claude Design handoff (`../project/ui_kits/website`). Vite + React 18 + TypeScript.

## Run
- `npm install`
- `npm run dev` — local dev server
- `npm run build` — typecheck + static build to `dist/amptech/`
- Local preview: `npm run preview`, then open `/amptech/`

## Structure
- `src/design-system/` — the 43 Amptech components and tokens, ported unchanged from `project/components` and `project/tokens`. Each `.jsx` has a matching `.d.ts` contract. Import from `./design-system`.
- `src/content.ts` — nav, footer, verbatim reviews, and the phone and PSA placeholders.
- `src/pages/` — `Home`, `Service` (CCTV), `Survey` (3-step request flow).
- `src/router.ts` — hash routes: `#/`, `#/cctv`, `#/survey`, plus home sections `#/services` `#/reviews` `#/questions` (`#/alarms` and `#/fire` land on services until they have pages).
- `src/components/CoveragePlan.tsx` — plan-view camera coverage drawing (home and business examples).
- `src/design-system/tokens/responsive.css` — mobile-first layout classes (`ds-split`, `ds-grid`, …); components keep their look inline.

## Placeholders to replace before launch
- Phone `01 800 0000`, PSA licence `00000`, email and address in `Footer`
- Guide prices, stats ("since 2004", "4.9")
- Striped `Media` placeholders → real installation photos
- `noindex` meta in `index.html` — remove at launch
- Survey submits nowhere yet (`TODO(launch)` in `Survey.tsx`): wire an enquiry backend before the confirmation screen can be trusted
- Privacy, terms and cookies pages don't exist; footer legal links removed until they do
- Intruder alarm and fire detection pages not written; confirm the urgent-call promise in the top strip with Amptech
- Fonts load from Google Fonts; self-host licensed files via `design-system/tokens/fonts.css`

## Hosting: getawebsite.ie/amptech/
The site is built for the sub-path `/amptech/` (`vite.config.ts` `BASE_PATH`, plus the redirects in `vercel.json`).

1. Vercel: import this repo as a new project. Root Directory `web`. `vercel.json` handles the rest.
2. In the project that serves **getawebsite.ie**, add this rewrite to its `vercel.json` (replace the host with this project's production URL):

```json
{
  "rewrites": [
    { "source": "/amptech", "destination": "https://amptech-web.vercel.app/amptech/" },
    { "source": "/amptech/:path*", "destination": "https://amptech-web.vercel.app/amptech/:path*" }
  ]
}
```

Page routes are hash-based (`/amptech/#/cctv`, `/amptech/#/survey`), so no further rewrites are needed.
