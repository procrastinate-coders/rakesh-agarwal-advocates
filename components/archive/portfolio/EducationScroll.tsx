import { education } from '@/lib/data/education';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function EducationScroll() {
  return (
    <section className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">02 &mdash; Education</div>
            <h2 className="sec-title">Five degrees,<br /><em>one vocation.</em></h2>
          </div>
        </ScrollReveal>
      </div>
      <div className="edu-wrap">
        <div className="edu-scroll">
          {education.map((ed, i) => (
            <div key={i} className="edu-card">
              <div className="edu-card__year">{ed.year}</div>
              <div className="edu-card__degree">{ed.degree}</div>
              <div className="edu-card__inst">{ed.institution}</div>
            </div>
          ))}
        </div>
        <ScrollReveal className="edu-tip">
          Drag sideways to explore &rarr;
        </ScrollReveal>
      </div>
    </section>
  );
}
