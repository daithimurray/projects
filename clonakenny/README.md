# Clonakenny Flower Farm: website

Single-page static site for Clonakenny Flower Farm (wedding flowers, Clonakenny, Roscrea, Co. Tipperary).
Intended URL: https://getawebsite.ie/clonakenny/ (a ground-up redesign of the v12 draft).

Plain HTML, CSS and JS. No build step, no third-party requests at runtime (fonts and scripts are
self-hosted), no cookies, no forms that send data. Product record: `_source/clonakenny/PRODUCT.md`.
Deploy runbook: `_source/clonakenny/DEPLOY.md`.

- `index.html`: markup, JSON-LD (Florist), and the design contract comment at the top of `<body>`
- `styles.css`: all styles; tokens at the top of the file
- `main.js`: smooth scroll, scroll choreography, menu, enquiry builder, reviews carousel
- `flower.js`: the live WebGL flower (no library): one instanced draw of petals on the golden-angle
  spiral, with five species presets it can morph between
- `photos.js`: the list of photos for the "favourite snaps" gallery (section hides while empty)
- `vendor/`: GSAP 3.15, ScrollTrigger, SplitText (GSAP standard licence, free) and Lenis 1.3 (MIT)
- `fonts/`: Bodoni Moda (variable, roman and italic) and Hanken Grotesk (variable), latin subset,
  SIL OFL, via Fontsource
- `img/`: WebP photos and the flower poster used when WebGL is unavailable
- `vercel.json`: headers, including `X-Robots-Tag: noindex` until Ali signs off
- `.vercelignore`: keeps this README and the `img/*.json` provenance sidecars out of the deploy

Asset paths are relative, so the page must be served at `/clonakenny/` **with** the trailing slash.

## How it behaves

- Hero: a lilac dahlia blooms on load and follows the pointer; scrolling dives the camera into it.
- The flower year: the flower morphs seed → spring → early summer → dahlia → dried as you scroll,
  with the months rail filling in.
- Enquiry: "Tell Ali about your day" builds an email (what they'd love, the feeling, date, venue,
  names) shown live as the email draft, then opens it in the visitor's mail app. Picking a date shows
  what usually grows that month. Nothing is sent or stored by the site.
- Reduced motion: no smooth scroll, no pinning, static flowers; all content stays visible.
- No JavaScript: every section and review is readable; the email button opens a plain enquiry.
- No WebGL: the hero shows `img/dahlia-poster.webp`; the year section shows text only.

## Photos in use (all WebP, from files the owner supplied in this session)

- `img/story-hug.webp`: Liz and Ali with an armful of spring flowers at the purple studio.
  Supplied; appears to be from an Irish Farmers Journal shoot.
- `img/story-tulip-hair.webp`: Liz tucking tulips into Ali's hair. Supplied; same press shoot
  (low resolution, 447px, so it is only used small).
- `img/styling-purple-studio.webp`: Liz and Ali arranging at the purple studio wall. Supplied; same
  press shoot.
- `img/wedding-arch.webp`: woven ceremony arch with dahlia and gladioli pedestals. Supplied (farm's own).
- `img/bridal-bouquet.webp`: bride by a window with her bouquet. Supplied as a phone screenshot,
  cropped to the photo.
- `img/dahlia-poster.webp`: the WebGL dahlia, rendered by `flower.js`.
- `img/og.jpg`: share image (1200×630), a capture of the hero.

Each raster's origin is recorded with it: `img/<name>.webp.json` sidecars for the WebP files and a
JPEG comment in `og.jpg` (read back with `node .claude/skills/impeccable/scripts/embed-prompt.mjs <image> --read`).

The supplied files are small (they arrived through chat at 447–928px wide). The wide styling photo
in particular is shown larger than its 790px source; replace it with Ali's original, at least 1600px
wide, when available. Same file names, WebP, and the layout picks them up.

v12's footer states "photography: Clonakenny Flower Farm's own". The three Ali-and-Liz shots look
like the Irish Farmers Journal feature (March 2025); confirm the farm has the right to use them.

### Adding the rest of v12's photos

v12 uses about 24 photos (`images/` in the v12 folder). To bring them in: convert to WebP, drop them
in `img/`, then

- **Gallery ("Some of our favourite snaps")**: add entries to `photos.js`, e.g.
  `{ src: 'img/gallery-fireplace.webp', w: 1200, h: 1600, alt: 'A stone fireplace dressed with flowers and candlelight', caption: 'Fireplace garland, winter' }`.
  The section appears as soon as the list has entries.
- **Table arrangements** panel: currently a review quote in place of a photo. Swap the
  `<blockquote class="offer__quote">` for a `<figure class="offer__photo photo">` like the others
  (v12's `wedding-table.jpg` fits).

## Before launch: confirm with Ali

Removed on purpose (v12 is the newer source): the Golden Pages phone number 087 276 6413 and any
WhatsApp/text links. Contact is email and Instagram only.

Written for this redesign, from v12 and press, that still need her OK:

1. The chef line in the story: "Ali, then head chef at Cloughjordan House, was at home with her third
   baby" (from That's Farming and Irish Country Living; v12 does not mention it).
2. The season copy and the month-by-month hints in the enquiry builder (flowers named come from v12's
   photo captions and her photos: tulips, narcissi, blossom, peonies, sweet william, sweet peas,
   dahlias, astilbe, gladioli, cornflowers). Especially: whether winter (Nov–Feb) weddings are offered,
   since v12 says "March to October" but a review mentions a February wedding.
3. "Not a wedding? Ali makes bouquets, gifts and Christmas arrangements too." (grounded in reviews;
   v12 is weddings-only, so confirm she wants non-wedding enquiries).
4. "Please get in touch before calling out" (whether visits happen at all).
5. Service lines: "Bouquets for mothers and grandmothers too", "Ali on site on the morning to place
   and style it all", "long banquet halls, glasshouses and weddings at home in the woods" (all from
   reviews or v12 photo captions).
6. Reviews: a selection of v12's Google reviews, lightly trimmed. Reviewer names are public on Google.
7. Photo rights (above), and consent from the bride in `bridal-bouquet.webp`.
8. Permission to publish on getawebsite.ie. Then remove `X-Robots-Tag: noindex` from `vercel.json`.

The child's name that appears in v12 and the press is deliberately not used.
