/** Big number + label for proof points (years trading, systems installed, response time). */
export interface StatProps { value: string; label: string; hint?: string; icon?: string; align?: "left" | "center"; size?: "md" | "lg"; style?: React.CSSProperties; }
export declare function Stat(props: StatProps): JSX.Element;
