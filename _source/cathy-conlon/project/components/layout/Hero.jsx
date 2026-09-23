import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Hero({ eyebrow, title, lede, actions, media, layout = "left", className, ...rest }) {
  return <section className={cx("ih-hero", layout === "centered" && "ih-hero--centered", layout === "split" && "ih-hero--split", className)} {...rest}>
    <div className="ih-container"><div className="ih-hero__inner">
      <div className="ih-hero__copy">
        {eyebrow && <span className="ih-hero__eyebrow">{eyebrow}</span>}
        <h1 className="ih-hero__title">{title}</h1>
        {lede && <p className="ih-hero__lede">{lede}</p>}
        {actions && <div className="ih-hero__actions">{actions}</div>}
      </div>
      {media && <div className="ih-hero__media">{media}</div>}
    </div></div>
  </section>;
}
