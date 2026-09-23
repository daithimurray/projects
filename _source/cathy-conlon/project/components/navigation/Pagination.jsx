import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
function range(page, total) { if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1); const s = new Set([1, total, page - 1, page, page + 1].filter(n => n >= 1 && n <= total)); const arr = [...s].sort((a, b) => a - b); const o = []; arr.forEach((n, i) => { if (i && n - arr[i - 1] > 1) o.push("…"); o.push(n); }); return o; }
export function Pagination({ page = 1, total = 1, onChange, hrefFor, variant = "numbered", label = "Pagination", className, ...rest }) {
  const go = (p) => (e) => { if (onChange) { e.preventDefault(); onChange(p); } };
  const Btn = ({ p, children, current, disabled, aria }) => hrefFor && !disabled ? <a className="ih-pager__btn" href={hrefFor(p)} aria-current={current ? "page" : undefined} aria-label={aria} onClick={go(p)}>{children}</a> : <button type="button" className="ih-pager__btn" aria-current={current ? "page" : undefined} aria-label={aria} disabled={disabled} onClick={go(p)}>{children}</button>;
  return <nav aria-label={label} className={className} {...rest}><ul className={cx("ih-pager", variant === "simple" && "ih-pager--simple")}>
    <li><Btn p={page - 1} disabled={page <= 1} aria="Previous page">← {variant === "simple" ? "Newer" : ""}</Btn></li>
    {variant === "numbered" ? range(page, total).map((n, i) => <li key={i}>{n === "…" ? <span className="ih-pager__ellipsis" aria-hidden="true">…</span> : <Btn p={n} current={n === page} aria={`Page ${n}`}>{n}</Btn>}</li>) : <li className="type-caption text-muted">Page {page} of {total}</li>}
    <li><Btn p={page + 1} disabled={page >= total} aria="Next page">{variant === "simple" ? "Older " : ""}→</Btn></li>
  </ul></nav>;
}
