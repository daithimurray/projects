import * as React from "react";
/** Page navigation for the archive and journal. Numbered for ≤ ~20 pages; simple Newer/Older for chronological feeds. */
export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  total: number;
  /** Controlled handler; prevents default on links. */
  onChange?: (page: number) => void;
  /** Produce hrefs for real navigation / SEO. */
  hrefFor?: (page: number) => string;
  variant?: "numbered" | "simple";
  label?: string;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
