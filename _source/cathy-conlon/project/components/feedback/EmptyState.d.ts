import * as React from "react";
/** No-results / nothing-yet state. A typographic glyph, a warm one-line title, one way forward. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Typographic mark: "¶", "◦", "·". No illustrations. */
  glyph?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  compact?: boolean;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
