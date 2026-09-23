import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Accordion({ items = [], defaultOpen = [], multiple = false, className = '' }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (i) => setOpen((o) => o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]);
  return (
    <div className={'hs-accordion ' + className}>
      {items.map((it, i) => { const isOpen = open.includes(i); return (
        <div key={i} className="hs-accordion__item">
          <h3 style={{ margin: 0 }}><button type="button" className="hs-accordion__trigger" aria-expanded={isOpen} aria-controls={'hs-acc-' + i} onClick={() => toggle(i)}>{it.title}<Icon name="chevron-down" className="hs-accordion__chev" /></button></h3>
          <div id={'hs-acc-' + i} className="hs-accordion__panel" hidden={!isOpen}>{it.content}</div>
        </div>
      ); })}
    </div>
  );
}
