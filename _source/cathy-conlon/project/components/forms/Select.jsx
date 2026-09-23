import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

function Field({ id, label, help, error, optional, disabled, children }) {
  const helpId = help ? id + "-help" : undefined, errId = error ? id + "-err" : undefined;
  return <div className={cx("ih-field", disabled && "ih-field--disabled")}>
    {label && <label className="ih-field__label" htmlFor={id}>{label}{optional && <span className="ih-field__optional">Optional</span>}</label>}
    {children({ "aria-describedby": [helpId, errId].filter(Boolean).join(" ") || undefined, "aria-invalid": error ? "true" : undefined })}
    {help && !error && <p className="ih-field__help" id={helpId}>{help}</p>}
    {error && <p className="ih-field__error" id={errId} role="alert">{error}</p>}
  </div>;
}
export function Select({ id, label, help, error, optional, disabled, options = [], placeholder, className, ...rest }) {
  return <Field id={id} label={label} help={help} error={error} optional={optional} disabled={disabled}>
    {(a) => <div className="ih-selectwrap"><select id={id} className={cx("ih-select", className)} disabled={disabled} {...a} {...rest}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => typeof o === "string" ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>)}
    </select></div>}
  </Field>;
}
