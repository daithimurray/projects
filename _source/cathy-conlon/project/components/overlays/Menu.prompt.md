Menu, raised paper list with hairline border; 14rem min.

```jsx
<Menu align="end" trigger={<IconButton label="More">···</IconButton>} items={[
  { label: "Copy link", hint: "⌘C", onSelect: copy },
  { label: "Share…", onSelect: share },
  { type: "separator" },
  { label: "Report a typo", danger: true, onSelect: report },
]} />
```
