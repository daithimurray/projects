import * as React from "react";
/** Transient confirmation (Saved · Copied · Subscribed). Bottom-centre, ink on paper-inverse, auto-dismiss ≈ 5s. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  tone?: "neutral" | "success" | "error";
  /** Single optional action label (Undo). */
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}
export interface ToastRegionProps extends React.HTMLAttributes<HTMLDivElement> { children: React.ReactNode }
export declare function Toast(props: ToastProps): JSX.Element;
export declare function ToastRegion(props: ToastRegionProps): JSX.Element;
