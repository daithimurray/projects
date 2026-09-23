# Deploy: leixlip-tarmac.getawebsite.ie

Runbook for a Claude session that has Vercel access. The user has asked Claude to do every step.

## Preconditions (same as `_source/everydayaccountancy/DEPLOY.md`)

- `VERCEL_TOKEN` environment variable in the cloud environment (never pasted into chat).
- Network allowlist includes `vercel.com`, `api.vercel.com`, `getawebsite.ie`.

## Why a subdomain

getawebsite.ie is a Vercel project with no connected repo. A `/leixlip-tarmac` path means redeploying it from a snapshot (see the EAS runbook). A subdomain is its own project and never touches the main site. This is the same pattern as cathy-conlon.getawebsite.ie.

## Steps

```sh
cd _source/leixlip-tarmac/site
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name leixlip-tarmac
npx vercel@latest domains add leixlip-tarmac.getawebsite.ie leixlip-tarmac --token "$VERCEL_TOKEN"
```

`vercel.json` sets the build: Astro, `SITE_URL=https://leixlip-tarmac.getawebsite.ie`, `PUBLIC_NOINDEX=1`.

If `domains add` reports that DNS needs configuring, check how cathy-conlon.getawebsite.ie resolves (`dig +short cathy-conlon.getawebsite.ie`) and match it. If getawebsite.ie uses Vercel nameservers, no record is needed.

## Check

- `https://leixlip-tarmac.getawebsite.ie/` loads with styles, and the project filter, estimator and FAQ work.
- View source shows `<meta name="robots" content="noindex, nofollow">`.
- Optional: in Vercel project settings, connect the Git repo with Root Directory `_source/leixlip-tarmac/site`, so pushes redeploy.
