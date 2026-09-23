import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Tooltip({ content, children, placement = "top", style }) {
  const [show, setShow] = React.useState(false);
  const pos = { top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }, bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }, left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }, right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" } }[placement];
  return <span style={{ position: "relative", display: "inline-flex", ...style }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
    {children}
    {show && <span role="tooltip" style={{ position: "absolute", zIndex: "var(--z-tooltip)", ...pos, padding: "6px 10px", borderRadius: "var(--radius-sm)", background: "var(--surface-inverse)", color: "var(--text-inverse)", fontSize: "var(--text-caption)", fontWeight: 500, lineHeight: 1.4, whiteSpace: "nowrap", boxShadow: "var(--shadow-md)", pointerEvents: "none", animation: "amptech-fade var(--duration-fast) var(--ease-enter)" }}>{content}<style>{"@keyframes amptech-fade{from{opacity:0}}"}</style></span>}
  </span>;
}
