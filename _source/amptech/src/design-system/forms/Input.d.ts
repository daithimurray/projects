/** Single-line text input. 44px tall; 10px radius; navy focus ring. */
export interface InputProps {
  id?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** Leading glyph name (search, mail, phone…) */
  iconLeft?: string;
  /** Trailing unit/text, e.g. "m²" */
  suffix?: string;
  invalid?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Passed through to the <input> */
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
