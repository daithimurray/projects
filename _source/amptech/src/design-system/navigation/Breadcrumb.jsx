import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Breadcrumb({ items = [], style }) {
  return <nav aria-label="Breadcrumb" style={style}><ol style={{ display: "flex", alignItems: "center", gap: 6, listStyle: "none", margin: 0, padding: 0, fontSize: "var(--text-body-sm)", flexWrap: "wrap" }}>
    {items.map((it, i) => { const last = i === items.length - 1; return <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {last ? <span aria-current="page" style={{ color: "var(--text-primary)", fontWeight: 600 }}>{it.label}</span> : <Crumb {...it} />}
      {!last && <Icon name="chevron-right" size={14} style={{ color: "var(--text-tertiary)" }} />}
    </li>; })}
  </ol></nav>;
}
function Crumb({ label, href }) { const it = useInteractive(false); return <a href={href} {...it.handlers} style={{ color: it.hover ? "var(--text-primary)" : "var(--text-secondary)", textDecoration: it.hover ? "underline" : "none", borderRadius: 2, outline: "none", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition("color") }}>{label}</a>; }
