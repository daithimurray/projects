import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../actions/Button.jsx';
import { IconButton } from '../actions/IconButton.jsx';
import { Wordmark } from './Wordmark.jsx';
export function Navbar({ links = [], current, phone = '01 624 2130', ctaLabel = 'Get a free quote', onCta, onNavigate, topbar = true, brand, className = '' }) {
  const [open, setOpen] = React.useState(false);
  const go = (e, l) => { if (onNavigate) { e.preventDefault(); onNavigate(l); setOpen(false); } };
  return (
    <>
      {topbar ? (
        <div className="hs-topbar"><div className="hs-container hs-topbar__inner">
          <div className="hs-topbar__items">
            <span className="hs-topbar__item"><Icon name="clock" size={14} /> Free, no-obligation consultation</span>
            <span className="hs-topbar__item"><Icon name="map-pin" size={14} /> Kildare, Dublin &amp; Meath</span>
          </div>
          <a className="hs-topbar__item" href={'tel:' + phone.replace(/\s/g, '')}><Icon name="phone" size={14} /> <strong>{phone}</strong></a>
        </div></div>
      ) : null}
      <header className={'hs-navbar ' + className}>
        <div className="hs-container hs-navbar__inner">
          {brand || <Wordmark href="#" />}
          <nav className="hs-navbar__links" aria-label="Main">
            {links.map((l) => <a key={l.label} className="hs-navbar__link" href={l.href || '#'} aria-current={current === l.label ? 'page' : undefined} onClick={(e) => go(e, l)}>{l.label}</a>)}
          </nav>
          <div className="hs-navbar__actions">
            <Button variant="secondary" size="sm" href={'tel:' + phone.replace(/\s/g, '')} iconLeft="phone">{phone}</Button>
            <Button variant="accent" size="sm" onClick={onCta}>{ctaLabel}</Button>
          </div>
          <IconButton className="hs-navbar__menu" icon={open ? 'x' : 'menu'} label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} />
        </div>
        {open ? (
          <nav className="hs-container hs-navbar__drawer" aria-label="Main mobile">
            {links.map((l) => <a key={l.label} className="hs-navbar__link" href={l.href || '#'} aria-current={current === l.label ? 'page' : undefined} onClick={(e) => go(e, l)}>{l.label}</a>)}
          </nav>
        ) : null}
      </header>
    </>
  );
}
