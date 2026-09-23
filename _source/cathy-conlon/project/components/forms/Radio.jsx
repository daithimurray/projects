import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Radio({ id, name, label, description, disabled, className, ...rest }) {
  return <label className={cx("ih-check ih-radio", disabled && "ih-check--disabled", className)} htmlFor={id}>
    <input id={id} name={name} type="radio" disabled={disabled} {...rest} />
    <span className="ih-check__box" aria-hidden="true"></span>
    <span className="ih-check__text"><span>{label}</span>{description && <span className="ih-check__desc">{description}</span>}</span>
  </label>;
}
export function RadioGroup({ legend, inline = false, className, children, ...rest }) {
  return <fieldset className={cx("ih-radiogroup", inline && "ih-radiogroup--inline", className)} {...rest}>{legend && <legend>{legend}</legend>}{children}</fieldset>;
}
