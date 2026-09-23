/** Dropdown action menu anchored to a trigger. Items may include "divider". */
export interface MenuItemDef { label: string; icon?: string; danger?: boolean; disabled?: boolean; shortcut?: string; onSelect?: () => void }
export interface MenuProps { trigger: React.ReactNode; items: (MenuItemDef | "divider")[]; align?: "start" | "end"; style?: React.CSSProperties; }
export declare function Menu(props: MenuProps): JSX.Element;
