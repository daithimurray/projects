import * as React from "react";
/** Inline or standalone text link. Underlined by default, never colour alone. */
export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  /** default = underlined in running text; quiet = underline on hover only (nav, lists); arrow = label + → for "see all" links. */
  variant?: "default" | "quiet" | "arrow";
  /** Opens in a new tab with ↗ suffix and hidden "(opens in new tab)" text. */
  external?: boolean;
  children: React.ReactNode;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
