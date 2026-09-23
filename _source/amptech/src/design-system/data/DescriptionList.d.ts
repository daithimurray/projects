/** Key/value specs (grade, standard, warranty, cert number). */
export interface DescriptionItem { term: string; detail: React.ReactNode; mono?: boolean }
export interface DescriptionListProps { items: DescriptionItem[]; columns?: 1 | 2 | 3; style?: React.CSSProperties; }
export declare function DescriptionList(props: DescriptionListProps): JSX.Element;
