import * as React from "react";
/** One-of-many choice. Always inside RadioGroup with a legend. Use for ≤ 4 options; otherwise Select. */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}
export interface RadioGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  /** Horizontal layout for short labels. */
  inline?: boolean;
  children: React.ReactNode;
}
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
