import React from 'react';
export function Radio({ id, name, value, label, description, checked, defaultChecked, disabled = false, onChange, card = false, className = '', ...rest }) {
  const cls = [card ? 'hs-choice-card' : 'hs-check', 'hs-radio', disabled ? 'hs-check--disabled' : '', className].filter(Boolean).join(' ');
  return (
    <label className={cls} htmlFor={id}>
      <input id={id} type="radio" name={name} value={value} checked={checked} defaultChecked={defaultChecked} disabled={disabled} onChange={onChange} {...rest} />
      <span className="hs-check__box" aria-hidden="true"><span className="hs-check__dot" /></span>
      <span className="hs-check__text"><span style={card ? { fontWeight: 600 } : undefined}>{label}</span>{description ? <span className="hs-check__desc">{description}</span> : null}</span>
    </label>
  );
}
export function RadioGroup({ legend, name, options = [], value, defaultValue, onChange, row = false, card = false, className = '' }) {
  const [val, setVal] = React.useState(defaultValue);
  const cur = value !== undefined ? value : val;
  const handle = (e) => { setVal(e.target.value); if (onChange) onChange(e.target.value); };
  return (
    <fieldset className={'hs-radio-group ' + (row ? 'hs-radio-group--row ' : '') + className} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
      {legend ? <legend className="hs-radio-group__legend">{legend}</legend> : null}
      {options.map((o) => <Radio key={o.value} id={name + '-' + o.value} name={name} value={o.value} label={o.label} description={o.description} checked={cur === o.value} onChange={handle} disabled={o.disabled} card={card} />)}
    </fieldset>
  );
}
