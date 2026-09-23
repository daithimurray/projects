import * as React from "react";
/** Loading placeholder shaped like the content it replaces. Shimmer respects reduced motion. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  /** text = line(s); title = 60% wide heading; circle = avatar; media = 3:2; cover = 2:3. */
  variant?: "text" | "title" | "circle" | "media" | "cover";
  width?: string | number;
  height?: string | number;
  /** Text only: number of lines; last is 70% wide. */
  lines?: number;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
