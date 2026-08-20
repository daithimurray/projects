---
name: Ger, Electrician — North Kildare
description: The annotated drawing set rendered as a website — drafting paper, hairline rules, mono reference numbers and one deep signal red reserved for action.
colors:
  ink: "#12181c"
  ink-2: "#1b2429"
  ink-3: "#28343a"
  paper: "#f0efea"
  paper-2: "#e5e3dc"
  signal: "#b8271c"
  signal-lift: "#9c1e15"
  signal-on-ink: "#e8564a"
  text: "#12181c"
  text-dim: "#545d63"
  text-on-ink: "#f2f1ec"
  text-on-ink-dim: "#a3adb3"
  hair: "rgb(18 24 28 / 0.16)"
  hair-strong: "rgb(18 24 28 / 0.38)"
  hair-ink: "rgb(242 241 236 / 0.18)"
  hair-ink-strong: "rgb(242 241 236 / 0.4)"
  error: "#96170b"
  ok-field: "#e2e8dd"
  ok-line: "#3f6b3d"
  ok-text: "#1d3d1c"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 1.5rem + 4.6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.032em"
  display-page:
    fontSize: "clamp(2.15rem, 1.6rem + 2.4vw, 3.35rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.03em"
  headline:
    fontSize: "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.026em"
  title:
    fontSize: "clamp(1.1875rem, 1.08rem + 0.55vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: "-0.014em"
  lead:
    fontSize: "clamp(1.125rem, 1.02rem + 0.5vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
    maxWidth: "48ch"
  body:
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
    maxWidth: "66ch"
  small:
    fontSize: "0.9375rem"
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.13em"
    textTransform: "uppercase"
  ref:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    fontFeature: "tabular-nums"
  telephone:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 1.1rem + 1.7vw, 2.25rem)"
    fontWeight: 500
    letterSpacing: "-0.015em"
    fontFeature: "tabular-nums"
rounded:
  surface: "0"
  ctl: "2px"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4.5rem"
components:
  button-call:
    backgroundColor: "{colors.signal}"
    textColor: "#ffffff"
    rounded: "{rounded.ctl}"
    minHeight: "52px"
    padding: "0.5rem 1.4rem"
  button-call-hover:
    backgroundColor: "{colors.signal-lift}"
  button-quote:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "{colors.hair-strong}"
    rounded: "{rounded.ctl}"
    minHeight: "52px"
  button-quote-hover:
    backgroundColor: "{colors.paper-2}"
    borderColor: "{colors.text}"
  schedule-row:
    borderBottom: "1px solid {colors.hair}"
    padding: "1.5rem 0"
  schedule-row-hover:
    backgroundColor: "{colors.paper-2}"
  spec-row:
    borderBottom: "1px solid {colors.hair}"
    padding: "1rem 0"
  panel:
    backgroundColor: "{colors.paper-2}"
    borderColor: "{colors.hair}"
    rounded: "{rounded.ctl}"
    padding: "clamp(1.25rem, 4vw, 2.25rem)"
  input:
    backgroundColor: "#ffffff"
    borderColor: "{colors.hair-strong}"
    rounded: "{rounded.ctl}"
    minHeight: "52px"
  input-focus:
    borderColor: "{colors.signal}"
  form-status:
    backgroundColor: "{colors.ok-field}"
    borderColor: "{colors.ok-line}"
    textColor: "{colors.ok-text}"
---

# Design System: Ger, Electrician — North Kildare

## Overview

**Creative north star: "The Drawing Set."**

The whole system is one object: the annotated schematic an electrician
actually works from. Drafting paper, hairline rules, a mono reference number
against every item, a title block along the bottom, and red used only where
something must be isolated. Drawings of this kind are made to be read once,
correctly, by someone standing in a room with a problem in it — which is
exactly the reading condition this site has.

The register is measured and plain rather than promotional. There is no
ornament. The site earns its look from type, rule weight and interval, so it
holds up before a single photograph arrives — which matters, because none has
arrived yet.

The build refuses two defaults deliberately. It refuses the trade-site look:
no hi-vis yellow, no van livery, no lightning bolt anywhere, not even in the
mark, which is the schematic symbol for a switch. And it refuses the startup
look: no rounded pill, no gradient, no glass, no soft shadow stack, no icon
sitting in a tinted box.

**Key characteristics**

- Light-first. Paper is the ground; ink is a *material* used for two or three
  full-width bands per page, not a theme.
- Content is organised by rules, never by cards. There is not one card on
  this site.
- Square corners. Two radii exist and one of them is zero.
- Nothing floats. There is no `box-shadow` anywhere in the stylesheet.
- No entrance animation anywhere. Nothing moves that the visitor did not
  touch.

## Colours

### Primary

