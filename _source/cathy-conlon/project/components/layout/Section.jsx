import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Section({ eyebrow, title, lede, action, tone = "default", tight = false, bordered = false, as = "section", id, className, children, ...rest }) {
  const T = as;
  return <T id={id} className={cx("ih-section", tight && "ih-section--tight", bordered && "ih-section--bordered", tone === "sunken" && "ih-section--sunken", tone === "inverse" && "ih-section--inverse", className)} aria-labelledby={title ? id + "-t" : undefined} {...rest}>
    <div className="ih-container">
      {(title || eyebrow) && <div className="ih-section__head"><div>{eyebrow && <span className="ih-section__eyebrow">{eyebrow}</span>}{title && <h2 id={id + "-t"} className="ih-section__title">{title}</h2>}{lede && <p className="ih-section__lede">{lede}</p>}</div>{action}</div>}
      {children}
    </div>
  </T>;
}
