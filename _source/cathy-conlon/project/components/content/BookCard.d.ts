import * as React from "react";
/**
 * A book: 2:3 cover with paper-edge shadow, Cormorant title, caption meta, optional blurb and buy actions.
 * @startingPoint section="Content" subtitle="Cover, title, meta, blurb, buy actions" viewport="700x420"
 */
export interface BookCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  year?: string | number;
  publisher?: string;
  /** "Poetry", "Novel", "Essays"… */
  kind?: string;
  /** Cover image URL. Omit for a striped placeholder with the title. */
  cover?: string;
  blurb?: string;
  /** Wraps the whole card in a link. Don't combine with `actions`. */
  href?: string;
  /** column = cover above (grids); row = cover left (lists, featured). */
  layout?: "column" | "row";
  /** Larger title for the lead book. */
  featured?: boolean;
  /** "New" / "Forthcoming" badge on the cover. */
  tag?: string;
  /** Buttons/links row (Buy, Read excerpt). */
  actions?: React.ReactNode;
}
export declare function BookCard(props: BookCardProps): JSX.Element;
