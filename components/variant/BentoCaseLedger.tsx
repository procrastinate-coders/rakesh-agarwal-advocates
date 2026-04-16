'use client';

import { useState } from 'react';
import type { Case } from '@/lib/data/cases';

export default function BentoCaseLedger({
  cases,
  years,
}: {
  cases: Case[];
  years: string[];
}) {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? cases : cases.filter((c) => c.year === filter);

  return (
    <>
      <div className="bento-cases__bar">
        <div className="bento-cases__filters">
          <button
            className={`bento-cases__btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              className={`bento-cases__btn ${filter === y ? 'active' : ''}`}
              onClick={() => setFilter(y)}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="bento-cases__count">
          {filtered.length} of {cases.length} matters
        </div>
      </div>
      <div className="bento-cases__scroll">
        <table className="bento-cases__tbl">
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
