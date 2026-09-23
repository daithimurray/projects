# Leixlip Tarmac site: source

Single-page site for Leixlip Tarmac Enterprises (Kildare, Dublin & Meath), built from a Claude Design handoff.
Intended URL: https://getawebsite.ie/leixliptarmac/

- `site/` Astro app with React islands. The design-system components and tokens are copied into `site/src/ds` and `site/src/styles`. See `site/README.md`.
- `DEPLOY.md` deploy runbook for a session with Vercel access.
- `../../leixliptarmac/` the compiled site, built for the `/leixliptarmac` path.

Every build ships with `noindex`, so the demo doesn't compete with leixliptarmac.com in Google.

## Rebuild the compiled copy

    cd _source/leixliptarmac/site
    npm ci
    SITE_URL=https://getawebsite.ie BASE_PATH=/leixliptarmac PUBLIC_NOINDEX=1 npm run build
    rm -rf ../../../leixliptarmac && cp -r dist ../../../leixliptarmac

## Before launch (blocking)

1. **Client sign-off**: written OK from Leixlip Tarmac to publish on getawebsite.ie.
2. **Consultation form**: set `PUBLIC_FORM_ENDPOINT`. Until then every submission shows an error with Barry's and John's numbers.
3. **Privacy notice**: the form collects names and phone numbers.
4. **Photos**: the hero, map and project cards are striped placeholders.
5. **Confirm with the client**: "35 years", the client names list, and whether to show the Leixlip address.
