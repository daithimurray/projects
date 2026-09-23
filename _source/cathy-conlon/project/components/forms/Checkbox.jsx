import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function Checkbox({ id, label, description, checked, indeterminate = false, disabled, error, className, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return <label className={cx("ih-check", disabled && "ih-check--disabled", className)} htmlFor={id}>
    <input ref={ref} id={id} type="checkbox" checked={checked} disabled={disabled} aria-invalid={error || undefined} aria-describedby={description ? id + "-d" : undefined} {...rest} />
    <span className="ih-check__box" aria-hidden="true"></span>
    <span className="ih-check__text"><span>{label}</span>{description && <span className="ih-check__desc" id={id + "-d"}>{description}</span>}</span>
  </label>;
}
