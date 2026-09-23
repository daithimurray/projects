import type { CSSProperties, ReactNode } from "react";

type SectionProps = { children: ReactNode; tone?: "page" | "sunken"; style?: CSSProperties };

export const container: CSSProperties = { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--grid-margin)" };

export function Section({ children, tone = "page", style }: SectionProps) {
  return (
    <section style={{ background: tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-page)", padding: "var(--space-section) 0", ...style }}>
      <div style={container}>{children}</div>
    </section>
  );
}
