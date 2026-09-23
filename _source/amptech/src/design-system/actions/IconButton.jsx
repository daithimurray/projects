import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, focusRing, transition } from "../core/hooks.js";
const S = { sm: 36, md: 44, lg: 52 };
export function IconButton({ icon, label, variant = "secondary", size = "md", disabled = false, onClick, style, ...rest }) {
  const it = useInteractive(disabled);
  const d = S[size] || S.md;
  const bg = disabled ? "var(--action-disabled-bg)" : variant === "primary" ? (it.active ? "var(--action-primary-active)" : it.hover ? "var(--action-primary-hover)" : "var(--action-primary)") : variant === "ghost" ? (it.active ? "var(--action-ghost-active)" : it.hover ? "var(--action-ghost-hover)" : "transparent") : (it.active ? "var(--action-secondary-active)" : it.hover ? "var(--action-secondary-hover)" : "var(--action-secondary)");
  const color = disabled ? "var(--action-disabled-fg)" : variant === "primary" ? "var(--text-on-brand)" : variant === "ghost" ? "var(--text-secondary)" : "var(--text-primary)";
  return <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} {...it.handlers} {...rest}
    style={{ width: d, height: d, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)", background: bg, color, cursor: disabled ? "not-allowed" : "pointer", outline: "none",
      border: variant === "secondary" ? "1px solid " + (it.hover && !disabled ? "var(--border-strong)" : "var(--border-default)") : "1px solid transparent", ...transition(), ...focusRing(it.focus), ...style }}>
    <Icon name={icon} size={size === "sm" ? 16 : 20} />
  </button>;
}
