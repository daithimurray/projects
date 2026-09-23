SearchField, rounded search input for the archive; shows ⌘K hint when empty, × when filled.

```jsx
<SearchField value={q} onChange={e => setQ(e.target.value)} onClear={() => setQ("")} shortcut="⌘K" />
```
