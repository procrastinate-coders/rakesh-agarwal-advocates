import { training } from '@/lib/data/training';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function TrainingSection() {
  return (
    <section className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">05 &mdash; Capacity Building</div>
            <h2 className="sec-title">Training &amp;<br /><em>credentials.</em></h2>
          </div>
        </ScrollReveal>

        <div className="training__grid">
          {training.map((t, i) => (
            <ScrollReveal key={i} className="training__entry">
              <div className="training__dot" />
              <div className="training__entry-text">
                {t.title}
                <span>{t.org}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
