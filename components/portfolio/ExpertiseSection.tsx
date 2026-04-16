import { expertise } from '@/lib/data/expertise';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">04 &mdash; Key Expertise</div>
            <h2 className="sec-title">A narrow specialism,<br /><em>deeply argued.</em></h2>
          </div>
        </ScrollReveal>

        {expertise.map((e, i) => (
          <ScrollReveal key={i} className="expertise__item">
            <div>
              <div className="expertise__num">{e.num}</div>
              <div className="expertise__name">
                {e.name} <em>{e.nameItalic}</em>
              </div>
            </div>
            <div className="expertise__desc">{e.description}</div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
