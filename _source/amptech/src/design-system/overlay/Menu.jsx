import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Menu({ trigger, items = [], align = "start", style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { if (!open) return; const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; const k = e => e.key === "Escape" && setOpen(false); document.addEventListener("mousedown", h); document.addEventListener("keydown", k); return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); }; }, [open]);
  return <div ref={ref} style={{ position: "relative", display: "inline-flex", ...style }}>
    <span onClick={() => setOpen(o => !o)} aria-haspopup="menu" aria-expanded={open}>{trigger}</span>
    {open && <div role="menu" style={{ position: "absolute", top: "calc(100% + 6px)", [align === "end" ? "right" : "left"]: 0, zIndex: "var(--z-dropdown)", minWidth: 200, padding: 6, background: "var(--surface-raised)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", animation: "amptech-menu var(--duration-fast) var(--ease-enter)" }}>
      {items.map((it, i) => it === "divider" ? <div key={i} role="separator" style={{ height: 1, background: "var(--border-subtle)", margin: "6px 0" }} /> : <MenuItem key={i} {...it} onSelect={() => { setOpen(false); it.onSelect && it.onSelect(); }} />)}
    </div>}
  </div>;
}
function MenuItem({ label, icon, danger, disabled, shortcut, onSelect }) {
  const it = useInteractive(disabled);
  return <button type="button" role="menuitem" disabled={disabled} onClick={onSelect} {...it.handlers} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, height: 36, padding: "0 10px", border: "none", borderRadius: "var(--radius-sm)", fontFamily: "inherit", fontSize: "var(--text-body-sm)", fontWeight: 500, textAlign: "left", cursor: disabled ? "not-allowed" : "pointer", outline: "none",
    background: it.hover || it.focus ? (danger ? "var(--status-danger-bg)" : "var(--surface-muted)") : "transparent", color: disabled ? "var(--text-disabled)" : danger ? "var(--status-danger-strong)" : "var(--text-primary)", ...transition() }}>
    {icon && <Icon name={icon} size={16} />}<span style={{ flex: 1 }}>{label}</span>{shortcut && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-tertiary)" }}>{shortcut}</span>}
  </button>;
}
