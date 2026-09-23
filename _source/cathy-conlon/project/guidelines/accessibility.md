# Accessibility

Target: WCAG 2.2 AA throughout, AAA for body-text contrast.

## Colour & contrast
- `--fg` on `--bg`: 15.4:1 light · 14.9:1 dark.
- `--fg-muted` on `--bg`: ≥ 5:1 both themes, safe for captions at 13px.
- `--fg-subtle`: ≈ 3:1, decorative or ≥ 24px only.
- Accent buttons: `--accent-fg` on `--accent` ≥ 5.5:1.
- Never convey state by colour alone: badges carry words, links carry underlines, errors carry "!" glyph + text.
- Live ratios: `guidelines/colors-contrast.html`.

## Typography
- Root font size untouched; all sizes in rem; fluid sizes clamp between accessible minimums (17px prose, 13px UI) and maxima.
- Reflows to 320px CSS width and 400% zoom without horizontal scroll (reading measure is `min(38rem, 100%)` in practice through container padding).
- Verse uses `<p>` per stanza and `<span display:block>` per line so screen readers pause at stanzas, not lines.

## Keyboard
- Focus ring: 2px sienna, 2px offset, on `:focus-visible` for every interactive element, never removed.
- SkipLink is the first tab stop on every page.
- Tabs: roving tabindex, ←/→ move, Home/End optional.
- Menu: ↑/↓ move, Esc closes, click-outside closes, focus returns to trigger.
- Dialog/Drawer: focus moves in on open, Esc closes, focus restored on close; `aria-modal`, body scroll locked.
- Switch is a `<button role="switch">` with `aria-checked`; Space/Enter toggle.

## Semantics
- One `<h1>`; sections use `aria-labelledby` on their title.
- `<nav aria-label>` for Primary, Breadcrumb, Pagination.
- Form fields: `<label for>`, `aria-describedby` → help + error, `aria-invalid`, error text with `role=alert`.
- IconButton requires `label` (aria-label + title).
- Images: `alt` required; decorative → `alt=""`. Book covers: "Cover of {title}".
- Toast: `role=status` `aria-live=polite`. Alert (error/warning): `role=alert`.

## Motion & media
- `prefers-reduced-motion`: all durations → 0.01ms, shimmer stops.
- No autoplay, no parallax, no scroll-jacking.

## Touch
- Minimum target 44×44 (`--control-h-md`); small controls (32px) only in dense desktop UI with 8px spacing.
- Whole label rows are hit targets for Checkbox/Radio/Switch.
