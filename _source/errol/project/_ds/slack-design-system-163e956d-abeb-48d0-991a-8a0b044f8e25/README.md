# Slack Design System

A design system for creating on-brand interfaces, marketing, and slides for **Slack** (a Salesforce company).

> ⚠️ **Source-material note for the reader.** The user named the brand as *slack.com* but the attached reference was Salesforce's official *Corporate Template 2026* (Salesforce is Slack's parent). This design system is **Slack-branded** (colors, type, UI surfaces, voice), and the `slides/` directory recreates the Salesforce 2026 corporate deck layouts because that's the slide template they provided. If you intended to brand slides as Slack instead, tell us and we'll swap the cover/segue treatments.

## Sources used
- **Uploaded PDF** — `uploads/DAvidCorporate Template 2026.pdf` (Salesforce 2026 corporate slide template). 85 pages parsed for slide layouts, color tokens, type scale, and copy patterns.
- **Slack public brand** — brand colors, logomark, and product chrome derived from Slack's public marketing surfaces and the Slack Lato-based type system. Font substitutions noted below.
- No Figma or codebase was attached; UI kits are built from Slack's public visual language.

## Substitutions & flags
- **Fonts:** Slack's marketing site uses **Lato** (Google Fonts — used directly) and the Slack app uses **Slack-Lato** (a customized Lato for UI). We load **Lato 400/700/900** from Google Fonts. No substitution needed.
- **Salesforce slide fonts:** The PDF references *Avant Garde Demi SFDC* (proprietary) and *Salesforce Sans* (proprietary). The `slides/` deck substitutes **ITC Avant Garde Gothic → Jost** (Google Fonts, geometric sans) and **Salesforce Sans → Inter** is avoided per guidelines; we use **Hanken Grotesk** (Google Fonts) as the nearest neutral humanist sans. Replace with the real fonts if you have licenses.
- **Icons:** Slack's in-product glyphs are copied as SVGs into `assets/icons/`. Marketing iconography uses **Lucide** from CDN as a pragmatic match for Slack's rounded 2px-stroke style.
- **Slack logomark/wordmark:** recreated from public brand guidelines (the four-tile swirl with Slack aubergine/yellow/green/blue). If you have the official SVG, drop it into `assets/logo/` to replace.

## What this system covers
Slack's surface area breaks into three product contexts:

1. **Slack desktop app** — sidebar workspace switcher + channel list + message pane + composer. The core product. See `ui_kits/slack-app/`.
2. **Slack marketing website (slack.com)** — hero sections, feature rows, customer logos, pricing. See `ui_kits/slack-marketing/`.
3. **Corporate slide template** — the Salesforce 2026 corporate deck used for exec / all-hands / external storytelling. See `slides/`.

## Index
| File / folder | What's inside |
|---|---|
| `README.md` | This file — brand overview, content + visual foundations, iconography. |
| `SKILL.md` | Agent Skill manifest so this system can be loaded by Claude Code. |
| `colors_and_type.css` | CSS variables for color tokens, type scale, semantic element styles. |
| `fonts/` | Web font files (where licensable) and `@font-face` declarations. |
| `assets/logo/` | Slack logomark + wordmark SVGs. |
| `assets/icons/` | In-product icons used by the app UI kit. |
| `assets/brand/` | Marketing illustrations, background motifs, photographic placeholders. |
| `preview/` | Design-system preview cards (shown in the Design System tab). |
| `ui_kits/slack-app/` | Desktop-app UI kit: sidebar, channel pane, composer, threads. |
| `ui_kits/slack-marketing/` | Marketing site UI kit: nav, hero, feature row, footer. |
| `slides/` | Salesforce 2026 corporate slide layouts (recreated from PDF). |

## Content fundamentals

Slack's voice across product, marketing, and internal comms is **warm, clear, and quietly clever**. It's a grownup product written by humans who used to joke around in chat.

- **Person & address.** We say **"you"** for the reader and **"we"** for Slack. Never "the user." Never "one." Never "Slack believes…" — Slack is a company of people.
- **Casing.** **Sentence case for everything** — slide titles, button labels, nav items, section headers. *Not* Title Case. Exceptions: product names (Slack, Slack AI, Slack Connect, Huddles, Canvas, Lists, Workflow Builder) stay capitalized; acronyms (AI, CRM, SOC 2) stay all-caps.
- **Length.** Short sentences. Then sometimes one longer one that earns its keep. Marketing headlines land in 6–10 words. Button labels are 1–3 words.
- **Tone.** Confident, not boastful. Specific, not buzzy. We'd rather say *"Send a message"* than *"Unlock seamless communication."*
- **Emoji.** **Yes, sparingly.** 👋 🎉 ✅ 💡 — one at a time, usually in product (empty states, reactions, onboarding). Not in headlines, not in slides unless showing a Slack UI screenshot.
- **Punctuation.** Oxford comma. No em-dashes as sentence connectors where a period will do. Contractions are fine — "you're," "we'll," "don't" read as human.
- **Numbers & stats.** Specific and attributed. *"47% faster incident response"* not *"much faster."* Pair every stat with a source line or customer name.
- **CTAs.** Verbs first. *"Try Slack free"* / *"Talk to sales"* / *"See pricing"* — not *"Learn more"* when a sharper verb exists.

Example copy, product → marketing → slide:

> **Product (empty channel):** "This is the very beginning of your direct message with Priya. Say hi 👋"
> **Marketing (hero):** "Where work happens. Slack brings your people, tools, and data together in one place."
> **Slide (segue):** "The time to build a better future is now."

## Visual foundations

