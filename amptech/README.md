# Amptech: website

Built static site for Amptech (intruder alarms, CCTV, fire detection; Dublin & Meath).
Intended URL: https://getawebsite.ie/amptech/

Built output of `_source/amptech/` (Vite + React). Asset paths are absolute under `/amptech/`,
so it renders correctly only when served at getawebsite.ie/amptech/ (or `/amptech/` on any host).
Pages are hash routes: `/amptech/#/cctv`, `/amptech/#/survey`.

To rebuild: `cd _source/amptech && npm ci && npm run build`, then copy `dist/amptech/*` here.

## Before launch (blocking)

1. **Client sign-off**: written OK from Amptech to publish on getawebsite.ie. Reviews are real and quoted verbatim.
2. **Placeholders**: phone `01 800 0000`, PSA licence `00000`, email/address, guide prices, stats. A fake PSA number on a live security-installer site is a compliance risk.
3. **Photos**: striped placeholders need real installation photography.
4. **Survey form**: no validation and no submission backend. It shows a confirmation toast only.
5. **noindex**: `index.html` has `noindex` and `robots.txt` disallows all. Remove both at launch.
