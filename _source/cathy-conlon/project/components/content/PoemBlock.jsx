import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function PoemBlock({ title, meta, stanzas = [], align = "left", numbered = false, endMark = false, className, ...rest }) {
  return <article className={cx("ih-poem", align === "center" && "ih-poem--centered", numbered && "ih-poem--numbered", className)} {...rest}>
    {title && <h1 className="ih-poem__title">{title}</h1>}
    {meta && <p className="ih-poem__meta">{meta}</p>}
    {stanzas.map((st, i) => <p className="ih-poem__stanza" key={i}>{st.map((line, j) => { const indent = typeof line === "string" && line.startsWith("\t"); const text = indent ? line.slice(1) : line; return <span key={j} className={cx("ih-poem__line", indent && "ih-poem__line--indent")}>{text === "" ? "\u00a0" : text}</span>; })}</p>)}
    {endMark && <span className="ih-poem__end" aria-hidden="true">· · ·</span>}
  </article>;
}
