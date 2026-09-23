import * as React from "react";
/** A reading or appearance: big Cormorant day numeral, month overline, title, venue, time. */
export interface EventCardProps extends React.HTMLAttributes<HTMLElement> {
  /** ISO string or Date. */
  date: string | Date;
  title: string;
  venue?: string;
  city?: string;
  /** "7:30 pm", display string, local to the venue. */
  time?: string;
  /** "Reading", "Launch", "Workshop", "In conversation". */
  kind?: string;
  href?: string;
  /** Mutes the row; shown in Past tab. */
  past?: boolean;
  soldOut?: boolean;
  /** row = hairline list item (default); card = bordered card for grids. */
  layout?: "row" | "card";
  actions?: React.ReactNode;
}
export declare function EventCard(props: EventCardProps): JSX.Element;
