import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function SegmentedControl({ options = [], value, defaultValue, size = "md", fullWidth = false, onChange, style }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && (options[0].value ?? options[0])));
  const current = value ?? internal;
  const h = size === "sm" ? 32 : 40;
  return <div role="tablist" style={{ display: fullWidth ? "grid" : "inline-grid", gridTemplateColumns: "repeat(" + options.length + ", 1fr)", gap: 2, padding: 2, background: "var(--surface-muted)", borderRadius: "var(--radius-md)", ...style }}>
    {options.map(o => { const v = o.value ?? o, l = o.label ?? o, sel = current === v; return <Seg key={v} h={h} label={l} icon={o.icon} selected={sel} onSelect={() => { setInternal(v); onChange && onChange(v); }} />; })}
  </div>;
}
function Seg({ h, label, icon, selected, onSelect }) {
  const it = useInteractive(false);
  return <button type="button" role="tab" aria-selected={selected} onClick={onSelect} {...it.handlers}
    style={{ height: h - 4, padding: "0 14px", border: "none", borderRadius: "calc(var(--radius-md) - 2px)", fontFamily: "inherit", fontSize: "var(--text-body-sm)", fontWeight: 600, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", outline: "none",
      background: selected ? "var(--surface-default)" : it.hover ? "rgba(6,23,41,0.04)" : "transparent", color: selected ? "var(--text-primary)" : "var(--text-secondary)", boxShadow: selected ? "var(--shadow-xs)" : it.focus ? "var(--focus-ring)" : "none", ...transition() }}>
    {icon && <Icon name={icon} size={16} />}{label}
  </button>;
}
