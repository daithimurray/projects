import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function EmptyState({ icon = "search", title, description, action, compact = false, style }) {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8, padding: compact ? 24 : 48, border: "1px dashed var(--border-default)", borderRadius: "var(--radius-lg)", background: "var(--surface-sunken)", ...style }}>
    <span style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--surface-default)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", marginBottom: 4 }}><Icon name={icon} size={22} /></span>
    <div style={{ fontWeight: 600, fontSize: "var(--text-h4)", letterSpacing: "-0.01em" }}>{title}</div>
    {description && <div style={{ color: "var(--text-secondary)", fontSize: "var(--text-body-sm)", maxWidth: 360 }}>{description}</div>}
    {action && <div style={{ marginTop: 12 }}>{action}</div>}
  </div>;
}
