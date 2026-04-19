import { cardOffices } from '@/lib/data/offices';
import CardScrollReveal from './CardScrollReveal';

export default function CardOffices() {
  return (
    <>
      <CardScrollReveal>
        <p className="section-label">Offices</p>
      </CardScrollReveal>
      <CardScrollReveal>
        <div className="card-offices-grid">
          {cardOffices.map((o) => (
            <div key={o.city} className={`card-office ${o.full ? 'full' : ''}`}>
              <p className="card-office__city">{o.city}</p>
              <p className="card-office__addr" dangerouslySetInnerHTML={{ __html: o.address.replace(/\n/g, '<br/>') }} />
            </div>
          ))}
        </div>
      </CardScrollReveal>
    </>
  );
}
