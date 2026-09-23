import * as React from "react";
/** Binary choice with a 20px box; ink fill when checked. Supports indeterminate for "select all". */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: React.ReactNode;
  /** Secondary line under the label. */
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Marks invalid (madder border), e.g. required consent unchecked. */
  error?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
