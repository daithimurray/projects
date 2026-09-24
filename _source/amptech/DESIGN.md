---
name: Amptech
description: A Kildare estate after dark, where light does the selling.
colors:
  night-950: "#0a1222"
  night-900: "#111c33"
  night-850: "#15213b"
  night-800: "#1a2945"
  night-700: "#253656"
  night-600: "#374b72"
  night-500: "#4f6490"
  dusk-50: "#eef1f8"
  dusk-200: "#c3cde1"
  dusk-300: "#9fb0cf"
  dusk-400: "#97a8c8"
  sodium-300: "#ffc27a"
  sodium-400: "#ffae52"
  sodium-500: "#ff9e3d"
  sodium-600: "#e67e14"
  sodium-800: "#9a4b00"
  sodium-glow: "rgb(255 158 61 / 0.35)"
  flood-0: "#ffffff"
  flood-50: "#f1f4f8"
  flood-100: "#e5eaf1"
  flood-200: "#d3dae4"
  flood-300: "#b6c0ce"
  flood-rule: "#76849a"
  ink-900: "#0c1628"
  ink-700: "#2c3a55"
  ink-500: "#56627a"
  strobe-400: "#6aa0ff"
  strobe-500: "#3d7cff"
  alarm-500: "#ff5a4e"
  alarm-700: "#b42318"
  clear-400: "#5ee0a0"
  clear-700: "#186a42"
  tungsten: "#ffd49a"
  pebble: "#a9a397"
  slate: "#2a3140"
  tarmac: "#151a22"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.8rem, 1.9rem + 4.6vw, 6rem)"
    fontWeight: 780
    lineHeight: 0.94
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.35rem, 1.8rem + 2.8vw, 4.4rem)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.5rem, 1.35rem + 0.7vw, 2rem)"
    fontWeight: 740
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 108"
  item:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.25rem, 1.18rem + 0.35vw, 1.5rem)"
    fontWeight: 720
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  control:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.16vw, 1.1875rem)"
    fontWeight: 680
    lineHeight: 1.1
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 108"
  lede:
    fontFamily: "'Atkinson Hyperlegible Next Variable', 'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.18rem + 0.35vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Atkinson Hyperlegible Next Variable', 'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.16vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Atkinson Hyperlegible Next Variable', 'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.12vw, 0.94rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
  data:
    fontFamily: "'Martian Mono Variable', 'Martian Mono', ui-monospace, monospace"
    fontSize: "clamp(0.75rem, 0.73rem + 0.1vw, 0.8rem)"
    fontWeight: 460
    letterSpacing: "0.02em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 88"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "20px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  section-y: "clamp(5rem, 3rem + 9vw, 10rem)"
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)"
  max: "1320px"
  header: "72px"
components:
  button-primary:
    backgroundColor: "{colors.sodium-500}"
    textColor: "{colors.night-950}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.sodium-400}"
    textColor: "{colors.night-950}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.dusk-50}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "52px"
  button-ghost-lit:
    backgroundColor: "transparent"
    textColor: "{colors.ink-900}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "52px"
  button-ghost-lit-hover:
    backgroundColor: "{colors.flood-0}"
    textColor: "{colors.ink-900}"
  button-solid-ink:
    backgroundColor: "{colors.night-900}"
    textColor: "{colors.flood-50}"
    typography: "{typography.control}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.35rem"
    height: "52px"
  button-solid-ink-hover:
    backgroundColor: "{colors.night-800}"
    textColor: "{colors.flood-50}"
  input-field:
    backgroundColor: "{colors.flood-0}"
    textColor: "{colors.ink-900}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 0.95rem"
    height: "52px"
  choice-key:
    backgroundColor: "{colors.flood-0}"
    textColor: "{colors.ink-700}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.7rem"
    height: "48px"
  choice-key-checked:
    backgroundColor: "{colors.night-900}"
    textColor: "{colors.flood-50}"
  tag-for:
    textColor: "{colors.ink-700}"
    rounded: "{rounded.xs}"
    padding: "0.1rem 0.6rem"
    height: "1.75rem"
  zone-code:
    textColor: "{colors.sodium-500}"
    typography: "{typography.data}"
  nav-link:
    textColor: "{colors.dusk-200}"
    typography: "{typography.label}"
    height: "44px"
  nav-link-active:
    textColor: "{colors.dusk-50}"
  pause-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.dusk-300}"
    rounded: "{rounded.sm}"
    size: "44px"
  lit-section:
    backgroundColor: "{colors.flood-50}"
    textColor: "{colors.ink-900}"
    padding: "{spacing.section-y} 0"
  lit-panel:
    backgroundColor: "{colors.flood-50}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.lg}"
    padding: "3rem"
  fact-plate-cell:
    backgroundColor: "{colors.night-850}"
    textColor: "{colors.dusk-50}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem 1.5rem"
