import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { IconButton } from "../actions/IconButton.jsx";
export function Drawer({ open = false, title, children, footer, side = "right", width = 420, onClose, style }) {
  React.useEffect(() => { if (!open) return; const k = e => e.key === "Escape" && onClose && onClose(); document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [open, onClose]);
  if (!open) return null;
  const from = side === "left" ? "-24px" : "24px";
  return <div style={{ position: "fixed", inset: 0, zIndex: "var(--z-drawer)", background: "var(--surface-overlay)", animation: "amptech-fade var(--duration-enter) var(--ease-enter)" }} onClick={e => e.target === e.currentTarget && onClose && onClose()}>
    <aside role="dialog" aria-modal="true" aria-label={title} style={{ position: "absolute", top: 0, bottom: 0, [side]: 0, width: "min(" + width + "px, 100%)", display: "flex", flexDirection: "column", background: "var(--surface-raised)", color: "var(--text-primary)", boxShadow: "var(--shadow-lg)", animation: "amptech-slide var(--duration-enter) var(--ease-enter)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
        <h2 style={{ margin: 0, fontSize: "var(--text-h4)", fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</h2>
        {onClose && <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} />}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>{children}</div>
      {footer && <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 8, justifyContent: "flex-end" }}>{footer}</div>}
      <style>{"@keyframes amptech-fade{from{opacity:0}}@keyframes amptech-slide{from{opacity:0;transform:translateX(" + from + ")}}"}</style>
    </aside>
  </div>;
}
