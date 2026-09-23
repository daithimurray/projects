import * as React from "react";
/** Large italic Cormorant quotation, press blurbs, epigraphs, a lifted line. */
export interface PullQuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  /** Source line under the quotation. */
  cite?: React.ReactNode;
  /** marks = sienna curly quotes; rule = sienna hairline at left; centered = for section breaks. */
  variant?: "marks" | "rule" | "centered";
  size?: "sm" | "md";
}
export declare function PullQuote(props: PullQuoteProps): JSX.Element;
