import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../actions/Button.jsx';
export function Hero({ eyebrow, title, lede, primaryLabel = 'Get a free quote', onPrimary, primaryHref, secondaryLabel, secondaryHref, proof = [], media, light = false, compact = false, stripe = true, className = '' }) {
  return (
    <section className={['hs-hero', light ? 'hs-hero--light' : '', compact ? 'hs-hero--compact' : '', className].filter(Boolean).join(' ')}>
      <div className="hs-container hs-hero__inner">
        <div>
          {eyebrow ? <div className="hs-hero__eyebrow">{eyebrow}</div> : null}
          <h1 className="hs-hero__title">{title}</h1>
          {lede ? <p className="hs-hero__lede">{lede}</p> : null}
          <div className="hs-hero__actions">
            <Button variant="accent" size="lg" iconRight="arrow-right" href={primaryHref} onClick={onPrimary}>{primaryLabel}</Button>
            {secondaryLabel ? <Button variant="secondary" size="lg" href={secondaryHref} className={light ? '' : 'hs-on-dark'}>{secondaryLabel}</Button> : null}
          </div>
          {proof.length ? <div className="hs-hero__proof">{proof.map((p) => <span key={p}><Icon name="check-circle" size={18} />{p}</span>)}</div> : null}
        </div>
        {!compact ? <div className="hs-hero__media">{media || null}</div> : null}
      </div>
      {stripe ? <div className="hs-hero__stripe" aria-hidden="true" /> : null}
    </section>
  );
}
