import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, focusRing, transition } from "../core/hooks.js";
export function TextLink({ children, href = "#", external = false, arrow = false, size = "md", muted = false, onClick, style }) {
  const it = useInteractive(false);
  return <a href={href} onClick={onClick} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined} {...it.handlers}
    style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: size === "sm" ? "var(--text-body-sm)" : "var(--text-body)", color: muted ? (it.hover ? "var(--text-primary)" : "var(--text-secondary)") : (it.hover ? "var(--text-link-hover)" : "var(--text-link)"),
      textDecoration: it.hover ? "underline" : "none", textUnderlineOffset: "0.2em", textDecorationThickness: "1px", borderRadius: 2, outline: "none", ...transition("color"), ...focusRing(it.focus), ...style }}>
    <span>{children}</span>
    {external ? <Icon name="external-link" size={14} /> : arrow ? <Icon name="arrow-right" size={16} style={{ transform: it.hover ? "translateX(2px)" : "none", ...transition("transform") }} /> : null}
  </a>;
}
