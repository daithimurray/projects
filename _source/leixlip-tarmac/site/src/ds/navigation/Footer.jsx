import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Wordmark } from './Wordmark.jsx';
export function Footer({ columns = [], phone = '01 624 2130', email, mobiles = [{ name: 'Barry', number: '087 935 2775' }, { name: 'John', number: '087 259 4880' }], address = 'Leixlip, Co. Kildare', tagline = 'Family-run tarmac, kerbing and groundworks contractor. Over 35 years in the trade, serving Kildare, Dublin, Meath and Leinster.', legal = 'Leixlip Tarmac Enterprises Ltd. Registered in Ireland no. 496118.', legalLinks = [], className = '' }) {
  return (
    <footer className={'hs-footer ' + className}>
      <div className="hs-container">
        <div className="hs-footer__grid">
          <div>
            <div className="hs-footer__brand"><Wordmark href="#" /></div>
            <p className="hs-footer__tagline">{tagline}</p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="hs-footer__title">{c.title}</h3>
              <ul className="hs-footer__list">{c.links.map((l) => <li key={l.label}><a href={l.href || '#'}>{l.label}</a></li>)}</ul>
            </div>
          ))}
          <div>
            <h3 className="hs-footer__title">Get in touch</h3>
            <ul className="hs-footer__list">
              <li><a href={'tel:' + phone.replace(/\s/g, '')} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Icon name="phone" size={16} />{phone}</a></li>
              {mobiles.map((m) => <li key={m.number}><a href={'tel:' + m.number.replace(/\s/g, '')} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Icon name="phone" size={16} />{m.name} {m.number}</a></li>)}
              {email ? <li><a href={'mailto:' + email} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Icon name="mail" size={16} />{email}</a></li> : null}
              <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><Icon name="map-pin" size={16} style={{ marginTop: 2 }} /><span>{address}</span></li>
            </ul>
          </div>
        </div>
        <div className="hs-footer__bottom">
          <span>{legal}</span>
          {legalLinks.length ? <span style={{ display: 'flex', gap: 16 }}>{legalLinks.map((l) => <a key={l.label} href={l.href} style={{ color: 'inherit' }}>{l.label}</a>)}</span> : null}
        </div>
      </div>
    </footer>
  );
}