---

# Design System: Amptech

## Overview

**Creative North Star: "The Estate After Dark"**

The page is a Kildare housing estate at night, and light does the selling. Every colour is either a light source or a material you would see from the pavement after dark: sodium streetlights, cold LED floodlights, tungsten windows, the bell-box beacon, pebbledash, roof slate, wet tarmac. The site doesn't claim a house is protected. It shows it: sensors trip, floodlights snap on, a camera pans to follow, an alert lands on a phone. The direction contract rejects navy, shields, stock camera photos and a grid of service cards, and the build follows all four.

Two grounds alternate down the page. Night sections are transparent over one continuous sky painted on the body: dusk blue, a sodium streetlight cast every 1100px or so on alternating sides like lamps along a road (each cast fades out inside its 2200px tile, so tiles never show a seam), a low overcast whose lit tops warm to amber-brown, and fine grain, so consecutive sections never meet at a seam. The footer settles out of the same sky into deepest night. Where a cast meets lit cloud the sky peaks at about 22% sodium, the ceiling at which every text colour still holds AA. Lit sections are cold floodlight white for dense reading, falling off from a lamp at their top centre. When motion is allowed they switch on as they arrive. Night is the default and sparse. Lit sections are dense and scannable.

Type is wide and structural: Archivo stretched 104–125% for headings and controls, like lettering on a van or a panel label. Atkinson Hyperlegible Next carries the reading, because many visitors are older homeowners on phones. Martian Mono appears only where a device would print a readout. Motion comes from one grammar borrowed from the hardware: trip, sweep, strobe, pan, cable. It is always optional. Content is visible by default, reduced motion gets the "everything on" end state, and a pause control in the header stops every loop.

**Key Characteristics:**
- One continuous night sky (lamps, overcast, grain) behind every night section; sections never meet at a seam.
- Cold floodlight-white lit sections with a top-centre falloff, used for dense reading.
- Sodium amber is the only warm accent; bell-box blue, alarm red and all-clear green are signals for state only.
- Wide Archivo display, Atkinson Hyperlegible body, Martian Mono for readouts only.
- Rounded-rectangle hardware geometry; shadows fall downward; only real light sources bloom.
- Motion grammar of trip, sweep, strobe, pan and cable, gated on reduced motion and stopped by a page-wide pause control.

### Motion Grammar

One vocabulary for the whole page, exported from the shared motion module. Every section imports it; nothing registers its own easing or scroller.

- **Trip.** A PIR floodlight snapping on: attack within 120ms, a small flicker (0.18 → 0.9 → 0.55 → 1 opacity, or brightness 1.7 → 0.6 → 1.35 → 1), then a slow decay of 1–1.4s. Used for content groups arriving, rows lighting, LEDs switching on, the floodlight vignette. CSS hover states follow the same shape: the "on" transition runs at the trip duration and the "off" transition runs at the decay duration.
- **Sweep.** A detection beam passing across: section headings revealed line by line through masks (lines rise 105% → 0, 1.05s, expo out, 0.09s stagger). Used on some headings, not all.
- **Strobe.** The bell-box double blink: a CSS variable pulsed four times in 50ms steps, then a 0.4s decay. Alerts, notifications and form status only.
- **Pan.** A camera head turning to follow the visitor, in the hero scene and in the service glyphs.
- **Cable.** A line drawn along a path: group rules, FAQ hairlines, the process cable run and its clips, the reviews' leaders.
- **Lit reveal.** A lit section starts behind a night veil whose circular mask opens from the top centre as it scrolls (scrubbed), and the veil is removed once the light is fully on.
- **Scheduling.** Section motion that nothing depends on is built after first paint, in idle time (`later()`). Only pinned sections build eagerly, so later triggers measure with the pin spacing in place.
- **Arrival rule.** Anything the reader has already scrolled past stays lit. Only content still below the fold waits to switch on.

### Accessibility Floor

