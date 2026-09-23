import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Skeleton({ variant = "text", width, height, lines = 1, className, style, ...rest }) {
  if (variant === "text" && lines > 1) return <div aria-hidden="true" className={className} style={style} {...rest}>{Array.from({ length: lines }, (_, i) => <span key={i} className="ih-skel ih-skel--text" style={{ width: i === lines - 1 ? "70%" : "100%" }}></span>)}</div>;
  return <span aria-hidden="true" className={cx("ih-skel", `ih-skel--${variant}`, className)} style={{ width, height, ...style }} {...rest}></span>;
}
