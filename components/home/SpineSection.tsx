import SectionHeader from './SectionHeader';
import type { SectionMeta } from '@/lib/constants';

interface SpineItem {
  title: string;
  description: string;
}

interface Props {
  section: SectionMeta;
  items: SpineItem[];
}

export default function SpineSection({ section, items }: Props) {
  return (
    <section className="gm-spine-section">
      <SectionHeader section={section} center />
      <div className="gm-spine">
        {items.map((item, i) => (
          <div key={i} className="gm-spine__card gm-spine__card--compact">
            <div className="gm-spine__name">{item.title}</div>
            <div className="gm-spine__desc">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
