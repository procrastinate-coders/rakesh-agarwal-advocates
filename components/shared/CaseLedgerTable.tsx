'use client';

import { useState } from 'react';
import type { Case } from '@/lib/data/cases';

export default function CaseLedgerTable({
  cases,
  years,
  prefix,
}: {
  cases: Case[];
  years: string[];
  prefix: string;
}) {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? cases : cases.filter((c) => c.year === filter);

  return (
    <>
      <div className={`${prefix}-cases__bar`}>
        <div className={`${prefix}-cases__filters`}>
          <button
            className={`${prefix}-cases__btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              className={`${prefix}-cases__btn ${filter === y ? 'active' : ''}`}
              onClick={() => setFilter(y)}
            >
              {y}
            </button>
          ))}
        </div>
        <div className={`${prefix}-cases__count`}>
          {filtered.length} of {cases.length} matters
        </div>
      </div>
      <div className={`${prefix}-cases__scroll`}>
        <table className={`${prefix}-cases__tbl`}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Case Name</th>
              <th>Final Order</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.no}>
                <td>{c.no}</td>
                <td>{c.name}</td>
                <td>{c.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
