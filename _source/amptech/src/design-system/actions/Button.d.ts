/**
 * Primary call to action. One primary per view; secondary for alternatives; ghost for tertiary/inline; danger only for destructive confirms.
 * @startingPoint section="Actions" subtitle="Primary, secondary, ghost, danger — 3 sizes" viewport="700x260"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** primary = navy fill (one per view) · secondary = outlined · ghost = text · danger = red fill · inverse = white on navy · link = inline text */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "inverse" | "link";
  /** sm 36px · md 44px (default, min touch target) · lg 52px hero CTAs */
  size?: "sm" | "md" | "lg";
  /** Icon glyph name rendered before the label */
  iconLeft?: string;
  /** Icon glyph name rendered after the label (arrow-right for forward actions) */
  iconRight?: string;
  /** Replaces the left icon with a spinner and blocks interaction */
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Renders as <a> when provided */
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
