import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Figure({ src, alt = "", caption, credit, placeholder = "photograph", ratio, wide = false, mono = false, className, ...rest }) {
  return <figure className={cx("ih-figure", wide && "ih-figure--wide", mono && "ih-figure--mono", className)} {...rest}>
    <div className="ih-figure__media" style={ratio ? { aspectRatio: ratio } : undefined}>{src ? <img src={src} alt={alt} loading="lazy" /> : <div className="ih-figure__placeholder" style={ratio ? { aspectRatio: ratio } : undefined}>{placeholder}</div>}</div>
    {(caption || credit) && <figcaption className="ih-figure__caption">{caption}{credit && <> <span className="ih-figure__credit">Photo: {credit}</span></>}</figcaption>}
  </figure>;
}
