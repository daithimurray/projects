import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Byline({ name, avatar, role, date, readTime, className, ...rest }) {
  return <div className={cx("ih-byline", className)} {...rest}>
    {avatar !== undefined && (avatar ? <img className="ih-byline__avatar" src={avatar} alt="" /> : <span className="ih-byline__avatar" aria-hidden="true">{(name || "?")[0]}</span>)}
    <span><span className="ih-byline__name">{name}</span>{role && <> <span className="ih-byline__sep">·</span> {role}</>}{date && <> <span className="ih-byline__sep">·</span> <time>{date}</time></>}{readTime && <> <span className="ih-byline__sep">·</span> {readTime}</>}</span>
  </div>;
}
