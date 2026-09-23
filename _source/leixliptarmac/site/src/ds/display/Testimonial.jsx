import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Avatar } from './Avatar.jsx';
export function Testimonial({ quote, name, meta, rating = 5, inverse = false, avatarSrc, className = '' }) {
  return (
    <figure className={'hs-testimonial ' + (inverse ? 'hs-testimonial--inverse ' : '') + className} style={{ margin: 0 }}>
      {rating ? <div className="hs-testimonial__stars" aria-label={rating + ' out of 5 stars'}>{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" style={{ fill: i < rating ? 'currentColor' : 'none', opacity: i < rating ? 1 : 0.35 }} />)}</div> : null}
      <blockquote className="hs-testimonial__quote">{quote}</blockquote>
      <figcaption className="hs-testimonial__who">
        <Avatar name={name} src={avatarSrc} size="sm" />
        <div><div className="hs-testimonial__name">{name}</div>{meta ? <div className="hs-testimonial__meta">{meta}</div> : null}</div>
      </figcaption>
    </figure>
  );
}
