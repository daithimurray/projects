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

export function StatusDot({ status = "neutral", label, pulse = false, size = 8, style }) {
  const c = TONE[status] || TONE.neutral;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "var(--text-body-sm)", color: "var(--text-secondary)", ...style }}>
    <span aria-hidden style={{ position: "relative", width: size, height: size, flex: "none" }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: c.dot }} />
      {pulse && <span style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid " + c.dot, opacity: 0.5, animation: "amptech-pulse 1.8s var(--ease-standard) infinite" }} />}
    </span>
    {label && <span>{label}</span>}
    {!label && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{status}</span>}
  </span>;
}
