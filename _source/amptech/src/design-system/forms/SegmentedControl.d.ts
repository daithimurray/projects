/** Inline exclusive picker for 2–4 short options (Home / Business, Monthly / Yearly). */
export interface SegmentOption { value: string; label: string; icon?: string }
export interface SegmentedControlProps { options: (string | SegmentOption)[]; value?: string; defaultValue?: string; size?: "sm" | "md"; fullWidth?: boolean; onChange?: (value: string) => void; style?: React.CSSProperties; }
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
