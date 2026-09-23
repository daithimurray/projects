/** Label + control + hint/error wrapper. Wrap every Input/Select/Textarea in one. */
export interface FormFieldProps {
  label?: string;
  /** id of the control, for label association */
  htmlFor?: string;
  hint?: string;
  /** Replaces hint; renders in danger colour with icon and role=alert */
  error?: string;
  required?: boolean;
  /** Shows an "Optional" suffix — prefer marking optional over required */
  optional?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function FormField(props: FormFieldProps): JSX.Element;
