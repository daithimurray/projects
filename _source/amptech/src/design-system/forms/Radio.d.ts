/** Radio group for 2–4 mutually exclusive options; description per option optional. */
export interface RadioOption { value: string; label: string; description?: string; disabled?: boolean }
export interface RadioProps { name: string; options: RadioOption[]; value?: string; defaultValue?: string; direction?: "row" | "column"; disabled?: boolean; onChange?: (value: string) => void; style?: React.CSSProperties; }
export declare function Radio(props: RadioProps): JSX.Element;
