import ScrollReveal from '@/components/shared/ScrollReveal';
import { QUOTES } from '@/lib/constants';

export default function CaseHighlight() {
  const q = QUOTES.caseHighlight;

  return (
    <section className="gm-pullquote">
      <ScrollReveal>
        <blockquote>
          &ldquo;{q.text}{' '}
          <em>{q.emphasis}</em> {q.suffix}&rdquo;
        </blockquote>
        <div className="gm-pullquote__attr">
          {q.attribution} &middot;{' '}
          <span>{q.court}</span> &middot; {q.orderRef}
        </div>
      </ScrollReveal>
    </section>
  );
}
