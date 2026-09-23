import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";
const box = (it, { invalid, disabled, size }) => ({
  width: "100%", height: size === "sm" ? 36 : 44, padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
  background: disabled ? "var(--surface-muted)" : "var(--surface-default)", borderRadius: "var(--radius-md)", outline: "none",
  border: "1px solid " + (invalid ? "var(--status-danger)" : it.focus ? "var(--border-focus)" : it.hover ? "var(--border-strong)" : "var(--border-default)"),
  boxShadow: it.focus ? (invalid ? "0 0 0 3px var(--status-danger-bg)" : "0 0 0 3px var(--navy-100)") : "none", ...transition("border-color, box-shadow"),
});
export function Input({ id, type = "text", value, defaultValue, placeholder, iconLeft, suffix, invalid = false, disabled = false, size = "md", onChange, style, ...rest }) {
  const it = useInteractive(disabled);
  return <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
    {iconLeft && <Icon name={iconLeft} size={18} style={{ position: "absolute", left: 12, color: "var(--text-tertiary)", pointerEvents: "none" }} />}
    <input id={id} type={type} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} aria-invalid={invalid || undefined} onChange={onChange} {...it.handlers} {...rest}
      style={{ ...box(it, { invalid, disabled, size }), paddingLeft: iconLeft ? 40 : 12, paddingRight: suffix ? 44 : 12, ...style }} />
    {suffix && <span style={{ position: "absolute", right: 12, fontSize: "var(--text-body-sm)", color: "var(--text-tertiary)", pointerEvents: "none" }}>{suffix}</span>}
  </div>;
}
