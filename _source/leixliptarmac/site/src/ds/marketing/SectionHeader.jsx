import React from 'react';
export function SectionHeader({ eyebrow, title, lede, align = 'left', action, className = '' }) {
  return (
    <div className={['hs-section-head', align === 'center' ? 'hs-section-head--center' : '', action ? 'hs-section-head--row' : '', className].filter(Boolean).join(' ')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: '60ch' }}>
        {eyebrow ? <span className="hs-section-head__eyebrow">{eyebrow}</span> : null}
        <h2 className="hs-section-head__title">{title}</h2>
        {lede ? <p className="hs-section-head__lede">{lede}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
