/** Lays out a set of buttons with system gap (8px). Primary goes last (right) on desktop, first (top) when stacked. */
export interface ButtonGroupProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end" | "between";
  direction?: "row" | "column";
  gap?: number;
  wrap?: boolean;
  style?: React.CSSProperties;
}
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
