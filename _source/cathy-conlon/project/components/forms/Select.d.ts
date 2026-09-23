import * as React from "react";
export interface SelectOption { value: string; label: string; disabled?: boolean }
/** Native select styled to match TextField. Use for 5+ options; use Radio for ≤ 4. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  help?: string;
  error?: string;
  optional?: boolean;
  /** Strings or {value,label}. */
  options: Array<string | SelectOption>;
  /** Disabled first option shown when value is "". */
  placeholder?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
