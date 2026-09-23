import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Tag({ children, selected = false, removable = false, icon, onClick, onRemove, style }) {
  const it = useInteractive(false);
  const interactive = !!onClick;
  const Comp = interactive ? "button" : "span";
  return <Comp type={interactive ? "button" : undefined} onClick={onClick} aria-pressed={interactive ? selected : undefined} {...(interactive ? it.handlers : {})}
    style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 12px", borderRadius: "var(--radius-full)", fontFamily: "inherit", fontSize: "var(--text-body-sm)", fontWeight: 500, cursor: interactive ? "pointer" : "default", outline: "none",
      background: selected ? "var(--action-primary)" : it.hover ? "var(--surface-muted)" : "var(--surface-default)", color: selected ? "var(--text-on-brand)" : "var(--text-primary)",
      border: "1px solid " + (selected ? "var(--action-primary)" : it.hover ? "var(--border-strong)" : "var(--border-default)"), boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition(), ...style }}>
    {icon && <Icon name={icon} size={14} />}<span>{children}</span>
    {removable && <span role="button" aria-label={"Remove " + children} onClick={e => { e.stopPropagation(); onRemove && onRemove(); }} style={{ display: "inline-flex", marginRight: -6, padding: 2, borderRadius: "50%", cursor: "pointer" }}><Icon name="x" size={14} /></span>}
  </Comp>;
}
