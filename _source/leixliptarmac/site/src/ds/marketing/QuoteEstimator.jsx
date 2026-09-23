import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Button } from '../actions/Button.jsx';
import { FormField } from '../forms/FormField.jsx';
import { RadioGroup } from '../forms/Radio.jsx';
import { Checkbox } from '../forms/Checkbox.jsx';
const RATES = { tarmac: [45, 70], resin: [70, 110], block: [80, 120] };
export function QuoteEstimator({ onRequest, defaultArea = 60, className = '' }) {
  const [area, setArea] = React.useState(defaultArea);
  const [surface, setSurface] = React.useState('tarmac');
  const [excavate, setExcavate] = React.useState(true);
  const [drain, setDrain] = React.useState(false);
  const [lo, hi] = RATES[surface];
  const extras = (excavate ? 12 : 0) + (drain ? 8 : 0);
  const fmt = (n) => '€' + (Math.round(n / 50) * 50).toLocaleString();
  const low = (lo + extras) * area, high = (hi + extras) * area;
  const pct = ((area - 10) / (300 - 10)) * 100;
  return (
    <div className={'hs-estimator ' + className}>
      <div className="hs-estimator__form">
        <div>
          <div className="hs-slider-row"><label htmlFor="hs-est-area" style={{ fontWeight: 600 }}>Approximate area</label><output htmlFor="hs-est-area">{area} m²</output></div>
          <input id="hs-est-area" className="hs-slider" type="range" min={10} max={300} step={5} value={area} onChange={(e) => setArea(+e.target.value)} style={{ '--hs-slider-pct': pct + '%', marginTop: 8 }} aria-valuetext={area + ' square metres'} />
          <div className="hs-field__hint" style={{ marginTop: 6 }}>A typical two-car driveway is 40–60 m².</div>
        </div>
        <RadioGroup legend="Surface" name="hs-est-surface" value={surface} onChange={setSurface} row options={[{ value: 'tarmac', label: 'Tarmac' }, { value: 'resin', label: 'Resin bound' }, { value: 'block', label: 'Block paving' }]} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Checkbox id="hs-est-exc" label="Dig out existing surface" checked={excavate} onChange={(e) => setExcavate(e.target.checked)} />
          <Checkbox id="hs-est-drain" label="Add drainage channel" checked={drain} onChange={(e) => setDrain(e.target.checked)} />
        </div>
      </div>
      <div className="hs-estimator__result">
        <div className="hs-estimator__label">Guide price</div>
        <div className="hs-estimator__price">{fmt(low)}<small> – {fmt(high)}</small></div>
        <div className="hs-estimator__rows">
          <div><span>{surface === 'tarmac' ? 'Tarmac' : surface === 'resin' ? 'Resin bound' : 'Block paving'}</span><span>€{lo}–€{hi}/m²</span></div>
          {excavate ? <div><span>Excavation</span><span>+€12/m²</span></div> : null}
          {drain ? <div><span>Drainage</span><span>+€8/m²</span></div> : null}
        </div>
        <Button variant="accent" block iconRight="arrow-right" onClick={() => onRequest && onRequest({ area, surface, excavate, drain, low, high })}>Request a consultation</Button>
        <div className="hs-estimator__note"><Icon name="info" size={12} /> Market guide only. Your quote follows a free, no-obligation design consultation.</div>
      </div>
    </div>
  );
}
