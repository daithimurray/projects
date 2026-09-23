# Patterns

Compositions of components for the site's recurring jobs. Each names the components, the layout, and the rules.

## Single-page site (default structure)
`SkipLink → NavBar (anchor links, aria-current tracks the section in view) → Hero#top → Section#books (sunken) → Section#swift (inverse) → Section#poetry → Section#events (sunken) → Section#about → Section#contact (sunken, with NewsletterSignup) → Footer`
- Alternate paper / sunken / paper so sections read as chapters; one inverse band only.
- Anchor clicks scroll smoothly with a 72px offset for the sticky NavBar; `history.replaceState` keeps URLs shareable.
- Each Section's `id` is its nav anchor; titles remain `<h2>`, the Hero holds the only `<h1>`.

## Page skeleton (multi-page alternative)
`SkipLink → NavBar → main#main (Hero | page head) → Sections → NewsletterSignup → Footer`
- One `<h1>` per page: the Hero title or the PoemBlock title.
- NavBar is sticky and translucent by default; `transparent` only over a full-bleed image.
- NewsletterSignup appears once, near the end, never in the Hero.

## Home
Hero (split: brand line + author headshot) → Section "Books" (sunken) with both books as row BookCards → Section "From the collection" with one PoemBlock in a reading container → Section "Celbridge, 1720" (inverse, once per page) with a heritage Figure linking to the Swift & Vanessa story → Section "News" with PostCards (1 hero + 2 compact) → NewsletterSignup → Footer.

## Swift & Vanessa (story page)
Reading-width eyebrow + headline + lede → full-width heritage Figure (Celbridge Abbey / Castletown House, licensed) → prose in the measure → PullQuote (rule) from the novel → "A note on the name" (Esther Vanhomrigh) → festival link (external) → Divider → accent "Buy the novel" + secondary "Book a reading".

## About / Press kit
Figure (headshot, mono, 4:5) beside prose bio → prizes as a hairline list with a confirmation caption → press-kit TextLinks (short bio, long bio, headshot, covers) → TagList of publications. Mention "Catherine Conlon" once here.

## Poem page
Breadcrumb → PoemBlock (title is h1, meta: collection · publisher · year · first publication) in `Container width="reading"` → Divider (ornament) → note from the author → external TextLinks to where the poem is published (The Milk House, Poethead) → TagList of themes → "More from The Light Dancing" as compact PostCards → Pagination (simple). Poem text is supplied by the author; never scrape it.
- Never place ads, share bars, or sidebars beside verse.
- Menu (··· ) at the top-right of the poem offers Copy link, Share, Large type.

## Poem archive
Page head (headline + lede) → SearchField + Tabs (pills) for collection filter → TagList for themes → list of compact PostCards (title, collection, first line) → Pagination (numbered). EmptyState when filters yield nothing.

## Books
Featured BookCard (row, featured, actions: Buy accent + Read excerpt tertiary) → Divider → grid of BookCards (column, 4-up desktop / 2-up mobile) → PullQuote of press per book on detail pages.
Book detail: Hero-less; BookCard row at top, Tabs (About · Praise · Excerpt), Alert (neutral) for pre-order shipping notes.

## Events
Tabs (Upcoming / Past) → EventCard list (row layout, hairlines) → Badge for sold out → Button secondary "Reserve a seat" on each → EmptyState for no upcoming ("Nothing scheduled yet") with a secondary "Enquire about a reading", since readings are the one service the site offers.

## About / Press kit
Figure (portrait, mono, 4:5) beside prose bio in reading measure → PullQuote (rule) → Section "Press" with downloadable assets as TextLink (external) list → Alert (info) about photo credits.

## Contact
Reading-width form: TextField Name, TextField Email, Select Topic, TextArea Message (serif) → Checkbox consent → Button primary "Send" (block on mobile). Success replaces the form with Alert (success). Errors: field-level messages plus focus moved to the first invalid field.

## Newsletter
NewsletterSignup card/inverse. On submit: loading Button → success state inline (never a redirect). Double opt-in mentioned in fine print.

## Feedback
- Field errors: inline under the field, `role=alert`.
- Form-level: Alert (error) above the form, listing fields as TextLinks to their ids.
- Transient confirmations: Toast, bottom-centre, 5s, one at a time.
- Destructive confirmations: Dialog (sm) with tertiary Cancel + danger action.

## Theming
Toggle via Switch labelled "Candlelight mode" in NavBar actions. Persist to `localStorage.theme`; set `document.documentElement.dataset.theme`. Respect system preference until the user chooses.

## Responsive
- < 768: NavBar collapses to ☰ + Drawer (right); grids drop to 2 (books) / 1 (posts); Buttons in forms become `block`; Dialog becomes bottom Drawer.
- Reading text never changes measure, it only gains margin.
