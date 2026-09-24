# Deploy: getawebsite.ie/amptech

Runbook for a Claude session that has Vercel access (e.g. the local GetAWebsite.ie session).
The user has asked Claude to do every step. Same pattern as `_source/eas/DEPLOY.md`: follow it for
the snapshot, download, preview, promote and rollback steps. Only the Amptech specifics are below.

## Facts

- Site files: `amptech/` at repo root on branch `amptech-site` (`index.html`, `assets/`, `robots.txt`). Already built; no build step.
- Asset URLs are absolute: `/amptech/assets/...`. The rewrite below strips `/amptech`, so the project serves them at `/assets/...`.
- Source: `_source/amptech/` (Vite + React + TS). Rebuild only if content changes.

## Steps

1. Deploy the site as its own project:

   ```sh
   cd amptech
   npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name getawebsite-amptech
   ```

   Record the production host (e.g. `getawebsite-amptech.vercel.app`). Its own root will look unstyled; that is expected, because assets live under `/amptech/`.

2. Snapshot getawebsite.ie and download its files: `_source/eas/DEPLOY.md` steps 2–3. Record the rollback deployment id.

3. Merge into getawebsite.ie's `vercel.json`, keeping every existing key and rule (eas, leixliptarmac, clonakenny, etc.):

   ```json
   {
     "redirects": [
       { "source": "/amptech", "destination": "/amptech/", "permanent": true }
     ],
     "rewrites": [
       { "source": "/amptech/", "destination": "https://<amptech production host>/" },
       { "source": "/amptech/:path*", "destination": "https://<amptech production host>/:path*" }
     ]
   }
   ```

4. Preview, check, promote: `_source/eas/DEPLOY.md` step 5.

## Verify live

- `https://getawebsite.ie/amptech` redirects to `/amptech/`, renders styled, and the Hanken Grotesk font loads.
- `/amptech/#/alarms`, `/amptech/#/cctv` and `/amptech/#/fire` each show their service page with a plan drawing.
- `/amptech/#/survey`: Continue → Continue → Request survey returns home with a "Survey requested" toast.
- The getawebsite.ie homepage and all other client paths are unchanged.

## Rollback

`npx vercel@latest rollback <deployment id from step 2> --token "$VERCEL_TOKEN"`
