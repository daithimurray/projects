import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Tag({ href, onClick, selected, onRemove, size = "md", className, children, ...rest }) {
  const cls = cx("ih-tag", size === "sm" && "ih-tag--sm", selected && "ih-tag--selected", className);
  const rm = onRemove && <button type="button" className="ih-tag__remove" aria-label={`Remove ${typeof children === "string" ? children : "tag"}`} onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button>;
  if (href) return <a href={href} className={cls} {...rest}>{children}{rm}</a>;
  if (onClick) return <button type="button" className={cls} aria-pressed={selected} onClick={onClick} {...rest}>{children}{rm}</button>;
  return <span className={cls} {...rest}>{children}{rm}</span>;
}
export function TagList({ label, className, children, ...rest }) { return <div className={cx("ih-taglist", className)} role={label ? "group" : undefined} aria-label={label} {...rest}>{children}</div>; }
