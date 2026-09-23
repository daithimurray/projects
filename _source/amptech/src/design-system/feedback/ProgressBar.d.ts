/** Determinate progress (multi-step forms, uploads). */
export interface ProgressBarProps { value?: number; max?: number; label?: string; showValue?: boolean; tone?: "brand" | "success" | "warning" | "danger"; size?: "sm" | "md"; style?: React.CSSProperties; }
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
