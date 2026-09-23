/**
 * Page hero: display heading, lede, primary + phone CTA, proof list, optional 4:5 media.
 * @startingPoint section="Marketing" subtitle="Display heading, two CTAs, proof points, media slot" viewport="1200x640"
 */
export interface HeroProps { eyebrow?: string; title: string; description?: string; primaryCta?: string; secondaryCta?: string | null; onPrimary?: () => void; onSecondary?: () => void; media?: React.ReactNode; /** Short verifiable facts shown with check icons */ proof?: string[]; inverse?: boolean; style?: React.CSSProperties; }
export declare function Hero(props: HeroProps): JSX.Element;
