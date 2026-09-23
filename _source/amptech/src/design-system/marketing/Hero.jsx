import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { Button } from "../actions/Button.jsx";
export function Hero({ eyebrow, title, description, primaryCta = "Request a survey", secondaryCta = "Call us", onPrimary, onSecondary, media, proof = [], inverse = false, style }) {
  const fg = inverse ? "#fff" : "var(--text-primary)", sub = inverse ? "var(--stone-300)" : "var(--text-secondary)";
  return <section style={{ background: inverse ? "var(--surface-brand)" : "var(--surface-page)", color: fg, ...style }}>
    <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-11) var(--grid-margin)", display: "grid", gridTemplateColumns: media ? "minmax(0, 7fr) minmax(0, 5fr)" : "minmax(0, 8fr) minmax(0, 4fr)", gap: "var(--space-9)", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
        {eyebrow && <div style={{ fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: inverse ? "var(--navy-200)" : "var(--text-brand)" }}>{eyebrow}</div>}
        <h1 style={{ margin: 0, fontSize: "var(--text-display)", fontWeight: 600, lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-display)", textWrap: "balance" }}>{title}</h1>
        {description && <p style={{ margin: 0, fontSize: "var(--text-body-lg)", color: sub, lineHeight: "var(--leading-body)", maxWidth: 520, textWrap: "pretty" }}>{description}</p>}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button size="lg" variant={inverse ? "inverse" : "primary"} iconRight="arrow-right" onClick={onPrimary}>{primaryCta}</Button>
          {secondaryCta && <Button size="lg" variant={inverse ? "ghost" : "secondary"} iconLeft="phone" onClick={onSecondary} style={inverse ? { color: "#fff" } : undefined}>{secondaryCta}</Button>}
        </div>
        {proof.length > 0 && <ul style={{ display: "flex", gap: 20, flexWrap: "wrap", listStyle: "none", margin: "8px 0 0", padding: 0, fontSize: "var(--text-body-sm)", color: sub }}>
          {proof.map(p => <li key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="check-circle" size={16} style={{ color: inverse ? "var(--navy-200)" : "var(--status-success)" }} />{p}</li>)}
        </ul>}
      </div>
      {media && <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "4/5", background: inverse ? "rgba(255,255,255,0.08)" : "var(--surface-muted)" }}>{media}</div>}
    </div>
  </section>;
}
