import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function TextLink({ variant = "default", external = false, href, className, children, ...rest }) {
  const cls = cx("ih-link", variant === "quiet" && "ih-link--quiet", variant === "arrow" && "ih-link--arrow", external && "ih-link--external", className);
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <a href={href} className={cls} {...ext} {...rest}>{children}{external && <span className="visually-hidden"> (opens in new tab)</span>}</a>;
}
