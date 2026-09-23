import * as React from "react";
/** Square 44px (or 32px) button holding a single glyph. `label` is required, it becomes aria-label and tooltip. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name. Required. */
  label: string;
  /** ghost = no border (default); outline = hairline border. */
  variant?: "ghost" | "outline";
  size?: "sm" | "md";
  /** Circular. Use for avatar-adjacent or floating actions. */
  round?: boolean;
  /** Toggle state (e.g. bookmark). Filled ink when true. */
  pressed?: boolean;
  href?: string;
  /** The glyph. Unicode (×, ☰, ↗) or an inline SVG at 1.5px stroke. */
  children: React.ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
