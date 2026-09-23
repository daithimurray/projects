import React from "react";
export function Avatar({ name = "", src, size = 40, tone = "brand", style }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  return <span role="img" aria-label={name} style={{ width: size, height: size, flex: "none", borderRadius: "50%", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", background: tone === "brand" ? "var(--surface-brand-subtle)" : "var(--surface-muted)", color: tone === "brand" ? "var(--text-brand)" : "var(--text-secondary)", fontWeight: 600, fontSize: Math.round(size * 0.38), letterSpacing: "-0.01em", border: "1px solid var(--border-subtle)", ...style }}>
    {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
  </span>;
}
