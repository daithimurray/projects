import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function IconButton({ label, variant = "ghost", size = "md", round = false, pressed, href, className, children, ...rest }) {
  const cls = cx("ih-iconbtn", variant === "outline" && "ih-iconbtn--outline", size === "sm" && "ih-iconbtn--sm", round && "ih-iconbtn--round", className);
  const a11y = { "aria-label": label, title: label, "aria-pressed": pressed };
  if (href) return <a href={href} className={cls} {...a11y} {...rest}><span aria-hidden="true">{children}</span></a>;
  return <button type="button" className={cls} {...a11y} {...rest}><span aria-hidden="true">{children}</span></button>;
}
