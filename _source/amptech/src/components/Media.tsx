import type { CSSProperties } from "react";

type MediaProps = { label?: string; ratio?: string; radius?: number; style?: CSSProperties };

/** Photo slot. Striped until real installation photography arrives (cool-neutral grade, radius 16–24). */
export function Media({ label = "installation photo", ratio, radius = 24, style }: MediaProps) {
  return (
    <div role="img" aria-label={"Photo to come: " + label} style={{ width: "100%", height: ratio ? undefined : "100%", aspectRatio: ratio, borderRadius: radius, background: "repeating-linear-gradient(135deg, var(--stone-100) 0 12px, var(--stone-50) 12px 24px)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", ...style }}>
      <span aria-hidden style={{ font: "500 13px var(--font-sans)", color: "var(--text-secondary)", background: "var(--surface-default)", padding: "6px 12px", borderRadius: 6, border: "1px solid var(--border-default)" }}>Photo to come: {label}</span>
    </div>
  );
}
