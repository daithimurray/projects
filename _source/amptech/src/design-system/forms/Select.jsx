import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";
const box = (it, { invalid, disabled, size }) => ({
  width: "100%", height: size === "sm" ? 36 : 44, padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
  background: disabled ? "var(--surface-muted)" : "var(--surface-default)", borderRadius: "var(--radius-md)", outline: "none",
  border: "1px solid " + (invalid ? "var(--status-danger)" : it.focus ? "var(--border-focus)" : it.hover ? "var(--border-strong)" : "var(--border-default)"),
  boxShadow: it.focus ? (invalid ? "0 0 0 3px var(--status-danger-bg)" : "0 0 0 3px var(--navy-100)") : "none", ...transition("border-color, box-shadow"),
});
export function Select({ id, value, defaultValue, options = [], placeholder, invalid = false, disabled = false, size = "md", onChange, style, ...rest }) {
  const it = useInteractive(disabled);
  return <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
    <select id={id} value={value} defaultValue={defaultValue ?? (placeholder && value === undefined ? "" : undefined)} disabled={disabled} aria-invalid={invalid || undefined} onChange={onChange} {...it.handlers} {...rest}
      style={{ ...box(it, { invalid, disabled, size }), appearance: "none", WebkitAppearance: "none", paddingRight: 40, cursor: disabled ? "not-allowed" : "pointer", ...style }}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
    </select>
    <Icon name="chevron-down" size={18} style={{ position: "absolute", right: 12, color: "var(--text-tertiary)", pointerEvents: "none" }} />
  </div>;
}
