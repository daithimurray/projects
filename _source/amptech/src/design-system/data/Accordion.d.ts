/** Expandable list for FAQs and spec details. Single-open by default. */
export interface AccordionItem { title: string; content: React.ReactNode }
export interface AccordionProps { items: AccordionItem[]; allowMultiple?: boolean; defaultOpen?: number[]; style?: React.CSSProperties; }
export declare function Accordion(props: AccordionProps): JSX.Element;
