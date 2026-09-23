Container / Grid / Col, the 12-column layout primitives.

```jsx
<Container>
  <Grid rows>
    <Col span={12} style={{gridColumn:"span 12"}}>…</Col>
    <Col span={3}><BookCard … /></Col>
  </Grid>
</Container>
<Container width="reading"><PoemBlock … /></Container>
```
Text always lives in a reading container. Grids: 12 → 6 → 4 → 3 columns as width grows; use media queries in page CSS for the breakpoints.
