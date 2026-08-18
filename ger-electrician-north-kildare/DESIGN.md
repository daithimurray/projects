---
name: Ger, Electrician, North Kildare
description: A vitreous enamel utility plate rendered as a website — deep enamel green fields and one signal orange on a graphite ground.
colors:
  ink: "#0c110f"
  ink-2: "#131a17"
  ink-3: "#1b2320"
  enamel: "#0b4438"
  enamel-2: "#0f5748"
  paper: "#f2f1ea"
  paper-2: "#e3e2d8"
  text: "#f4f5f2"
  text-dim: "#a9b4af"
  text-on-paper: "#0c110f"
  text-on-paper-dim: "#4a544f"
  signal: "#f0571b"
  signal-deep: "#c8430f"
  on-signal: "#120904"
  hair: "rgb(255 255 255 / 0.14)"
  hair-strong: "rgb(255 255 255 / 0.28)"
  hair-paper: "rgb(12 17 15 / 0.16)"
  error-border: "#a3200a"
  error-text: "#8f1c08"
  success-field: "#dfe9df"
  success-line: "#37703f"
  success-text: "#14351a"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.55rem + 4.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  display-page:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1.35rem + 2.1vw, 2.85rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.35vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  telephone:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.4vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
rounded:
  plate: "12px"
  ctl: "6px"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4rem"
  s9: "6rem"
components:
  plate:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 4vw, 2.75rem)"
  plate-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text-on-paper}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 4vw, 2.75rem)"
  plate-ink:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.5rem, 4vw, 2.75rem)"
  button-call:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.on-signal}"
    rounded: "{rounded.ctl}"
    padding: "0.7em 1.4em"
    height: "52px"
  button-call-hover:
    backgroundColor: "#ff6a2f"
  button-quote:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.ctl}"
    padding: "0.7em 1.4em"
    height: "52px"
  button-quote-hover:
    backgroundColor: "rgb(255 255 255 / 0.06)"
  service-cell:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.25rem, 3vw, 1.75rem)"
  service-cell-hover:
    backgroundColor: "{colors.ink-3}"
  service-cell-lead:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "clamp(1.25rem, 3vw, 1.75rem)"
  service-cell-lead-hover:
    backgroundColor: "{colors.enamel-2}"
  town-chip:
    backgroundColor: "rgb(255 255 255 / 0.04)"
    textColor: "{colors.text}"
    rounded: "{rounded.ctl}"
    padding: "0.55rem 1rem"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.text-on-paper}"
    rounded: "{rounded.ctl}"
    padding: "0.7rem 0.85rem"
    height: "52px"
  form-status:
    backgroundColor: "{colors.success-field}"
    textColor: "{colors.success-text}"
    rounded: "{rounded.ctl}"
    padding: "{spacing.s4}"
---

# Design System: Ger, Electrician, North Kildare

## Overview

**Creative North Star: "The Vitreous Enamel Utility Plate"**

The whole system is one object rendered at web scale: the enamelled steel notice bolted to an ESB kiosk in an Irish town. A saturated green field, a rounded rectangle, a hairline keyline struck in from the edge, white grotesque lettering, and a single orange used only where something must be done. Those plates are made to stay legible outdoors for fifty years without maintenance, which is exactly the claim the business makes about its work — the material is the argument, so the site does not need to make it in words.

The register is quiet, dense and utilitarian rather than promotional. Copy sits close to its rules; there is almost no ornament and no decorative colour at all. Depth is achieved with a single hairline and one specular gradient, never a drop shadow, so surfaces read as things that were *fired and bolted on*, not as cards floating over a page. Type is large by marketing-site standards (body runs 17–19px) because the audience skews older and the site is often read one-handed while standing in a room with a fault in it.

The build refuses two defaults deliberately and visibly. It refuses the trade-site look — van livery, hi-vis yellow, an electrical bolt as identity — and it refuses the startup look — a blue gradient, a soft shadow stack, a rounded pill everywhere. The wordmark mark is a socket faceplate drawn in the same 24px stroke grammar as the rest of the icon set, not a bolt. Nothing on the site is glossy except the 34%-stop highlight that a real enamel edge actually has.

