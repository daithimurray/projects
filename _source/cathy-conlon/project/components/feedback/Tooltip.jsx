import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Tooltip({ content, placement = "top", id, children, className, ...rest }) {
  const tid = id || React.useId();
  return <span className={cx("ih-tip-wrap", className)} {...rest}>
    {React.isValidElement(children) ? React.cloneElement(children, { "aria-describedby": tid }) : children}
    <span role="tooltip" id={tid} className={cx("ih-tip", placement === "bottom" && "ih-tip--bottom")}>{content}</span>
  </span>;
}
