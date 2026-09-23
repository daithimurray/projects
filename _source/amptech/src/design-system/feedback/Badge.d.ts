/** Small status label. Tone maps to system status colours; red only for alarm/fault. */
export interface BadgeProps { children: React.ReactNode; tone?: "neutral" | "brand" | "success" | "warning" | "danger" | "info"; dot?: boolean; size?: "sm" | "md"; style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;
