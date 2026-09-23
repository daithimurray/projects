import * as React from "react";
/** Topic chip (grief, memory, form: farm). Link to a filtered archive, toggle as a filter, or removable in an editor. */
export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders as a link. */
  href?: string;
  /** Renders as a toggle button with aria-pressed. */
  onClick?: React.MouseEventHandler;
  selected?: boolean;
  /** Adds × remove control. */
  onRemove?: () => void;
  size?: "sm" | "md";
  children: React.ReactNode;
}
export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> { label?: string; children: React.ReactNode }
export declare function Tag(props: TagProps): JSX.Element;
export declare function TagList(props: TagListProps): JSX.Element;
