/** Hierarchy trail; last item is the current page. Max 4 levels. */
export interface BreadcrumbItem { label: string; href?: string }
export interface BreadcrumbProps { items: BreadcrumbItem[]; style?: React.CSSProperties; }
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
