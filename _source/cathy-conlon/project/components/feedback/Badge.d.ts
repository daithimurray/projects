import * as React from "react";
/** Small uppercase status label: New, Forthcoming, Sold out, Draft. Not interactive. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "inverse" | "outline" | "success" | "warning" | "error" | "info";
  /** Leading status dot. */
  dot?: boolean;
  /** Numeric pill (tab counts). */
  count?: boolean;
  children: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
