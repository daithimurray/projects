/** Inline message block. danger/warning announce via role=alert. Keep to one sentence + optional action. */
export interface AlertProps { title?: string; children?: React.ReactNode; tone?: "neutral" | "brand" | "success" | "warning" | "danger" | "info"; action?: React.ReactNode; dismissible?: boolean; onDismiss?: () => void; style?: React.CSSProperties; }
export declare function Alert(props: AlertProps): JSX.Element;
