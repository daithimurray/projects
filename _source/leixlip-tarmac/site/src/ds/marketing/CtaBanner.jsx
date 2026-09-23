import React from 'react';
import { Button } from '../actions/Button.jsx';
export function CtaBanner({ title, description, primaryLabel = 'Get a free quote', onPrimary, primaryHref, secondaryLabel, secondaryHref, dark = false, bleed = false, className = '' }) {
  return (
    <section className={['hs-cta', dark ? 'hs-cta--dark' : '', bleed ? 'hs-cta--bleed' : '', className].filter(Boolean).join(' ')}>
      <div className="hs-cta__inner">
        <div><h2 className="hs-cta__title">{title}</h2>{description ? <p className="hs-cta__desc">{description}</p> : null}</div>
        <div className="hs-cta__actions">
          <Button variant={dark ? 'accent' : 'primary'} size="lg" href={primaryHref} onClick={onPrimary}>{primaryLabel}</Button>
          {secondaryLabel ? <Button variant="secondary" size="lg" href={secondaryHref}>{secondaryLabel}</Button> : null}
        </div>
      </div>
    </section>
  );
}
