/** Side panel for mobile nav, filters or detail views. */
export interface DrawerProps { open: boolean; title?: string; children?: React.ReactNode; footer?: React.ReactNode; side?: "left" | "right"; width?: number; onClose?: () => void; style?: React.CSSProperties; }
export declare function Drawer(props: DrawerProps): JSX.Element | null;
