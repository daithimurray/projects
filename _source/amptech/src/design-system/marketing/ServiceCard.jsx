import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { Card } from "../data/Card.jsx";
export function ServiceCard({ icon = "shield", title, description, features = [], href, cta = "Learn more", className, style }) {
  return <Card interactive href={href} className={className} style={style}>
    <span style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--surface-brand-subtle)", color: "var(--text-brand)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}><Icon name={icon} size={24} /></span>
    <h3 style={{ margin: 0, fontSize: "var(--text-h3)", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2 }}>{title}</h3>
    <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: "var(--leading-body)", maxWidth: "65ch" }}>{description}</p>
    {features.length > 0 && <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{features.map(ft => <li key={ft} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><Icon name="check" size={16} style={{ color: "var(--status-success)", marginTop: 2 }} />{ft}</li>)}</ul>}
    <span style={{ marginTop: "auto", paddingTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, color: "var(--text-link)", fontSize: "var(--text-body-sm)" }}>{cta}<Icon name="arrow-right" size={16} /></span>
  </Card>;
}
