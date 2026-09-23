import * as React from "react";
/**
 * Primary call to action. One primary per view; secondary for the alternative; tertiary for quiet in-context actions.
 * @startingPoint section="Actions" subtitle="Primary, secondary, tertiary, accent, danger, link" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. primary = ink fill; secondary = hairline outline; tertiary = text only; accent = sienna fill (one per page, e.g. "Buy the book"); danger = destructive; link = inline text link styling. */
  variant?: "primary" | "secondary" | "tertiary" | "accent" | "danger" | "link";
  /** md = 44px (default, touch minimum); sm = 32px for dense UI; lg = 52px for hero CTAs. */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width (mobile forms). */
  block?: boolean;
  /** Shows a spinner, hides the label, disables interaction. Keep the label in the DOM for width stability. */
  loading?: boolean;
  disabled?: boolean;
  /** Glyph or icon node before the label; aria-hidden automatically. */
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  /** Renders an <a> when present. Use for navigation; use <button> for actions. */
  href?: string;
  children: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
