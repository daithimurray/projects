import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Switch({ id, label, description, checked, defaultChecked = false, disabled = false, size = "md", onChange, style }) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = checked ?? internal;
  const it = useInteractive(disabled);
  const w = size === "sm" ? 36 : 44, h = size === "sm" ? 20 : 24, k = h - 4;
  const toggle = () => { if (disabled) return; const v = !on; setInternal(v); onChange && onChange(v); };
  return <label htmlFor={id} {...it.handlers} style={{ display: "inline-flex", gap: 12, alignItems: "center", justifyContent: "space-between", cursor: disabled ? "not-allowed" : "pointer", ...style }}>
    {(label || description) && <span style={{ display: "flex", flexDirection: "column", gap: 2, color: disabled ? "var(--text-disabled)" : "var(--text-primary)" }}>
      <span style={{ fontWeight: 500 }}>{label}</span>{description && <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{description}</span>}
    </span>}
    <button id={id} type="button" role="switch" aria-checked={on} disabled={disabled} onClick={toggle}
      style={{ position: "relative", width: w, height: h, flex: "none", borderRadius: 999, border: "none", padding: 0, cursor: "inherit", outline: "none",
        background: disabled ? "var(--action-disabled-bg)" : on ? "var(--action-primary)" : it.hover ? "var(--stone-400)" : "var(--stone-300)", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition() }}>
      <span aria-hidden style={{ position: "absolute", top: 2, left: on ? w - k - 2 : 2, width: k, height: k, borderRadius: "50%", background: "#fff", boxShadow: "var(--shadow-xs)", ...transition("left") }} />
    </button>
  </label>;
}
