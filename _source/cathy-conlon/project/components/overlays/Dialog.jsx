import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Dialog({ open = true, onClose, title, description, size = "md", children, footer, staticPreview = false, className, ...rest }) {
  const ref = React.useRef(null);
  const tid = React.useId(), did = React.useId();
  React.useEffect(() => { if (!open || staticPreview) return; const prev = document.activeElement; const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); }; document.addEventListener("keydown", onKey); const first = ref.current && ref.current.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"); first && first.focus(); document.body.style.overflow = "hidden"; return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev && prev.focus && prev.focus(); }; }, [open, staticPreview]);
  if (!open) return null;
  return <div className={cx("ih-dialog", staticPreview && "ih-dialog--static", className)} onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} {...rest}>
    <div ref={ref} role="dialog" aria-modal={!staticPreview} aria-labelledby={tid} aria-describedby={description ? did : undefined} className={cx("ih-dialog__panel", size !== "md" && `ih-dialog__panel--${size}`)}>
      <div className="ih-dialog__head"><h2 id={tid} className="ih-dialog__title">{title}</h2>{onClose && <button type="button" className="ih-iconbtn" aria-label="Close" onClick={onClose} style={{ margin: "-8px -8px 0 0" }}><span aria-hidden="true">×</span></button>}</div>
      {description && <p id={did} className="ih-dialog__desc">{description}</p>}
      {children && <div className="ih-dialog__body">{children}</div>}
      {footer && <div className="ih-dialog__foot">{footer}</div>}
    </div>
  </div>;
}
