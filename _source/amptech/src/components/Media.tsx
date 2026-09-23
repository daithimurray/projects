import type { CSSProperties } from "react";

type MediaProps = { label?: string; ratio?: string; radius?: number; style?: CSSProperties };

/** Striped placeholder for installation photography. Swap for <img> once real photos exist (cool-neutral grade, radius 16–24). */
export function Media({ label = "installation photo", ratio = "4/5", radius = 24, style }: MediaProps) {
  return (
    <div role="img" aria-label={"Placeholder: " + label} style={{ aspectRatio: ratio, borderRadius: radius, background: "repeating-linear-gradient(135deg, var(--stone-100) 0 12px, var(--stone-50) 12px 24px)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      <span style={{ font: "500 11px var(--font-mono)", color: "var(--text-tertiary)", background: "var(--surface-default)", padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border-default)" }}>{label}</span>
    </div>
  );
}
