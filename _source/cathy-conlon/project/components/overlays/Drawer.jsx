import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Drawer({ open = true, onClose, title, side = "right", children, footer, staticPreview = false, className, ...rest }) {
  const tid = React.useId();
  React.useEffect(() => { if (!open || staticPreview) return; const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); }; document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; }; }, [open, staticPreview]);
  if (!open) return null;
  return <div className={cx("ih-drawer", side === "left" && "ih-drawer--left", side === "bottom" && "ih-drawer--bottom", staticPreview && "ih-drawer--static", className)} onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} {...rest}>
    <div role="dialog" aria-modal={!staticPreview} aria-labelledby={tid} className="ih-drawer__panel">
      <div className="ih-drawer__head"><h2 id={tid} className="ih-drawer__title">{title}</h2>{onClose && <button type="button" className="ih-iconbtn" aria-label="Close" onClick={onClose}><span aria-hidden="true">×</span></button>}</div>
      <div className="ih-drawer__body">{children}</div>
      {footer && <div className="ih-drawer__foot">{footer}</div>}
    </div>
  </div>;
}
