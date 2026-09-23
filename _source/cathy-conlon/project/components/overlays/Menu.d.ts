import * as React from "react";
export interface MenuItem { type?: "item" | "separator" | "label"; label?: string; icon?: React.ReactNode; hint?: string; href?: string; onSelect?: () => void; checked?: boolean; disabled?: boolean; danger?: boolean }
/** Dropdown of actions or options anchored to a trigger. Arrow keys, Esc, click-outside. */
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A Button or IconButton; receives aria-haspopup/expanded. */
  trigger: React.ReactElement;
  items: MenuItem[];
  align?: "start" | "end";
  /** Render the open list inline, for documentation. */
  staticPreview?: boolean;
  label?: string;
}
export declare function Menu(props: MenuProps): JSX.Element;
