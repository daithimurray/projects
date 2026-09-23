import * as React from "react";
export interface Crumb { label: string; href?: string }
/** Path trail for archive depth (Poems / The Light Dancing / The Light Dancing). Last item is the current page. */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[];
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
