import React from 'react';
export function Tabs({ tabs = [], value, defaultValue, onChange, variant = 'underline', className = '' }) {
  const [val, setVal] = React.useState(defaultValue || (tabs[0] && tabs[0].id));
  const cur = value !== undefined ? value : val;
  const active = tabs.find((t) => t.id === cur);
  const select = (id) => { setVal(id); if (onChange) onChange(id); };
  const onKey = (e, i) => { const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null; if (n === null) return; e.preventDefault(); const t = tabs[(n + tabs.length) % tabs.length]; select(t.id); document.getElementById('hs-tab-' + t.id)?.focus(); };
  return (
    <div className={'hs-tabs ' + (variant === 'pills' ? 'hs-tabs--pills ' : '') + className}>
      <div className="hs-tabs__list" role="tablist">
        {tabs.map((t, i) => <button key={t.id} id={'hs-tab-' + t.id} role="tab" type="button" className="hs-tabs__tab" aria-selected={cur === t.id} aria-controls={'hs-panel-' + t.id} tabIndex={cur === t.id ? 0 : -1} onClick={() => select(t.id)} onKeyDown={(e) => onKey(e, i)}>{t.label}</button>)}
      </div>
      {active && active.content !== undefined ? <div className="hs-tabs__panel" role="tabpanel" id={'hs-panel-' + active.id} aria-labelledby={'hs-tab-' + active.id}>{active.content}</div> : null}
    </div>
  );
}
