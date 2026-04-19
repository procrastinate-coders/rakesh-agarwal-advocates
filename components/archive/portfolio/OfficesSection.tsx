import { offices } from '@/lib/data/offices';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function OfficesSection() {
  return (
    <section id="offices" className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">08 &mdash; Offices</div>
            <h2 className="sec-title">Three chambers,<br /><em>one practice.</em></h2>
          </div>
        </ScrollReveal>

        <div className="offices__grid">
          {offices.map((o) => (
            <ScrollReveal key={o.city} className="office">
              <div className="office__badge">{o.badge}</div>
              <div className="office__city">{o.city}</div>
              <div className="office__region">{o.region}</div>
              <div className="office__divider" />
              <div className="office__addr" dangerouslySetInnerHTML={{ __html: o.address.replace(/\n/g, '<br/>') }} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
