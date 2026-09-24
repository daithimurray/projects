---
name: Clonakenny Flower Farm
description: Wedding flowers grown from seed in Tipperary, told on a drenched lilac field with a live WebGL dahlia.
colors:
  lilac: "#C8A2C8"
  lilac-pale: "#F3EAF3"
  lilac-mist: "#E7D6E8"
  lilac-deep: "#B488B6"
  studio: "#A23F78"
  plum: "#2A1433"
  plum-2: "#4A2656"
  dusk: "#1B0E21"
  on-dusk: "#EBDDEE"
  on-dusk-2: "#C9B3CF"
  field-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.6rem, 0.8rem + 5.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.3rem + 4.9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(2.3rem, 1.6rem + 3.2vw, 4.4rem)"
    fontWeight: 400
    lineHeight: 1
  quote:
    fontFamily: "Bodoni Moda, Didot, Bodoni 72, Georgia, serif"
    fontSize: "clamp(1.6rem, 1.3rem + 1.3vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.02rem, 0.97rem + 0.22vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)"
    fontWeight: 600
    lineHeight: 1.45
  button:
    fontFamily: "Hanken Grotesk, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    letterSpacing: "0.005em"
rounded:
  pill: "999px"
  petal: "clamp(28px, 6vw, 96px)"
  petal-tip: "10px"
  panel: "32px"
  field: "14px"
  focus: "6px"
  circle: "50%"
spacing:
  gutter: "clamp(16px, 4.5vw, 64px)"
  section: "clamp(80px, 10vw, 150px)"
  grid-gap: "clamp(16px, 2vw, 32px)"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.lilac-pale}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.plum-2}"
    textColor: "{colors.lilac-pale}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.lilac-pale}"
  button-light:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.plum}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-light-hover:
    backgroundColor: "{colors.lilac-pale}"
    textColor: "{colors.plum}"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-round:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.circle}"
    size: "52px"
  button-round-hover:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.lilac-pale}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.lilac-pale}"
  input:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.plum}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "52px"
  photo-frame:
    backgroundColor: "{colors.lilac-deep}"
    rounded: "clamp(28px, 6vw, 96px) 10px clamp(28px, 6vw, 96px) 10px"
  photo-frame-mirrored:
    rounded: "10px clamp(28px, 6vw, 96px) 10px clamp(28px, 6vw, 96px)"
  quote-panel:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.lilac-pale}"
    typography: "{typography.title}"
    rounded: "clamp(28px, 6vw, 96px) 10px clamp(28px, 6vw, 96px) 10px"
    padding: "clamp(28px, 4vw, 56px)"
  service-panel:
    backgroundColor: "{colors.lilac-pale}"
    textColor: "{colors.plum}"
    rounded: "32px 32px 0 0"
  service-panel-dusk:
    backgroundColor: "{colors.dusk}"
    textColor: "{colors.on-dusk}"
  enquiry-card:
    backgroundColor: "{colors.lilac-pale}"
    textColor: "{colors.plum}"
    rounded: "36px 10px 36px 10px"
    padding: "clamp(24px, 3.6vw, 52px)"
  draft-card:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.plum}"
    rounded: "{rounded.field}"
    padding: "20px 22px 22px"
  nav:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    padding: "14px clamp(16px, 4.5vw, 64px)"
  nav-dark:
    textColor: "{colors.on-dusk}"
---

# Design System: Clonakenny Flower Farm

## Overview

**Creative North Star: "The Lilac Field"**

The whole page is a field of Ali's favourite colour. Lilac is the ground under almost every section, and the farm's own photographs and one live, generative dahlia carry the romance on top of it. The flower is the proof of the claim "grown from seed": it is drawn petal by petal on the golden-angle spiral a real flower head grows on, it blooms as the page loads, and scrolling dives the camera down into its centre until dusk closes over it and the story begins. Dusk is the second place in the world: a near-black plum ground for the passages that should feel immersive (the story, the last service panel, the closing band, the footer).

