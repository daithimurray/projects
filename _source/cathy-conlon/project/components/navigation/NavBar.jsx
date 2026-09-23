import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function NavBar({ brand = "Cathy Conlon", brandHref = "/", links = [], current, actions, variant = "default", sticky = true, className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => { if (variant === "transparent") return; const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, [variant]);
  return <header className={cx("ih-nav", variant === "transparent" && "ih-nav--transparent", variant === "bordered" && "ih-nav--bordered", open && "ih-nav--open", className)} data-scrolled={scrolled || undefined} style={sticky ? undefined : { position: "static" }} {...rest}>
    <a className="ih-nav__brand" href={brandHref}>{brand}</a>
    <nav aria-label="Primary">
      <ul id="ih-nav-links" className="ih-nav__links" onClick={(e) => { if (e.target.closest("a")) setOpen(false); }}>{links.map(l => <li key={l.href}><a className="ih-nav__link" href={l.href} aria-current={(current ?? "") === l.href ? "page" : undefined}>{l.label}</a></li>)}</ul>
    </nav>
    <div className="ih-nav__actions">
      {actions}
      <button type="button" className="ih-iconbtn ih-nav__toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="ih-nav-links" onClick={() => setOpen(o => !o)}><span aria-hidden="true">{open ? "×" : "☰"}</span></button>
    </div>
  </header>;
}
