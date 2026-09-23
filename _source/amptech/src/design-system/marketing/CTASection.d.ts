/** Closing navy band with the survey CTA and phone number. One per page, before the footer. */
export interface CTASectionProps { title: string; description?: string; primaryCta?: string; secondaryCta?: string | null; onPrimary?: () => void; onSecondary?: () => void; compact?: boolean; style?: React.CSSProperties; }
export declare function CTASection(props: CTASectionProps): JSX.Element;
