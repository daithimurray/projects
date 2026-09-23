/** Data table: uppercase caption headers, hairline rows, hover highlight. mono columns for IDs/model numbers. */
export interface TableColumn { key: string; label: string; align?: "left" | "right" | "center"; mono?: boolean; render?: (value: any, row: any) => React.ReactNode }
export interface TableProps { columns: TableColumn[]; rows: Record<string, any>[]; caption?: string; dense?: boolean; striped?: boolean; style?: React.CSSProperties; }
export declare function Table(props: TableProps): JSX.Element;
