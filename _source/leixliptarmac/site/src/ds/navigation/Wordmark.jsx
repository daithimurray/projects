import React from 'react';
export function Wordmark({ name = 'Leixlip', sub = 'Tarmac', href = '/', className = '' }) {
  const Tag = href ? 'a' : 'span';
  return <Tag className={'hs-wordmark ' + className} href={href}><span className="hs-wordmark__mark" aria-hidden="true" /><span>{name}</span>{sub ? <span className="hs-wordmark__sub">{sub}</span> : null}</Tag>;
}
