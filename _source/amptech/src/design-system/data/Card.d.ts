/**
 * Container: white, 1px border, radius 16, inset 24. Interactive cards lift 1px with a soft shadow.
 * @startingPoint section="Data" subtitle="Bordered container, optional media and hover" viewport="700x260"
 */
export interface CardProps { children: React.ReactNode; padding?: number | string; interactive?: boolean; href?: string; onClick?: () => void; tone?: "default" | "sunken" | "brand" | "brand-subtle"; /** 16:9 media slot above content */ media?: React.ReactNode; className?: string; style?: React.CSSProperties; }
export declare function Card(props: CardProps): JSX.Element;
