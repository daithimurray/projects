# Deploy: getawebsite.ie/cathyconlon

Runbook for a Claude session with Vercel access. The user has asked Claude to do every step.
Same method as `_source/eas/DEPLOY.md`. If both are pending, do them together in **one** redeploy of getawebsite.ie.

## Preconditions

Either:
- Claude Code Desktop on the user's machine, logged in to the Vercel CLI (`npx vercel@latest whoami`), or
- a cloud session with a `VERCEL_TOKEN` secret and `vercel.com`, `api.vercel.com`, `getawebsite.ie` allowed.

`pull-deployment.mjs` needs a token. On Desktop, use the CLI's stored one: `auth.json` in the Vercel CLI data dir
(macOS `~/Library/Application Support/com.vercel.cli/`, Linux `~/.local/share/com.vercel.cli/`). Never print it.

## Facts

- Source: `_source/cathy-conlon/site` (Vite + React). It imports `../project`, so build locally and deploy `dist/`.
- The build uses base `/cathyconlon/`: every asset URL starts with `/cathyconlon/assets/...`.
- getawebsite.ie is its own Vercel project with no connected Git repo. It has to be redeployed from the files of its current production deployment.

## Steps

### 1. Build and deploy Cathy as its own project

```sh
cd _source/cathy-conlon/site
npm ci && npm run build
npx vercel@latest deploy dist --prod --yes --name getawebsite-cathyconlon
```

Record the production host (e.g. `getawebsite-cathyconlon.vercel.app`). Its assets sit at `/assets/...`. Opened directly, the page will look unstyled. That's expected: it's only reached through the rewrite.

### 2. Snapshot getawebsite.ie

```sh
curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v13/deployments/getawebsite.ie
```

Record `id`, `projectId` and `name`. **The `id` is the rollback point.** Put it in the report to the user.
Stop and report back if the deployment was built from a framework rather than uploaded static files, or if a Git repo is connected.

### 3. Download its files

```sh
node _source/eas/pull-deployment.mjs <deploymentId> /tmp/getawebsite
```

Check the file list against what `https://getawebsite.ie/` serves. Uploads are often nested under `src/`.

### 4. Add the route

Merge into `/tmp/getawebsite/vercel.json`. Keep any existing keys, including EAS rules if present:

```json
{
  "redirects": [
    { "source": "/cathyconlon", "destination": "/cathyconlon/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/cathyconlon/", "destination": "https://<cathy host>/" },
    { "source": "/cathyconlon/:path*", "destination": "https://<cathy host>/:path*" }
  ]
}
```

### 5. Redeploy getawebsite.ie: preview first

```sh
cd /tmp/getawebsite
npx vercel@latest link --yes --project <getawebsite project name>
npx vercel@latest deploy --yes            # preview: homepage identical, /cathyconlon/ styled
npx vercel@latest deploy --prod --yes
```

### 6. Verify live

- `https://getawebsite.ie/` is unchanged.
- `https://getawebsite.ie/cathyconlon` redirects to the version with a slash and renders with styles and fonts.
- The nav, Candlelight switch, Tabs, contact form validation and "Where to buy" toast all work.
- `/eas/` and other existing routes are unchanged.

### Rollback

```sh
npx vercel@latest rollback <deployment id from step 2>
```

## Later updates

Rebuild and rerun step 1 only. The rewrite keeps pointing at the same project.
