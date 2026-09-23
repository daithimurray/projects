import * as React from "react";
/** Side panel for secondary content that keeps page context: mobile menu, filters, a poem's notes, cart. */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  title: string;
  side?: "right" | "left" | "bottom";
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Render inline without scrim, for documentation. */
  staticPreview?: boolean;
}
export declare function Drawer(props: DrawerProps): JSX.Element | null;
