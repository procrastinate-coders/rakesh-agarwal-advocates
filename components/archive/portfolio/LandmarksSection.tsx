import { landmarks } from '@/lib/data/landmarks';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function LandmarksSection() {
  return (
    <section className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">06 &mdash; Landmarks</div>
            <h2 className="sec-title">Milestones of<br /><em>a career.</em></h2>
          </div>
        </ScrollReveal>

        <div className="landmark__cards">
          {landmarks.map((l, i) => (
            <ScrollReveal key={i} className="landmark__card">
              <div className="landmark__card-tag">{l.tag}</div>
              <p>{l.text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
