Toast, inverse-ink pill rising from the bottom; one at a time.

```jsx
<ToastRegion>
  <Toast tone="success" message="Link copied" onDismiss={close} />
  <Toast message="Poem removed from favourites" action="Undo" onAction={undo} />
</ToastRegion>
```
Max one line of copy. Never for errors that need reading, use Alert.
