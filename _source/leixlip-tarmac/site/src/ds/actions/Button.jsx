import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Button({ variant = 'accent', size = 'md', block = false, loading = false, disabled = false, iconLeft, iconRight, href, type = 'button', children, className = '', ...rest }) {
  const cls = ['hs-btn', 'hs-btn--' + variant, size !== 'md' ? 'hs-btn--' + size : '', block ? 'hs-btn--block' : '', loading ? 'hs-btn--loading' : '', className].filter(Boolean).join(' ');
  const content = (
    <>
      {iconLeft ? <Icon name={iconLeft} /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} /> : null}
      {loading ? <span className="hs-btn__spinner" aria-hidden="true"><span className="hs-spinner hs-spinner--sm" /></span> : null}
    </>
  );
  if (href && !disabled) return <a className={cls} href={href} aria-busy={loading || undefined} {...rest}>{content}</a>;
  return <button className={cls} type={type} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>{content}</button>;
}
