import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function NavBar({ brand = "Cathy Conlon", brandHref = "/", links = [], current, actions, variant = "default", sticky = true, menuIcon = "☰", closeIcon = "×", className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const sentinel = React.useRef(null);
  const header = React.useRef(null);
  // A sentinel at the top of the page flips the scrolled state; no per-frame scroll listener.
  React.useEffect(() => {
    if (variant === "transparent" || !sentinel.current || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [variant]);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); header.current?.querySelector(".ih-nav__toggle")?.focus(); } };
    const onDown = (e) => { if (header.current && !header.current.contains(e.target)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);
  return <>
    <div ref={sentinel} className="ih-nav__sentinel" aria-hidden="true"></div>
    <header ref={header} className={cx("ih-nav", variant === "transparent" && "ih-nav--transparent", variant === "bordered" && "ih-nav--bordered", open && "ih-nav--open", className)} data-scrolled={scrolled || undefined} style={sticky ? undefined : { position: "static" }} {...rest}>
      <a className="ih-nav__brand" href={brandHref}>{brand}</a>
      <nav aria-label="Primary">
        <ul id="ih-nav-links" className="ih-nav__links" onClick={(e) => { if (e.target.closest("a")) setOpen(false); }}>{links.map(l => <li key={l.href}><a className="ih-nav__link" href={l.href} aria-current={(current ?? "") === l.href ? "page" : undefined}>{l.label}</a></li>)}</ul>
      </nav>
      <div className="ih-nav__actions">
        {actions}
        <button type="button" className="ih-iconbtn ih-nav__toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="ih-nav-links" onClick={() => setOpen(o => !o)}><span aria-hidden="true">{open ? closeIcon : menuIcon}</span></button>
      </div>
      {open && <div className="ih-nav__scrim" aria-hidden="true" onClick={() => setOpen(false)}></div>}
    </header>
  </>;
}
