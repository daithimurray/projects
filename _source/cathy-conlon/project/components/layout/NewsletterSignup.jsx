import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function NewsletterSignup({ title = "A letter, once a month", description = "New poems, readings, and what I'm reading. No noise.", buttonLabel = "Subscribe", fine = "Unsubscribe any time.", variant = "card", onSubmit, success = false, successMessage = "You're on the list. Thank you.", className, ...rest }) {
  const [email, setEmail] = React.useState("");
  const id = React.useId();
  return <section className={cx("ih-newsletter", variant !== "card" && `ih-newsletter--${variant}`, className)} aria-labelledby={id + "-t"} {...rest}>
    <div><h2 id={id + "-t"} className="ih-newsletter__title">{title}</h2>{description && <p className="ih-newsletter__desc">{description}</p>}</div>
    {success ? <p className="ih-newsletter__success" role="status">✓ {successMessage}</p> :
    <form className="ih-newsletter__form" onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(email); }}>
      <label htmlFor={id} className="visually-hidden">Email address</label>
      <input id={id} type="email" required className="ih-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <button type="submit" className="ih-btn ih-btn--primary">{buttonLabel}</button>
      {fine && <p className="ih-newsletter__fine" style={{ flexBasis: "100%" }}>{fine}</p>}
    </form>}
  </section>;
}
