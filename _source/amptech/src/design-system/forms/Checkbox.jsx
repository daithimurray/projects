import React from "react";
import { Icon } from "../core/Icon.jsx";
import { useInteractive, transition } from "../core/hooks.js";

export function Checkbox({ id, label, description, checked, defaultChecked, indeterminate = false, disabled = false, invalid = false, onChange, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isOn = checked ?? internal;
  const it = useInteractive(disabled);
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const on = isOn || indeterminate;
  return <label htmlFor={id} {...it.handlers} style={{ display: "inline-flex", gap: 10, alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", color: disabled ? "var(--text-disabled)" : "var(--text-primary)", ...style }}>
    <span style={{ position: "relative", width: 20, height: 20, flex: "none", marginTop: 2 }}>
      <input ref={ref} id={id} type="checkbox" checked={isOn} disabled={disabled} aria-invalid={invalid || undefined} onChange={e => { setInternal(e.target.checked); onChange && onChange(e); }} style={{ position: "absolute", inset: 0, opacity: 0, margin: 0, cursor: "inherit" }} />
      <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-xs)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
        background: disabled ? "var(--action-disabled-bg)" : on ? "var(--action-primary)" : "var(--surface-default)",
        border: "1.5px solid " + (invalid ? "var(--status-danger)" : on && !disabled ? "var(--action-primary)" : it.hover ? "var(--border-strong)" : "var(--border-default)"),
        boxShadow: it.focus ? "var(--focus-ring)" : "none", ...transition() }}>
        {indeterminate ? <Icon name="minus" size={14} strokeWidth={2.5} /> : isOn ? <Icon name="check" size={14} strokeWidth={2.5} /> : null}
      </span>
    </span>
    {(label || description) && <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>{label}</span>
      {description && <span style={{ fontSize: "var(--text-body-sm)", color: "var(--text-secondary)" }}>{description}</span>}
    </span>}
  </label>;
}