### Color
Slack runs on a **single signature hue — aubergine `#4A154B`** — supported by a bright-accent palette of **yellow `#ECB22E`, green `#2EB67D`, blue `#36C5F0`** (the four logo tiles). Grayscale is a cool neutral ramp. Everything lives on **off-white `#F8F8F8`** in marketing and **near-black `#1D1C1D`** in app dark chrome.

- **Aubergine is always the primary surface** for app chrome, nav, and hero backgrounds. It is *not* a secondary accent — it's the brand.
- **The four-color accents** are used **one at a time**, never stacked as a rainbow gradient. No "Instagram-style" gradient backgrounds.
- **Gradients** are rare. When used, it's aubergine→deep-purple for hero washes, or a soft radial glow behind the logomark. Never bluish-purple web-3 gradients.

### Type
- **Display / UI:** Lato 900 (Black) at 56–96px for hero, 700 (Bold) at 28–40px for section heads.
- **Body:** Lato 400 at 16–20px, 1.5 line height.
- **Caps eyebrows:** Lato 700 at 12–13px, tracking `+0.08em`, uppercase — used above section headlines.
- Line length capped around 60–72 characters.
- Optical sizing matters: at 96px, letterspacing tightens to `-0.02em`.

### Spacing & layout
- 8px base grid. Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Marketing site is a 12-col grid, 1200px max, 24px gutters.
- App uses a 3-pane split: **workspace rail 72px** / **channel sidebar 260px** / **content flex**.
- Generous whitespace in marketing; tighter density in product.

### Backgrounds
- Marketing: mostly flat off-white or aubergine. Full-bleed product screenshots on aubergine. Occasional hand-drawn squiggle / doodle vector motifs (seen in Slack marketing: arcs, circles, three-dot patterns).
- No textures, no noise, no photographic backgrounds behind text.
- Hero illustrations when used are **flat, slightly geometric, warm palette** (not 3D-rendered blob-people).

### Animation
- **Fast and calm.** 150ms for hover/press, 250–300ms for panel transitions, 400ms for page-level reveals.
- Easing: `cubic-bezier(0.2, 0, 0, 1)` (Slack's product-standard "smooth out") for most transitions; `cubic-bezier(0.4, 0, 0.2, 1)` for entrances.
- **No bounces**, no overshoot, no spring physics in product chrome. Subtle scale+fade is the default.
- Emoji reactions *do* pop — a 120ms scale(1 → 1.3 → 1) bounce when you add a reaction.

### States
- **Hover (light):** background darkens by ~4% (rgba(0,0,0,0.04) overlay) or gets a subtle bg fill.
- **Hover (aubergine / dark surfaces):** background lightens by ~8% (rgba(255,255,255,0.08) overlay).
- **Press:** background goes one step further dark/light; no scale transforms on primary buttons in product; marketing CTAs can `scale(0.98)` on press.
- **Focus:** 2px offset ring, `#1264A3` (Slack link-blue) or yellow on dark surfaces.

### Borders & radii
- Corner radii: **4px** (inputs, small tags), **8px** (buttons, cards, menus), **12px** (larger cards, modals), **999px** (pills / avatars).
- Borders are used sparingly: 1px `rgba(29,28,29,0.13)` on light; 1px `rgba(255,255,255,0.1)` on dark.
- **No thick colored left-border accent cards.** Not Slack.

### Shadows
Two shadow tokens, soft and cool:
- `shadow-sm`: `0 1px 2px rgba(0,0,0,0.08)` — buttons, cards at rest.
- `shadow-md`: `0 4px 12px rgba(0,0,0,0.12)` — menus, popovers.
- `shadow-lg`: `0 12px 32px rgba(0,0,0,0.16)` — modals.
- Inner shadow on inputs is avoided; flat backgrounds with borders do the job.

### Transparency & blur
- Modals dim the page with `rgba(0,0,0,0.5)`.
- Floating toolbars in the message composer use `rgba(29,28,29,0.95)` — almost opaque, not frosted.
- **Backdrop blur is not a Slack motif.** Don't reach for it.

### Cards
A Slack card is: `background: white; border: 1px solid rgba(29,28,29,0.1); border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.08); padding: 24px–32px`. No colored left bar. No gradient borders.

### Imagery
- **Product screenshots** are king. Always crisp, never tilted or isometric.
- **People photography:** warm, candid, natural light. Not stock-staged.
- **Illustration:** flat vector, limited palette, friendly geometric shapes, confident linework. Often a single aubergine or yellow accent figure against off-white.
- Avoid: cool-blue corporate photos, isometric 3D laptops, emoji collages, gradient blob backgrounds.

## Iconography

Slack uses **three distinct icon systems** depending on surface:

1. **In-product glyphs.** 20×20 viewbox, 1.5px stroke, rounded joins, slightly filled where meaning is carried by shape (bell, pencil, magnifier). We copy a representative set into `assets/icons/` as inline SVG. See `preview/icons.html`.
2. **Marketing iconography.** Larger, more illustrative — often a flat single-color shape (aubergine or yellow) on a 48–64px tile. We stand in with **Lucide** (CDN: `https://unpkg.com/lucide-static@latest/icons/…`) tuned to `stroke-width: 2` and color `var(--sl-aubergine)`. Flag: a pixel-perfect match for Slack marketing requires their proprietary icon set.
3. **Emoji as icons.** Slack *does* ship real emoji in UI — in reactions, in channel empty states, and as purposeful decoration next to CTAs. Use the Unicode glyph, not a custom image, and keep usage sparing (one per context, never stacked).

**No icon font**, no FontAwesome. SVG only, inline where possible.

---

See `SKILL.md` for how to load this system into Claude Code.
