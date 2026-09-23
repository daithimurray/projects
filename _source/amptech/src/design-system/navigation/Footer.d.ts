/** Site footer on inverse navy: brand + contact, link columns, licence line. */
export interface FooterColumn { title: string; links: { label: string; href: string }[] }
export interface FooterProps { brand?: string; tagline?: string; columns?: FooterColumn[]; phone?: string; email?: string; address?: string; /** PSA licence or accreditation line shown with © */ licence?: string; legal?: { label: string; href: string }[]; style?: React.CSSProperties; }
export declare function Footer(props: FooterProps): JSX.Element;
