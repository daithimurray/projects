import * as React from "react";
/** Inline, persistent message tied to a region (form error summary, event cancelled, pre-order notice). */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** neutral = paper with hairline; others tint with the semantic soft colour. */
  tone?: "neutral" | "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  /** TextLinks or small tertiary Buttons. */
  actions?: React.ReactNode;
  /** Shows ×; omit for non-dismissible. */
  onDismiss?: () => void;
}
export declare function Alert(props: AlertProps): JSX.Element;
