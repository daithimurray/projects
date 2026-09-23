import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";
const box = (it, { invalid, disabled, size }) => ({
  width: "100%", height: size === "sm" ? 36 : 44, padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
  background: disabled ? "var(--surface-muted)" : "var(--surface-default)", borderRadius: "var(--radius-md)", outline: "none",
  border: "1px solid " + (invalid ? "var(--status-danger)" : it.focus ? "var(--border-focus)" : it.hover ? "var(--border-strong)" : "var(--border-default)"),
  boxShadow: it.focus ? (invalid ? "0 0 0 3px var(--status-danger-bg)" : "var(--focus-ring)") : "none", ...transition("border-color, box-shadow"),
});
export function Textarea({ id, value, defaultValue, placeholder, rows = 4, invalid = false, disabled = false, onChange, style, ...rest }) {
  const it = useInteractive(disabled);
  return <textarea id={id} rows={rows} value={value} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} aria-invalid={invalid || undefined} onChange={onChange} {...it.handlers} {...rest}
    style={{ ...box(it, { invalid, disabled }), height: "auto", padding: "10px 12px", lineHeight: "var(--leading-body)", resize: "vertical", minHeight: 88, ...style }} />;
}
