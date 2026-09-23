import React from "react";
export function SectionHeader({ eyebrow, title, description, align = "left", level = 2, action, style }) {
  const Tag = "h" + level;
  return <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: align === "center" ? "center" : "flex-start", textAlign: align, maxWidth: align === "center" ? 720 : 640, margin: align === "center" ? "0 auto" : 0, ...style }}>
    {eyebrow && <div style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--text-brand)" }}>{eyebrow}</div>}
    <Tag style={{ margin: 0, fontSize: level === 1 ? "var(--text-h1)" : "var(--text-h2)", fontWeight: 600, lineHeight: "var(--leading-heading)", letterSpacing: "var(--tracking-heading)", textWrap: "balance", color: "var(--text-primary)" }}>{title}</Tag>
    {description && <p style={{ margin: 0, fontSize: "var(--text-body-lg)", color: "var(--text-secondary)", lineHeight: "var(--leading-body)", textWrap: "pretty" }}>{description}</p>}
    {action && <div style={{ marginTop: 4 }}>{action}</div>}
  </div>;
}
