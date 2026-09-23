/** Row of accreditations / guarantees (PSA licence, standards, insurance). Use real logos when supplied. */
export interface TrustItem { label: string; detail?: string; icon?: string; logo?: React.ReactNode }
export interface TrustBarProps { items: TrustItem[]; label?: string; style?: React.CSSProperties; }
export declare function TrustBar(props: TrustBarProps): JSX.Element;
