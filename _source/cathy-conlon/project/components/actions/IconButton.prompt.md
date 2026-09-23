IconButton, a labelled 44px square for a single glyph (close, menu, share, bookmark).

```jsx
<IconButton label="Close">×</IconButton>
<IconButton label="Menu" variant="outline">☰</IconButton>
<IconButton label="Save poem" pressed={saved} onClick={toggle}>♡</IconButton>
```

- `label` is mandatory and doubles as the tooltip.
- `pressed` renders the toggle state (ink fill).
- Prefer typographic glyphs; fall back to 1.5px-stroke line icons.
