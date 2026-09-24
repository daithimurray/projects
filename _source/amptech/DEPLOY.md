# Deploy: getawebsite.ie/amptech

Runbook for a Claude session that has Vercel access. Uses the same method as `_source/eas/DEPLOY.md` and `_source/leixliptarmac/DEPLOY.md`. If other routes are also pending, add them all in **one** redeploy of getawebsite.ie.

## Preconditions (user sets these once)

- A `VERCEL_TOKEN` environment variable in the cloud environment. Never paste it into chat.
- The network allowlist includes `vercel.com`, `api.vercel.com` and `getawebsite.ie`.

Check: `curl -sS -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v2/user` returns the user.

## Facts

- getawebsite.ie is its own Vercel project with no connected Git repo. Adding a path means redeploying it from its current production files.
- The Amptech build is made for the path `BASE_PATH=/amptech`, so every asset URL starts `/amptech/...`. Its files sit at the root of their own deployment (`/_astro/...`, `/hero/...`). The rewrite below strips the prefix.
- `amptech/` at the repo root is the same build, already compiled. Deploy that folder as static files. There's no build step.
- Every build carries `noindex` until the client signs off (`PUBLIC_NOINDEX` defaults to on).

## Steps

### 1. Deploy the Amptech site as its own project

```sh
cd amptech
npx vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN" --name getawebsite-amptech
```

Record the production host it prints (e.g. `getawebsite-amptech.vercel.app`). On that host the page loads unstyled, because assets point at `/amptech/...`. That's expected. Check that `https://<host>/_astro/` files and `https://<host>/hero/poster-wide.webp` return 200.

### 2. Snapshot getawebsite.ie and download its files

Follow steps 2 and 3 of `_source/eas/DEPLOY.md`: take the snapshot, note the rollback id, and run `pull-deployment.mjs`. Stop if the site is framework-built or has a Git repo connected.

### 3. Add the route

Merge this into getawebsite.ie's `vercel.json`. Keep the existing keys and any EAS or Leixlip rules:

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

### 4. Redeploy getawebsite.ie

Deploy a preview first, then promote. The commands are the same as step 5 of the EAS runbook.

## Check

- `https://getawebsite.ie/` looks exactly as before.
- `https://getawebsite.ie/amptech` redirects to `/amptech/`, which loads with fonts, styles and the hero poster.
- On a desktop browser, moving the pointer onto the driveway switches the floodlight on. The "How it works" section pins and steps through. The quote form shows the "not connected yet" message until an endpoint is set.
- `https://getawebsite.ie/amptech/privacy/` loads.
- There are no 404s in the network tab.
- View source shows `<meta name="robots" content="noindex, nofollow">` and canonical `https://getawebsite.ie/amptech/`.

Report the rollback deployment id to the user.

## Moving to amptech.ie later

Rebuild with `SITE_URL=https://www.amptech.ie BASE_PATH=/ PUBLIC_NOINDEX=0 PUBLIC_FORM_ENDPOINT=<endpoint> npm run build` and deploy `dist/` to the client's host. Set up 301 redirects from the old WordPress URLs (`/about-us/`, `/security/`, `/system-upgrades/`, `/home-alarm-systems/`, `/hkc-mobile-app/`, `/contact-us/`, `/privacy-policy/`) to the matching sections (`/#about`, `/#services`, `/#upgrades`, `/#services`, `/#app`, `/#contact`, `/privacy/`).
