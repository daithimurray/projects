import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function ContactStrip({ phone = '01 624 2130', mobiles = [{ name: 'Barry', number: '087 935 2775' }, { name: 'John', number: '087 259 4880' }], email, address = 'Leixlip, Co. Kildare', hours = 'Ask for Barry or John', inverse = false, className = '' }) {
  const items = [
    { icon: 'phone', label: 'Office', value: phone, sub: hours, href: 'tel:' + phone.replace(/\s/g, '') },
    ...mobiles.map((m) => ({ icon: 'phone', label: m.name + '\'s mobile', value: m.number, sub: 'On site most days', href: 'tel:' + m.number.replace(/\s/g, '') })),
    email ? { icon: 'mail', label: 'Email', value: email, sub: 'Reply within one working day', href: 'mailto:' + email } : null,
    { icon: 'map-pin', label: 'Based in', value: address, sub: 'Serving Kildare, Dublin, Meath and Leinster', href: null },
  ].filter(Boolean);
  return (
    <div className={'hs-contact ' + (inverse ? 'hs-contact--inverse ' : '') + className}>
      {items.map((it) => { const Tag = it.href ? 'a' : 'div'; return (
        <Tag key={it.label} className="hs-contact__item" href={it.href || undefined}>
          <span className="hs-contact__icon"><Icon name={it.icon} size={20} /></span>
          <span><span className="hs-contact__label">{it.label}</span><div className="hs-contact__value" style={{ wordBreak: 'break-word' }}>{it.value}</div><div className="hs-contact__sub">{it.sub}</div></span>
        </Tag>
      ); })}
    </div>
  );
}
