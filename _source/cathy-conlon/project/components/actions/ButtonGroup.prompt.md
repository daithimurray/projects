ButtonGroup, spaces related buttons (8px gap) or fuses them into a segmented control.

```jsx
<ButtonGroup>
  <Button>Save</Button>
  <Button variant="tertiary">Cancel</Button>
</ButtonGroup>
<ButtonGroup attached label="Sort">
  <Button variant="secondary" size="sm">Newest</Button>
  <Button variant="secondary" size="sm">A–Z</Button>
</ButtonGroup>
```
Primary action goes first (leftmost); dialogs use `align="end"`.
