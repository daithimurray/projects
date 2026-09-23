import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Toast({ message, tone = "neutral", action, onAction, onDismiss, className, ...rest }) {
  return <div role="status" aria-live="polite" className={cx("ih-toast", tone !== "neutral" && `ih-toast--${tone}`, className)} {...rest}>
    <span className="ih-toast__dot" aria-hidden="true"></span>
    <span className="ih-toast__msg">{message}</span>
    {action && <button type="button" className="ih-toast__action" onClick={onAction}>{action}</button>}
    {onDismiss && <button type="button" className="ih-iconbtn ih-iconbtn--sm" aria-label="Dismiss" onClick={onDismiss}><span aria-hidden="true">×</span></button>}
  </div>;
}
export function ToastRegion({ children, ...rest }) { return <div className="ih-toast-region" {...rest}>{children}</div>; }