**Key Characteristics:**
- One dark commitment: a graphite ground with no light-mode variant, and light surfaces supplied as a *material* (paper panels) rather than a theme.
- Exactly three background roles — ink ground, enamel brand field, paper reading panel — and nothing else is ever a field.
- One accent, one family, two corner radii.
- Flat by construction: no outer box-shadow exists anywhere in the stylesheet.
- One authored entrance animation on the whole site; every other movement is a hover or focus transition.

## Colors

A three-field palette on a near-black graphite ground, with a single high-chroma orange held in reserve for anything the visitor can act on.

### Primary

- **Enamel Green** (`{colors.enamel}`): The brand field. It is the background of the `.plate` identity element, the hero plate, the final call band, the contact-page call band, and the single lead cell in the services grid. It is never used for text, never for a border on its own, and never tinted down to a "subtle" version. **Enamel Green Lifted** (`{colors.enamel-2}`) exists only as the hover state of an enamel surface that is also a link.
- **Signal Orange** (`{colors.signal}`): The action colour, and the only saturated colour on the ground. It fills the primary call button, colours inline call links and prose links, draws the 3px focus ring, marks the current page in both navigation rows, tints text selection, and sets `accent-color` and `caret-color`. Its one non-action use is the four credential icons in the trust register — see the Signal Reserve Rule for exactly why that is allowed and why service icons are not. Its near-black label colour (`{colors.on-signal}`) is used exclusively as the text sitting on a signal fill. **Signal Deep** (`{colors.signal-deep}`) is the on-paper substitute: the same role, darkened so it holds contrast against a light panel, used for links inside paper panels and for the form's focus ring and focused border.

### Neutral

- **Graphite Ground** (`{colors.ink}`): The page background, the header background, the footer background, and the base of the translucent mobile call bar. Every page begins here.
- **Graphite Raised** (`{colors.ink-2}`): The surface of a plain services cell, the placeholder ground behind any image while it loads, and the fill of `.plate--ink`.
- **Graphite Hover** (`{colors.ink-3}`): One step brighter, used only as the hover state of a plain services cell and as the scrollbar thumb.
- **Enamel Paper** (`{colors.paper}`): The light reading panel. It is a component surface, not a mode — see the Light-Is-A-Material Rule below. **Paper Shade** (`{colors.paper-2}`) is declared but currently unused; treat it as the reserved second paper tone for a future divider or inset, not as a new field.
- **Type on ground** (`{colors.text}` / `{colors.text-dim}`): Near-white for headings, buttons and emphasised words; a desaturated green-grey for body copy, notes, captions and inactive navigation. Text sitting on an *enamel* plate is not dropped to the grey — it is tinted from the plate's own value at `rgb(244 245 242 / 0.84)` for leads and `/ 0.76` for small print, so it stays in the plate's light rather than going muddy.
- **Type on paper** (`{colors.text-on-paper}` / `{colors.text-on-paper-dim}`): The graphite ground colour reused as ink, with a mid green-grey for supporting text inside paper panels.
- **Hairlines** (`{colors.hair}` / `{colors.hair-strong}` / `{colors.hair-paper}`): 14% white for structural rules on the ground — the header underline, the trust register's rows and columns, service cell borders, the footer rules, the call bar's top edge. 28% white is the *interactive* hairline: the secondary button's resting border, the town chips, and the hover state of a service cell's border. `{colors.hair-paper}` (16% ink) is the same structural rule inverted for a paper panel, and it separates the service entries inside the services page's reading panel. Other paper-context borders are still written as explicit `rgb(12 17 15 / …)` values at 0.18–0.32; prefer the token when the line is structural.

### Tertiary — status only

- **Error** (`{colors.error-border}` for the 2px invalid field border, `{colors.error-text}` for the message): The only red in the system. It appears exclusively inside an invalid form field on a paper panel and never on the dark ground.
- **Success** (`{colors.success-field}` field, `{colors.success-line}` border, `{colors.success-text}` text, `#2c5f34` icon): The only green that is not enamel. It appears exclusively in the quote form's confirmation panel.

