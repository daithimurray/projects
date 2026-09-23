import * as React from "react";
/** Short supplementary text on hover/focus. Never the only place information lives. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: React.ReactNode;
  placement?: "top" | "bottom";
  id?: string;
  /** A single focusable child (IconButton, Button, TextLink). */
  children: React.ReactElement;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
