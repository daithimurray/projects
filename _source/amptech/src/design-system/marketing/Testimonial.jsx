import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

import { Avatar } from "../data/Avatar.jsx";
export function Testimonial({ quote, name, location, service, rating, variant = "card", style }) {
  const big = variant === "feature";
  return <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: big ? 24 : 16, padding: big ? 0 : 24, background: big ? "transparent" : "var(--surface-default)", border: big ? "none" : "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", ...style }}>
    {rating != null && <div aria-label={rating + " out of 5 stars"} style={{ display: "flex", gap: 2, color: "var(--amber-500)" }}>{Array.from({ length: 5 }, (_, i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>}
    <blockquote style={{ margin: 0, fontSize: big ? "var(--text-h3)" : "var(--text-body)", fontWeight: big ? 500 : 400, lineHeight: big ? 1.35 : "var(--leading-body)", letterSpacing: big ? "-0.01em" : 0, color: "var(--text-primary)", textWrap: "pretty" }}>“{quote}”</blockquote>
    <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
      <Avatar name={name} size={big ? 44 : 36} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: 600, fontSize: "var(--text-body-sm)" }}>{name}</span>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>{[location, service].filter(Boolean).join(", ")}</span>
      </div>
    </figcaption>
  </figure>;
}
