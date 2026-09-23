Dialog, centred paper panel on a warm scrim; rises 16px on open.

```jsx
<Dialog open={open} onClose={close} title="Leave the page?" description="Your message hasn't been sent."
  footer={<><Button variant="tertiary" onClick={close}>Stay</Button><Button variant="danger" onClick={leave}>Discard</Button></>} />
```
Title is a question or a noun phrase, ≤ 6 words. Buttons name the outcome, never "OK".
