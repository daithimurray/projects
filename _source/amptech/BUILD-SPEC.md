# Amptech redesign: build spec

Brief for everyone building a section of `_source/amptech/site`. Read it fully before writing code. `PRODUCT.md` (same folder) holds the product facts. `site/src/data/content.js` holds every word of copy.

## The world: "After Dark"

The page is a Kildare housing estate at night, and light does the selling. We don't claim a house is protected. We show it: sensors trip, floodlights snap on, a CCTV camera turns to follow, the bell-box strobe blinks, an alert lands on a phone.

- **Ground:** dusk blue night (`--night-900` base), never black. The overcast Irish sky glows orange from sodium streetlights near the horizon.
- **Sodium amber** (`--sodium-500`) is the only warm accent: primary buttons, key numbers, the "light" in illustrations. On floodlight-white panels use `--sodium-800` for sodium-coloured text.
- **Floodlight white** (`.is-lit`, `--flood-50`) is the ground for dense reading sections. Sections marked `data-lit-reveal` switch on like a floodlight as they scroll in. That's already wired in `motion.js` and `base.css`.
- **Bell-box blue** (`--strobe-500`) is for alerts and notifications only. **Alarm red** (`--alarm-500`) is for the smoke alarm and errors only. **Clear green** (`--clear-400`) is for an "all clear" LED only.
- **Materials for illustration:** pebbledash render (`--pebble`), slate roofs (`--slate`), tarmac (`--tarmac`), tungsten windows (`--tungsten`). Irish front doors are painted bold colours (red, teal, racing green, yellow). Use them as small, local notes.
- **Type:** Archivo (wide, `font-stretch` 108–125%) for display and controls. Atkinson Hyperlegible Next for body copy (many visitors are older homeowners on phones). Martian Mono (`.data`) **only** for data: timestamps, zone labels, licence numbers, OSD overlays. Never as a "techy" costume.
- **Shape:** alarm hardware is rounded rectangles. Use `--radius-sm` for controls and `--radius-md`/`--radius-lg` for panels. No pills, no sharp boxes.
- **Depth:** light comes from above, so shadows drop downward (`--shadow-*`). A lit control casts sodium light below it (`--shadow-lit`). No zero-offset glowing halos around boxes. Light sources (lamps, LEDs, screens) may bloom.

## Hard rules (the craft floor)

- **No eyebrow or kicker labels above headings.** None, anywhere. The heading carries itself. A zone tag inside an illustration or a step (e.g. `Zone 2 · Hall`) is data, not a kicker. It never sits directly above a section heading.
- No section numbers (01/02/03) unless the sequence carries information. The process steps may be numbered because order matters.
- No grid of same-size icon + heading + text cards as a section's structure. No cards inside cards.
- No gradient text. No glass or blur as decoration. No coloured `border-left` accents. No hard offset shadows. No emoji or unicode glyphs as icons: use `Icon.astro` (extend it in the same 24px grid, 1.6px stroke, round caps if you need a new glyph) or authored inline SVG.
- Contrast: body text ≥ 4.5:1 and large text ≥ 3:1, in every state. Secondary text on night uses `--dusk-200`/`--dusk-300`, on flood uses `--ink-700`/`--ink-500`. Never grey-on-grey.
- Headings: `.h-section` (step-4) for section titles. Display max 6rem. Tracking never below -0.04em. Body measure 60–72ch.
- Spacing: sections use `.section` (vertical padding `--section-y`) and `.container`. More space above a heading than below it.
- Tap targets ≥ 44px. Every interactive thing gets visible hover, focus-visible, active and disabled states.
- Copy: use `content.js` only. **Never invent facts:** no prices, ratings, review counts, response times, client names, or extra testimonials. Demo data inside an illustration (e.g. a phone notification feed) must be labelled "Illustration" and stay generic. If you need a new string, add it to `content.js` in your own export and keep it factual.

## Motion

Import everything from `src/scripts/motion.js`:

```js
import { boot, gsap, ScrollTrigger, SplitText, motionOK, isTouch, lightsOn, sweepIn, strobe } from '../scripts/motion.js';
boot(); // idempotent: registers plugins, starts Lenis, adds .motion-ok to <html>
```

- **Content is visible by default.** Initial "dark" states are set by JS only when `motionOK()` is true, or in CSS under `.motion-ok`. With JS off or reduced motion on, every word and control must be visible and usable.
- **Grammar**, one vocabulary for the whole page:
  - *trip*: a PIR floodlight snapping on. Fast attack (≤120ms), a tiny settle, slow decay (1–1.4s). `lightsOn()` does it for content groups. `ease: 'trip'` and `ease: 'decay'` are registered.
  - *sweep*: a detection beam passing across. `sweepIn(heading)` reveals heading lines through masks. Use it for section headings, but not on every one. Vary it.
  - *strobe*: the bell-box double blink. Alerts only.
  - *pan*: a camera head turning to follow.
  - *cable*: a line drawn along a path (DrawSVGPlugin is registered).
