TextArea, vertical-resize multi-line field; serif mode for messages and submissions.

```jsx
<TextArea id="msg" label="Message" serif rows={6} help="Readings, rights, or just to say hello." />
<TextArea id="bio" label="Short bio" maxLength={280} value={bio} onChange={e => setBio(e.target.value)} />
```
