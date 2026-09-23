import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Divider({ variant = "line", label, className, ...rest }) {
  if (variant === "label") return <div role="separator" className={cx("ih-divider ih-divider--label", className)} {...rest}>{label}</div>;
  if (variant === "ornament") return <div role="separator" className={cx("ih-divider ih-divider--ornament", className)} {...rest}></div>;
  return <hr className={cx("ih-divider", variant === "strong" && "ih-divider--strong", variant === "vertical" && "ih-divider--vertical", className)} aria-orientation={variant === "vertical" ? "vertical" : undefined} {...rest} />;
}
