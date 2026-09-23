import * as React from "react";
/**
 * Verse with preserved line breaks and hanging indents for wrapped lines. Each stanza is an array of lines; a leading tab indents the line.
 * @startingPoint section="Content" subtitle="Title, meta, stanzas with hanging indent" viewport="700x420"
 */
export interface PoemBlockProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  /** Collection · year, e.g. "from The Light Dancing, 2025". */
  meta?: string;
  /** Array of stanzas; each stanza is an array of line strings. "\t" prefix indents a line. */
  stanzas: string[][];
  align?: "left" | "center";
  /** Roman-numeral stanza markers in the margin (sequences). */
  numbered?: boolean;
  /** Closing "· · ·" mark. */
  endMark?: boolean;
}
export declare function PoemBlock(props: PoemBlockProps): JSX.Element;