### Named Rules

**The Three-Field Rule.** Only three things may be a background: ink (the ground), enamel (the brand field), paper (a panel laid on the ground). A new surface picks one of the three. Inventing a fourth field colour breaks the object.

**The Signal Reserve Rule.** Signal orange belongs to actions and to checkable status, and the line between the two is drawn precisely in the build. It is legitimate on: a call button, an inline call or prose link, the focus ring, the current-page marker, selection, the caret — and on the four trust register icons, because each of those four items *reports a fact a stranger could go and verify* (a registration, an insurance cover, a span of years, a place). It is illegitimate everywhere else, including on the service icons: those label a topic rather than report a status, so they are tinted from the foreground (`rgb(244 245 242 / 0.55)`, 0.8 in the lead cell) and the services-page entry icons take `--text-on-paper-dim`. Never a background field, a divider, a heading colour, a hover wash, or decoration. **The test:** if an element cannot be pressed and does not assert something checkable, it does not get orange — an icon that merely names a category fails the test.

**The Light-Is-A-Material Rule.** The site commits to one dark look and ships no `prefers-color-scheme` block at all; `color-scheme: dark` is declared once on `:root`. Light appears only as `--paper`, carried by `.plate--paper` plus the `.on-paper` context class that re-points body copy, headings, links, chips, entry rules and the secondary button inside it. Paper is the site's **reading and writing material**: it carries the quote form on the contact page, the seven service entries on the services page, and the long-form story on the about page. The threshold is length — a paragraph or two sits fine on the ground in `--text-dim`, but sustained reading moves onto paper, because the audience skews older than a typical marketing audience and dim text on graphite is hard work at length. This is deliberate and should stay: enamel green and signal orange are fixed brand values, so a theme flip would need a second contrast-safe pair for them and the plate would stop being the same physical object. Give reading and form surfaces paper; do not build a light theme.

## Typography

**Single Family:** Archivo (variable, weight axis 400–800, latin subset, self-hosted at `/assets/fonts/archivo-latin-var.woff2`, `font-display: swap`, preloaded on every page). Fallback stack: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

**Character:** A wide, squared-off American grotesque with flat terminals — the shape that survives being screen-printed onto steel. At 800 it reads as signage; at 400 it reads as plain instruction. There is no serif, no second family, and no display face. The whole hierarchy is made from weight, size and negative tracking.

### Hierarchy

- **Display** (800, `clamp(2.5rem, 1.55rem + 4.2vw, 4.75rem)`, line-height 1.02, tracking −0.035em): The H1, one per page. On the home page it fills the hero plate and is held to `max-width: 15ch` so it breaks into three signage-weight lines. Inner pages use the one-step-down variant (`clamp(2.25rem, 1.5rem + 3vw, 3.5rem)`).
- **Headline** (700, `clamp(1.85rem, 1.35rem + 2.1vw, 2.85rem)`, line-height 1.08, tracking −0.028em): Section H2s and the form's panel heading.
- **Title** (700, `clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem)`, line-height 1.2, tracking −0.02em): Sub-headings in prose and the contact page's supporting column headings. Fixed siblings at the same rank: a service cell name (1.1875rem) and a trust register label (1.0625rem).
- **Lead** (400, `clamp(1.15rem, 1.05rem + 0.5vw, 1.375rem)`, line-height 1.5, `max-width: 46ch`): The single supporting line under a display heading. Dimmed on the ground; tinted on a plate; widened to 52–58ch only in the centred call band and via the wide modifier.
- **Body** (400, `clamp(1.0625rem, 0.98rem + 0.35vw, 1.1875rem)`, line-height 1.6, `max-width: 68ch`): All running copy. `<strong>` inside body copy brightens to the full text colour at weight 600 rather than changing colour.
- **Small** (400, 0.9375rem, line-height 1.55): Captions, form notes, footer blurb, the areas line under a call band. Service descriptions and register notes sit here too (0.9375rem / 0.875rem).
- **Telephone** (700, `clamp(1.5rem, 1.2rem + 1.4vw, 2.125rem)`, tracking −0.02em, `tabular-nums`): The written-out number, treated as a type role of its own. It appears as itself — selectable text that is also a `tel:` link — beside every primary button, and at a fixed 1.375rem in the footer.

