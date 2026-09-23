/** Package/tier card. Prices are "from" guides — the CTA is always a survey, never checkout. */
export interface PricingCardProps { name: string; price: string; period?: string; description?: string; features?: string[]; cta?: string; highlighted?: boolean; badge?: string; onCta?: () => void; style?: React.CSSProperties; }
export declare function PricingCard(props: PricingCardProps): JSX.Element;
