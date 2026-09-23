import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../feedback/Badge.jsx';
export function ServiceCard({ icon = 'layers', title, description, badge, meta = [], href = '#', cta = 'Learn more', image, className = '', onClick }) {
  const inner = (
    <>
      <div className="hs-service__icon"><Icon name={icon} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><h3 className="hs-service__title">{title}</h3>{badge ? <Badge tone="accent">{badge}</Badge> : null}</div>
      <p className="hs-service__desc">{description}</p>
      {meta.length ? <div className="hs-service__meta">{meta.map((m) => <Badge key={m} outline>{m}</Badge>)}</div> : null}
      <span className="hs-service__cta hs-link hs-link--arrow">{cta}<Icon name="arrow-right" /></span>
    </>
  );
  if (image) return (
    <a className={'hs-service hs-service--media ' + className} href={href} onClick={onClick}>
      <div className="hs-service__media"><img src={image} alt="" /></div>
      <div className="hs-service__content">{inner}</div>
    </a>
  );
  return <a className={'hs-service ' + className} href={href} onClick={onClick}>{inner}</a>;
}
