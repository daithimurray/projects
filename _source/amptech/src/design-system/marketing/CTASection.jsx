import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { Button } from "../actions/Button.jsx";
export function CTASection({ title, description, primaryCta = "Request a survey", secondaryCta = "Call +353 1 800 0000", onPrimary, onSecondary, compact = false, style }) {
  return <section style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: compact ? 0 : "0 var(--grid-margin)", ...style }}>
    <div className={compact ? undefined : "ds-band"} style={{ background: "var(--surface-brand)", color: "#fff", borderRadius: "var(--radius-xl)", ...(compact ? { padding: "40px 32px" } : {}), display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
        <h2 style={{ margin: 0, fontSize: "var(--text-h2)", fontWeight: 600, letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-heading)", textWrap: "balance" }}>{title}</h2>
        {description && <p style={{ margin: 0, color: "var(--stone-300)", fontSize: "var(--text-body-lg)", textWrap: "pretty" }}>{description}</p>}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="inverse" size="lg" iconRight="arrow-right" onClick={onPrimary}>{primaryCta}</Button>
        {secondaryCta && <Button variant="ghost" size="lg" iconLeft="phone" onClick={onSecondary} style={{ color: "#fff" }}>{secondaryCta}</Button>}
      </div>
    </div>
  </section>;
}
