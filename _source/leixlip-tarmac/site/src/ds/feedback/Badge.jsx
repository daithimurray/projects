import React from 'react';
export function Badge({ tone = 'neutral', dot = false, outline = false, children, className = '' }) {
  const cls = ['hs-badge', tone !== 'neutral' ? 'hs-badge--' + tone : '', outline ? 'hs-badge--outline' : '', className].filter(Boolean).join(' ');
  return <span className={cls}>{dot ? <span className="hs-badge__dot" aria-hidden="true" /> : null}{children}</span>;
}
