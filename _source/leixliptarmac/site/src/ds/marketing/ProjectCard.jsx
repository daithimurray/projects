import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../feedback/Badge.jsx';
export function ProjectCard({ image, title, location, area, duration, category, href = '#', className = '', onClick }) {
  return (
    <a className={'hs-project ' + className} href={href} onClick={onClick}>
      <div className="hs-project__media">{image ? <img src={image} alt="" /> : null}{category ? <Badge tone="dark" className="hs-project__badge">{category}</Badge> : null}</div>
      <div className="hs-project__body">
        <h3 className="hs-project__title">{title}</h3>
        <div className="hs-project__meta">
          {location ? <span><Icon name="map-pin" />{location}</span> : null}
          {area ? <span><Icon name="ruler" />{area}</span> : null}
          {duration ? <span><Icon name="clock" />{duration}</span> : null}
        </div>
      </div>
    </a>
  );
}
