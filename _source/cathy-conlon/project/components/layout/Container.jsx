import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Container({ width = "default", as = "div", className, children, ...rest }) {
  const T = as;
  return <T className={cx("ih-container", width !== "default" && `ih-container--${width}`, className)} {...rest}>{children}</T>;
}
export function Grid({ as = "div", rows = false, className, children, style, ...rest }) {
  const T = as;
  return <T className={cx("ih-grid", rows && "ih-grid--rows", className)} style={style} {...rest}>{children}</T>;
}
export function Col({ span = 12, start, md, lg, as = "div", className, children, style, ...rest }) {
  const T = as;
  const s = { gridColumn: (start ? `${start} / span ${span}` : `span ${span}`), ...style };
  return <T className={className} style={s} data-md={md} data-lg={lg} {...rest}>{children}</T>;
}
