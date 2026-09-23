import * as React from "react";
/** Instant on/off setting (dark mode, notifications). Takes effect immediately, no Save button. Use Checkbox for form consent. */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  labelPosition?: "start" | "end";
}
export declare function Switch(props: SwitchProps): JSX.Element;
