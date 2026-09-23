/** Empty list/result placeholder with one suggested action. */
export interface EmptyStateProps { icon?: string; title: string; description?: string; action?: React.ReactNode; compact?: boolean; style?: React.CSSProperties; }
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
