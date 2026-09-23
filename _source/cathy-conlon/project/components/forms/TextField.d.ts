import * as React from "react";
/**
 * Single-line text input with label, help and error wired via aria-describedby.
 * @startingPoint section="Forms" subtitle="Label, help, error, prefix/suffix" viewport="700x220"
 */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Required: ties label, help and error together. */
  id: string;
  label?: string;
  /** Guidance shown below; hidden when an error is present. */
  help?: string;
  /** Validation message; sets aria-invalid and role=alert. */
  error?: string;
  /** Shows "Optional" beside the label. Mark optional fields, not required ones. */
  optional?: boolean;
  size?: "sm" | "md";
  /** Decorative glyph/text before the value (e.g. @). */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
