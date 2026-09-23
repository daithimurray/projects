import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function ButtonGroup({ attached = false, align = "start", label, className, children, ...rest }) {
  return <div role={attached ? "group" : undefined} aria-label={label} className={cx("ih-btngroup", attached && "ih-btngroup--attached", align === "end" && "ih-btngroup--end", className)} {...rest}>{children}</div>;
}
