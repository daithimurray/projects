import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
const glyph = { info: "i", success: "✓", warning: "!", error: "!" };
export function Alert({ tone = "neutral", title, children, actions, onDismiss, className, ...rest }) {
  return <div role={tone === "error" || tone === "warning" ? "alert" : "status"} className={cx("ih-alert", tone !== "neutral" && `ih-alert--${tone}`, className)} {...rest}>
    <span className="ih-alert__icon" aria-hidden="true">{glyph[tone] || "i"}</span>
    <div className="ih-alert__body">{title && <p className="ih-alert__title">{title}</p>}<div>{children}</div>{actions && <div className="ih-alert__actions">{actions}</div>}</div>
    {onDismiss && <button type="button" className="ih-iconbtn ih-iconbtn--sm ih-alert__close" aria-label="Dismiss" onClick={onDismiss}><span aria-hidden="true">×</span></button>}
  </div>;
}
