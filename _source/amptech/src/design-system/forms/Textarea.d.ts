/** Multi-line text input; vertical resize only. */
export interface TextareaProps { id?: string; value?: string; defaultValue?: string; placeholder?: string; rows?: number; invalid?: boolean; disabled?: boolean; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; style?: React.CSSProperties; }
export declare function Textarea(props: TextareaProps): JSX.Element;
