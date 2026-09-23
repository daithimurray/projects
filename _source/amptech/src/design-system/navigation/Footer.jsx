import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { TextLink } from "../actions/TextLink.jsx";
export function Footer({ brand = "Amptech", tagline = "Intruder alarms, CCTV and fire systems. Surveyed, installed and maintained by our own engineers.", columns = [], phone = "+353 1 800 0000", email = "hello@amptech.ie", address = "Dublin 15, Ireland", licence = "PSA licence no. 00000", legal = [], style }) {
  return <footer style={{ background: "var(--surface-inverse)", color: "var(--text-inverse)", ...style }}>
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "64px var(--grid-margin) 32px" }}>
      <div className="ds-footer-grid" style={{ "--footer-cols": columns.length }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
          <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.03em" }}>{brand}</div>
          <p style={{ margin: 0, color: "var(--stone-300)", fontSize: "var(--text-body-sm)", lineHeight: 1.6 }}>{tagline}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "var(--text-body-sm)", color: "var(--stone-200)" }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="phone" size={16} />{phone}</span>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="mail" size={16} />{email}</span>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="map-pin" size={16} />{address}</span>
          </div>
        </div>
        {columns.map(c => <div key={c.title}><div style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--stone-400)", marginBottom: 14 }}>{c.title}</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 0 }}>{c.links.map(l => <li key={l.href}><FLink {...l} /></li>)}</ul></div>)}
      </div>
      <div style={{ marginTop: 48, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: "var(--text-caption)", color: "var(--stone-400)" }}>
        <span>© {new Date().getFullYear()} {brand}. {licence}</span>
        <span style={{ display: "flex", gap: 16 }}>{legal.map(l => <FLink key={l.href} {...l} small />)}</span>
      </div>
    </div>
  </footer>;
}
function FLink({ label, href, small }) { const it = useInteractive(false); return <a href={href} {...it.handlers} style={{ display: "inline-flex", alignItems: "center", minHeight: small ? 32 : 36, color: it.hover ? "#fff" : small ? "var(--stone-300)" : "var(--stone-200)", fontSize: small ? "var(--text-caption)" : "var(--text-body-sm)", textDecoration: it.hover ? "underline" : "none", ...transition("color") }}>{label}</a>; }
