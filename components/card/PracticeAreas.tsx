import { practiceAreas } from '@/lib/data/practice-areas';
import CardScrollReveal from './CardScrollReveal';

export default function PracticeAreas() {
  return (
    <>
      <CardScrollReveal>
        <p className="section-label">Practice Areas</p>
      </CardScrollReveal>
      <CardScrollReveal>
        <div className="practice-areas">
          <p className="practice-tags">
            {practiceAreas.map((area, i) => (
              <span key={area}>
                {area}
                {i < practiceAreas.length - 1 && <span>&middot;</span>}
              </span>
            ))}
          </p>
        </div>
      </CardScrollReveal>
    </>
  );
}
