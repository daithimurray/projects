/** Pill for filters and selections. Interactive when onClick is set; removable shows an × control. */
export interface TagProps { children: React.ReactNode; selected?: boolean; removable?: boolean; icon?: string; onClick?: () => void; onRemove?: () => void; style?: React.CSSProperties; }
export declare function Tag(props: TagProps): JSX.Element;
