import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Button({ variant = "primary", size = "md", block = false, loading = false, disabled = false, iconStart, iconEnd, href, type = "button", className, children, ...rest }) {
  const cls = cx("ih-btn", `ih-btn--${variant}`, size !== "md" && `ih-btn--${size}`, block && "ih-btn--block", className);
  const inner = <>
    {iconStart && <span className="ih-btn__icon" aria-hidden="true">{iconStart}</span>}
    <span>{children}</span>
    {iconEnd && <span className="ih-btn__icon" aria-hidden="true">{iconEnd}</span>}
  </>;
  if (href) return <a href={disabled ? undefined : href} className={cls} aria-disabled={disabled || undefined} data-loading={loading || undefined} {...rest}>{inner}</a>;
  return <button type={type} className={cls} disabled={disabled || loading} data-loading={loading || undefined} aria-busy={loading || undefined} {...rest}>{inner}</button>;
}
