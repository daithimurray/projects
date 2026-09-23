import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Pagination({ page = 1, pageCount = 1, onChange, style }) {
  const go = p => { if (p >= 1 && p <= pageCount && onChange) onChange(p); };
  const pages = [];
  for (let p = 1; p <= pageCount; p++) { if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p); else if (pages[pages.length - 1] !== "…") pages.push("…"); }
  return <nav aria-label="Pagination" style={{ display: "flex", alignItems: "center", gap: 4, ...style }}>
    <PBtn onClick={() => go(page - 1)} disabled={page === 1} label="Previous page"><Icon name="chevron-left" size={18} /></PBtn>
    {pages.map((p, i) => p === "…" ? <span key={"e" + i} style={{ width: 36, textAlign: "center", color: "var(--text-tertiary)" }}>…</span> : <PBtn key={p} onClick={() => go(p)} current={p === page} label={"Page " + p}>{p}</PBtn>)}
    <PBtn onClick={() => go(page + 1)} disabled={page === pageCount} label="Next page"><Icon name="chevron-right" size={18} /></PBtn>
  </nav>;
}
function PBtn({ children, onClick, disabled, current, label }) {
  const it = useInteractive(disabled);
  return <button type="button" aria-label={label} aria-current={current ? "page" : undefined} disabled={disabled} onClick={onClick} {...it.handlers}
    style={{ minWidth: 36, height: 36, padding: "0 8px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid " + (current ? "var(--action-primary)" : "transparent"), borderRadius: "var(--radius-sm)", fontFamily: "inherit", fontSize: "var(--text-body-sm)", fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", outline: "none",
      background: current ? "var(--action-primary)" : it.hover ? "var(--surface-muted)" : "transparent", color: disabled ? "var(--text-disabled)" : current ? "var(--text-on-brand)" : "var(--text-primary)", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition() }}>{children}</button>;
}
