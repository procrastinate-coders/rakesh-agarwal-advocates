import { practiceAreas } from '@/lib/data/practice-areas';

export default function PracticeRibbon() {
  return (
    <section className="gm-ribbon">
      <div className="gm-ribbon__inner">
        <div className="gm-section-tag">Practice Areas</div>
        <div className="gm-ribbon__flow">
          {practiceAreas.map((area) => (
            <span key={area} className="gm-ribbon__item">{area}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
