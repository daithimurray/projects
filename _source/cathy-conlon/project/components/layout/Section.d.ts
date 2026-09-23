import * as React from "react";
/** Page band with fluid vertical rhythm and an optional head: eyebrow, headline title, lede, right-aligned action. */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  /** "See all →" TextLink or a Button. */
  action?: React.ReactNode;
  /** default paper · sunken paper-1 · inverse ink (use once per page at most). */
  tone?: "default" | "sunken" | "inverse";
  tight?: boolean;
  bordered?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}
export declare function Section(props: SectionProps): JSX.Element;
