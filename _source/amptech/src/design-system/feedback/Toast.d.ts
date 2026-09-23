/** Transient confirmation (bottom-left, 5s, stacks upward). Inverse navy surface. */
export interface ToastProps { title: string; description?: string; tone?: "neutral" | "success" | "warning" | "danger" | "info"; action?: { label: string; onClick: () => void }; onDismiss?: () => void; style?: React.CSSProperties; }
export declare function Toast(props: ToastProps): JSX.Element;
