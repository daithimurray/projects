/** Inline or standalone text link. Underline on hover only; arrow variant for "see more" links. */
export interface TextLinkProps {
  children: React.ReactNode;
  href?: string;
  /** Opens in new tab with external icon */
  external?: boolean;
  /** Trailing arrow that nudges on hover */
  arrow?: boolean;
  size?: "sm" | "md";
  /** Secondary-coloured link for footers/meta */
  muted?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
