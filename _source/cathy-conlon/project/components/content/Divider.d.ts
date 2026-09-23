import * as React from "react";
/** Hairline separator; ornament (◆) for section breaks inside prose; label for "Or" style dividers. */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "line" | "strong" | "ornament" | "label" | "vertical";
  /** Text for the label variant. */
  label?: string;
}
export declare function Divider(props: DividerProps): JSX.Element;
