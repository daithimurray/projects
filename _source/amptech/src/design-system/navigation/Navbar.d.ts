/**
 * Site header: wordmark, primary links, phone number, one CTA. Translucent warm-white with blur when sticky.
 * Responsive: phone collapses to an icon below 1120px; links collapse into a menu button + Drawer below 960px.
 * @startingPoint section="Navigation" subtitle="Header with links, phone and CTA" viewport="1200x72"
 */
export interface NavLinkItem { label: string; href: string }
export interface NavbarProps { brand?: string; links?: NavLinkItem[]; activeHref?: string; phone?: string; cta?: string; onCta?: () => void; /** Navy variant for dark hero pages */ inverse?: boolean; sticky?: boolean; style?: React.CSSProperties; }
export declare function Navbar(props: NavbarProps): JSX.Element;
