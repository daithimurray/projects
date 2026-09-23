import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function TrustBar({ items = [], label, style }) {
  return <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 40px", padding: "20px 0", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", ...style }}>
    {label && <span style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-tertiary)" }}>{label}</span>}
    {items.map(it => <span key={it.label} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--text-secondary)", fontSize: "var(--text-body-sm)", fontWeight: 500 }}>
      {it.logo ? <span style={{ height: 28, display: "flex", alignItems: "center" }}>{it.logo}</span> : <Icon name={it.icon || "shield-check"} size={20} style={{ color: "var(--text-brand)" }} />}
      <span>{it.label}{it.detail && <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}> · {it.detail}</span>}</span>
    </span>)}
  </div>;
}
