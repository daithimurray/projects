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
export function TextField({ id, label, help, error, optional, disabled, size = "md", prefix, suffix, className, ...rest }) {
  const input = (a) => <input id={id} className={cx("ih-input", size === "sm" && "ih-input--sm", className)} disabled={disabled} {...a} {...rest} />;
  return <Field id={id} label={label} help={help} error={error} optional={optional} disabled={disabled}>
    {(a) => (prefix || suffix) ? <div className={cx("ih-inputwrap", prefix && "ih-inputwrap--start", suffix && "ih-inputwrap--end")}>
      {prefix && <span className="ih-inputwrap__affix ih-inputwrap__affix--start" aria-hidden="true">{prefix}</span>}
      {input(a)}
      {suffix && <span className="ih-inputwrap__affix ih-inputwrap__affix--end" aria-hidden="true">{suffix}</span>}
    </div> : input(a)}
  </Field>;
}
