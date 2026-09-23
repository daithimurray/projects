# Developer guide

## Install
1. Copy `tokens/`, `components/`, and `styles.css` into your project (or consume the compiled bundle).
2. Link one stylesheet: `<link rel="stylesheet" href="/styles.css">`. It `@import`s fonts, tokens, base resets and component CSS. Nothing else is required.
3. Fonts load from Google Fonts (`tokens/fonts.css`). For self-hosting, download Cormorant Garamond, Newsreader, Instrument Sans and JetBrains Mono, write `@font-face` rules in `tokens/fonts.css`, and keep the family names.

## Theming
```html
<html data-theme="dark">  <!-- or omit to follow prefers-color-scheme -->
```
```js
const saved = localStorage.theme;                 // "light" | "dark" | undefined
if (saved) document.documentElement.dataset.theme = saved;
function setTheme(t){ document.documentElement.dataset.theme = t; localStorage.theme = t; }
```
All component CSS reads semantic aliases (`--bg`, `--fg`, `--accent`…), so theming is automatic. Never reference primitives (`--paper-0`, `--sienna-500`) in product code.

## Using components (React)
```jsx
import { Button } from "./components/actions/Button.jsx";
import { PoemBlock } from "./components/content/PoemBlock.jsx";
```
Each component is a single file with no dependencies beyond React 18. Props are documented in the sibling `.d.ts`; usage in `.prompt.md`. Every component forwards `className` and rest props to its root.

### Without React
Every component is a thin wrapper over CSS classes. Use the markup directly:
```html
<button class="ih-btn ih-btn--secondary ih-btn--sm">Reserve a seat</button>
<span class="ih-badge ih-badge--accent">New</span>
<article class="ih-poem">…<p class="ih-poem__stanza"><span class="ih-poem__line">…</span></p></article>
```
Class contract: `ih-{block}`, `ih-{block}__{element}`, `ih-{block}--{modifier}`. States use native attributes (`disabled`, `aria-selected`, `aria-current`, `aria-invalid`, `aria-checked`, `data-loading`).

## Type utilities
`.type-display .type-headline .type-title1 .type-title2 .type-title3 .type-bodylg .type-body .type-label .type-caption .type-overline .type-mono` plus `.text-muted .text-subtle .text-accent .visually-hidden`.

## Layout
```html
<div class="ih-container">            <!-- 1200 max, fluid margins -->
  <div class="ih-grid ih-grid--rows"> <!-- 12 columns, system gutter -->
    <div style="grid-column: span 3">…</div>
  </div>
</div>
<div class="ih-container ih-container--reading">…prose…</div>
```
Breakpoints are content-driven; write them in page CSS using the tokens in `tokens/layout.css` (`40em / 48em / 64em / 80em`).

## Tokens in other tools
`tokens/tokens.json` follows the W3C Design Tokens format (`$value`/`$type`, alias references in braces). Feed it to Style Dictionary, Tokens Studio, or Figma variables importers. CSS is the source of truth; regenerate JSON when CSS changes.

## Adding a component
1. `components/<group>/<Name>.jsx`, `export function Name(props)`; classes only, tokens only.
2. `<Name>.d.ts`, props interface with JSDoc; add `@startingPoint` if it's a good seed.
3. `<Name>.prompt.md`, one line what/when, a JSX example, variants.
4. Styles in `components/components.css` under a `/* Name */` comment.
5. Add states to the group's `*.card.html`.

## Quality gates
- Contrast card shows green for every pair in both themes.
- Keyboard walk: every interactive element reachable, ring visible, Esc closes overlays.
- `prefers-reduced-motion` → nothing moves.
- Lighthouse a11y 100 on Home, Poem, Contact.
