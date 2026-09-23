/** Native select with system chrome. Use for 5+ options; use Radio for ≤4. */
export interface SelectOption { value: string; label: string; disabled?: boolean }
export interface SelectProps { id?: string; value?: string; defaultValue?: string; options: (string | SelectOption)[]; placeholder?: string; invalid?: boolean; disabled?: boolean; size?: "sm" | "md"; onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
