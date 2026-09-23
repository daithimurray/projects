import * as React from "react";
/** Email capture with title, one-line promise, input + button, fine print, success state. */
export interface NewsletterSignupProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  buttonLabel?: string;
  fine?: string;
  /** card = bordered paper; inline = single row; inverse = ink band; plain = bare. */
  variant?: "card" | "inline" | "inverse" | "plain";
  onSubmit?: (email: string) => void;
  success?: boolean;
  successMessage?: string;
}
export declare function NewsletterSignup(props: NewsletterSignupProps): JSX.Element;
