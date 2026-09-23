import React from 'react';
export function Textarea({ id, invalid = false, disabled = false, rows = 4, className = '', ...rest }) {
  const cls = ['hs-input', 'hs-input--textarea', invalid ? 'hs-input--invalid' : '', disabled ? 'hs-input--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <textarea id={id} rows={rows} disabled={disabled} aria-invalid={invalid || undefined} {...rest} />
    </div>
  );
}
