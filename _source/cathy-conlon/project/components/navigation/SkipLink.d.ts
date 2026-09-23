import * as React from "react";
/** First focusable element on every page; visible only on focus. Target must have tabIndex={-1}. */
export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}
export declare function SkipLink(props: SkipLinkProps): JSX.Element;
