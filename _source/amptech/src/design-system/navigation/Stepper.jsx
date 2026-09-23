import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Stepper({ steps = [], current = 0, style }) {
  return <ol style={{ display: "flex", gap: 0, listStyle: "none", margin: 0, padding: 0, ...style }}>
    {steps.map((s, i) => { const done = i < current, active = i === current; return <li key={i} aria-current={active ? "step" : undefined} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 28, height: 28, flex: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, background: done || active ? "var(--action-primary)" : "var(--surface-default)", color: done || active ? "#fff" : "var(--text-tertiary)", border: "1.5px solid " + (done || active ? "var(--action-primary)" : "var(--border-strong)"), ...transition() }}>{done ? <Icon name="check" size={14} strokeWidth={2.5} /> : i + 1}</span>
        {i < steps.length - 1 && <span aria-hidden style={{ flex: 1, height: 2, background: done ? "var(--action-primary)" : "var(--border-default)", marginRight: 8, borderRadius: 1 }} />}
      </div>
      <div style={{ fontSize: "var(--text-body-sm)", fontWeight: active ? 600 : 500, color: active ? "var(--text-primary)" : done ? "var(--text-secondary)" : "var(--text-tertiary)", paddingRight: 8 }}>{s}</div>
    </li>; })}
  </ol>;
}
