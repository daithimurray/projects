import React from "react";
export function ProgressBar({ value = 0, max = 100, label, showValue = false, tone = "brand", size = "md", style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === "success" ? "var(--status-success)" : tone === "warning" ? "var(--status-warning)" : tone === "danger" ? "var(--status-danger)" : "var(--action-primary)";
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
    {(label || showValue) && <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-body-sm)" }}><span style={{ fontWeight: 500 }}>{label}</span>{showValue && <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{Math.round(pct)}%</span>}</div>}
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label} style={{ height: size === "sm" ? 4 : 8, background: "var(--surface-muted)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100%", background: fill, borderRadius: 999, transform: "scaleX(" + pct / 100 + ")", transformOrigin: "left", transition: "transform var(--duration-slow) var(--ease-standard)" }} />
    </div>
  </div>;
}
