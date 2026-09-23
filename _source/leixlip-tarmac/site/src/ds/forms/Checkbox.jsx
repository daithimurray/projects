import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Checkbox({ id, label, description, checked, defaultChecked, indeterminate = false, disabled = false, invalid = false, onChange, className = '', ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const cls = ['hs-check', disabled ? 'hs-check--disabled' : '', invalid ? 'hs-check--invalid' : '', className].filter(Boolean).join(' ');
  return (
    <label className={cls} htmlFor={id}>
      <input ref={ref} id={id} type="checkbox" checked={checked} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} aria-invalid={invalid || undefined} {...rest} />
      <span className="hs-check__box" aria-hidden="true"><Icon name={indeterminate ? 'minus' : 'check'} /></span>
      {label ? <span className="hs-check__text"><span>{label}</span>{description ? <span className="hs-check__desc">{description}</span> : null}</span> : null}
    </label>
  );
}
