import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Tabs({ tabs = [], value, defaultValue, onChange, variant = "underline", id = "tabs", className, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const cur = value ?? inner;
  const set = (v) => { setInner(v); onChange && onChange(v); };
  const onKey = (e, i) => { const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null; if (n == null) return; e.preventDefault(); const t = tabs[(n + tabs.length) % tabs.length]; set(t.value); document.getElementById(`${id}-tab-${t.value}`)?.focus(); };
  const active = tabs.find(t => t.value === cur);
  return <div className={cx("ih-tabs", variant === "pills" && "ih-tabs--pills", className)} {...rest}>
    <div role="tablist" className="ih-tabs__list">{tabs.map((t, i) => <button key={t.value} role="tab" id={`${id}-tab-${t.value}`} type="button" className="ih-tab" aria-selected={t.value === cur} aria-controls={`${id}-panel-${t.value}`} tabIndex={t.value === cur ? 0 : -1} disabled={t.disabled} onClick={() => set(t.value)} onKeyDown={(e) => onKey(e, i)}>{t.label}{t.count != null && <span className="ih-badge ih-badge--count" style={{ marginLeft: 8 }}>{t.count}</span>}</button>)}</div>
    {active && active.content !== undefined && <div role="tabpanel" id={`${id}-panel-${cur}`} aria-labelledby={`${id}-tab-${cur}`} className="ih-tabs__panel">{active.content}</div>}
  </div>;
}
