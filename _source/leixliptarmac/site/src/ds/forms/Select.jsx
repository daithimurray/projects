import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Select({ id, options = [], placeholder, invalid = false, disabled = false, size = 'md', className = '', ...rest }) {
  const cls = ['hs-input', 'hs-input--select', size !== 'md' ? 'hs-input--' + size : '', invalid ? 'hs-input--invalid' : '', disabled ? 'hs-input--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <select id={id} disabled={disabled} aria-invalid={invalid || undefined} defaultValue={rest.value === undefined && placeholder ? '' : undefined} {...rest}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => (typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>))}
      </select>
      <Icon name="chevron-down" size={18} className="hs-input__chev" />
    </div>
  );
}
