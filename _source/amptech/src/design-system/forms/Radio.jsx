import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Radio({ name, options = [], value, defaultValue, direction = "column", disabled = false, onChange, style }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  return <div role="radiogroup" style={{ display: "flex", flexDirection: direction, gap: direction === "row" ? 24 : 12, flexWrap: "wrap", ...style }}>
    {options.map(o => <RadioItem key={o.value} name={name} option={o} selected={current === o.value} disabled={disabled || o.disabled} onSelect={() => { setInternal(o.value); onChange && onChange(o.value); }} />)}
  </div>;
}
function RadioItem({ name, option, selected, disabled, onSelect }) {
  const it = useInteractive(disabled);
  return <label {...it.handlers} style={{ display: "inline-flex", gap: 10, alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", color: disabled ? "var(--text-disabled)" : "var(--text-primary)" }}>
    <span style={{ position: "relative", width: 20, height: 20, flex: "none", marginTop: 2 }}>
      <input type="radio" name={name} value={option.value} checked={selected} disabled={disabled} onChange={onSelect} style={{ position: "absolute", inset: 0, opacity: 0, margin: 0, cursor: "inherit" }} />
      <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", background: disabled ? "var(--action-disabled-bg)" : "var(--surface-default)", display: "flex", alignItems: "center", justifyContent: "center",
        border: (selected ? "6px" : "1.5px") + " solid " + (selected && !disabled ? "var(--action-primary)" : selected ? "var(--stone-300)" : it.hover ? "var(--border-strong)" : "var(--border-default)"),
        boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition("border-width, border-color, box-shadow") }} />
    </span>
    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ lineHeight: 1.5 }}>{option.label}</span>
      {option.description && <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{option.description}</span>}
    </span>
  </label>;
}
