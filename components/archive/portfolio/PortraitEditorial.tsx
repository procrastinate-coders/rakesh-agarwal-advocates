import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function PortraitEditorial() {
  return (
    <section className="portrait-editorial">
      <div className="portrait-editorial__inner">
        <ScrollReveal className="portrait-editorial__content">
          <div className="portrait-editorial__label">The Advocate</div>
          <div className="portrait-editorial__divider" />
          <p className="portrait-editorial__quote">
            &ldquo;I take a small number of matters, read them deeply, and argue them{' '}
            <em>myself.</em>&rdquo;
          </p>
          <div className="portrait-editorial__byline">
            Rakesh Agarwal
            <span>Advocate &middot; Delhi Bar Council (D/20542/2025)</span>
          </div>
        </ScrollReveal>
        <ScrollReveal className="portrait-editorial__photo">
          <Image
            src="/assets/Full Advocate Dress Photo_RA.jpg"
            alt="Rakesh Agarwal in full advocate dress"
            width={520}
            height={780}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
