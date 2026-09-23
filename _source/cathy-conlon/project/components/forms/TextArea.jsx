import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");

function Field({ id, label, help, error, optional, disabled, children }) {
  const helpId = help ? id + "-help" : undefined, errId = error ? id + "-err" : undefined;
  return <div className={cx("ih-field", disabled && "ih-field--disabled")}>
    {label && <label className="ih-field__label" htmlFor={id}>{label}{optional && <span className="ih-field__optional">Optional</span>}</label>}
    {children({ "aria-describedby": [helpId, errId].filter(Boolean).join(" ") || undefined, "aria-invalid": error ? "true" : undefined })}
    {help && !error && <p className="ih-field__help" id={helpId}>{help}</p>}
    {error && <p className="ih-field__error" id={errId}>{error}</p>}
  </div>;
}
export function TextArea({ id, label, help, error, optional, disabled, serif = false, rows = 5, maxLength, value, className, ...rest }) {
  const count = maxLength != null && typeof value === "string";
  return <Field id={id} label={label} help={count ? `${value.length} / ${maxLength}` : help} error={error} optional={optional} disabled={disabled}>
    {(a) => <textarea id={id} rows={rows} maxLength={maxLength} value={value} className={cx("ih-textarea", serif && "ih-textarea--serif", className)} disabled={disabled} {...a} {...rest} />}
  </Field>;
}
