import * as React from "react";
/** Lays out 2–4 Buttons with system gap, or fuses them into a segmented control. */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fuse borders into one segmented bar (use secondary buttons). */
  attached?: boolean;
  align?: "start" | "end";
  /** Group name for screen readers when attached. */
  label?: string;
  children: React.ReactNode;
}
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
