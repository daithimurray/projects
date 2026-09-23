# Cathy Conlon Design System

A design system for the author website of **Cathy Conlon**, Irish writer (poetry, short fiction, radio drama, novels) based in Celbridge, Co. Kildare. She has no website today; this system is the foundation for the first canonical home for her name, her two books, and her connection to the Swift & Vanessa story in Celbridge.

**Product:** one, the author website (home, books, Swift & Vanessa, poetry, events, about/press kit, contact, newsletter).
**Source:** `uploads/cathy-conlon-dossier.md` (research dossier, 23 Sep 2026). No Figma, codebase, logo, headshot or cover files were supplied. Visual direction from the brief: *quiet and literary: warm paper, ink, generous whitespace.*

## The author, in brief (from the dossier)
- **Books:** *The Light Dancing*, debut poetry collection, Revival Press, 2025. *Swift, Vanessa & The Sluttery*, historical novel, Savoy Editions, launched 10 May 2026 at Barberstown Castle Hotel, Straffan, by poet Ger Duffy. Both imprints belong to the Limerick Writers' Centre. Novel sold via Buythebook.ie at €20.
- **Themes:** poetry of father, farm life, memory, grief, family; the novel reclaims Esther Vanhomrigh ("Vanessa") as Swift's intellectual equal, set in 18th-century London, Dublin and Kildare.
- **Heritage hook:** Swift visited Vanessa at Celbridge Abbey in 1720; Celbridge hosts a Swift & Vanessa Festival (she read at Castletown House, 17 July 2026).
- **Proof points (reported, to confirm):** Poems for Patience 2023 winner; Waterford Poetry Prize 2020 second; PENfro First Chapter 2016 joint winner; RTÉ P.J. O'Connor shortlist; Trim 2020 and Bangor 2019 shortlists. Poems in The Irish Times, Poetry Ireland Review, Books Ireland, Cúirt Journal, Ropes, Skylight 47.
- **Online:** X @cat_conlon; poems at The Milk House (2023) and Poethead (2016, as Catherine Conlon).

## Editorial decisions baked into this system
- **Name:** "Cathy Conlon" everywhere; "Catherine Conlon" mentioned once, in About. Consistency matters; several other Conlons (Caitlin, Catherine, Evelyn, Marita Conlon-McKenna) compete in search.
- **Heroine spelling:** *Esther Vanhomrigh* (standard historical spelling).
- **Competition name:** "Poems for Patience" (not "Poetry for Patience").
- **Brand line (proposed, test with author):** "Memory, place, and the women history overlooked." It covers both the poet and the novelist.
- **Poem text is never reproduced** in this system. PoemBlock shows setting-only specimens; the kit's poem page links to where poems are published. The author supplies final text.
- **Reported claims are labelled** in the kit (prize list carries a confirmation note; publisher quote is marked as a paraphrase). Remove the labels only once confirmed.

---

## Index

| Path | What |
|---|---|
| `styles.css` | Single entry; `@import`s everything below |
| `tokens/fonts.css` | Google Fonts import (Cormorant Garamond, Newsreader, Instrument Sans, JetBrains Mono) |
| `tokens/colors.css` | Primitives, semantic aliases, dark theme (`[data-theme=dark]` + `prefers-color-scheme`) |
| `tokens/typography.css` | 3 voices, 9 fluid levels, measures |
| `tokens/spacing.css` | 8px scale + semantic gaps |
| `tokens/layout.css` | 12-col grid, breakpoints, radii, shadows, motion, control sizes |
| `tokens/base.css` | Resets, `.type-*` utilities |
| `tokens/tokens.json` | W3C DTCG token export |
| `components/components.css` | All component styles (`ih-*` classes) |
| `components/<group>/` | 39 React components: `.jsx` + `.d.ts` + `.prompt.md`, one `*.card.html` per group |
| `guidelines/*.html` | 22 foundation specimen cards (Colors · Type · Spacing · Grid · Brand) |
| `guidelines/principles.md` | Principles + voice |
| `guidelines/dos-and-donts.md` | Do's / don'ts |
| `guidelines/patterns.md` | Page and flow patterns |
| `guidelines/accessibility.md` | A11y contract |
| `guidelines/dev-guide.md` | Install, theming, usage, contribution |
| `guidelines/components-index.md` | Component inventory, state model, anatomy conventions |
| `ui_kits/website/` | Single-page site with anchor nav (Books · Swift & Vanessa · Poetry · Events · About · Contact), theme switch; multi-page screens kept as an alternative |
| `SKILL.md` | Agent skill wrapper |

Components: **actions** Button, IconButton, TextLink, ButtonGroup · **forms** TextField, TextArea, Select, Checkbox, Radio/RadioGroup, Switch, SearchField · **navigation** NavBar, Footer, Breadcrumb, Tabs, Pagination, SkipLink · **content** PoemBlock, PullQuote, BookCard, EventCard, PostCard, Byline, Divider, Figure · **feedback** Alert, Toast/ToastRegion, Badge, Tag/TagList, Tooltip, Skeleton, EmptyState · **overlays** Dialog, Drawer, Menu · **layout** Container/Grid/Col, Section, Hero, NewsletterSignup.

---

## Content fundamentals

The site speaks as Cathy, first person singular, to one reader. Plain, warm, exact; Irish English spelling (colour, programme), euro prices, day-first dates.

