Drawer, 26rem side sheet sliding in over a scrim; bottom sheet on mobile.

```jsx
<Drawer open={open} onClose={close} title="Filter poems" footer={<Button block onClick={close}>Show 24 poems</Button>}>
  <TagList>…</TagList>
</Drawer>
```
