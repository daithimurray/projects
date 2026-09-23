import * as React from "react";
export interface NavLink { label: string; href: string }
/**
 * Site header: wordmark left, primary links centre/right, optional actions. Blurs over content when sticky; hairline appears on scroll.
 * @startingPoint section="Navigation" subtitle="Sticky header with wordmark and links" viewport="1200x160"
 */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Wordmark text, the author's name set in Cormorant. No logo mark exists. */
  brand?: string;
  brandHref?: string;
  /** 3–6 links. More belongs in the Footer. */
  links: NavLink[];
  /** href of the current page; sets aria-current and the sienna underline. */
  current?: string;
  /** Right-side slot: theme Switch, search IconButton, or one Button. */
  actions?: React.ReactNode;
  /** default = translucent paper + blur; transparent = over hero imagery; bordered = always hairline. */
  variant?: "default" | "transparent" | "bordered";
  sticky?: boolean;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