- **Person:** "I" / "you". Never "we". Third person only in the press bio.
- **Case:** Sentence case everywhere: titles, nav, buttons, badges' source text (badges render uppercase via CSS).
- **Length:** Buttons ≤ 3 words, verbs first ("Reserve a seat", "Read an excerpt"). Ledes ≤ 30 words. Fine print one line.
- **Promise, don't pitch:** say what arrives and when: "A letter from Celbridge. New poems, readings, and news of the novel. A few times a year, no more."
- **Facts over flourish:** publisher, year, venue, price. Where a claim is unconfirmed, say so in a caption rather than drop it.
- **Punctuation:** typographic quotes “ ”; no em dashes anywhere (use a comma, colon, semicolon or a new sentence); en dash for ranges; real ellipsis …. No exclamation marks in UI.
- **Emoji:** never. Unicode glyphs (→ × ☰ ¶ ◆ · · ·) are used *as* icons.
- **Numbers & dates:** old-style figures (`onum`), "14 October 2026", "7 pm".
- **Empty/error states** are gentle and specific: "Nothing here yet" · "That email doesn't look right." · "A line or two is enough."
- **Tags** are lowercase like an index: father, memory, grief, farm.
- **Banned patterns:** no em dashes; no "It's not X, it's Y" contrasts, throat-clearing openers, colon reveals, dramatic fragments, importance puffery ("a testament to"), weasel attribution ("experts agree"), synonym cycling, or fake-profound endings. Full list in `guidelines/principles.md`.

## Visual foundations

**Colour.** Warm paper (`#FBF8F2`) and warm ink (`#1C1917`), never pure white or black. One accent, sienna `#9A4B2E`, used as a *response* (hover warms ink → sienna), a *priority* (the single commercial CTA), or the *author's voice* (eyebrow, quote marks). Four semantic hues (moss, ochre, madder, slate) at equal lightness/chroma, used only for status. Dark mode ("candlelight") is a second designed palette: near-black warm paper, cream ink, sienna lifted to `#D08262`. All text pairs ≥ 4.5:1 in both themes (live proof: `guidelines/colors-contrast.html`).

**Type.** Three voices: Cormorant Garamond (display, light weight, tight tracking, the poet's voice), Newsreader (reading text, poems, 17px+), Instrument Sans (everything the user operates). JetBrains Mono for code/tokens. Nine levels; the top six are fluid via `clamp()` between 360 and 1440px. Measure 38rem for prose, 30rem for verse. Verse: hanging indents on wrapped lines, stanza gap 1.6em, ragged right, never justified, author's line breaks preserved.

**Spacing & layout.** 8px base with a 4px half-step (`--space-1…12`). Sections breathe at a fluid 64–128px. 12-column grid, gutter 16→24, margin 20→64, container 1200. Reading text ignores the grid and lives in a measure. Grids collapse 4 → 3 → 2 (books) and 3 → 2 → 1 (posts).

**Surfaces.** Hairlines before boxes; boxes before shadows; shadows only for things that float (menus, dialogs, drawers, toasts, lifted covers). Radii barely there: 2px chips, 4px controls, 8–12px panels, full for tags/switch/search. Cards are usually not boxed; they are hairline-separated rows. Book covers are 2:3 with a printed-paper inner shadow.

**Backgrounds & imagery.** Flat paper; a sunken paper-1 band or one inverse ink band per page at most. No gradients, no patterns, no illustration. Photography only, desaturated and warmed (`.ih-figure--mono`), quiet subjects: harbours, hands, desks, light. Striped monospace placeholders until real photography exists.

**Motion.** Decelerating, never bouncing. 120ms colour, 200ms UI, 360ms panels, 600ms image zoom. `cubic-bezier(.2, .7, .2, 1)`. Dialogs rise 16px, drawers slide, toasts rise 12px, covers lift 4px. Reduced-motion zeroes everything.

**States.** Hover: ink → sienna (primary), inset paper fill (ghost), darker border (outline), underline colour → current (links). Press: 1px downward translate. Focus: 2px sienna ring, 2px offset; inputs get an ink border + 3px soft sienna halo. Disabled: 40–50% opacity. Selected/current: ink fill or 1px ink/sienna underline.

**Blur & transparency.** Only the sticky NavBar (paper at 88% + 16px blur) and overlay scrims (warm ink at 48%, 4px blur).

## Iconography

No icon set is shipped. The system uses **typographic glyphs as icons** (→ ← ↗ × ☰ ··· ⌕ ✓ ♥ ¶ ◆ · · ·) set in the UI font, which keeps them optically matched to labels and needs no asset pipeline. Every icon-only control carries a text `label` (IconButton). When a glyph won't do (social marks, share sheet), use line icons at 1.5px stroke, 20px, `currentColor`, Lucide is the recommended CDN set (same stroke weight); flag its adoption in this file. No emoji, ever. No logo mark exists: the author's name set in Cormorant 500 is the brand (see `guidelines/brand-wordmark.html`).

## Intentional additions
From-scratch system, so the inventory is authored, not inherited. Domain components beyond the usual primitives: PoemBlock (verse setting), PullQuote, BookCard, EventCard, PostCard, Byline, Hero, Section, NewsletterSignup. Each answers a page pattern in `guidelines/patterns.md`. The kit adds a *Swift & Vanessa* story page because the Celbridge heritage link is the site's strongest differentiator and SEO hook.

## Caveats
- Fonts load from Google Fonts; self-host for production (see dev guide).
- No headshot, cover art, or logo were supplied; striped placeholders throughout. Cover images exist on the publisher's and Buythebook.ie pages but need permission; ask the author for originals.
- No blurbs, reviews or testimonials exist yet; PullQuote slots carry marked placeholders.
- Several prize claims and the novel's ISBN are "reported", not verified; see the dossier §17.
- Poem texts are not included (copyright); the author supplies them.
- Cards and the UI kit compile component sources in-browser via `guidelines/ds-loader.js` (it prefers a compiled bundle namespace when one is loaded); first paint takes a moment.
