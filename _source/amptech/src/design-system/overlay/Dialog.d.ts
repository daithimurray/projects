/** Modal dialog. Escape and backdrop close; footer holds Cancel (secondary) + confirm (primary/danger). */
export interface DialogProps { open: boolean; title: string; description?: string; children?: React.ReactNode; footer?: React.ReactNode; size?: "sm" | "md" | "lg"; onClose?: () => void; style?: React.CSSProperties; }
export declare function Dialog(props: DialogProps): JSX.Element | null;
