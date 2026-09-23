import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Card({ children, padding = 24, interactive = false, href, onClick, tone = "default", media, className, style }) {
  const it = useInteractive(!interactive);
  const bg = tone === "sunken" ? "var(--surface-sunken)" : tone === "brand" ? "var(--surface-brand)" : tone === "brand-subtle" ? "var(--surface-brand-subtle)" : "var(--surface-default)";
  const Comp = href ? "a" : interactive ? "button" : "div";
  return <Comp className={className} href={href} onClick={onClick} type={Comp === "button" ? "button" : undefined} {...(interactive ? it.handlers : {})}
    style={{ display: "flex", flexDirection: "column", textAlign: "left", fontFamily: "inherit", fontSize: "inherit", background: bg, color: tone === "brand" ? "var(--text-on-brand)" : "var(--text-primary)", border: "1px solid " + (tone === "brand" ? "transparent" : it.hover ? "var(--border-strong)" : "var(--border-default)"), borderRadius: "var(--radius-lg)", overflow: "hidden", textDecoration: "none", cursor: interactive ? "pointer" : "default", outline: "none",
      boxShadow: it.focus ? "var(--focus-ring)" : it.hover ? "var(--shadow-sm)" : "none", transform: it.hover ? "translateY(-1px)" : "none", ...transition(), ...style }}>
    {media && <div style={{ aspectRatio: "16/9", background: "var(--surface-muted)", overflow: "hidden" }}>{media}</div>}
    <div style={{ padding, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
  </Comp>;
}
