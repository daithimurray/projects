# Leixlip Tarmac site: source

Single-page site for Leixlip Tarmac Enterprises (Kildare, Dublin & Meath), built from a Claude Design handoff.

- `site/` Astro app with React islands. The design-system components and tokens are copied into `site/src/ds` and `site/src/styles`. See `site/README.md`.
- `../../leixlip-tarmac/` prebuilt copy for `getawebsite.ie/leixlip-tarmac`, built with `BASE_PATH=/leixlip-tarmac`. It only goes live if a deployment serves this repo's root folders.

Every build ships with `noindex`, so the demo doesn't compete with leixliptarmac.com in Google.

## Own subdomain (same setup as Cathy Conlon)

- In Vercel, import `daithimurray/projects`.
- Root Directory: `_source/leixlip-tarmac/site`. `site/vercel.json` holds the rest of the config.
- Domain: `leixlip-tarmac.getawebsite.ie`.

## Rebuild the sub-path copy

    cd _source/leixlip-tarmac/site
    npm ci
    SITE_URL=https://getawebsite.ie BASE_PATH=/leixlip-tarmac PUBLIC_NOINDEX=1 npm run build
    rm -rf ../../../leixlip-tarmac && cp -r dist ../../../leixlip-tarmac

## Before launch (blocking)

1. **Client sign-off**: written OK from Leixlip Tarmac to publish on getawebsite.ie.
2. **Consultation form**: set `PUBLIC_FORM_ENDPOINT`. Until then every submission shows an error with Barry's and John's numbers.
3. **Privacy notice**: the form collects names and phone numbers.
4. **Photos**: the hero, map and project cards are striped placeholders.
5. **Confirm with the client**: "35 years", the client names list, and whether to show the Leixlip address.
