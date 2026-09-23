import type { CSSProperties, ReactNode } from "react";

type SectionProps = { children: ReactNode; tone?: "page" | "sunken"; id?: string; style?: CSSProperties };

export const container: CSSProperties = { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--grid-margin)" };

/** CSS custom properties for the responsive layout classes (ds-split, ds-grid). */
export const vars = (v: Record<string, string>) => v as CSSProperties;

export function Section({ children, tone = "page", id, style }: SectionProps) {
  return (
    <section id={id} style={{ background: tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-page)", padding: "clamp(56px, 9vw, var(--space-section)) 0", ...style }}>
      <div style={container}>{children}</div>
    </section>
  );
}