- **Signal Red** (`{colors.signal}`): the action colour, and the only
  saturated colour in the system. It fills the primary call button, colours
  inline prose and call links, draws the focus ring, marks the current page
  in both navigation rows, tints selection, and forms the leader dash in
  prose lists. **Signal Lift** (`{colors.signal-lift}`) is its hover state —
  note it goes *darker*, not lighter, so the button reads as pressed rather
  than glowing. **Signal on Ink** (`{colors.signal-on-ink}`) is the same role
  lightened to hold 5.1:1 against the ink ground, used for links, focus rings
  and hovers inside a dark band or the footer.

### Neutral

- **Drafting Paper** (`{colors.paper}`): the page ground on every page, and
  the header background. Warm enough not to read as a default white.
  **Paper Shade** (`{colors.paper-2}`) is the second paper tone: the fill of
  a figure frame, the panel behind the quote form, and the hover wash on a
  schedule row.
- **Ink** (`{colors.ink}`): body text, *and* the full-width dark bands and
  the footer. **Ink Raised** (`{colors.ink-2}`) and **Ink Hover**
  (`{colors.ink-3}`) are the two steps above it, used for a figure frame on
  dark ground.
- **Type** (`{colors.text-dim}` on paper, `{colors.text-on-ink-dim}` on ink):
  the supporting tone for leads, captions, notes, mono labels and references.
  Both clear AA against their own ground — 5.9:1 and 8.1:1 — and there is a
  test in the build that walks every rendered text node and fails if any pair
  drops below AA.
- **Hairlines**: `{colors.hair}` (16% ink) is the structural rule — schedule
  rows, spec rows, section leader lines, the header underline.
  `{colors.hair-strong}` (38%) opens a structure: the top rule of a schedule
  or register, a figure frame, a control border. `{colors.hair-ink}` and
  `{colors.hair-ink-strong}` are the same two weights inverted for dark
  ground.

### Named rules

**The Signal Reserve Rule.** Red belongs to two things and nothing else:
something the visitor can press, and something the visitor could go and
check. A call button, a prose link, the focus ring, the current-page marker,
selection — and nothing decorative. It is never a background field, never a
heading colour, never a divider, and never applied to the hero schematic,
which labels topics rather than asserting facts. **The test:** if it cannot
be pressed and does not assert something checkable, it does not get red.

**The Ink-Is-A-Band Rule.** Dark is a full-bleed horizontal band that runs
the whole width of the viewport, never a box floating on paper. Each page
gets two or three, placed to break a long scroll and to give one section the
weight it deserves — the service area on the home page, "how the work goes"
on the About page, the closing call on the contact page — plus the footer.
Anything inside a band takes the `.on-ink` class, which re-points leads,
small print, labels, references, links, phone numbers, specs, figures and
the secondary button in one move. Never put a dark box inside a light
section.

**One Red Only.** No second accent. Error red (`{colors.error}`) and the
success green pair are status colours confined to the form and are not part
of the palette.

## Typography

**Two faces, one superfamily.** IBM Plex Sans (400 / 600 / 700) and IBM Plex
Mono (500), self-hosted as latin-subset woff2, `font-display: swap`, with 400
and 700 preloaded on every page. Plex was drawn as an engineering typeface,
which is the argument for it here; the mono is not a decorative pairing but
the system's second voice.

**The two voices.** The sans carries everything a customer reads. The mono
carries everything a *drawing* would carry: section references (`01`,
`02.4`), field labels (`REGISTRATION`, `WHEN YOU WOULD CALL`), figure
captions (`FIG. 02 — GER`), the schematic's annotations, and the telephone
number. Keeping the two jobs apart is what stops the mono reading as a
techy affectation.

### Named rules

**The Number Is Type Rule.** The phone number is never only inside a button.
At every call point — the first viewport included — the digits also appear as
selectable mono text at the `telephone` role, so someone can read them off
the screen and dial by hand, or copy them, or check them against a note. A
`tel:` button alone assumes a device that dials.

**The Negative Tracking Rule.** Tracking tightens as size grows: −0.032em at
display, −0.026em at H2, −0.014em at H3, normal at body. The only positive
tracking is on the mono layer, where labels open to +0.13em because that is
how a drawing annotates. Never letterspace a sans heading open.

**No Third Family.** Hierarchy is made from size, weight and the sans/mono
switch. Four faces is the budget.

## Layout

**Container.** One width: `--page` 1180px, centred, with a fluid gutter of
`clamp(1.25rem, 5vw, 4rem)`. Every section is a `.wrap`. Reading columns are
bounded by `--measure` (66ch), not by the container.

**Vertical rhythm.** Sections take `padding-block: clamp(2.75rem, 5.5vw,
4.5rem)`, with a tight variant for index-style blocks. Inside a block, gaps
come from the spacing scale through flex and grid `gap`, not margins.

**Breakpoints.** Six, and each exists because a specific component broke at
that width — not as a scale.

