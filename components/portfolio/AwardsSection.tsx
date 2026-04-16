import { awards } from '@/lib/data/awards';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AwardsSection() {
  return (
    <section className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">03 &mdash; Awards &amp; Honours</div>
            <h2 className="sec-title">Distinguished<br /><em>service.</em></h2>
          </div>
        </ScrollReveal>

        <div className="awards__row">
          {awards.map((a, i) => (
            <ScrollReveal key={i} className="award">
              <div className="award__icon">&#9733;</div>
              <div className="award__text">{a.text}</div>
              <div className="award__year">{a.year}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
