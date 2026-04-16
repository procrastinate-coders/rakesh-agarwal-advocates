import ScrollReveal from '@/components/shared/ScrollReveal';

export default function PullQuote() {
  return (
    <section className="quote-section">
      <div className="wrap">
        <ScrollReveal>
          <blockquote className="quote__body">
            &ldquo;Successfully argued the{' '}
            <em>Education Cess refund</em> before the Larger Bench &mdash;
            all-India ramification, decided in favour.&rdquo;
          </blockquote>
          <div className="quote__attr">
            KEI Industries vs Commissioner Alwar &middot;{' '}
            <span className="gold">Larger Bench, CESTAT Delhi</span> &middot;
            LB Order 08/2025
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
