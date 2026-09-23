import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Badge({ tone = "neutral", dot = false, count = false, className, children, ...rest }) {
  return <span className={cx("ih-badge", tone !== "neutral" && `ih-badge--${tone}`, dot && "ih-badge--dot", count && "ih-badge--count", className)} {...rest}>{children}</span>;
}
