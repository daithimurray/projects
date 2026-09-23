/** Live system state indicator (armed, fault, offline). Pulse only for live/monitoring states. */
export interface StatusDotProps { status?: "neutral" | "brand" | "success" | "warning" | "danger" | "info"; label?: string; pulse?: boolean; size?: number; style?: React.CSSProperties; }
export declare function StatusDot(props: StatusDotProps): JSX.Element;