- Content is visible by default. Initial "dark" states exist only when motion is allowed, set from script or under `.motion-ok`.
- Reduced motion means no pinning, scrubbing, parallax, smooth-scroll hijack or looping animation. Each illustration shows its "everything on" end state, and the pause control is hidden because nothing loops.
- The pause control (WCAG 2.2.2) sits in the header. It pauses every CSS animation through `html.motion-paused`, and scripted loops (WebGL, canvas, intervals, JS blinks) subscribe to it and stop drawing. The choice persists per visitor. Loops also stop off-screen and in hidden tabs.
- Contrast is AA in every state, using the stated pairs only (see Colors). Control boundaries are at least 3:1.
- Tap targets are at least 44px. Reading order is tab order at every width.

## Colors

The palette is made of light sources over a dusk-blue night: one warm accent (sodium), one cold reading ground (floodlight), three signal LEDs, and a few estate materials.

### Primary
- **Sodium Streetlight** (`sodium-500`): the only warm accent. Primary buttons, the phone number set as display type, zone codes on night, the text-selection highlight, and the "light" in every illustration. 8.3:1 on night-900.
- **Sodium Lamp Head** (`sodium-400`): primary hover, the focus ring on night, inline links on night, the per-review star marks.
- **Sodium Halo** (`sodium-300`): the warm tint inside light pools, blooms and the row-arrival flash.
- **Sodium Filament** (`sodium-600`): lit glyph strokes on flood, dimmed "done" LEDs, the focused field's cast.
- **Burnt Sodium** (`sodium-800`): sodium as text on floodlight white (5.6:1 on flood-50). Links, required marks, quotation marks, the certificate's guilloche ink.
- **Sodium Glow** (`sodium-glow`): bloom around real light sources only: panel LEDs, lamps, the wordmark LED.

### Neutral: night
- **Deepest Night** (`night-950`): header scrim, mobile menu sheet, footer, text on sodium buttons, scrollbar track.
- **Overcast Dusk** (`night-900`): the page ground and theme colour. Never replaced by black or a flat fill.
- **Plate Night** (`night-850`): cells of the fact plate.
- **Night Rule** (`night-800`, `night-700`): hairlines and rules on night (`night-700` is the night `--rule`), junction-block bodies.
- **Street Edge** (`night-600`): ghost-button and menu-toggle borders, the scrollbar thumb.
- **Unlit Rim** (`night-500`): rims of unlit LEDs, faint line work in drawings.
- **Dusk White** (`dusk-50`): primary text on night (15:1).
- **Dusk Grey** (`dusk-200`): secondary text (10.6:1). **Dusk Caption** (`dusk-300`): tertiary text, captions, quotation marks (7.7:1). **Dusk Hairline** (`dusk-400`): hairline labels and inactive step titles only, which still reach 4.5:1 under the brightest streetlight cast.

### Neutral: floodlight
- **Floodlight Core** (`flood-0`): the lamp's hotspot, input fills, the light pool under a hovered row.
- **Floodlight White** (`flood-50`): the lit-section ground. Cold LED white, never warm cream.
- **Falloff** (`flood-100`): the edge where a lit section's lamp falls off.
- **Flood Hairline** (`flood-200`): rules on flood (the flood `--rule`). **Flood Border** (`flood-300`): ghost-button borders on flood, service-index row rules, choice-key borders.
- **Control Edge** (`flood-rule`): field and tag boundaries on flood (3.4:1, WCAG 1.4.11).
- **Floodlit Ink** (`ink-900`): text on flood (16.4:1), the index's heavy group rule, the focus ring inside lit areas. **Ink Grey** (`ink-700`): secondary text (10.3:1). **Ink Caption** (`ink-500`): captions and hints (5.6:1).

### Signals (state only)
- **Bell-Box Blue** (`strobe-500`, `strobe-400`): alerts and notifications only. The beacon, a notification dot, an app alert, a "sending" LED. Not for small text (4.5:1 on night-900).
- **Smoke-Alarm Red** (`alarm-500` on night, `alarm-700` on flood at 6.1:1): smoke-alarm LEDs and errors only.
- **All-Clear Green** (`clear-400` on night, `clear-700` on flood at 5.9:1): the "all clear" LED and success only.

### Materials (illustration only)
- **Tungsten Window** (`tungsten`), **Pebbledash** (`pebble`), **Roof Slate** (`slate`), **Tarmac** (`tarmac`): houses, walls, roofs and driveways inside drawings. Irish front-door colours (red, teal, racing green, yellow) appear as small local notes inside illustrations and nowhere else.

