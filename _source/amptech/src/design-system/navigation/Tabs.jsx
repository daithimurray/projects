import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Tabs({ items = [], value, defaultValue, onChange, style, children }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].value));
  const current = value ?? internal;
  return <div style={style}>
    <div role="tablist" style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--border-default)" }}>
      {items.map(t => <Tab key={t.value} {...t} selected={current === t.value} onSelect={() => { setInternal(t.value); onChange && onChange(t.value); }} />)}
    </div>
    {typeof children === "function" ? children(current) : children}
  </div>;
}
function Tab({ value, label, icon, count, selected, onSelect }) {
  const it = useInteractive(false);
  return <button type="button" role="tab" aria-selected={selected} onClick={onSelect} {...it.handlers}
    style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 4px", marginRight: 16, marginBottom: -1, border: "none", background: "none", fontFamily: "inherit", fontSize: "var(--text-body)", fontWeight: 600, cursor: "pointer", outline: "none", borderRadius: "var(--radius-xs)",
      color: selected ? "var(--text-primary)" : it.hover ? "var(--text-primary)" : "var(--text-secondary)", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition("color") }}>
    {icon && <Icon name={icon} size={18} />}{label}
    {count != null && <span style={{ fontSize: 12, fontWeight: 600, padding: "1px 6px", borderRadius: 999, background: "var(--surface-muted)", color: "var(--text-secondary)" }}>{count}</span>}
    <span aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: selected ? "var(--action-primary)" : "transparent", borderRadius: 1, ...transition("background-color") }} />
  </button>;
}
