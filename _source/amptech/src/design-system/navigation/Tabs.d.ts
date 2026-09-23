/** Underline tabs for switching views within a page. 2–6 items. */
export interface TabItem { value: string; label: string; icon?: string; count?: number }
export interface TabsProps { items: TabItem[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; children?: React.ReactNode | ((current: string) => React.ReactNode); style?: React.CSSProperties; }
export declare function Tabs(props: TabsProps): JSX.Element;
