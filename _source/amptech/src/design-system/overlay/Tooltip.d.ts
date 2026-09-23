/** Short label on hover/focus for icon-only controls or abbreviations. Never holds essential info. */
export interface TooltipProps { content: string; children: React.ReactNode; placement?: "top" | "bottom" | "left" | "right"; style?: React.CSSProperties; }
export declare function Tooltip(props: TooltipProps): JSX.Element;