| Width | What changes |
| --- | --- |
| 480px | A spec row goes from stacked to `8.5rem / 1fr` label-and-value. |
| 720px | The town list goes to three ruled columns. |
| 760px | The trust strip goes to four ruled columns; the footer to `1.5fr 1fr 1fr`. |
| 800px | A schedule row goes to `ref / name / description` in three columns. |
| 860px | A services-page entry goes two-column. |
| 880px | The split layouts go two-column; the contact page takes its wider form track. |
| 900px | The header becomes sticky, the horizontal nav and printed number appear, the compact mobile link row disappears, and the sticky call bar and its body padding are removed. |
| 960px | The home hero goes two-column and the schematic appears. |

**Two rules that matter more than the breakpoints.**

*Let tracks shrink.* Grid and flex children default to `min-width: auto`,
which lets wide content blow out its track. `.split > *`, `.hero__grid > *`,
`.entry > *` and `.callband__grid > *` are all explicitly `min-width: 0`. Any
new multi-column container needs the same line.

*Measure the container, not the window.* The quote form's paired rows are
`repeat(auto-fit, minmax(210px, 1fr))` with no media query, because the form
sits inside a grid column and a viewport query would split it into two
columns its own panel could not hold. `.fig-row` follows the same pattern.

## Elevation and depth

**There is no `box-shadow` anywhere in this stylesheet.** Nothing is lifted
off the page, because a drawing has no depth. Separation is built from three
devices only:

1. **The rule.** A 1px hairline at 16% ink separates items; at 38% it opens a
   structure. A schedule is *ruled*, not carded, precisely because a rule is
   flatter than a card.
2. **The tonal step.** Paper → paper-2 is the entire light surface ladder;
   ink → ink-2 → ink-3 the dark one. A raised surface is a different tone,
   never a shadowed one.
3. **The band.** Full-bleed ink is how a section gets weight.

### Named rule

**The No-Shadow Rule.** If a new component seems to need a shadow, it does
not — give it a rule, a tonal step, or make it a band. A drop shadow is the
single addition that would break the object, because a drawing is flat.

## Shapes

**The Square Corner Rule.** Two radii, and one of them is zero.

- **0** — every surface. Panels, figure frames, bands, the trust strip, the
  schedule. Anything that behaves like part of the sheet.
- **2px** — controls only. Buttons, inputs, selects, textareas, the skip
  link, the form status panel, the wordmark's glyph box. Two pixels, so the
  corner is optically clean rather than actually rounded.

Do not introduce a third radius, and never a pill.

Borders are 1px throughout. The only 2px border in the system is the invalid
field, where the width change is one of three simultaneous error signals
(border colour, icon, message).

## Components

### The dimension line (signature component)

Every section opens with a mono reference struck into a leader rule that runs
to the container edge:

```html
<div class="sechead__line"><span class="ref">01</span></div>
```

The rule is drawn by the flex container's `::after` at `flex: 1`, so it
always fills exactly the space the reference does not. It is the cheapest
element in the system and the one that identifies it — it is what makes a
section read as an item on a sheet rather than a heading on a page. It
inverts for dark ground through `.on-ink`.

### The schedule

The services list, and the site's answer to the card grid. A ruled `<ol>`
where each row is a link laid out as `ref / name / description` at ≥800px
and stacked below it. The whole row is the target, the hover is a paper-2
wash plus the name going red, and the ruled rhythm makes seven services
scannable in about three seconds — which is the actual job.

### The spec register

A ruled `<dl>` used for any set of facts: the credentials in the hero of the
About page, "how the work goes", the contact details, "works for". Mono
label left, sans value right at ≥480px. It is the same object as the trust
strip, laid out vertically instead of horizontally.

### The trust strip

Four ruled columns directly under the home hero — the drawing's title block.
Registration, insurance, experience and area, all in the first screen with
the phone number, which is what PRD §11 asks for and what the ten-second test
needs.

### The empty figure slot

No photograph has been supplied, so a figure holds a hatched frame captioned
with what belongs in it, rather than a stock image or a generated one. The
hatch is a `repeating-linear-gradient` at 45° — the fill a drawing uses for a
section that has not been detailed yet. It is designed to look intentional,
because it will be on screen until Ger sends photographs.

### The sticky call bar

Fixed to the bottom below 900px: the printed number on the left, the Call Ger
button on the right, a hairline top edge, no blur and no translucency. The
body carries 78px of bottom padding so it never covers a form control or the
end of the footer, and both it and the padding are removed at 900px.

## Motion

There is one rule: **nothing moves that the visitor did not touch.** No
entrance animation, no scroll reveal, no parallax. The only transitions are
0.15s colour and border changes on hover and focus, and every one is behind
`prefers-reduced-motion`. A visitor arriving with a fault in the house should
meet the phone number, not a fade-in.
