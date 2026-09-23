import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Stat({ value, suffix, label, icon, accent = false, className = '' }) {
  return (
    <div className={'hs-stat ' + (accent ? 'hs-stat--accent ' : '') + className}>
      <div className="hs-stat__value">{value}{suffix ? <sup>{suffix}</sup> : null}</div>
      <div className="hs-stat__label">{icon ? <Icon name={icon} size={16} style={{ marginRight: 6 }} /> : null}{label}</div>
    </div>
  );
}
export function StatRow({ children, className = '' }) { return <div className={'hs-stat-row ' + className}>{children}</div>; }
