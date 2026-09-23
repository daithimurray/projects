import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Breadcrumb({ items = [], className, ...rest }) {
  return <nav aria-label="Breadcrumb" className={className} {...rest}><ol className="ih-crumbs">
    {items.map((it, i) => { const last = i === items.length - 1; return <li key={it.href ?? it.label} aria-current={last ? "page" : undefined}>
      {last || !it.href ? <span>{it.label}</span> : <a href={it.href}>{it.label}</a>}
      {!last && <span className="ih-crumbs__sep" aria-hidden="true" style={{ marginLeft: "var(--space-2)" }}>/</span>}
    </li>; })}
  </ol></nav>;
}
