import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, className = '', ...rest }) {
  const cls = ['hs-iconbtn', variant !== 'ghost' ? 'hs-iconbtn--' + variant : '', size !== 'md' ? 'hs-iconbtn--' + size : '', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
