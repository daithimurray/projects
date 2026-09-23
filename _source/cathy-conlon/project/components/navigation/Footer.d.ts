import * as React from "react";
export interface FooterColumn { title: string; links: Array<{ label: string; href: string }> }
/** Site footer: wordmark + italic tagline, up to three link columns, copyright row. */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  /** A short italic line, a fragment of verse works well. */
  tagline?: string;
  columns?: FooterColumn[];
  /** Defaults to "© {year} {name}". */
  copyright?: string;
  /** Privacy, Colophon, etc. */
  bottomLinks?: Array<{ label: string; href: string }>;
}
export declare function Footer(props: FooterProps): JSX.Element;
