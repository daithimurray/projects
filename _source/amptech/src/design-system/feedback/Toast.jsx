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

export function Toast({ title, description, tone: t = "neutral", action, onDismiss, style }) {
  const c = TONE[t] || TONE.neutral;
  return <div role="status" style={{ display: "flex", gap: 12, alignItems: "flex-start", width: 360, maxWidth: "100%", padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--surface-inverse)", color: "var(--text-inverse)", boxShadow: "var(--shadow-lg)", ...style }}>
    <Icon name={c.icon} size={20} style={{ color: t === "neutral" ? "var(--stone-300)" : t === "danger" ? "#F5AFAA" : t === "success" ? "#9BDDB6" : t === "warning" ? "#F3CF8F" : "#B5D0F3", marginTop: 1 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 600, fontSize: "var(--text-body-sm)" }}>{title}</div>
      {description && <div style={{ fontSize: "var(--text-body-sm)", opacity: 0.75, marginTop: 2 }}>{description}</div>}
    </div>
    {action && <button type="button" onClick={action.onClick} style={{ background: "none", border: "none", color: "var(--navy-200)", fontFamily: "inherit", fontWeight: 600, fontSize: "var(--text-body-sm)", cursor: "pointer", padding: 0 }}>{action.label}</button>}
    {onDismiss && <button type="button" aria-label="Dismiss" onClick={onDismiss} style={{ background: "none", border: "none", color: "inherit", opacity: 0.7, cursor: "pointer", padding: 2, margin: -2, display: "inline-flex" }}><Icon name="x" size={16} /></button>}
  </div>;
}
