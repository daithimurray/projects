TextField, labelled single-line input; error state turns the border madder and announces the message.

```jsx
<TextField id="email" type="email" label="Email" help="One letter a month. No noise." placeholder="you@example.com" />
<TextField id="name" label="Name" error="Please tell us what to call you." />
<TextField id="handle" label="Instagram" optional prefix="@" />
```
Labels sit above the field, sentence case, no colon. Placeholder is an example, never the label.
