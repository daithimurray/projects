import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Stat({ value, label, hint, icon, align = "left", size = "md", style }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: align === "center" ? "center" : "flex-start", textAlign: align, ...style }}>
    {icon && <Icon name={icon} size={24} style={{ color: "var(--text-brand)", marginBottom: 6 }} />}
    <div style={{ fontSize: size === "lg" ? "var(--text-h1)" : "var(--text-h2)", fontWeight: 600, letterSpacing: "var(--tracking-heading)", lineHeight: 1.05, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{value}</div>
    <div style={{ fontSize: "var(--text-body)", fontWeight: 500, color: "var(--text-primary)" }}>{label}</div>
    {hint && <div style={{ fontSize: "var(--text-body-sm)", color: "var(--text-tertiary)" }}>{hint}</div>}
  </div>;
}
