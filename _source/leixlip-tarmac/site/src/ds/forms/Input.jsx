import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Input({ id, size = 'md', invalid = false, disabled = false, prefix, suffix, icon, className = '', ...rest }) {
  const cls = ['hs-input', size !== 'md' ? 'hs-input--' + size : '', invalid ? 'hs-input--invalid' : '', disabled ? 'hs-input--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {icon ? <Icon name={icon} size={18} style={{ color: 'var(--hs-text-3)' }} /> : null}
      {prefix ? <span className="hs-input__affix">{prefix}</span> : null}
      <input id={id} disabled={disabled} aria-invalid={invalid || undefined} aria-describedby={id ? (invalid ? id + '-error' : id + '-hint') : undefined} {...rest} />
      {suffix ? <span className="hs-input__affix">{suffix}</span> : null}
    </div>
  );
}
