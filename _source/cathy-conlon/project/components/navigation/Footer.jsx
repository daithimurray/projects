import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Footer({ name = "Cathy Conlon", tagline, columns = [], copyright, bottomLinks = [], className, ...rest }) {
  return <footer className={cx("ih-footer", className)} {...rest}>
    <div className="ih-footer__inner">
      <div className="ih-footer__brand"><div className="ih-footer__name">{name}</div>{tagline && <p className="ih-footer__tagline">{tagline}</p>}</div>
      {columns.map(c => <div className="ih-footer__col" key={c.title}><h2>{c.title}</h2>{c.links.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}</div>)}
      <div className="ih-footer__bottom">
        <span>{copyright ?? `© ${new Date().getFullYear()} ${name}`}</span>
        <span style={{ display: "flex", gap: "var(--space-4)" }}>{bottomLinks.map(l => <a key={l.label} href={l.href} style={{ color: "inherit", textDecoration: "none" }}>{l.label}</a>)}</span>
      </div>
    </div>
  </footer>;
}
