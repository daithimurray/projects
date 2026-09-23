import React from "react";
export function useInteractive(disabled) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const handlers = disabled ? {} : {
    onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setActive(false); },
    onMouseDown: () => setActive(true), onMouseUp: () => setActive(false),
    onFocus: () => setFocus(true), onBlur: () => setFocus(false),
  };
  return { hover, active, focus, handlers };
}
export const focusRing = (focus) => focus ? { boxShadow: "var(--focus-ring)" } : {};
export const transition = (props = "background-color, color, border-color, box-shadow, transform") => ({ transition: props.split(",").map(p => p.trim() + " var(--duration-fast) var(--ease-standard)").join(", ") });
