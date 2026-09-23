import React from 'react';
export function Table({ columns = [], rows = [], caption, striped = false, hover = false, compact = false, className = '' }) {
  const cls = ['hs-table', striped ? 'hs-table--striped' : '', hover ? 'hs-table--hover' : '', compact ? 'hs-table--compact' : ''].filter(Boolean).join(' ');
  return (
    <div className={'hs-table-wrap ' + className}>
      <table className={cls}>
        {caption ? <caption>{caption}</caption> : null}
        <thead><tr>{columns.map((c) => <th key={c.key} scope="col" className={c.numeric ? 'hs-table__num' : ''}>{c.label}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{columns.map((c) => <td key={c.key} className={c.numeric ? 'hs-table__num' : ''}>{r[c.key]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