### Named Rules
**The Light-Source Rule.** Every colour on the page is either a light or a material seen at night. If you can't name the lamp, LED, screen or surface a colour comes from, it doesn't belong.

**The One Warm Light Rule.** Sodium is the only warm accent. On night use sodium-500 or sodium-400. On floodlight white, sodium appears as text only in sodium-800.

**The Signal Rule.** Blue, red and green are LEDs that report state: blue for alerts, red for smoke and errors, green for all clear. Each has a night value and a flood value. They are never decoration and never a second brand colour.

**The Continuous Sky Rule.** Night sections are transparent over the body's sky, which is dusk blue with a sodium cast from above and overcast grain. Never paint a flat fill over it. A section that needs its own sky builds it from the same tokens, or from `color-mix()` with them.

## Typography

**Display Font:** Archivo Variable, with the width axis 62–125 (fallback Archivo, Arial Narrow)
**Body Font:** Atkinson Hyperlegible Next Variable (fallback system-ui)
**Label/Mono Font:** Martian Mono Variable, width 88 (fallback ui-monospace), for readouts only

**Character:** A wide, heavy grotesque that reads like lettering on a van or a control panel, set over a body face built for legibility on small screens and for older eyes. The mono is a device readout, not a costume.

### Hierarchy
- **Display** (780, up to 6rem, 0.94, -0.03em, width 118): the hero `h1` only. The hero fits it to the viewport and caps it at 5.5rem, 11.5ch wide.
- **Headline** (760, 2.35–4.4rem, 0.98, -0.022em, width 118, balanced, max 18ch): one per section, the `h2`. It stands alone with nothing above it.
- **Title** (740–760, 1.5–2.35rem, 1.05–1.15, width 108–112): group titles in the service index, sub-heads, the footer's closing line. Mobile menu links use the same voice at step 3.
- **Item** (700–720, 1.25–1.6rem, 1.1–1.15, width 112): service names, process step titles, zone step titles. Reviewer names use this voice at body size.
- **Control** (680, body size, 1.1, width 108): buttons and text links that act as calls to action.
- **Lede** (Atkinson 400, 1.25–1.5rem, 1.5, max 44ch): one per section, under the headline.
- **Body** (Atkinson 400, 17–19px, 1.6): measure 60–66ch in reading columns, 40ch beside illustrations, about 58ch for quotes.
- **Label** (Atkinson 600–700, 14–15px, 0.01em): nav links, tags, form hints, place names. Status and source lines use all small caps at 0.045em. Field names on the fact plate are uppercase at 0.07em.
- **Data** (Martian Mono 460, 12–13px, width 88, 0.02em, tabular, uppercase): the readout voice.

### Named Rules
**The Readout Rule.** Martian Mono sets only what a device would print: times, dates, zone and camera codes (Z1, CAM 1), licence and certificate numbers, coordinates, and a camera's own on-screen display. In "Zone 1 · Front door" the code is mono and the place is Atkinson. Labels such as "Address", "All zones OK" or a reviewer's job are never mono.

**The Wide Voice Rule.** Headings and controls are Archivo at width 104–125 and weight 680–820. Tracking stays between -0.03em and 0 (the wordmark alone is tracked open, at +0.04em). Never condensed, and never tighter than -0.04em.

**The Heading Carries Itself Rule.** Nothing sits above a section heading: no eyebrow, no kicker, no section number. A zone line sits below its step title, as data. Numbers appear only where order carries meaning, as in the process steps.

## Layout

The container is `min(100% − 2 × gutter, 1320px)`, with a fluid gutter of 1.25–3rem. Every section uses the shared section padding (5–10rem, fluid) inside the container, and each heading gets more space above it than below. The spacing scale has a 4px base. The mid steps (0.75–2rem) do most of the work inside components, and 3rem separates blocks.

Night is the default ground. Lit sections interrupt it wherever the reading is dense: an index, a process, questions, a form. Wide screens use asymmetric splits: a heading and lede column beside a denser column (the service index runs 5fr to 7fr), or a sticky aside beside a list. Only a compact block sticks (a vignette with its buttons, around 360–420px), and only at 1024px wide and 620px tall or more. It centres in the viewport and never slides under the header. On phones everything stacks in DOM order.

