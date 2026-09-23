import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Switch({ id, label, checked = false, onChange, disabled, size = "md", labelPosition = "end", className, ...rest }) {
  const btn = <button id={id} type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange && onChange(!checked)} className="ih-switch__track" {...rest}></button>;
  return <label className={cx("ih-switch", size === "sm" && "ih-switch--sm", className)} htmlFor={id}>
    {labelPosition === "start" && <span>{label}</span>}{btn}{labelPosition === "end" && <span>{label}</span>}
  </label>;
}
