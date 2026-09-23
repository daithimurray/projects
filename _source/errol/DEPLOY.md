# Deploy: getawebsite.ie/errol

Runbook for a Claude session that has Vercel access. The user has asked Claude to do every step.
Same pattern as `_source/everydayaccountancy/DEPLOY.md`: the client site is its own Vercel project,
and the getawebsite.ie project forwards `/errol/` to it.

## Preconditions (user sets these once)

- `VERCEL_TOKEN` environment variable in the cloud environment (never pasted into chat).
- Network allowlist includes `vercel.com`, `api.vercel.com`, `getawebsite.ie`, `*.vercel.app`.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

## Facts

- Site files: `errol/` at repo root (`index.html`, `styles.css`, `main.js`, `fonts/`, `vercel.json`, `robots.txt`). No build step.
- **Relative assets.** `styles.css` and `main.js` are loaded relatively, so the page only renders
  with a trailing slash. The redirect in step 4 is required here, not cosmetic.
- getawebsite.ie is its own Vercel project with no connected Git repo. DNS is already on Vercel.
  No GoDaddy change is needed.
- **Other client routes live in the same getawebsite.ie project** (e.g. `/everydayaccountancy/`).
  Always snapshot the *current* production deployment right before editing, and merge rules.
  Never deploy from an older snapshot, or you drop another client's route.

## Steps

### 1. Deploy the Errol site as its own project

```sh
cd errol
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name errol-brennan-painting
```

Record the production host (e.g. `errol-brennan-painting.vercel.app`). Check it loads with styles.

### 2. Snapshot getawebsite.ie

```sh
curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v13/deployments/getawebsite.ie
```

Record `id`, `projectId`, `name`. **This deployment id is the rollback point.** Report it to the user.
Stop and report back if the deployment was built from a framework, or the project has a Git repo connected.

### 3. Download its files

```sh
node _source/everydayaccountancy/pull-deployment.mjs <deploymentId> /tmp/getawebsite
```

Check for a top-level `src/` wrapper. Confirm the homepage and a few assets exist locally.

### 4. Add the route

Merge into `/tmp/getawebsite/vercel.json`, keeping every existing key and rule:

```json
{
  "redirects": [
    { "source": "/errol", "destination": "/errol/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/errol/", "destination": "https://<errol production host>/" },
    { "source": "/errol/:path*", "destination": "https://<errol production host>/:path*" }
  ]
}
```

### 5. Redeploy getawebsite.ie, preview first

```sh
cd /tmp/getawebsite
npx vercel@latest link --yes --token "$VERCEL_TOKEN" --project <getawebsite project name>
npx vercel@latest deploy --yes --token "$VERCEL_TOKEN"          # preview
```

On the preview: homepage unchanged, `/errol` redirects to `/errol/`, and `/errol/` renders with styles
(`/errol/styles.css` and `/errol/main.js` return 200). Every existing client route still works. Then:

```sh
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

### 6. Verify live

- `https://getawebsite.ie/` unchanged.
- `https://getawebsite.ie/errol` → 308 → `/errol/`, styled page with Newsreader headings (`/errol/fonts/*.woff2` return 200), menu works, WhatsApp/Call/Text links correct.
- `https://getawebsite.ie/everydayaccountancy/` and other routes unchanged.
- Response carries `X-Robots-Tag: noindex` (intended until Errol confirms the facts).

### Rollback

```sh
npx vercel@latest rollback <deployment id from step 2> --token "$VERCEL_TOKEN"
```
