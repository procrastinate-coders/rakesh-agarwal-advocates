import SectionHeader from './SectionHeader';
import { SECTIONS } from '@/lib/constants';
import { offices } from '@/lib/data/offices';

export default function OfficesSection() {
  return (
    <section className="gm-offices-section">
      <SectionHeader section={SECTIONS.offices} center />
      <div className="gm-offices">
        {offices.map((o) => (
          <div key={o.city} className="gm-office-card">
            <div className="gm-office-card__city">{o.city}</div>
            <div className="gm-office-card__region">{o.region}</div>
            <div className="gm-office-card__addr">{o.address}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
