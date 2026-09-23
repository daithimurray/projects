import React from "react";
const cx = (...a) => a.filter(Boolean).join(" ");
export function EventCard({ date, title, venue, city, time, kind, href, past = false, soldOut = false, layout = "row", actions, className, ...rest }) {
  const d = date instanceof Date ? date : new Date(date);
  const day = d.getDate(), month = d.toLocaleString("en", { month: "short" });
  const Tag = href ? "a" : "article";
  return <Tag href={href} className={cx("ih-event", past && "ih-event--past", layout === "card" && "ih-event--card", className)} {...rest}>
    <time className="ih-event__date" dateTime={d.toISOString().slice(0, 10)}><span className="ih-event__day">{day}</span><span className="ih-event__month">{month}</span></time>
    <div className="ih-event__body">
      <h3 className="ih-event__title">{title}</h3>
      {venue && <p className="ih-event__venue">{venue}{city && `, ${city}`}</p>}
      <p className="ih-event__meta">{time && <span>{time}</span>}{kind && <span>{kind}</span>}{soldOut && <span className="ih-badge ih-badge--outline">Sold out</span>}{past && <span className="ih-badge">Past</span>}</p>
      {actions && <div className="ih-event__actions">{actions}</div>}
    </div>
  </Tag>;
}
