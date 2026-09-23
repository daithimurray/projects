import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function TrustBar({ items = [], inverse = false, className = '' }) {
  return (
    <div className={'hs-trust ' + (inverse ? 'hs-trust--inverse ' : '') + className}>
      {items.map((it) => <span key={it.label} className="hs-trust__item"><Icon name={it.icon || 'check-circle'} />{it.strong ? <strong>{it.strong}</strong> : null}{it.label}</span>)}
    </div>
  );
}