### Named Rules

**The One Family Rule.** Archivo does everything. Five weights are in use and they each mean something: 400 running copy, 500 the wordmark's sub-line, 600 navigation and labels and chips and emphasis, 700 headings and buttons and the phone number, 800 display and the wordmark. Do not add a second family, a monospace, or a display face; hierarchy is made by weight and tracking.

**The Negative Tracking Rule.** Tracking tightens as size grows: −0.035em at display, −0.028em at H2, −0.02em at H3 and the phone number, −0.01em on buttons, normal at body. The only positive tracking on the site is the footer's small headings (+0.02em) and the wordmark sub-line (+0.01em). Never letterspace a heading open.

**The Number Is Type Rule.** The phone number is never only inside a button. Every place a call is offered, the digits also appear as selectable text at the telephone role, so someone can read them off the screen and dial by hand.

## Layout

**Container.** One width: `--page` 1240px, centred, with a fluid gutter of `clamp(1.25rem, 5vw, 3.5rem)`. Every section is a `.wrap`; nothing bleeds full-bleed and there is no second container width. Reading columns are bounded by `--measure` (68ch) rather than by the container.

**Vertical rhythm.** Sections take `padding-block: clamp(2.75rem, 6vw, 5rem)`, with a tight variant at `clamp(1.75rem, 3.5vw, 2.75rem)` for the trust register and the sub-hero strips on inner pages. Inside a block, gaps come from the spacing scale via flex/grid `gap`, not from margins: `--s3` (0.75rem) between grid cells, `--s4` (1rem) between prose paragraphs and form fields, `--s5` (1.5rem) between stacked blocks, `--s6` (2rem) between a heading group and what follows. The scale runs `--s1` 0.25rem to `--s9` 6rem; `--s1`, `--s8` and `--s9` are currently unused, so extending upward or downward has room without new tokens.

**Breakpoints.** Six, and they are not a standard set — each one exists because a specific component needed it at that width. Do not introduce a general breakpoint scale; add a query where a component actually breaks.

