import React from 'react';
export function Avatar({ name = '', src, size = 'md', accent = false, square = false, className = '' }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join('');
  const cls = ['hs-avatar', size !== 'md' ? 'hs-avatar--' + size : '', accent ? 'hs-avatar--accent' : '', square ? 'hs-avatar--square' : '', className].filter(Boolean).join(' ');
  return <span className={cls} role="img" aria-label={name}>{src ? <img src={src} alt="" /> : initials}</span>;
}
export function AvatarGroup({ children, className = '' }) { return <span className={'hs-avatar-group ' + className}>{children}</span>; }
