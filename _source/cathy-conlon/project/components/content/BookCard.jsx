import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function BookCard({ title, author, year, publisher, kind, cover, blurb, href, layout = "column", featured = false, tag, actions, className, ...rest }) {
  const Tag = href ? "a" : "article";
  return <Tag href={href} className={cx("ih-book", layout === "row" && "ih-book--row", featured && "ih-book--featured", className)} {...rest}>
    <div className="ih-book__cover">{cover ? <img src={cover} alt={`Cover of ${title}`} /> : <div className="ih-book__placeholder" data-author={author} aria-hidden="true">{title}</div>}{tag && <span className="ih-badge ih-badge--inverse ih-book__tag">{tag}</span>}</div>
    <div className="ih-book__body">
      <h3 className="ih-book__title">{title}</h3>
      <p className="ih-book__meta">{[kind, publisher, year].filter(Boolean).join(", ")}</p>
      {blurb && <p className="ih-book__blurb">{blurb}</p>}
      {actions && <div className="ih-book__actions">{actions}</div>}
    </div>
  </Tag>;
}
