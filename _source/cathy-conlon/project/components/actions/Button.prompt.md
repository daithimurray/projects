Button, the system's call to action; ink-filled primary, hairline secondary, text-only tertiary, sienna accent for the single commercial action on a page.

```jsx
<Button variant="primary">Read the poem</Button>
<Button variant="secondary" iconEnd="→">All events</Button>
<Button variant="accent" size="lg" href="/books/the-light-dancing">Buy the book</Button>
```

- variants: primary · secondary · tertiary · accent · danger · link
- sizes: sm (32) · md (44, default) · lg (52); `block` for full width
- states: hover (warms to sienna), active (1px press), focus-visible (2px sienna ring, 2px offset), disabled (40% opacity), loading (spinner, label hidden, width kept)
- Labels are verbs in sentence case, ≤ 3 words. Never uppercase. No icon-only buttons, use IconButton.
