import React from "react";
export function Spinner({ size = 20, label = "Loading", color = "var(--action-primary)", style }) {
  return <span role="status" aria-label={label} style={{ display: "inline-flex", ...style }}>
    <span style={{ width: size, height: size, border: Math.max(2, size / 10) + "px solid var(--surface-muted)", borderTopColor: color, borderRadius: "50%", animation: "amptech-spin 0.8s linear infinite" }} />
    <style>{"@keyframes amptech-spin{to{transform:rotate(360deg)}}"}</style>
  </span>;
}
