'use client';

import { useState } from 'react';
import { cases, caseYears } from '@/lib/data/cases';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function CaseLedger() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? cases : cases.filter((c) => c.year === filter);

  return (
    <section id="cases" className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">07 &mdash; Case Ledger</div>
            <h2 className="sec-title">45 matters,<br /><em>argued in person.</em></h2>
          </div>
        </ScrollReveal>

        <ScrollReveal className="cases__table-wrap">
          <div className="cases__header-bar">
            <div className="cases__filters">
              <button
                className={`cases__btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              {caseYears.map((y) => (
                <button
                  key={y}
                  className={`cases__btn ${filter === y ? 'active' : ''}`}
                  onClick={() => setFilter(y)}
                >
                  {y}
                </button>
              ))}
            </div>
            <div className="cases__total">
              {filtered.length} of 45 matters
            </div>
          </div>
          <div className="cases__scroll">
            <table className="cases__tbl">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
