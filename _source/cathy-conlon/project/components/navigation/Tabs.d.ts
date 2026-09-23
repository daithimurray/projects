import * as React from "react";
export interface TabItem { value: string; label: string; content?: React.ReactNode; count?: number; disabled?: boolean }
/** Switch between peer views (Upcoming / Past events; Poems / Essays). Arrow keys move focus. */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** underline = hairline with ink indicator; pills = filled capsule for filters. */
  variant?: "underline" | "pills";
  /** Prefix for generated ids; unique per page. */
  id?: string;
}
export declare function Tabs(props: TabsProps): JSX.Element;
