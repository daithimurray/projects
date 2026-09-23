import * as React from "react";
/** Journal / essay teaser: optional 3:2 image, sienna kicker, Cormorant title, excerpt, date. */
export interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  excerpt?: string;
  /** Category overline in sienna: "Essay", "Notebook", "News". */
  kicker?: string;
  date?: string;
  readTime?: string;
  /** URL; pass null for a placeholder, omit for no media. */
  image?: string | null;
  href?: string;
  /** column = image on top; compact = text-only hairline row; hero = headline-size title. */
  layout?: "column" | "compact" | "hero";
}
export declare function PostCard(props: PostCardProps): JSX.Element;
