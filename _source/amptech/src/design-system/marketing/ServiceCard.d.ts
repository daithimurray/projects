/** Service tile: icon, title, description, feature list, link. Use shield / camera / flame for the three services. */
export interface ServiceCardProps { icon?: string; title: string; description: string; features?: string[]; href?: string; cta?: string; className?: string; style?: React.CSSProperties; }
export declare function ServiceCard(props: ServiceCardProps): JSX.Element;
