import * as React from "react";
/** Pill-shaped search input with glyph, keyboard hint and clear button. */
export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  id?: string;
  /** aria-label; there is no visible label. */
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
  /** e.g. "⌘K", shown when empty. */
  shortcut?: string;
  size?: "sm" | "md";
}
export declare function SearchField(props: SearchFieldProps): JSX.Element;
