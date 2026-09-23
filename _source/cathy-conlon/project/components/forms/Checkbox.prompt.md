Checkbox, 20px box, ink-filled when checked, checkmark springs in.

```jsx
<Checkbox id="consent" label="Send me the monthly letter" description="Unsubscribe any time." checked={on} onChange={e => setOn(e.target.checked)} />
<Checkbox id="all" label="Select all" indeterminate />
```
Label text is a statement, not a question. Whole label row is the hit target.
