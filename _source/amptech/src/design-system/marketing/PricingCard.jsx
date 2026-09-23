import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { Button } from "../actions/Button.jsx";
import { Badge } from "../feedback/Badge.jsx";
export function PricingCard({ name, price, period = "from", description, features = [], cta = "Request a survey", highlighted = false, badge, onCta, style }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 28, borderRadius: "var(--radius-lg)", background: highlighted ? "var(--surface-brand)" : "var(--surface-default)", color: highlighted ? "#fff" : "var(--text-primary)", border: "1px solid " + (highlighted ? "transparent" : "var(--border-default)"), position: "relative", ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
      <div style={{ fontSize: "var(--text-h4)", fontWeight: 600 }}>{name}</div>
      {badge && <Badge tone={highlighted ? "neutral" : "brand"} style={highlighted ? { background: "rgba(255,255,255,0.14)", color: "#fff" } : undefined}>{badge}</Badge>}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <span style={{ fontSize: "var(--text-body-sm)", color: highlighted ? "var(--navy-200)" : "var(--text-tertiary)" }}>{period}</span>
      <span style={{ fontSize: "var(--text-h1)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{price}</span>
    </div>
    {description && <p style={{ margin: 0, fontSize: "var(--text-body-sm)", color: highlighted ? "var(--stone-200)" : "var(--text-secondary)", lineHeight: 1.5 }}>{description}</p>}
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: "var(--text-body-sm)" }}>{features.map(ft => <li key={ft} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><Icon name="check" size={16} style={{ color: highlighted ? "var(--navy-200)" : "var(--status-success)", marginTop: 2 }} />{ft}</li>)}</ul>
    <Button variant={highlighted ? "inverse" : "secondary"} fullWidth onClick={onCta} style={{ marginTop: "auto" }}>{cta}</Button>
  </div>;
}
