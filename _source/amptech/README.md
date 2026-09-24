# Amptech site: source

A ground-up redesign of amptech.ie for Amptech, the trading name of Robert Farnan Electrical & Alarms Limited (PSA licence 03019, Leixlip, Co. Kildare). It's a pitch build, intended for https://getawebsite.ie/amptech/.

- `site/`: Astro app. Static HTML, with GSAP + ScrollTrigger, Lenis smooth scroll and a lazily loaded three.js hero. See "Structure" below.
- `PRODUCT.md`: product truth, the source every line of copy is checked against.
- `dossier.md`: client research dossier (23 Sept 2026) plus the testimonials the client supplied. `PRODUCT.md` is derived from it.
- `BUILD-SPEC.md`: design world, rules and motion grammar that the sections were built to.
- `DESIGN.md` and `.impeccable/design.json`: the design system as built, written after the finish review from the shipped code.
- `DEPLOY.md`: deploy runbook for a session with Vercel access, plus redirects for moving to amptech.ie.
- `../../amptech/`: the compiled site, built for the `/amptech` path.

Every build ships with `noindex` until the client signs off (`PUBLIC_NOINDEX=0` turns it off).

## Run it locally

    cd _source/amptech/site
    npm ci
    npm run dev          # http://localhost:4321/amptech/

Node 22 or newer.

## Rebuild the compiled copy

    cd _source/amptech/site
    npm ci
    SITE_URL=https://getawebsite.ie BASE_PATH=/amptech npm run build
    rm -rf ../../../amptech && cp -r dist ../../../amptech

## Before launch (blocking)

1. **Client sign-off**: a written OK from Amptech to publish, on getawebsite.ie and later on amptech.ie.
2. **Quote form**: set `PUBLIC_FORM_ENDPOINT` (the form POSTs JSON). Until then, every valid submission shows a "call us instead" message. Update the privacy notice with the provider's name and location.
3. **Privacy notice**: `/privacy/` is a draft. The highlighted placeholders need confirming: legal basis, form provider, retention period, email address and date.
4. **Confirm these company claims.** The site states them because the client's current site does, but none is independently verified:
   - "over 20 years" (the company was incorporated in 2011)
   - EN 50131-1 (the current site says "EN5013-1")
   - 24/7 emergency call-out, 365 days
   - monitoring with a Garda URN (which partner runs the monitoring centre?)
   - GSM text units with no monitoring fee
   - maintenance contracts and engineer's reports
   - "countrywide" coverage
5. **Access control**: it's on the PSA licence but not marketed today. The site lists it, so confirm they want to sell it.
6. **Company details in the footer**: company no. 501850 and Eircode W23 N226 come from SoloCheck, not a primary source. Irish company websites must show the registered name, number and office.
7. **Brand assets**: the AMPTECH wordmark is authored for the pitch. Get the real logo files, plus the branded van photo, which is the strongest real asset for the About section.
8. **Google reviews**: two written reviews are quoted, and each is shown as 5/5. Add the Google Business Profile link, and show a total or average only once the client confirms it.

## Review record

- **Six-lens review** (accessibility, performance, visual, motion, content, code), with each finding checked by a second, adversarial agent: 61 confirmed and fixed. A verification sweep then confirmed 19 more, all fixed.
- **axe-core:** 0 WCAG 2.2 A/AA violations at 1440 and 390 wide, under reduced motion, and on the privacy page.
- **Layout:** no horizontal overflow and no console errors at 320×640, 375×812, 768×1024, 1024×768, 1280×800, 1920×1080 or 844×390. The header fits at 320px with 44px targets.
- **Performance:**
  - LCP is the headline, or the lede on phones, at first paint (about 1.6s on throttled mobile).
  - three.js (about 150 KB gzipped) loads only once the hero is near view, and never under reduced motion or save-data.
  - The HTML is about 48 KB gzipped.
- **Impeccable finish review.** The second verdict was "fix", with every material item resolved except the night sky, which was marked partial: the reviewer wants the overcast to read as amber under cloud, and it still reads as blue under warm cloud, because text contrast caps how warm it can go. The tile seam and the footer edge the reviewer found were fixed after that verdict, and the cloud was warmed further; that last batch hasn't been re-reviewed.
- **Raster provenance:** every shipped image records that it's a render of the site's own three.js scene (`node ../../.claude/skills/impeccable/scripts/embed-prompt.mjs --scan site/public`).
- **Not verified:** frame rate on real phones. The sandbox only has software WebGL, which is much slower than any real GPU. Check the hero and How it works on a mid-range Android before launch.

## Deliberately not on the site

- "Amptech Ltd": no such company exists. Everything uses the real legal entity.
- The address as a place to visit: it's probably a home office, so there's no map pin and no directions link.
- General electrical work, the email address (rob@amptech.ie is only reported by one directory), team names, prices, aggregate ratings, and brands other than HKC.
- Carbon monoxide detection: the current site says "CO2", which probably means CO. Confirm it before mentioning CO.

## Structure

- `site/src/pages/index.astro` holds the section order. `site/src/pages/privacy.astro` is the privacy notice.
- `site/src/components/*.astro` are the sections, each with its own scoped styles and script.
- `site/src/scripts/motion.js` holds the shared GSAP, ScrollTrigger and Lenis setup, the motion grammar (trip, sweep, strobe), `later()` for deferred setup, and the pause switch.
- `site/src/scripts/hero/*` is the three.js scene (a dynamic import, never loaded under reduced motion or save-data).
- `site/src/data/content.js` holds every word of copy. `site/src/data/ireland.js` holds the generated map data (`tools/make-ireland.mjs`).
- `site/tools/shoot.mjs` is the Playwright screenshot harness. `tools/capture-hero.mjs` regenerates the hero posters and the share image.
