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
- `src/router.ts` — hash routes: `#/`, `#/cctv` `#/alarms` `#/fire` (service page), `#/survey`.

## Placeholders to replace before launch
- Phone `01 800 0000`, PSA licence `00000`, email and address in `Footer`
- Guide prices, stats ("since 2004", "4.9")
- Striped `Media` placeholders → real installation photos
- `noindex` meta in `index.html` — remove at launch
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
