/** Square icon-only button. Always requires an accessible label. */
export interface IconButtonProps {
  icon: string;
  /** Required — becomes aria-label and tooltip */
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
