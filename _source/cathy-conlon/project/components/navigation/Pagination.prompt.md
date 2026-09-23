Pagination, numbered with collapsing ellipses, or simple Newer / Older.

```jsx
<Pagination page={4} total={12} hrefFor={p => `/poetry?page=${p}`} />
<Pagination variant="simple" page={2} total={9} onChange={setPage} />
```
