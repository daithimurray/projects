import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function PullQuote({ children, cite, variant = "marks", size = "md", className, ...rest }) {
  return <blockquote className={cx("ih-quote", variant === "rule" && "ih-quote--rule", variant === "centered" && "ih-quote--centered", size === "sm" && "ih-quote--sm", className)} {...rest}>
    <p className="ih-quote__body">{children}</p>
    {cite && <footer className="ih-quote__cite">{cite}</footer>}
  </blockquote>;
}
