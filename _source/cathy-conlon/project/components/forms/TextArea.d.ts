import * as React from "react";
/** Multi-line input. `serif` switches to Newsreader for long-form writing (contact messages, submissions). */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  help?: string;
  error?: string;
  optional?: boolean;
  /** Reading typeface instead of UI sans, for prose the user writes. */
  serif?: boolean;
  rows?: number;
  /** With a controlled `value`, shows "n / max" in place of help. */
  maxLength?: number;
}
export declare function TextArea(props: TextAreaProps): JSX.Element;
