import * as React from "react";
/**
 * Page opener with the display type level. One per page. Title may include <em> for an italic word.
 * @startingPoint section="Layout" subtitle="Display title, lede, actions, optional media" viewport="1200x560"
 */
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  actions?: React.ReactNode;
  /** Figure or BookCard on the right in split layout. */
  media?: React.ReactNode;
  layout?: "left" | "centered" | "split";
}
export declare function Hero(props: HeroProps): JSX.Element;
