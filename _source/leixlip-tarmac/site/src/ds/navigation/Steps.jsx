import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Steps({ steps = [], current = 0, vertical = false, className = '' }) {
  return (
    <ol className={'hs-steps ' + (vertical ? 'hs-steps--vertical ' : '') + className}>
      {steps.map((s, i) => { const state = i < current ? 'done' : i === current ? 'current' : 'todo'; const label = typeof s === 'string' ? s : s.label; const desc = typeof s === 'string' ? null : s.description; return (
        <li key={label} className={'hs-steps__item hs-steps__item--' + state} aria-current={state === 'current' ? 'step' : undefined}>
          {vertical ? (
            <>
              <div className="hs-steps__rail"><span className="hs-steps__num">{state === 'done' ? <Icon name="check" size={12} /> : i + 1}</span><span className="hs-steps__line" /></div>
              <div className="hs-steps__content"><span className="hs-steps__title">{label}</span>{desc ? <span className="hs-steps__desc">{desc}</span> : null}</div>
            </>
          ) : (
            <>
              <span className="hs-steps__bar" />
              <span className="hs-steps__label"><span className="hs-steps__num">{state === 'done' ? <Icon name="check" size={12} /> : i + 1}</span><span>{label}</span></span>
            </>
          )}
        </li>
      ); })}
    </ol>
  );
}