The header is fixed at 72px. It hides as the reader scrolls down and returns on the way up. On very short viewports it scrolls away with the page. In-page anchors rely on `scroll-padding-top` (header height + 16px) and never add manual offsets.

Breakpoints: 1024px is the system switch (desktop nav replaces the menu toggle, two-column layouts and sticky asides begin, and pins are built when motion is allowed and there is height). Service rows widen at 640px so tags sit opposite the name. The header's call button drops its number below 520px. Below 380px, gaps tighten but targets never shrink. Other sections choose their own content switch points between 900 and 1100px.

**The DOM Order Rule.** Reading order is tab order at every width. Layouts rearrange with grid areas and `display: contents`, never by moving content out of order.

**The 44px Rule.** Every target is at least 44px: buttons 52px, fields 52px, choice keys 48px, FAQ rows 76px, mobile menu links 56px, the pause and menu toggles 44px square.

## Elevation & Depth

Depth is a hybrid. The tonal grounds do most of the work: night recedes, and floodlight white comes forward for reading. Shadows appear only where an object sits in front of a surface, and they always fall downward, because the light comes from above. A lit control casts sodium light below itself, the way a lamp lights the ground. Text over the live hero scene or a camera feed may carry a soft, dark shadow for legibility, never a coloured one.

### Shadow Vocabulary
- **Rest on night** (`box-shadow: 0 1px 2px rgb(3 7 15 / 0.35), 0 4px 12px -2px rgb(3 7 15 / 0.35)`): small objects on the night ground, such as the fact plate and small device props.
- **Lifted on night** (`box-shadow: 0 2px 4px rgb(3 7 15 / 0.3), 0 18px 40px -12px rgb(3 7 15 / 0.55)`): larger objects on night, such as the before/after stage and the phone in the drawing.
- **Sodium cast** (`box-shadow: 0 14px 34px -10px rgb(255 158 61 / 0.55)`): below a primary button on hover. The focused field uses the same idea: sodium-600 at 70%, 14px down.
- **Flood panel** (`box-shadow: 0 1px 1px rgb(12 22 40 / 0.06), 0 12px 32px -14px rgb(12 22 40 / 0.28)`): the floodlight vignette, an open FAQ row, a hovered solid-ink button.

### Named Rules
**The Light From Above Rule.** Every dark shadow has a positive y offset and a negative spread. Nothing floats in a zero-offset halo, and nothing gets a hard offset shadow.

**The Only Lights Bloom Rule.** Zero-offset glow belongs to real light sources: LEDs, lamps, screens and the floodlight. Text (including the phone number), buttons, panels, bars and hover states never glow.

**The Arriving Sheet Rule.** A lift shadow may exist while something arrives (the certificate settling onto the wall) and fades once it lands.

## Shapes

Alarm hardware is made of rounded rectangles, and so is the interface. Tags and focus-ring corners use 4px. Controls, fields, keys and toggles use 8px. The fact plate and the FAQ row light use 12px. Lit panels and illustration vignettes use 20px. Panel LEDs are small squares with 2–3px corners. Circles are kept for things that are round in the world: the REC dot, LED blooms, the certificate's ink stamp. Paper, which only the certificate uses, has 3px corners.

Lines are the other half of the form. Rules are 1px hairlines in the ground's rule colour, and a service group closes on a 2px ink rule. Leaders, cables and hairlines are drawn in, not faded in. Icons use a 24px grid with a 1.6 stroke and round caps and joins, and they are drawn from the hardware Amptech fits: a PIR, a bullet camera, a smoke detector, a floodlight, a fob reader, a GSM unit, the call-out van.

**The Hardware Corner Rule.** Controls take 8px and panels take 12–20px. No pills, and no square corners on UI.

## Components

### Buttons
Tactile hardware keys with a light that follows your hand.
- **Shape:** gently rounded rectangle (8px). Minimum height 52px (44px in the header), padding 0.8rem × 1.35rem, set in the control voice. Icons are 1.15em.
- **Primary:** Sodium Streetlight fill, Deepest Night text, Sodium Lamp Head border. Hover: lamp-head fill plus the sodium cast below. Active: pressed 1px down, and the cast tightens.
- **Pointer light:** every button carries a soft white light (22% white, 120px) that follows the pointer. It snaps on in 120ms and fades over 420ms. Touch devices skip it.
- **Ghost (night):** transparent, Dusk White text, Street Edge border. Hover: sodium-500 border and a 6% sodium wash.
- **Ghost (lit) / Ink:** Floodlit Ink text, Flood Border edge. Hover: ink border and a Floodlight Core fill.
- **Solid ink:** Overcast Dusk fill, Floodlight White text. Hover: night-800 fill and the flood-panel shadow.
- **Focus / Disabled:** a 2px sodium-400 outline at 3px offset, which turns Overcast Dusk inside lit areas. Disabled is 50% opacity with no shadow. With motion allowed, the phone icon rings once on hover.

