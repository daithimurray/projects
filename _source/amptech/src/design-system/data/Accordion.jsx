import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], style }) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => setOpen(prev => { const n = new Set(allowMultiple ? prev : []); if (prev.has(i)) n.delete(i); else n.add(i); return n; });
  return <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border-default)", ...style }}>
    {items.map((it, i) => <Item key={i} index={i} {...it} open={open.has(i)} onToggle={() => toggle(i)} />)}
  </div>;
}
function Item({ index, title, content, open, onToggle }) {
  const it = useInteractive(false);
  const id = "amptech-acc-" + index;
  return <div style={{ borderBottom: "1px solid var(--border-default)" }}>
    <h3 style={{ margin: 0 }}><button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} {...it.handlers} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 4px", border: "none", background: "none", fontFamily: "inherit", fontSize: "var(--text-body-lg)", fontWeight: 600, letterSpacing: "-0.01em", textAlign: "left", cursor: "pointer", outline: "none", borderRadius: "var(--radius-xs)", color: it.hover ? "var(--text-brand)" : "var(--text-primary)", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition("color") }}>
      <span>{title}</span><Icon name="chevron-down" size={20} style={{ color: "var(--text-tertiary)", transform: open ? "rotate(180deg)" : "none", ...transition("transform") }} />
    </button></h3>
    <div id={id} hidden={!open} style={{ padding: "0 4px 20px", color: "var(--text-secondary)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>{content}</div>
  </div>;
}
