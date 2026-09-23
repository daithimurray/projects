import * as React from "react";
/**
 * Modal for a decision or a short task (confirm, subscribe, share). Traps focus, closes on Esc and scrim click, restores focus.
 * @startingPoint section="Overlays" subtitle="Title, description, body, footer actions" viewport="700x360"
 */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  /** sm 24rem · md 32rem · lg 44rem. */
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  /** Buttons, right-aligned; primary last. */
  footer?: React.ReactNode;
  /** Render inline without scrim/focus trap, for documentation. */
  staticPreview?: boolean;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