### Tags and Zone Codes
- **"For" tags** (service rows): Atkinson 650 at 12–13px, Ink Grey text, a 1px Control Edge border, 4px corners, a 60% white wash, 1.75rem tall. They are labels, never mono.
- **Zone line:** the code in mono Sodium Streetlight, the place in Atkinson 600 Dusk Caption, set below the step title. Inside drawings, zone tags hang on thin leader lines. A zone tag is data inside an illustration or a step. It is never a heading's label.
- **Choice keys** (quote form): 48px keys with 8px corners, a Floodlight Core fill and a Flood Border. The chosen key turns Overcast Dusk, its small corner LED lights sodium, and it presses 1px down.

### Lit Panels
- **Lit section:** Floodlight White ground with a radial falloff from a lamp at top centre (Floodlight Core → Floodlight White at 55% → Falloff). Text tokens switch to ink through the section's `--text`, `--text-2`, `--text-3`, `--rule` and `--accent-text`, and focus rings turn dark. With motion allowed it switches on through the lit reveal.
- **Lit panel on night** (the quote form): the same `.is-lit` swap on a 20px panel, with a hotspot at its top, a deep shadow falling 50px below, and a faint tungsten cast above.
- **Fact plate:** the company's particulars set out like a rating plate, printed honestly with no imitation metal. Plate Night cells separated by 1px Night Rule gaps, 12px corners, the rest-on-night shadow, uppercase Atkinson field names, and codes in mono.
- **Never:** cards inside cards, or a grid of same-size icon, heading and text cards as a section's structure.

### Inputs / Fields
- **Style:** Floodlight Core fill, a 1px Control Edge border (3.4:1), 8px corners, 52px minimum height, a 1px inset shade at the top, and text at 16px or larger.
- **Hover:** the border goes to Ink Grey.
- **Focus:** a 2px ink outline at 1px offset, an ink border, and a sodium cast that snaps on below the field in 120ms.
- **Error:** an alarm-700 border with an inset ring. The message is alarm-700 at weight 700, led by an 8px square LED.
- **Labels:** Archivo 640 at width 106 in Floodlit Ink, required marks in Burnt Sodium, hints in Atkinson Ink Caption. Each status message carries a small LED in its signal colour that strobes as the message lands: blue for progress, red for failure, green when sent.

### Navigation
- **Bar:** fixed at 72px. Over the hero it shows a Deepest Night gradient. Once the page has scrolled it becomes 96% Overcast Dusk with a Night Rule hairline, and no backdrop blur. It hides on the way down and returns on the way up.
- **Links:** Atkinson 600 at 14–15px in Dusk Grey. Hover and the current section: Dusk White, with a 1.5px sodium underline drawn in from the left.
- **Wordmark:** Archivo 820 at width 125, tracked +0.04em, with a square sodium panel LED whose bloom breathes on a 3.2s loop (it pauses with the page).
- **Pause toggle:** a 44px square with 8px corners and a Dusk Caption pause/play glyph that gains a border on hover. It uses `aria-pressed` and is hidden under reduced motion.
- **Call:** the phone button is always in the bar. Below 520px it collapses to a 44px icon, with the number kept for screen readers.
- **Mobile (below 1024px):** a 44px menu toggle opens a full-height Deepest Night sheet with Archivo 720 links in 56px ruled rows, and the call button and licence line at its foot. Without JavaScript, the toggle jumps to the footer's links.

