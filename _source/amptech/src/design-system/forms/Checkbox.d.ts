/** 20px checkbox with label/description. Use for independent multi-select options. */
export interface CheckboxProps { id?: string; label?: string; description?: string; checked?: boolean; defaultChecked?: boolean; indeterminate?: boolean; disabled?: boolean; invalid?: boolean; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; style?: React.CSSProperties; }
export declare function Checkbox(props: CheckboxProps): JSX.Element;
