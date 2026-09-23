import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";
const TONE = {
  neutral: { bg: "var(--surface-muted)", fg: "var(--text-secondary)", dot: "var(--stone-400)", icon: "info" },
  brand:   { bg: "var(--surface-brand-subtle)", fg: "var(--text-brand)", dot: "var(--navy-500)", icon: "info" },
  success: { bg: "var(--status-success-bg)", fg: "var(--status-success-strong)", dot: "var(--status-success)", icon: "check-circle" },
  warning: { bg: "var(--status-warning-bg)", fg: "var(--status-warning-strong)", dot: "var(--status-warning)", icon: "alert-triangle" },
  danger:  { bg: "var(--status-danger-bg)", fg: "var(--status-danger-strong)", dot: "var(--status-danger)", icon: "alert-circle" },
  info:    { bg: "var(--status-info-bg)", fg: "var(--status-info-strong)", dot: "var(--status-info)", icon: "info" },
};

export function Alert({ title, children, tone: t = "info", action, dismissible = false, onDismiss, style }) {
  const c = TONE[t] || TONE.info;
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return <div role={t === "danger" || t === "warning" ? "alert" : "status"} style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: "var(--radius-md)", background: c.bg, color: c.fg, border: "1px solid transparent", ...style }}>
    <Icon name={c.icon} size={20} style={{ marginTop: 1, color: c.dot }} />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      {title && <div style={{ fontWeight: 600, fontSize: "var(--text-body)" }}>{title}</div>}
      {children && <div style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5, opacity: 0.92 }}>{children}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
    {dismissible && <button type="button" aria-label="Dismiss" onClick={() => { setOpen(false); onDismiss && onDismiss(); }} style={{ background: "none", border: "none", padding: 4, margin: -4, cursor: "pointer", color: "inherit", borderRadius: "var(--radius-xs)", display: "inline-flex", alignSelf: "flex-start" }}><Icon name="x" size={18} /></button>}
  </div>;
}
