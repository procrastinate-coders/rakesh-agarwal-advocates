import SectionHeader from './SectionHeader';
import type { SectionMeta } from '@/lib/constants';

interface TimelineItem {
  year: string;
  primary: string;
  secondary?: string;
}

interface Props {
  section: SectionMeta;
  items: TimelineItem[];
}

export default function Timeline({ section, items }: Props) {
  return (
    <section className="gm-timeline-section">
      <SectionHeader section={section} center />
      <div className="gm-timeline">
        {items.map((item, i) => (
          <div
            key={item.primary}
            className={`gm-timeline__node ${i % 2 === 0 ? 'gm-timeline__node--left' : 'gm-timeline__node--right'}`}
          >
            <div className="gm-timeline__card">
              <div className="gm-timeline__year">{item.year}</div>
              <div className="gm-timeline__degree">{item.primary}</div>
              {item.secondary && (
                <div className="gm-timeline__inst">{item.secondary}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
