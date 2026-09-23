/** Eyebrow + heading + lede that opens every page section. */
export interface SectionHeaderProps { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; level?: 1 | 2 | 3; action?: React.ReactNode; style?: React.CSSProperties; }
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
