import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Menu({ trigger, items = [], align = "start", staticPreview = false, label = "Menu", className, ...rest }) {
  const [open, setOpen] = React.useState(staticPreview);
  const wrap = React.useRef(null);
  const mid = React.useId();
  React.useEffect(() => { if (!open || staticPreview) return; const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); }; const key = (e) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("mousedown", off); document.addEventListener("keydown", key); return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", key); }; }, [open, staticPreview]);
  const onKey = (e) => { const items = wrap.current.querySelectorAll('[role^="menuitem"]:not([aria-disabled="true"])'); const i = [...items].indexOf(document.activeElement); if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length]?.focus(); } if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus(); } };
  return <div ref={wrap} className={cx("ih-menu-wrap", className)} {...rest}>
    {!staticPreview && React.isValidElement(trigger) && React.cloneElement(trigger, { "aria-haspopup": "menu", "aria-expanded": open, "aria-controls": mid, onClick: (e) => { trigger.props.onClick && trigger.props.onClick(e); setOpen(o => !o); } })}
    {open && <ul id={mid} role="menu" aria-label={label} className={cx("ih-menu", align === "end" && "ih-menu--end", staticPreview && "ih-menu--static")} onKeyDown={onKey}>
      {items.map((it, i) => {
        if (it.type === "separator") return <li key={i} role="separator" className="ih-menu__sep"></li>;
        if (it.type === "label") return <li key={i} className="ih-menu__label" role="presentation">{it.label}</li>;
        const props = { role: it.checked !== undefined ? "menuitemcheckbox" : "menuitem", "aria-checked": it.checked, "aria-disabled": it.disabled || undefined, className: cx("ih-menu__item", it.danger && "ih-menu__item--danger"), tabIndex: -1, onClick: () => { it.onSelect && it.onSelect(); if (!staticPreview) setOpen(false); } };
        const inner = <>{it.icon && <span aria-hidden="true">{it.icon}</span>}<span>{it.label}</span>{it.hint && <span className="ih-menu__hint">{it.hint}</span>}</>;
        return <li key={i} role="none">{it.href ? <a href={it.href} {...props}>{inner}</a> : <button type="button" {...props}>{inner}</button>}</li>;
      })}
    </ul>}
  </div>;
}
