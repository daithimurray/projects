# Deploy: getawebsite.ie/everydayaccountancy

Runbook for a Claude session that has Vercel access. The user has asked Claude to do every step.

## Preconditions (user sets these once)

- `VERCEL_TOKEN` environment variable in the cloud environment (never pasted into chat).
- Network allowlist includes `vercel.com`, `api.vercel.com`, `getawebsite.ie`.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

## Facts

- Site files: `everydayaccountancy/` at repo root (`index.html` with CSS inlined, plus `robots.txt`). No build step.
- getawebsite.ie is its own Vercel project with **no connected Git repo** (found by the Cathy Conlon session). Its source is not in any known repo, so it has to be redeployed from the files of its current production deployment.
- The house pattern for other clients is subdomains (cathy-conlon.getawebsite.ie). The user explicitly chose the **path** for this client.

## Steps

### 1. Deploy the EAS site as its own project

```sh
cd everydayaccountancy
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name everydayaccountancy
```

Record the production URL it prints (e.g. `https://everydayaccountancy.vercel.app`). Check it loads with styles.

### 2. Snapshot getawebsite.ie before touching it

```sh
curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v13/deployments/getawebsite.ie
```

Record `id`, `projectId`, `name` and the build info (framework / buildCommand). **This deployment id is the rollback point.** Write it in the final report to the user.

Stop and report back if either of these is true:
- The deployment was built from a framework (Next.js etc.) rather than uploaded static files. Its source isn't available, so a redeploy would drop it.
- The project already has a Git repo connected. In that case, add the rules in that repo instead.

### 3. Download its files

```sh
node _source/everydayaccountancy/pull-deployment.mjs <deploymentId> /tmp/getawebsite
```

Compare the file list with what `https://getawebsite.ie/` serves: fetch the homepage and a few linked assets, and confirm they exist locally.

### 4. Add the route

Merge into `/tmp/getawebsite/vercel.json`. Create the file if it's missing, and keep any existing keys:

```json
{
  "redirects": [
    { "source": "/everydayaccountancy", "destination": "/everydayaccountancy/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/everydayaccountancy/", "destination": "https://<EAS production host>/" },
    { "source": "/everydayaccountancy/:path*", "destination": "https://<EAS production host>/:path*" }
  ]
}
```

The redirect keeps URLs consistent. The EAS page has no relative assets, so it would render either way.

### 5. Redeploy getawebsite.ie

Deploy a preview to the same project first:

```sh
cd /tmp/getawebsite
npx vercel@latest link --yes --token "$VERCEL_TOKEN" --project <getawebsite project name>
npx vercel@latest deploy --yes --token "$VERCEL_TOKEN"          # preview
```

Check the preview: the homepage matches live getawebsite.ie, and `/everydayaccountancy/` shows the EAS site. Then promote:

```sh
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
```

### 6. Verify live

- `https://getawebsite.ie/` is unchanged.
- `https://getawebsite.ie/everydayaccountancy` redirects to the version with a slash and renders the EAS site with styles and team photos.
- `https://getawebsite.ie/cathy-conlon...` and other existing routes are unchanged.

### Rollback

```sh
npx vercel@latest rollback <deployment id from step 2> --token "$VERCEL_TOKEN"
```
