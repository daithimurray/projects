import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function FormField({ id, label, hint, error, required = false, optional = false, children, className = '' }) {
  return (
    <div className={'hs-field ' + className}>
      {label ? (
        <label className="hs-field__label" htmlFor={id}>
          {label}
          {required ? <span className="hs-field__required" aria-hidden="true">*</span> : null}
          {optional ? <span className="hs-field__optional">(optional)</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <div className="hs-field__error" id={id ? id + '-error' : undefined} role="alert"><Icon name="alert-circle" size={16} />{error}</div> : hint ? <div className="hs-field__hint" id={id ? id + '-hint' : undefined}>{hint}</div> : null}
    </div>
  );
}
