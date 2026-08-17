# Hedgerow Accounting — website (fictional demo)

Single-page site for **Hedgerow Accounting**, an **entirely fictional**
accountancy practice for farms, food producers and rural businesses, built as
a design demo. Every name, figure and claim is invented — including the
"★ 4.9 · 80+ clients" trust line, the Thomastown office and the contact
details. Nothing here may be reused for a real business without replacing
all of it.

## Design

Based on `../design-reference.md` **#6 "Green Gardener — Editorial Nature"**:
warm cream/ivory background, dark olive + sage palette, serif headings with
generous 1.8 body line-height, the signature **inline decorative marks inside
the hero headline**, horizontal **tab navigation for services**, a centred
italic pull-quote on deep olive, and a dark olive multi-column footer. The
sage tone was darkened from the reference hex for WCAG AA body-text contrast.

The concept is chosen to fit the style: an editorial, seasonal, countryside
practice — third in the set after Liffey Accountancy (navy classic,
multi-page) and Alder & Frost (premium dark, single-page).

## Photography

The image-led site of the three: seven slots covering an asymmetric hero pair,
a photograph for each of the four seasons, and a place image. See
**`IMAGES.md`** for the shot list. The four season images should be sourced as
a set so they read as one year. Every image carries a warm multiply grade to
hold it inside the cream/olive palette. Swap placeholders with
`python3 ../tools/swap-images.py hedgerow-accounting <your-image-dir>`.

## Structure

- `index.html` — the whole site: markup, inline CSS and one small script for
  the accessible tabs (arrow keys, `aria-selected`, roving tabindex).
  **Without JavaScript the tablist is hidden and all four panels render
  stacked**, so nothing is lost. System fonts only; the botanical hero marks
  are tiny inline SVGs, so the page makes zero network requests.
- `robots.txt` — `Disallow: /` because a fictional business should never be
  indexed.

## Accessibility

Skip link, semantic landmarks, single H1, visible focus styles, AA-checked
contrast (olive/sage on cream, cream on deep olive), decorative SVG marks
`aria-hidden`, keyboard-operable tabs with a no-JS fallback.
