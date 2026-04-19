import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { PORTRAIT } from '@/lib/constants';

export default function PortraitEditorial() {
  return (
    <section className="gm-portrait">
      <div className="gm-portrait__inner">
        <ScrollReveal className="gm-portrait__content">
          <div className="gm-portrait__label">{PORTRAIT.label}</div>
          <div className="gm-portrait__divider" />
          <p className="gm-portrait__quote">
            &ldquo;{PORTRAIT.quote}{' '}
            <em>{PORTRAIT.quoteEmphasis}</em>&rdquo;
          </p>
          <div className="gm-portrait__byline">
            {PORTRAIT.byline}
            <span>{PORTRAIT.bylineSub}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal className="gm-portrait__photo">
          <Image
            src="/assets/Full Advocate Dress Photo_RA.jpg"
            alt="Rakesh Agarwal in full advocate dress"
            width={520}
            height={780}
            sizes="(max-width: 768px) 80vw, 480px"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
