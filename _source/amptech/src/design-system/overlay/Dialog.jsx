import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { IconButton } from "../actions/IconButton.jsx";
export function Dialog({ open = false, title, description, children, footer, size = "md", onClose, style }) {
  React.useEffect(() => { if (!open) return; const k = e => e.key === "Escape" && onClose && onClose(); document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [open, onClose]);
  if (!open) return null;
  const w = { sm: 400, md: 520, lg: 720 }[size] || 520;
  return <div style={{ position: "fixed", inset: 0, zIndex: "var(--z-dialog)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "var(--surface-overlay)", animation: "amptech-fade var(--duration-enter) var(--ease-enter)" }} onClick={e => e.target === e.currentTarget && onClose && onClose()}>
    <div role="dialog" aria-modal="true" aria-labelledby="amptech-dlg-title" style={{ width: "100%", maxWidth: w, maxHeight: "90vh", display: "flex", flexDirection: "column", background: "var(--surface-raised)", color: "var(--text-primary)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", animation: "amptech-pop var(--duration-enter) var(--ease-enter)", ...style }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "24px 24px 0" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 id="amptech-dlg-title" style={{ margin: 0, fontSize: "var(--text-h4)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{title}</h2>
          {description && <p style={{ margin: "6px 0 0", color: "var(--text-secondary)", fontSize: "var(--text-body-sm)" }}>{description}</p>}
        </div>
        {onClose && <IconButton icon="x" label="Close" variant="ghost" size="sm" onClick={onClose} style={{ margin: "-6px -8px 0 0" }} />}
      </div>
      {children && <div style={{ padding: 24, overflowY: "auto", flex: 1 }}>{children}</div>}
      {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "16px 24px", borderTop: "1px solid var(--border-subtle)" }}>{footer}</div>}
    </div>
  </div>;
}
