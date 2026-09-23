# Deploy: getawebsite.ie/leixliptarmac

Runbook for a Claude session that has Vercel access. The user has asked Claude to do every step, and chose the **path**, not a subdomain.

Same method as `_source/everydayaccountancy/DEPLOY.md`. If both are pending, add both routes in **one** redeploy of getawebsite.ie.

## Preconditions (user sets these once)

- `VERCEL_TOKEN` environment variable in the cloud environment (never pasted into chat).
- Network allowlist includes `vercel.com`, `api.vercel.com`, `getawebsite.ie`.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

## Facts

- getawebsite.ie is its own Vercel project with no connected Git repo. Adding a path means redeploying it from its current production files.
- The Leixlip build is made for the path: `BASE_PATH=/leixliptarmac`, so every asset URL starts `/leixliptarmac/_astro/...`. Its files sit at the root of its own deployment (`/_astro/...`). The rewrite below strips the prefix.
- `leixliptarmac/` at the repo root is the same build, already compiled. Deploy that folder as static files, or deploy `_source/leixliptarmac/site` and let Vercel build it (`vercel.json` holds the build command).
- Every build carries `noindex` until the client signs off.

## Steps

### 1. Deploy the Leixlip site as its own project

```sh
cd leixliptarmac
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name leixliptarmac
```

Record the production host it prints (e.g. `leixliptarmac.vercel.app`). On that host the page loads unstyled, because assets point at `/leixliptarmac/...`. That's expected. Check `https://<host>/_astro/` files return 200.

### 2. Snapshot getawebsite.ie, download its files

Follow steps 2 and 3 of `_source/everydayaccountancy/DEPLOY.md` (snapshot, rollback id, `pull-deployment.mjs`). Stop if the site is framework-built or has a Git repo connected.

### 3. Add the route

Merge into getawebsite.ie's `vercel.json`, keeping existing keys and any EAS rules:

```json
{
  "redirects": [
    { "source": "/leixliptarmac", "destination": "/leixliptarmac/", "permanent": true }
  ],
  "rewrites": [
    { "source": "/leixliptarmac/", "destination": "https://<leixlip production host>/" },
    { "source": "/leixliptarmac/:path*", "destination": "https://<leixlip production host>/:path*" }
  ]
}
```

### 4. Redeploy getawebsite.ie

Preview first, then promote. Same commands as the EAS runbook, step 5.

## Check

- `https://getawebsite.ie/` looks exactly as before.
- `https://getawebsite.ie/leixliptarmac` redirects to `/leixliptarmac/`, which loads with fonts and styles.
- The project filter, estimator and FAQ work. No 404s in the network tab.
- View source shows `<meta name="robots" content="noindex, nofollow">` and canonical `https://getawebsite.ie/leixliptarmac`.

Report the rollback deployment id to the user.
