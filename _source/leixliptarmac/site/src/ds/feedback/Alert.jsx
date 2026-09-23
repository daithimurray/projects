import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';
const ALERT_ICON = { info: 'info', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-circle' };
export function Alert({ tone = 'info', title, children, outline = false, onDismiss, action, className = '' }) {
  const cls = ['hs-alert', tone !== 'info' ? 'hs-alert--' + tone : '', outline ? 'hs-alert--outline' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}>
      <Icon name={ALERT_ICON[tone]} className="hs-alert__icon" />
      <div className="hs-alert__body">
        {title ? <div className="hs-alert__title">{title}</div> : null}
        {children ? <div>{children}</div> : null}
        {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
      </div>
      {onDismiss ? <IconButton icon="x" label="Dismiss" size="sm" className="hs-alert__close" onClick={onDismiss} /> : null}
    </div>
  );
}