- One authored moment per section. No identical fade-up on every block. Reach past opacity and transform: clip-path, masks, filter brightness, SVG stroke drawing, CSS variables driving light cones.
- Eases: `expo.out` for arrivals, `power2.inOut` for scrubs. Durations 0.4–1.1s for UI, longer only for scrubbed scenes.
- ScrollTriggers must be created **synchronously** when your component script runs (not inside `setTimeout`). `motion.js` sorts and refreshes after load and font swap. If you pin, use `ScrollTrigger.matchMedia` / `gsap.matchMedia()` so the pin only exists where it works (usually ≥ 900px wide and `motionOK()`). On small screens use a stacked, non-pinned version.
- `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` is the right tool for branching.
- Pause anything continuous (canvas, rAF loops, CSS animations on heavy elements) when it is off-screen (IntersectionObserver) or the tab is hidden.
- Lenis is the scroller when motion is on. Use `window.__lenis` if you need it. For scrollable inner elements add `data-lenis-prevent`.

## Performance budget

- three.js loads only in the hero, via dynamic `import()` after first paint. The hero poster image is the LCP element. Nothing else imports three.
- Own JS per section ≤ 25 KB unminified, excluding GSAP. No new npm dependencies without a strong reason (say why in your report).
- SVG illustrations: hand-authored, inline, compact. Keep node counts sane (< 400 elements per illustration).
- No layout shift: reserve space for anything that loads late.

## Accessibility

- Semantic landmarks and headings in order (`h1` in hero only, `h2` per section, `h3` inside).
- Decorative SVG/canvas: `aria-hidden="true"`. Meaningful illustrations get `role="img"` and an `aria-label` describing what they show.
- Interactive demos are real controls: `button`, `input type=range`, `details`. Keyboard operable, with visible focus.
- Scrollytelling: all step text must be in the DOM in reading order and readable without scrolling tricks. The visual is supplementary.
- Reduced motion: no pinning, no scrubbing, no parallax, no autoplaying loops. Show each illustration in a sensible static state (usually its "everything on" end state).

## File ownership

Each builder owns only the files listed for them. Don't edit anyone else's files. If you need a shared token or helper that doesn't exist, add it inside your component (scoped `<style>`, local script) and mention it in your report. The integrator can lift it later. Exceptions: you may **append** to `content.js` (new exports only) and to `Icon.astro` (new icon names only).

- **Hero:** `src/components/Hero.astro`, `src/scripts/hero/**`, `public/hero/**`
- **Anatomy:** `src/components/Anatomy.astro`, `src/scripts/anatomy.js` (optional)
- **Services, trust, upgrade:** `src/components/TrustCheck.astro`, `src/components/Services.astro`, `src/components/Upgrade.astro`
- **App, process:** `src/components/AppDemo.astro`, `src/components/Process.astro`
- **About, FAQ, contact, footer:** `src/components/About.astro`, `src/components/Faq.astro`, `src/components/Contact.astro`, `src/components/Footer.astro`, `src/pages/privacy.astro`, `src/data/ireland.js` (generated outline), `tools/make-ireland.mjs`

Keep each section's root element, `id` and tone class as in the stub (`#top`, `#trust`, `#how-it-works`, `#services`, `#upgrades`, `#app`, `#process`, `#about`, `#faq`, `#contact`). The nav and the mobile bar rely on them. Remove the stub's temporary `aria-label` and label sections by their heading (`aria-labelledby`).

## Page rhythm

1. Hero: night, 3D.
2. Trust strip: night, thin, quiet.
3. Anatomy: night, pinned scrollytelling. The big "how it works" moment.
4. Services: **lit**, a dense, scannable index. Not cards.
5. Upgrade: night. Interactive before/after keypads, plus Robert C.'s testimonial.
6. App: night, sodium horizon glow. Phone with a live alert demo.
7. Process: **lit**. Cable-run steps ending in a specimen certificate.
8. About: night. Ireland map with Leixlip glowing, and the facts.
9. FAQ: **lit**, native `details`.
10. Contact: night. The phone number as display type, plus the quote form.
11. Footer: deepest night. The wordmark's letters light up like windows.

## Verify your work

1. `npm install` (first time), then `npx astro dev --port <your port>`. Ports: hero 4411, anatomy 4412, services 4413, app/process 4414, about/contact 4415.
2. Screenshot your sections at 390 and 1440 wide, plus reduced motion:
   `node tools/shoot.mjs --port <port> --selector "#your-id" --widths 390,1440 --out shots/<you>`
   For pinned or scrubbed sections, add `--frames 0,0.25,0.5,0.75,1`. For reduced motion add `--reduced`.
3. Open the PNGs and look at them properly. Fix overflow, console errors, contrast, cramped spacing and awkward wraps. Then do one more round. Two rounds maximum, then stop polishing.
4. `npx astro build` must pass.
5. Commit your files with a clear message.
