/** Page navigation for lists (case studies, news). Collapses to 1 … n-1 n n+1 … last. */
export interface PaginationProps { page: number; pageCount: number; onChange?: (page: number) => void; style?: React.CSSProperties; }
export declare function Pagination(props: PaginationProps): JSX.Element;
