/** Line icon from the system glyph set (Lucide-derived, 24 grid, 1.75 stroke). */
export interface IconProps {
  /** Glyph name, e.g. "shield-check", "camera", "flame", "phone", "arrow-right" */
  name: string;
  /** Rendered size in px. 16 in compact UI, 20 default, 24 in nav/cards, 32+ in feature blocks */
  size?: number;
  strokeWidth?: number;
  /** CSS colour; defaults to currentColor */
  color?: string;
  /** Accessible label — omit for purely decorative icons (renders aria-hidden) */
  label?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare const iconNames: string[];
