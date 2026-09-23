import * as React from "react";
/** Author line under a title: optional avatar, name, role, date, read time. */
export interface BylineProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** URL; pass null for an initial-letter placeholder; omit for no avatar. */
  avatar?: string | null;
  role?: string;
  date?: string;
  readTime?: string;
}
export declare function Byline(props: BylineProps): JSX.Element;