| Width | What changes |
| --- | --- |
| 680px | The services grid goes from one column to two, with the lead cell spanning both. |
| 760px | The trust register flips from stacked rows to a ruled column row; the footer goes to 1.4fr / 1fr / 1fr. |
| 860px | The final call band centres its content and text; a services-page entry goes to a 260px / 1fr two-column layout. |
| 900px | The header becomes sticky, the horizontal nav appears, the compact mobile link row disappears, the split band goes two-column (and the contact page's form column takes the 0.78fr / 1.22fr override), and the sticky call bar with its 84px body padding is removed. |
| 960px | The hero becomes 1.08fr / 0.92fr with a stretched photograph column. |
| 1000px | The services grid becomes an explicitly placed six-column layout. |

**Two layout rules that are not breakpoints, and matter more than one.**

*Measure the container, not the window.* The quote form's paired rows are `repeat(auto-fit, minmax(210px, 1fr))` with **no media query at all**, because the form sits inside a grid column: a viewport query split it into two columns its own panel could not hold. Anything nested inside a track should respond to the space it actually has. The `.photo-row` on the about page follows the same pattern at `minmax(260px, 1fr)`.

*Let tracks shrink.* Grid and flex children default to `min-width: auto`, which lets wide content push past its track instead of wrapping. `.split > *`, `.svc > *` and `.register__item > *` are explicitly set to `min-width: 0`. Any new multi-column container needs the same line, or a long word or a nowrap button will blow the column out.

**The services grid placement.** From 1000px the grid is `repeat(6, 1fr)` and all seven children are placed by hand rather than flowed. The lead cell takes columns 1–5 of row 1; the second cell takes 5–7 of row 1; the photograph cell takes columns 3–5 across rows 2–3, so it holds a two-row column of its own and can be genuinely tall instead of stretching its neighbours and leaving dead space under their text. The remaining four take the 1–3 and 5–7 pairs in rows 2 and 3. The photograph's `aspect-ratio` is released to `auto` at this width so it fills the height it was given. If an eighth service is added, extend the explicit map — do not fall back to auto-flow, which is what the hand placement exists to avoid.

## Elevation & Depth

**There are no drop shadows in this system.** The stylesheet contains exactly two `box-shadow` declarations and both are inset lines, not lift: the wordmark mark's `inset 0 0 0 1px rgb(255 255 255 / 0.22)` keyline, and the mobile nav's current-page underline `inset 0 -2px 0 var(--signal)`. Nothing is elevated above the page.

Depth is instead built from three devices, in this order of strength:

1. **Tonal step.** Ink → ink-2 → ink-3 is the entire surface ladder on the dark ground. A raised surface is a lighter graphite, not a shadowed one.
2. **Hairline.** A 1px rule at 14% white separates structures; 28% white marks something interactive. The trust register is *ruled*, not carded, precisely because a rule is flatter than a card.
3. **The plate's own optics.** An inset keyline and a short specular gradient, described below. This is the only place the system simulates a physical surface, and it is reserved for the identity element.

The one translucent surface is the mobile call bar: `rgb(12 17 15 / 0.96)` with `backdrop-filter: blur(8px)` and a hairline top border. It is the only blur on the site.

### Named Rules

**The Flat-Ground Rule.** No element casts a shadow. If something needs to read as separate, give it a tonal step and a hairline. If it needs to read as an object, make it a plate.

## Shapes

Two radii govern everything, and this is a hard invariant:

- **`--r-plate` (12px)** — plates, panels, service cells, photograph frames, the hero figure, the split figure. Anything that behaves like a bolted-on surface.
- **`--r-ctl` (6px)** — controls. Buttons, inputs, selects, textareas, town chips, the skip link, the form status panel.

Nothing else in the system has an authored corner. The two remaining radii in the stylesheet are inner geometry of specific elements rather than scale steps: the plate keyline's 4px (it must sit visibly inside a 12px outer corner), the wordmark mark's 5px, the scrollbar thumb's pill, and the 2px on the focus ring so it does not look ragged over rounded controls.

Borders are 1px throughout. The only 2px border in the system is the invalid-field state, where the width change is one of three simultaneous error signals.

### Named Rules

**The Two-Corners Rule.** A new element is either a plate (12px) or a control (6px). If it is neither, it is probably not a new element — it is content inside one of the two. Do not introduce a third radius, and do not use a pill radius on anything the visitor can read or press.

## Components

### The Plate (signature component)

The identity element. Everything else in the system defers to it. A plate is a positioned box with `isolation: isolate` and `overflow: hidden`, filled with enamel green at a 12px radius, plus two pseudo-elements that together make the enamel read as fired onto steel:

- **The keyline** (`::before`): absolutely positioned at `inset: 10px` — a full 10px in from every edge, the way the border is struck on a real enamel sign rather than drawn at the edge. 1px solid `rgb(255 255 255 / 0.26)`, radius 4px, `pointer-events: none`, `z-index: 1`.
- **The specular roll** (`::after`): fills the box, inherits the outer radius, and paints `linear-gradient(176deg, rgb(255 255 255 / 0.12) 0%, rgb(255 255 255 / 0) 34%)`. The 176° tilt and the short 34% stop are what make it read as light rolling over a curved enamel edge rather than as a generic "glass" gradient. `pointer-events: none`, `z-index: 1`.
- **Content** sits at `z-index: 2` via `.plate > *`, above both pseudo-elements.
- **Padding** comes from `.plate__body` at `clamp(1.5rem, 4vw, 2.75rem)`, or from a purpose-built body class — `.hero__body` at `clamp(1.75rem, 4vw, 3rem)`, `.callband__body` at `clamp(2rem, 5vw, 3.5rem)`.

Two variants re-skin the same construction:

- **`.plate--paper`** — paper field, graphite ink, keyline flipped to `rgb(12 17 15 / 0.18)`, and the specular gradient raised to a 70%-white / 30%-stop roll, because a light enamel catches more of the highlight. Pair it with the `.on-paper` context class on the same element so descendants (body copy, small print, links, chips, the secondary button) re-point to their paper values.
- **`.plate--ink`** — graphite-raised field with a 14%-white keyline. Defined and available, but not used on any of the five pages; treat it as the sanctioned quiet plate, not as a pattern with an established precedent.

**The Plate Restraint Rule.** A plate is the H1's surface, the closing call, and the form. It is not a card system. There is at most one enamel plate per screenful; the services grid gets exactly one enamel cell out of seven. Making everything a plate makes nothing one.

### Buttons

Two roles, and only two. Both are `inline-flex`, centred, `gap: 0.6em`, `min-height: 52px`, `padding: 0.7em 1.4em`, weight 700, tracking −0.01em, 6px radius, `white-space: nowrap`, 1px transparent border so the two roles share a box model.

- **Call (primary).** Signal orange fill with the near-black on-signal label — a ~7:1 pair, deliberately above the AA floor rather than at it. Hover lightens to `#ff6a2f`. Its label is always "Call Ger" and it always points at a `tel:` link.
- **Quote (secondary).** Transparent fill, 28%-white border, near-white label. Hover brings the border to full text colour and washes the fill to 6% white. On paper it switches to a 30%-black border and a 5%-black hover wash. Its label is always "Request a Quote".
- **Shared states.** `transform: translateY(1px)` on `:active`. Transitions run 0.18s on colour/border and 0.1s on transform, all on `--ease`. Focus is the global 3px signal ring at 3px offset.
- **`.btn--block`** stretches to full width; used for the form submit and for the single-button mobile call bar on the contact page.
- **`.btn-row`** is the standard pair container: flex, wrapping, `--s3` gap. The call always comes first.

**The One Primary Rule.** Signal fill means "ring him". A screen has one primary button per band, and the secondary never competes — no fill, no orange, no shadow.

### The Trust Register

Four credential items directly beneath the hero. It is **a ruled row, not a set of cards**, and that is the point of it: cards would make claims look like marketing tiles, rules make them look like a register.

- Stacked below 760px: each item is a horizontal icon-plus-text row with a hairline bottom border; the group carries a hairline top border.
- From 760px it becomes `grid-auto-flow: column` with equal `1fr` columns, each item flipping to a vertical stack with a hairline *right* border (dropped on the last item) and `--s5` inside padding.
- The icon is 26px, stroked at 1.5, coloured signal — it marks a checkable fact. The label is 1.0625rem/700, the note 0.875rem in dim text.
- No background, no border-radius, no hover state. It is not interactive and does not pretend to be.

### The Services Grid

Seven cells, deliberately unequal (see Layout for the placement map). Each cell is a link.

- **Plain cell:** graphite-raised fill, 1px 14%-white border, 12px radius, `clamp(1.25rem, 3vw, 1.75rem)` padding, column flex with `--s3` gaps. Hover moves the border to 28% white and the fill to graphite-hover, over 0.18s.
- **Lead cell (`--lead`):** the enamel field, border at 20% white, its icon in near-white rather than signal (the field is already the emphasis), its name stepped up to `clamp(1.35rem, 1.1rem + 1vw, 1.75rem)` and its description to 1rem at 80% white. It spans both columns at 680px and takes columns 1–5 at 1000px. Exactly one cell in the grid is the lead.
- **Figure cell (`--figure`):** padding removed, `overflow: hidden`, `min-height: 200px`, a 3:2 cover image, and a `.svc__figcap` block supplying the padding back to the caption only. From 1000px the image releases its aspect ratio and fills its two-row column.
- Icons are 28px (34px in the lead cell), stroke 1.5, in signal.

### Town Chips

Areas served, and reused as the services-page jump list. Flex-wrapped, `--s2` gap. Each chip: `0.55rem 1rem` padding, 1px 28%-white border, 6px radius, 4%-white fill, 1.0625rem at weight 600. On paper the border goes to 25% black and the fill to 4% black. When a chip is a link it loses its underline and gains it back on hover. Chips are not filters and have no selected state — do not add one without a real toggle behind it.

### The Split Band

Photograph beside text. A grid with `--s6` gap that becomes `0.85fr / 1.15fr` at 900px with a `clamp(2rem, 5vw, 4.5rem)` gap — the narrower column is the photograph, so the text always gets the larger share. `.split--flip` reorders the first child to second, which is how the contact page puts the form on the right. The figure is a 12px-radius, `overflow: hidden` frame with a graphite-raised backing and a 4:5 cover image. Text sits in a `.stack`: column flex, `--s5` gap, left-aligned, with a `--tight` variant at `--s4`.

### Inputs and the Form

The quote form lives inside a paper plate — the only light surface on the site, chosen so a form reads as a document to fill in rather than a widget on a dark page.

- **Field:** column flex with a 0.4rem gap. Label at 1rem/600 in paper ink; an optional hint at 0.875rem in dim paper ink, wired through `aria-describedby`.
- **Control:** pure white fill (a step brighter than the paper panel, so the input is visibly the writable part), 1px `rgb(12 17 15 / 0.32)` border, 6px radius, `0.7rem 0.85rem` padding, `min-height: 52px` — the same 52px target as a button. Textarea 130px minimum, vertical resize only. Placeholder `#5a635e`.
- **Hover:** border darkens to 55% black. **Focus:** a 3px `--signal-deep` outline at 1px offset *and* the border switches to the same colour — the deep variant rather than the ground's signal, because the light panel needs the darker orange to hold contrast.
- **Error pattern (three simultaneous signals, never colour alone):** the field gets `data-invalid="true"`, which (1) sets a 2px `#a3200a` border, (2) reveals the `.field__error` message at 0.9375rem/600 in `#8f1c08`, and (3) shows an alert icon inside that message. The message is a full sentence naming the fix in the site's voice, not a validation string. JS re-validates on input once a field has been flagged, so the error clears the moment it is corrected, and focus moves to the first invalid control on submit.
- **Success panel:** hidden until `data-open="true"`, then a flex row at `--s4` padding, 6px radius, `#dfe9df` field, `#37703f` border, `#14351a` text, `#2c5f34` icon. It is `role="status"`, `aria-live="polite"`, focusable via `tabindex="-1"`.
- **Honeypot:** an off-screen `.hp` field, visually removed at `left: -9999px`.

### Navigation — Two Rows, Not a Menu

The header carries **two navigation elements at once**, and which is visible is purely a matter of width. There is no hamburger and no disclosure anywhere on the site.

- **Bar row (always):** wordmark on the left (34px enamel mark with an inset 22%-white keyline and a socket-faceplate glyph, name at 1.0625rem/800, sub-line at 0.75rem/500 in dim text), `margin-right: auto`, then the horizontal nav, then a compact call button (46px tall, 1.1em inline padding). `min-height: 68px`.
- **Horizontal nav (900px and up):** links at 1rem/600, `clamp(1rem, 2vw, 2rem)` gap, each with a transparent 2px bottom border that goes 28%-white on hover and **signal on the current page**.
- **Compact link row (below 900px):** the same four links laid out in the open beneath the bar, at 0.9375rem/600 in dim text, `clamp(1rem, 5vw, 2rem)` gap. The current page brightens to full text colour and gets a 2px signal underline drawn with an inset box-shadow. This row exists so nobody has to open a menu to reach the phone.
- The header is sticky only at 900px and up; on mobile the sticky element is the call bar instead, so the two never occupy screen at once.

### The Sticky Call Bar (mobile only)

Fixed to the bottom below 900px at `z-index: 60`. `rgb(12 17 15 / 0.96)` with an 8px backdrop blur and a hairline top border. Padding is `--s3 --s4` plus `env(safe-area-inset-bottom)`. It carries the call button flexed to fill and the quote button sized to its content; `body` compensates with 84px bottom padding. Both the bar and the padding are removed at 900px. On the contact page — where the whole page is already a call to action — the bar carries the call button alone at full width.

### Footer

Hairline top border on the ground, `--s7 --s6` block padding. Grid stacks with `--s6` gaps, going `1.4fr / 1fr / 1fr` at 760px. Column headings are 0.9375rem/700 with the system's only positive tracking (+0.02em). Links are 1rem in dim text, brightening and underlining on hover. The first column repeats the phone number at the telephone role. A hairline legal strip sits below at 0.875rem.

## Motion

There is **exactly one authored entrance animation on the entire site**: the hero plate and the hero figure run `settle` — 10px up and 0% to 100% opacity over 0.65s on `--ease` (`cubic-bezier(0.2, 0.8, 0.25, 1)`), the figure delayed 0.08s so the pair lands like a sign being set against a wall. It is wrapped in `@media (prefers-reduced-motion: no-preference)`, so with reduced motion the keyframes simply never attach and the content is fully visible from the first paint — the animation uses `both` fill but is never the reason anything is on screen.

Everything else that moves is a state transition on hover, focus or press: 0.18s on button colours and borders, 0.18s on nav underlines and service-cell borders, 0.15s on input borders, 0.1s on the button's 1px active press. All of them use `--ease`. `scroll-behavior: smooth` is set on `html` and explicitly reverted to `auto` under reduced motion.

**The One Entrance Rule.** The hero settling is the site's whole motion budget. No scroll-triggered reveals, no staggered lists, no counters, no parallax. A new component earns a hover transition on `--ease`; it does not earn an entrance.

## Do's and Don'ts

### Do:

- **Do** build a new surface as a plate (12px, `--r-plate`) or a control (6px, `--r-ctl`) and nothing else. Two corners is the whole shape vocabulary.
- **Do** reach for a tonal step (ink → ink-2 → ink-3) plus a hairline when something needs separation. That is what depth is made of here.
- **Do** keep signal orange for things that can be pressed or facts that can be checked, and keep the near-black `--on-signal` as the only label colour that ever sits on it.
- **Do** use `--signal-deep` instead of `--signal` for any orange inside a paper panel — links, focus rings, focused borders — and pair `.plate--paper` with `.on-paper` so descendants re-point.
- **Do** print the phone number as selectable text at the telephone role beside every primary button. The digits are a type role, not just a link target.
- **Do** hold interactive targets at 52px minimum (46px for the compact header button), and keep body copy at the full clamped 17–19px; the audience is older than a typical marketing audience and the site is read one-handed in a room.
- **Do** signal an error with border weight, an icon and a plain-English sentence together, never with colour alone.
- **Do** add a media query where a specific component actually breaks, at whatever width that is. The seven existing breakpoints each exist for one named reason.
- **Do** extend the seven-cell services grid by extending its explicit `grid-column` / `grid-row` map at 1000px.
- **Do** keep every colour resolvable from `assets/site.css`. No page carries an inline style; that is why the small utility set exists.

### Don't:

- **Don't** add a fourth background field. Ink, enamel, paper — a new surface picks one.
- **Don't** add a drop shadow. The stylesheet has no outer `box-shadow` and the flatness is load-bearing; a shadowed card immediately reads as the startup default this world was built to refuse.
- **Don't** build a light theme or a `prefers-color-scheme` block. Light is `--paper`, a material inside the dark page.
- **Don't** introduce a second typeface, a monospace, or a display face. Archivo at 400/500/600/700/800 covers the whole hierarchy.
- **Don't** letterspace headings open, or use uppercase as a hierarchy device — there is no all-caps label style in this system, and no eyebrow or kicker above any heading on any of the five pages.
- **Don't** make more than one enamel plate compete per screenful, or turn the services grid into seven enamel cells. The lead cell is singular by design.
- **Don't** give the trust register borders, radii, backgrounds or hover states. It is a ruled row; making it cards is exactly the mistake it was built to avoid.
- **Don't** put a hamburger, drawer or disclosure between a visitor and the phone number. Below 900px the four links sit in the open and the call bar is fixed to the bottom.
- **Don't** add scroll-triggered or staggered entrance animation. The hero settle is the only entrance the site has.
- **Don't** use a lightning bolt, hi-vis yellow, van livery, a cartoon tradesman, or a blue gradient. The wordmark mark is a socket faceplate drawn in the same 24px / 1.5–1.8 stroke icon grammar as everything else; keep new icons in that grammar rather than importing a filled or glyph set.
