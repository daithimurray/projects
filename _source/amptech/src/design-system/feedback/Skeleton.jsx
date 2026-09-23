import React from "react";
export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-xs)", lines = 1, style }) {
  const rows = Array.from({ length: lines });
  return <div aria-hidden style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}>
    {rows.map((_, i) => <div key={i} style={{ width: lines > 1 && i === lines - 1 ? "60%" : width, height, borderRadius: radius, background: "linear-gradient(90deg, var(--surface-muted) 25%, var(--surface-sunken) 50%, var(--surface-muted) 75%)", backgroundSize: "200% 100%", animation: "amptech-shimmer 1.4s var(--ease-standard) infinite" }} />)}
  </div>;
}
