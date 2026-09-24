# Deploy: getawebsite.ie/clonakenny

Runbook for a Claude session that has Vercel access. Same pattern as `_source/errol/DEPLOY.md`:
the client site is its own Vercel project, and the getawebsite.ie project forwards `/clonakenny/` to it.

## Preconditions (user sets these once)

- `VERCEL_TOKEN` environment variable in the cloud environment (never pasted into chat).
- Network allowlist includes `vercel.com`, `api.vercel.com`, `getawebsite.ie`, `*.vercel.app`.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

## Facts

- Site files: `clonakenny/` at repo root. No build step. `vendor/` holds self-hosted GSAP, ScrollTrigger,
  SplitText and Lenis; `fonts/` holds Bodoni Moda and Hanken Grotesk.
- **Relative assets.** Everything is loaded relatively, so the page only renders with a trailing slash.
  The redirect in step 4 is required, not cosmetic.
- getawebsite.ie is its own Vercel project with no connected Git repo. DNS is already on Vercel.
- **Other client routes live in the same getawebsite.ie project** (`/errol/`, `/eas/`, `/everydayaccountancy/`,
  `/leixliptarmac/` …). Always snapshot the *current* production deployment right before editing, and merge
  rules. Never deploy from an older snapshot, or you drop another client's route.

## Steps

### 1. Deploy the Clonakenny site as its own project

```sh
cd clonakenny
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name clonakenny-flower-farm
```

Record the production host (e.g. `clonakenny-flower-farm.vercel.app`). Check it loads with styles and the
dahlia draws.

### 2. Snapshot getawebsite.ie

```sh
curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v13/deployments/getawebsite.ie
```

Record `id`, `projectId`, `name`. **This deployment id is the rollback point.** Report it to the user.
Stop and report back if the deployment was built from a framework, or the project has a Git repo connected.

### 3. Download its files

```sh
node _source/eas/pull-deployment.mjs <deploymentId> /tmp/getawebsite
```

Check for a top-level `src/` wrapper. Confirm the homepage and a few assets exist locally.

### 4. Add the route

Merge into `/tmp/getawebsite/vercel.json`, keeping every existing key and rule:

```json
{
  "redirects": [
    { "source": "/clonakenny", "destination": "/clonakenny/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/clonakenny/", "destination": "https://<clonakenny production host>/" },
    { "source": "/clonakenny/:path*", "destination": "https://<clonakenny production host>/:path*" }
  ]
}
```

### 5. Redeploy getawebsite.ie, preview first

```sh
cd /tmp/getawebsite
npx vercel@latest link --yes --token "$VERCEL_TOKEN" --project <getawebsite project name>
npx vercel@latest deploy --yes --token "$VERCEL_TOKEN"          # preview
```

On the preview: homepage unchanged, `/clonakenny` redirects to `/clonakenny/`, and `/clonakenny/` renders
with styles (`styles.css`, `main.js`, `flower.js`, `vendor/gsap.min.js` and `fonts/*.woff2` return 200).
Every existing client route still works. Then:

```sh
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

### 6. Verify live

- `https://getawebsite.ie/` unchanged.
- `https://getawebsite.ie/clonakenny` → 308 → `/clonakenny/`: lilac page, Bodoni headings, the dahlia blooms,
  scrolling dives into it, WhatsApp/text/call links carry the composed note.
- Other client routes unchanged.
- Response carries `X-Robots-Tag: noindex` (intended until Ali signs off the facts).

### Rollback

```sh
npx vercel@latest rollback <deployment id from step 2> --token "$VERCEL_TOKEN"
```
