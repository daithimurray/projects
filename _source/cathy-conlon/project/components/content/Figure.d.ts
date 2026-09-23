import * as React from "react";
/** Image with caption and photo credit. `mono` applies the house treatment (desaturated, warm). */
export interface FigureProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  /** Required for meaningful images; "" for decorative. */
  alt?: string;
  caption?: React.ReactNode;
  credit?: string;
  /** Monospace hint shown in the striped placeholder when src is absent. */
  placeholder?: string;
  /** CSS aspect-ratio, e.g. "3/2", "1/1", "16/9". */
  ratio?: string;
  /** Bleed 64px past the reading measure on each side. */
  wide?: boolean;
  /** Desaturate + warm, the house photographic treatment. */
  mono?: boolean;
}
export declare function Figure(props: FigureProps): JSX.Element;