Density is low and romantic but never vague. Big Bodoni Moda headlines turn on one italic phrase each; Hanken Grotesk carries every sentence and every label in plain sentence case. Photographs are framed as petals, two soft corners and two nearly square, and they arrive by blooming open from a small circle at their centre. Every action is a pill whose fill rises from the bottom edge. Colour moves with the reader: the page ground washes between lilac and pale as light sections pass, and tints through the seasons while the flower morphs species in the flower year.

The world rejects three things, as confirmed in the build's direction contract: the cream-and-sage florist template, the previous site's muted mauve (#845A8C with DM Serif Display and a system sans), and the dark-luxury opposite. Dusk here is a passage, never the default ground.

**Key Characteristics:**
- Drenched lilac ground with pale and mist as the only light alternates; dusk for immersive passages.
- One accent, studio purple, used only as small marks of the present tense.
- Bodoni Moda display with a romantic italic phrase in every headline; Hanken Grotesk for all text; no capitals.
- Petal-framed photographs that bloom open from the centre as circles.
- Pill actions with a fill that rises from the bottom; magnetic on fine pointers.
- A raw-WebGL phyllotaxis flower: the hero dive and the season morph.
- Complete without script or motion: every choreographed passage has a static reading.

## Colors

A drenched, single-family palette: lilac is the field, plum is the ink, dusk is the night, and one studio purple marks what is happening now.

### Primary
- **Lilac Field** (lilac): the ground of the hero, the flower year, the enquiry and the gallery, the third service panel, the page body itself, the favicon tile and the browser theme colour. It is the brand, not a highlight.
- **Petal Pale** (lilac-pale): the light alternate ground (weddings, kind words, press and find us), the enquiry card, button text on plum, and the lifting hover fill of the light button. Also the radial glow behind the hero flower.
- **Lilac Mist** (lilac-mist): the second service panel's ground and the scrollbar track. A step between pale and lilac, used where two light grounds must read as layers.
- **Deep Lilac** (lilac-deep): the loading ground inside every petal photo frame, so an unloaded photo reads as a lilac petal, not a hole.

### Secondary
- **Studio Purple** (studio): the colour of the purple studio's wall, and the single accent. It marks the present tense only: the open-diary dot in the hero, the current trade ("the flower farm") in the story, the season hint dot in the enquiry, the review stars, the text caret in fields, and the seed-head mark on the quoted review.

### Neutral
- **Plum Ink** (plum): all primary text on light grounds, the primary button fill, selected chips, chip focus outlines, hairlines (at 20% alpha, 1.5px), the mobile menu ground, and the quote panel.
- **Soft Plum** (plum-2): secondary text on light grounds (ledes, intros, captions, metadata), the primary button's hover fill, and the scrollbar thumb. Holds about 5.5:1 on lilac.
- **Dusk** (dusk): the immersive ground of the story, the fourth service panel, the band and the footer; the veil that closes over the hero flower at the end of the dive; the dim overlay on settling service panels.
- **Dusk Text** (on-dusk): primary text on dusk, and the dark-theme nav colour.
- **Dusk Muted** (on-dusk-2): secondary text on dusk (story body, captions, footer notes). Holds about 9.6:1 on dusk.
- **Field White** (field-white): only the surfaces you type on or read your draft from inside the enquiry card: text fields, the email draft card, the season hint.

### Named Rules
**The Drenched Field Rule.** Every light section sits on lilac, pale or mist. Nothing turns cream, white or grey at section scale; pure white exists only as the writing surface inside the enquiry card.

**The Studio Is Now Rule.** Studio purple is the one accent and it marks the present tense, in small doses: dots, stars, the current step, the caret, the seed-head mark. It never sets running text on lilac (about 2.7:1 there) and never becomes a second button colour; when it is a fill, the text on it is lilac-pale (about 5.1:1).

**The Species Colour Rule.** Coral, gold, rust and green exist only inside the flower's species presets and in the photographs. The interface chrome never borrows them.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni 72, Georgia), self-hosted variable with an optical-size axis, roman and italic.
**Body Font:** Hanken Grotesk (with system-ui, -apple-system, Segoe UI), self-hosted variable weight.

**Character:** A high-contrast Didone that behaves like a florist's card at display size, set against a warm, plain grotesk that does all the working text. The serif carries feeling (headlines, quotes, the story, flower names); the sans carries facts (ledes, labels, buttons, forms).

### Hierarchy
- **Display** (400, clamp(2.6rem, 0.8rem + 5.4vw, 6rem), 0.92): the three-line hero headline only. The closing band runs one step larger (up to 7rem, same -0.025em tracking), and the footer wordmark is a one-off at up to 18rem, line-height 0.82.
- **Headline** (400, clamp(2.6rem, 1.3rem + 4.9vw, 6rem), 0.96): every section heading, always with `text-wrap: balance` and one italic phrase.
- **Title** (400, clamp(2.3rem, 1.6rem + 3.2vw, 4.4rem), 1): press and find-us headings, season names in the flower year (italic), the quoted review on the plum panel (italic). Service panel titles run slightly larger (up to 4.9rem, 0.98, -0.02em).
- **Quote** (400, clamp(1.6rem, 1.3rem + 1.3vw, 2.4rem), 1.3): the serif reading voice: the story's lit paragraph (at 500), review quotes, press names, the "More kind words" summary, the email draft body at one step smaller.
- **Lead** (400, clamp(1.2rem, 1.1rem + 0.45vw, 1.45rem), 1.45): ledes and section intros, in soft plum, capped at 24 to 34rem.
- **Body** (400, clamp(1.02rem, 0.97rem + 0.22vw, 1.15rem), 1.55): running text, capped at 26 to 30rem.
- **Label** (600, clamp(0.84rem, 0.8rem + 0.15vw, 0.92rem)): the diary status, "when" lines under season names, trade names, captions (500), review sources. Sentence case, never tracked.
- **Button** (600, 1rem, 0.005em): pills, chips (0.95rem), text links and nav links (500, 0.98rem).

### Named Rules
**The Romantic Italic Rule.** Every Bodoni headline turns on one italic phrase at the same weight (400), usually its second half: "Kind *words*", "The season *decides*", "*just a little wild*". On dusk the italic turns lilac; on light grounds it stays plum ink.

**The Sentence-Case Rule.** Nothing is set in capitals or tracked out. Hierarchy comes from the serif/sans switch, size and weight 600, never from uppercase or letterspacing; nothing sits above a heading to introduce it.

**The Optical Size Rule.** Bodoni Moda follows its rendered size (`font-optical-sizing: auto`). Never pin the opsz axis: the footer wordmark gets hairline contrast and the 1.55rem nav wordmark stays sturdy from the same file.

## Layout

A 1440px container (`.wrap`) with a fluid gutter, and a 12-column grid whose column gap is the grid-gap token. Sections breathe on the section token top and bottom (the band opens further, clamp(96px, 14vw, 200px)). Compositions are asymmetric: a headline spans 8 columns and its text lands at column 7; the story photo holds columns 1 to 5; reviews start at column 6; the enquiry card takes columns 7 to 12. Section heads pair a headline on the left with a short lead paragraph pushed to the right and aligned to the headline's foot.

Three passages are pinned and scroll-driven: the hero (125% of a viewport: the copy lifts away, the flower centres, then the camera dives), the gallery (a horizontal track on desktop, native scroll-snap on phones), and the flower year (320% on desktop, 260% on phones, with the five season stops layered in a single grid cell). The four services are full-viewport sticky panels that stack.

There is one layout breakpoint, 860px. At or below it every grid collapses to a single flex column, sticky columns become static, the nav collapses to a "Menu" toggle, and the hero headline sizes by width (clamp(2.4rem, 10.6vw, 4rem)). A second guard, short desktop windows (max-height 820px), sizes the hero headline by height (9.4svh) so the first viewport never overflows. Pointer effects (flower tilt, magnetic buttons) exist only on `(hover: hover) and (pointer: fine)`.

### Named Rules
**The Sticky Intro Rule.** On desktop, a section's introducing column sticks (top 110 to 120px) while its partner column scrolls past: the story photo, the kind-words head, the enquiry intro.

**The 44px Floor Rule.** Every target is at least 44px tall: pills 52px, small pills and chips 44px, nav links and footer links padded to reach it, round review buttons 52px.

## Elevation & Depth

Flat by default, with depth made from tonal layering and motion rather than shadow. Grounds stack in a fixed order of lightness (pale, mist, lilac, dusk), and the four service panels climb that order as they slide over one another. When the next panel arrives, the one beneath settles back to scale 0.93 and dims under a dusk overlay up to 38%. The hero flower sits in front of a soft radial glow of pale (72% at its centre, fading out by 72% radius), which is the only gradient light in the system. The nav becomes glass once the reader is past the hero: lilac at 82% (or dusk at 78% over dark sections) with a 14px backdrop blur.

### Shadow Vocabulary
- **Panel seam** (`box-shadow: 0 -1px 0 rgba(42, 20, 51, .1)`): a one-pixel plum edge on the top of each stacked service panel after the first.
- **Enquiry lift** (`box-shadow: 0 40px 80px -50px rgba(42, 20, 51, .55)`): the only real drop shadow, under the enquiry card, because it is the page's destination.
- **Field focus** (`box-shadow: 0 0 0 4px rgba(42, 20, 51, .14)`): the soft ring around a focused text field, paired with a plum border.

### Named Rules
**The Dusk Paints Its Own Ground Rule.** With motion on, light sections go transparent and wash the page ground (lilac or pale, 0.9s, power2.out) as they cross 55% of the viewport. Dusk sections and the service panels never join the wash: they paint their own solid ground so they never tint a light neighbour still half on screen.

**The Settle-Back Rule.** Stacked surfaces show depth by scaling back and dimming under dusk, never by casting a heavier shadow.

## Shapes

The form language is petal, pill and circle. Photographs and the quote panel are petals: two opposite corners soft (the petal token, which grows from 28px to 96px with the viewport) and two nearly square (the petal-tip token), top-left and bottom-right by default, mirrored on even service panels and on the middle item of every three in the gallery. The enquiry card is the same petal at a fixed 36px. Actions are pills; the round review buttons, the trade markers, status dots and the one portrait vignette in the story are circles. Stacked panels round only their top corners (32px). Text fields, the draft card and the season hint use a quieter 14px. Dividers are plum hairlines at 1.5px, 20% alpha, on light grounds, and on-dusk at 18 to 28% alpha on dusk.

### Named Rules
**The Petal Rule.** A photograph is never a plain rectangle and never fully rounded: two soft corners, two tips. Only a small portrait vignette may go fully round.

**The Bloom Rule.** Surfaces open as circles from their centre. Photos bloom from `circle(6% at 50% 58%)` to `circle(76% at 50% 50%)` over 1.8s expo.out while the image eases from scale 1.35 to 1.12, then the clip-path is cleared; the quote panel blooms from 8%; the mobile menu opens as a circle from its toggle; the button fill rises as a circle from the bottom edge. Nothing is revealed by a straight-edged wipe.

## Components

### Buttons
Soft, weighty pills that fill from below like water rising in a vase.
- **Shape:** full pill (the pill token), 1.5px border in the fill colour.
- **Primary:** plum fill, lilac-pale text, 52px tall, 28px side padding, Hanken Grotesk 600 at 1rem.
- **Hover / Focus:** a soft-plum fill rises from the bottom centre as a circle (`clip-path: circle(0% at 50% 100%)` to `circle(140% at 50% 100%)`, 0.6s on the ease token); focus-visible triggers the same fill plus a 2px currentColor outline at 4px offset. Active scales to 0.97. On fine pointers the pill follows the cursor magnetically (22% horizontal, 30% vertical, 0.5s).
- **Ghost:** transparent with plum text and border; the rising fill is plum and the text flips to lilac-pale. On the dusk panel it inverts: on-dusk text and border, lilac fill, plum text on hover.
- **Light:** lilac fill with plum text and a lilac-pale rising fill; used on dusk (the band) and for the nav pill when the nav is over dark ground.
- **Small:** 44px tall, 20px side padding, 0.95rem; the nav's "Enquire".
- **Round:** 52px circles with a 1.5px plum border and a 22px stroked arrow (stroke 1.6); hover fills plum, active scales to 0.92.
- **Text link:** Hanken 600 with a 1.5px underline drawn 10px above the box bottom and an 18px trailing rule; on hover the underline retracts to the right and the rule extends 4px and stretches 1.5x.

### Chips
- **Style:** pills 44px tall, 18px side padding, 1.5px border in plum at 45%, Hanken 600 at 0.95rem, wrapping a visually hidden checkbox.
- **State:** hover darkens the border to plum; selected fills plum with lilac-pale text; keyboard focus shows a 2px plum outline at 3px offset.

### Cards / Containers
- **Enquiry card:** lilac-pale petal (36px and 10px corners), fluid padding, the enquiry lift shadow. It holds the chips, the fields and the draft.
- **Email draft card:** field-white, 14px corners, a 1.5px plum border at 16%, "To" and "Subject" rows with a 4.5rem plum label column, then a hairline and the message in Bodoni at the lead size, line-height 1.4. The message rewrites itself from the form; while it updates it dims to 55% for 160ms, like ink settling. It is a plain draft, never a craft object.
- **Season hint:** field-white, 14px corners, a 1.5px dashed studio border at 50%, a 10px studio dot, and one sentence on what grows in the chosen month.
- **Quote panel:** plum petal with lilac-pale text, a 64px seed-head mark in studio purple above an italic Bodoni quote at the title size, and the reviewer in on-dusk-2 at 600.
- **Stacked service panels:** full-viewport sticky panels on grounds pale, mist, lilac, dusk in that order; a petal photo on six columns and copy on five, alternating sides.

### Inputs / Fields
- **Style:** field-white, 1.5px border in plum at 45%, 14px corners, 52px minimum height, 12px 16px padding, 1rem text; placeholders in #7A6280; the caret is studio purple.
- **Focus:** the border turns plum and the field focus ring appears (0.3s on the ease token). The native outline is replaced, never removed without that ring.
- **Labels:** Hanken 600 at 1rem above the field; "Optional" and "Pick any" follow in soft plum at 400.

### Navigation
- **Style:** fixed, transparent over the hero, with the wordmark on the left (Bodoni "Clonakenny" at 1.55rem over a 0.72rem Hanken 600 "Flower Farm" at 80% opacity), four links (500, 0.98rem) and the small Enquire pill on the right.
- **States:** link underlines grow from the centre out (1.5px, 8px above the bottom) on hover and when current. The nav's colour follows whatever is under it: plum over light grounds, on-dusk over dusk sections, the dusk service panel and the last quarter of the hero dive. Past the hero it turns to glass, hides while scrolling down, and returns on the way up.
- **Mobile (860px and below):** links and pill give way to a "Menu" label with two lines that cross into an X. The menu is a full-screen plum sheet that opens as a circle from the toggle over 0.8s; its links are Bodoni at clamp(2.4rem, 11vw, 3.6rem) rising from masks with a 0.05s stagger, the last one italic. Escape closes it and returns focus to the toggle.

### The Live Flower (signature)
A raw-WebGL2 generative flower, one instanced draw of up to 420 petals laid on the golden-angle (phyllotaxis) spiral. Five species presets (seed head, ranunculus, cosmos, dahlia, strawflower) are sets of numbers for petal count, length, width, tilt, cup, curl and colour, and any two can be mixed smoothly. Only the dahlia wears the world's own lilac-to-plum; the other species carry their real colours.
- **Hero dive:** the dahlia blooms from closed to 88% over 3.4s as the page loads, placed right of the headline on desktop and above it on phones, in front of the pale glow. Scrolling centres it, opens it fully, then flies the camera down its axis into the centre (field of view 30 to 62 degrees) until a dusk veil closes over it and hands off to the story. Drawing stops once the veil is closed and whenever the hero is off screen. Beside it a small note says plainly that it is drawn live, not photographed.
- **Season morph:** in the pinned flower year the flower holds each species and morphs between neighbours only in the middle 44% of each step (smoothstep), from seed head in winter to strawflower in November. A month rule fills in plum, the matching season stop fades up (0.6s, 24px), and the page ground tints through a seasonal lilac ramp (#D8C2CE, #E6C4CB, #DDB3CF, #C8A2C8, #CDB0B6).
- **Fallbacks:** without WebGL a static dahlia poster stands in the hero and scales away during the dive. With reduced motion the flowers render once, open and still (the year flower shows the dahlia). Without JavaScript the year shows all five stops as a stacked list with no canvas.

### Named Rules
**The Three Authored Moments Rule.** Only three section headings (the story, weddings and the band) rise line by line out of masks as they enter (1.3s, 0.1s stagger, expo.out), plus the hero headline on load and the footer wordmark by character. The story's lead paragraph lights word by word as it is read. Everything else is simply there.

**The Still Page Rule.** With `prefers-reduced-motion`, or without GSAP, the page drops smooth scrolling, pins and washes: sections keep their own grounds, season stops and reviews stay readable, transitions shrink to near zero. Without JavaScript, reviews stack, the draft and season hint hide, and the phone nav shows the Enquire pill in place of the toggle. Nothing essential depends on the choreography.

## Do's and Don'ts

### Do:
- **Do** set every light section on lilac (#C8A2C8), pale (#F3EAF3) or mist (#E7D6E8), and keep dusk (#1B0E21) for immersive passages that paint their own ground.
- **Do** give every Bodoni headline one italic phrase at weight 400, lilac on dusk and plum on light grounds.
- **Do** frame photographs as petals: two corners at clamp(28px, 6vw, 96px), two at 10px, mirrored on alternating panels, with a lilac-deep loading ground.
- **Do** reveal photos and panels by blooming a circle from the centre with expo.out, then clear the clip-path.
- **Do** make actions pills whose hover fill rises from the bottom edge as a circle over 0.6s on cubic-bezier(0.22, 1, 0.36, 1).
- **Do** keep studio purple (#A23F78) to small marks of the present: a status dot, the current step, stars, the caret, the seed-head mark.
- **Do** use the seed-head mark (dots on the golden angle, from the flower's own geometry) as the only ornament.
- **Do** keep every target at least 44px and every text pair at WCAG AA: plum or soft plum on the light grounds, on-dusk or on-dusk-2 on dusk.
- **Do** give every choreographed passage a static reading for reduced motion and for no JavaScript.

### Don't:
- **Don't** drift toward the cream-and-sage florist template, the old muted mauve (#845A8C) with DM Serif Display, or a dark-luxury page; dusk is a passage, never the default ground.
- **Don't** use studio purple for running text on lilac, or as a second button fill.
- **Don't** set anything in uppercase or tracked capitals, or place an eyebrow or kicker above a heading.
- **Don't** number sections (01, 02) or build a stats strip of big numbers over small labels.
- **Don't** use glyph or icon-font icons; functional SVG (arrows, rating stars) stays small and plain.
- **Don't** dress the enquiry as a craft object (a gift tag, label or envelope); it stays a plain email draft card.
- **Don't** bring the flower's species colours (coral, gold, rust, green) into the interface.
- **Don't** let dusk sections join the page colour wash.
- **Don't** reveal a photo or panel with a straight-edged wipe; surfaces bloom as circles.
- **Don't** pin Bodoni Moda's optical size; let it follow the rendered size.
