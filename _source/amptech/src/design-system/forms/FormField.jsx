import React from "react";
import { Icon } from "../core/Icon.jsx";
export function FormField({ label, htmlFor, hint, error, required = false, optional = false, children, style }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
    {label && <label htmlFor={htmlFor} style={{ fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--text-primary)", display: "flex", gap: 6, alignItems: "baseline" }}>
      <span>{label}</span>{required && <span aria-hidden style={{ color: "var(--text-brand)" }}>*</span>}{optional && <span style={{ fontWeight: 400, color: "var(--text-tertiary)" }}>Optional</span>}
    </label>}
    {children}
    {error ? <div role="alert" style={{ display: "flex", gap: 6, alignItems: "center", fontSize: "var(--text-body-sm)", color: "var(--status-danger-strong)" }}><Icon name="alert-circle" size={16} />{error}</div>
      : hint ? <div style={{ fontSize: "var(--text-body-sm)", color: "var(--text-tertiary)" }}>{hint}</div> : null}
  </div>;
}
