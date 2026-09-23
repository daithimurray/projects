import React from "react";
export function Divider({ label, spacing = 24, vertical = false, style }) {
  if (vertical) return <span role="separator" aria-orientation="vertical" style={{ width: 1, alignSelf: "stretch", background: "var(--border-default)", margin: "0 " + spacing / 2 + "px", ...style }} />;
  if (!label) return <hr style={{ border: "none", height: 1, background: "var(--border-default)", margin: spacing + "px 0", ...style }} />;
  return <div role="separator" style={{ display: "flex", alignItems: "center", gap: 12, margin: spacing + "px 0", color: "var(--text-tertiary)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", ...style }}><span style={{ flex: 1, height: 1, background: "var(--border-default)" }} />{label}<span style={{ flex: 1, height: 1, background: "var(--border-default)" }} /></div>;
}
