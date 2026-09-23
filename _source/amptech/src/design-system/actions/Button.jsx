import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, focusRing, transition } from "../core/hooks.js";
const SIZES = { sm: { h: 36, px: 14, fs: "var(--text-body-sm)", icon: 16, gap: 6 }, md: { h: 44, px: 18, fs: "var(--text-body)", icon: 18, gap: 8 }, lg: { h: 52, px: 24, fs: "var(--text-body-lg)", icon: 20, gap: 10 } };
function palette(variant, { hover, active }, disabled, inverse) {
  if (disabled) return { background: variant === "ghost" || variant === "link" ? "transparent" : "var(--action-disabled-bg)", color: "var(--action-disabled-fg)", border: variant === "secondary" ? "1px solid var(--border-default)" : "1px solid transparent" };
  switch (variant) {
    case "primary": return { background: active ? "var(--action-primary-active)" : hover ? "var(--action-primary-hover)" : "var(--action-primary)", color: "var(--text-on-brand)", border: "1px solid transparent" };
    case "secondary": return { background: active ? "var(--action-secondary-active)" : hover ? "var(--action-secondary-hover)" : "var(--action-secondary)", color: "var(--text-primary)", border: "1px solid " + (hover ? "var(--border-strong)" : "var(--border-default)") };
    case "ghost": return { background: active ? "var(--action-ghost-active)" : hover ? "var(--action-ghost-hover)" : "transparent", color: "var(--text-brand)", border: "1px solid transparent" };
    case "danger": return { background: active ? "var(--red-700)" : hover ? "var(--red-600)" : "var(--status-danger)", color: "#fff", border: "1px solid transparent" };
    case "inverse": return { background: active ? "var(--stone-200)" : hover ? "var(--stone-100)" : "var(--stone-0)", color: "var(--navy-800)", border: "1px solid transparent" };
    case "link": return { background: "transparent", color: hover ? "var(--text-link-hover)" : "var(--text-link)", border: "1px solid transparent", textDecoration: hover ? "underline" : "none", padding: 0, height: "auto" };
    default: return {};
  }
}
export function Button({ children, variant = "primary", size = "md", iconLeft, iconRight, loading = false, disabled = false, fullWidth = false, type = "button", href, onClick, style, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const it = useInteractive(disabled || loading);
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: s.gap, height: s.h, padding: "0 " + s.px + "px",
    fontFamily: "var(--font-sans)", fontSize: s.fs, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.005em", whiteSpace: "nowrap",
    borderRadius: "var(--radius-sm)", cursor: disabled || loading ? "not-allowed" : "pointer", textDecoration: "none", outline: "none",
    width: fullWidth ? "100%" : undefined, transform: it.active && !disabled ? "translateY(0.5px)" : "none", userSelect: "none",
    ...transition(), ...palette(variant, it, disabled, false), ...focusRing(it.focus), ...style,
  };
  const content = <>
    {loading ? <span aria-hidden style={{ width: s.icon - 2, height: s.icon - 2, border: "2px solid currentColor", borderRightColor: "transparent", borderRadius: "50%", animation: "amptech-spin 0.8s linear infinite" }} /> : iconLeft && <Icon name={iconLeft} size={s.icon} />}
    <span>{children}</span>
    {iconRight && <Icon name={iconRight} size={s.icon} />}
    <style>{"@keyframes amptech-spin{to{transform:rotate(360deg)}}"}</style>
  </>;
  if (href && !disabled) return <a href={href} style={base} onClick={onClick} {...it.handlers} {...rest}>{content}</a>;
  return <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} onClick={onClick} style={base} {...it.handlers} {...rest}>{content}</button>;
}
