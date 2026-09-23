import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";
import { Button } from "../actions/Button.jsx";
import { IconButton } from "../actions/IconButton.jsx";
import { Drawer } from "../overlay/Drawer.jsx";
export function Navbar({ brand = "Amptech", links = [], activeHref, phone = "+353 1 800 0000", cta = "Request a survey", onCta, inverse = false, sticky = false, style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [w, setW] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  React.useLayoutEffect(() => {
    const measure = () => { if (ref.current) setW(ref.current.getBoundingClientRect().width || window.innerWidth); };
    measure();
    window.addEventListener("resize", measure);
    let ro; if (window.ResizeObserver && ref.current) { ro = new ResizeObserver(measure); ro.observe(ref.current); }
    return () => { window.removeEventListener("resize", measure); ro && ro.disconnect(); };
  }, []);
  const compact = w < 960, hidePhone = w < 1120;
  const fg = inverse ? "var(--text-inverse)" : "var(--text-primary)";
  const tel = "tel:" + phone.replace(/\s/g, "");
  return <header ref={ref} style={{ position: sticky ? "sticky" : "relative", top: 0, zIndex: "var(--z-sticky)", background: inverse ? "var(--surface-brand)" : "rgba(252,251,249,0.85)", backdropFilter: "saturate(1.4) blur(12px)", borderBottom: "1px solid " + (inverse ? "rgba(255,255,255,0.1)" : "var(--border-subtle)"), ...style }}>
    <nav aria-label="Main" style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--grid-margin)", height: "var(--nav-height)", display: "flex", alignItems: "center", gap: 24 }}>
      <a href="#/" style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em", color: inverse ? "#fff" : "var(--navy-700)", textDecoration: "none", flex: "none" }}>{brand}</a>
      {!compact && <ul style={{ display: "flex", gap: 2, listStyle: "none", margin: 0, padding: 0, flex: 1, minWidth: 0 }}>
        {links.map(l => <NavLink key={l.href} {...l} active={l.href === activeHref} inverse={inverse} />)}
      </ul>}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "none", marginLeft: compact ? "auto" : 0 }}>
        {hidePhone ? <IconButton icon="phone" label={"Call " + phone} variant="ghost" size="sm" onClick={() => (location.href = tel)} style={{ color: fg }} />
          : <a href={tel} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: fg, fontWeight: 600, fontSize: "var(--text-body-sm)", textDecoration: "none", whiteSpace: "nowrap" }}><Icon name="phone" size={16} />{phone}</a>}
        <Button size="sm" variant={inverse ? "inverse" : "primary"} onClick={onCta}>{cta}</Button>
        {compact && <IconButton icon="menu" label="Open menu" variant="ghost" size="sm" onClick={() => setOpen(true)} style={{ color: fg }} />}
      </div>
    </nav>
    <Drawer open={open} onClose={() => setOpen(false)} title={brand} width={320}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {links.map(l => <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} aria-current={l.href === activeHref ? "page" : undefined} style={{ display: "flex", alignItems: "center", height: 48, padding: "0 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-body-lg)", fontWeight: l.href === activeHref ? 600 : 500, color: "var(--text-primary)", textDecoration: "none", background: l.href === activeHref ? "var(--surface-muted)" : "transparent" }}>{l.label}</a></li>)}
      </ul>
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: 12 }}>
        <Button variant="secondary" iconLeft="phone" href={tel} fullWidth>{phone}</Button>
        <Button fullWidth onClick={() => { setOpen(false); onCta && onCta(); }}>{cta}</Button>
      </div>
    </Drawer>
  </header>;
}
function NavLink({ label, href, active, inverse }) {
  const it = useInteractive(false);
  return <li><a href={href} aria-current={active ? "page" : undefined} {...it.handlers} style={{ display: "inline-flex", alignItems: "center", height: 36, padding: "0 12px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-body-sm)", fontWeight: active ? 600 : 500, textDecoration: "none", outline: "none", whiteSpace: "nowrap",
    color: inverse ? (active || it.hover ? "#fff" : "rgba(255,255,255,0.72)") : (active ? "var(--text-primary)" : it.hover ? "var(--text-primary)" : "var(--text-secondary)"),
    background: it.hover ? (inverse ? "rgba(255,255,255,0.08)" : "var(--surface-muted)") : "transparent", boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition() }}>{label}</a></li>;
}
