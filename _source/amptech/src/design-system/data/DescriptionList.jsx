import React from "react";
export function DescriptionList({ items = [], columns = 1, style }) {
  return <dl style={{ display: "grid", gridTemplateColumns: "repeat(" + columns + ", minmax(0,1fr))", gap: "16px 32px", margin: 0, ...style }}>
    {items.map((it, i) => <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
      <dt style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{it.term}</dt>
      <dd style={{ margin: 0, fontSize: "var(--text-body)", color: "var(--text-primary)", fontFamily: it.mono ? "var(--font-mono)" : "inherit", fontWeight: it.mono ? 500 : 400 }}>{it.detail}</dd>
    </div>)}
  </dl>;
}