### Service Index (signature)
A lit, ruled index, like an alarm panel's zone list. It is not a card grid.
- Two groups. Each opens with a title-voice heading over a 2px ink rule, drawn in like a cable as the group arrives.
- Each row has a 44–48px hardware glyph, the name in the item voice, a body of up to 60ch in Ink Grey, "for" tags opposite the name from 640px up, and an optional Burnt Sodium link with an arrow. Rows are divided by 1px Flood Border rules.
- **Arrival:** each row trips once. A sodium-300 flash rises at its glyph, the content lights up through the trip flicker, and then it decays.
- **Hover / focus:** a cold floodlight pool follows the pointer inside the row, the name nudges 0.3rem, lit strokes turn Sodium Filament, and the glyph plays its own movement. The PIR fan pulses, the camera pans, smoke rises, the beam draws, the door swings once the reader goes green, the van brakes. Signal LEDs in the glyphs use their signal colours.
- On desktop, a floodlight-on-a-wall vignette and the call buttons stay beside the list. Hovering a row re-trips the lamp.

### Reviews Street (signature)
Each voice lives in one building along a single night street, drawn true to the job Amptech did there.
- A 1px leader drops from each quote to the thing that was fitted (a bell box, cameras, a smoke detector, a warehouse's corner camera, repair-bay lights).
- Quotes are in Atkinson: body size by default, up to about 2rem for the lead voice. They hang their Dusk Caption quotation marks outside the column. The name is in the item voice, the place in Dusk Grey, and the job and source in all small caps.
- A Google voice carries its own five-star mark in Sodium Lamp Head. There is never an aggregate rating or a count.
- The street comes on left to right as it arrives. Hovering or focusing a quote lights its building and leader, and the reverse also works. On phones each building becomes a vignette under its quote.

### Cable Run and Specimen Certificate (signature)
- **Cable run:** the process steps are junction blocks on a floodlit wall. Each is a small rounded night block with a sodium LED and a two-digit number, which is allowed here because order matters. A cable with clips is drawn from block to block, and each LED trips as the cable reaches it.
- **Certificate:** the run ends on the only paper in the world, a Certificate of Compliance marked "Specimen". It is 1:1.3, with 3px corners, warm paper with fibre grain, a guilloche border in Burnt Sodium and Ink Caption, a watermark, and ruled rows (numbers in mono, words in Atkinson). It carries a drawn signature and an ink stamp with "Specimen" around its ring and the standard number at its centre, its ink eaten by noise. It arrives lifted, settles, and is stamped as it lands.

## Do's and Don'ts

### Do:
- **Do** leave night sections transparent over the body sky (lamps, overcast, grain), and build any local sky from the night and sodium tokens.
- **Do** use a floodlight-white lit section, with its top-centre falloff, wherever the reading is dense: indexes, processes, questions, forms.
- **Do** keep Sodium Streetlight as the only warm accent, and switch to Burnt Sodium (sodium-800) for sodium-coloured text on flood.
- **Do** keep blue for alerts, red for smoke and errors and green for all clear, each in its night value (400/500) or its flood value (700).
- **Do** set times, dates, zone and camera codes, licence and certificate numbers, coordinates and camera OSD in Martian Mono, and everything else in Atkinson or Archivo.
- **Do** give each section one authored moment from the grammar (trip, sweep, strobe, pan, cable), and build it in idle time unless it pins.
- **Do** keep content visible by default, and give reduced motion each illustration's "everything on" end state.
- **Do** connect every continuous loop to the pause control, and stop it off-screen and in hidden tabs.
- **Do** use the stated AA pairs: dusk-50, dusk-200 and dusk-300 on night, ink-900, ink-700 and ink-500 on flood, dusk-400 for hairline labels only.
- **Do** give every control a 44px target and visible hover, focus-visible, active and disabled states.
- **Do** draw new icons on the 24px grid with a 1.6 stroke and round caps and joins, from hardware the company fits.

### Don't:
- **Don't** use navy-black grounds, flat fills, shields, stock camera photos or a grid of service cards.
- **Don't** put an eyebrow, kicker or section number above a heading.
- **Don't** glow anything that isn't a light source: no zero-offset halo on text, the phone number, buttons, panels, bars or hover states.
- **Don't** use pills, square-cornered UI, hard offset shadows, glass or decorative blur, gradient text, or coloured border-left accents.
- **Don't** fake hardware: no CSS screw heads, engraved or embossed plates, or brass.
- **Don't** set labels in mono as a "techy" costume.
- **Don't** hard-code UI colours or retired values such as `#070d19`, `#f6f5f0` or `#ecebe3`. Use the tokens, or `color-mix()` with them.
- **Don't** use emoji or unicode glyphs as icons.
- **Don't** pin, scrub, parallax, smooth-scroll or autoplay a loop under reduced motion.
