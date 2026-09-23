import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function EmptyState({ glyph = "¶", title, description, actions, compact = false, className, ...rest }) {
  return <div className={cx("ih-empty", compact && "ih-empty--compact", className)} {...rest}>
    <span className="ih-empty__glyph" aria-hidden="true">{glyph}</span>
    <h3 className="ih-empty__title">{title}</h3>
    {description && <p className="ih-empty__desc">{description}</p>}
    {actions && <div className="ih-empty__actions">{actions}</div>}
  </div>;
}
