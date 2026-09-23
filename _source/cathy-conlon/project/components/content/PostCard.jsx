import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function PostCard({ title, excerpt, kicker, date, readTime, image, href, layout = "column", className, ...rest }) {
  const Tag = href ? "a" : "article";
  return <Tag href={href} className={cx("ih-post", layout === "compact" && "ih-post--compact", layout === "hero" && "ih-post--hero", className)} {...rest}>
    {image !== undefined && layout !== "compact" && <div className="ih-post__media">{image ? <img src={image} alt="" /> : <div className="ih-figure__placeholder" style={{ aspectRatio: "3/2" }}>image</div>}</div>}
    {kicker && <span className="ih-post__kicker">{kicker}</span>}
    <h3 className="ih-post__title">{title}</h3>
    {excerpt && <p className="ih-post__excerpt">{excerpt}</p>}
    {(date || readTime) && <p className="ih-byline">{date && <span>{date}</span>}{date && readTime && <span className="ih-byline__sep">·</span>}{readTime && <span>{readTime}</span>}</p>}
  </Tag>;
}
