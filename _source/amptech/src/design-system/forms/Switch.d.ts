/** On/off toggle with immediate effect (no submit). Label on the left, switch on the right. */
export interface SwitchProps { id?: string; label?: string; description?: string; checked?: boolean; defaultChecked?: boolean; disabled?: boolean; size?: "sm" | "md"; onChange?: (checked: boolean) => void; style?: React.CSSProperties; }
export declare function Switch(props: SwitchProps): JSX.Element;
