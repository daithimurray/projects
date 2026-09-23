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

export function Badge({ children, tone: t = "neutral", dot = false, size = "md", style }) {
  const c = TONE[t] || TONE.neutral;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: size === "sm" ? 20 : 24, padding: size === "sm" ? "0 6px" : "0 8px", borderRadius: "var(--radius-xs)", background: c.bg, color: c.fg, fontSize: size === "sm" ? 11 : "var(--text-caption)", fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap", ...style }}>
    {dot && <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />}{children}
  </span>;
}
