import * as React from "react";
/** Horizontal container: 1200px max with fluid margins, or reading (38rem) / wide (48rem) measures. */
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  width?: "default" | "reading" | "wide" | "fluid";
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
/** 12-column CSS grid with the system gutter. */
export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  /** Adds 48px row gap for card grids. */
  rows?: boolean;
  children: React.ReactNode;
}
/** Grid cell. span/start are in columns (1–12). */
export interface ColProps extends React.HTMLAttributes<HTMLElement> {
  span?: number;
  start?: number;
  md?: number; lg?: number;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
export declare function Container(props: ContainerProps): JSX.Element;
export declare function Grid(props: GridProps): JSX.Element;
export declare function Col(props: ColProps): JSX.Element;
