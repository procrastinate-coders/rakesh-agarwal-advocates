import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap">
        <div className="hero__intro">
          <div className="hero__title-block">
            <h1>
              <span className="word"><span className="word-inner" style={{ animationDelay: '2400ms' }}>Rakesh</span></span>
              <span className="word"><span className="word-inner" style={{ animationDelay: '2550ms' }}><em>Agarwal,</em></span></span>
              <span className="word"><span className="word-inner" style={{ animationDelay: '2700ms' }}>IRS</span></span>
            </h1>
          </div>
          <ScrollReveal className="hero__intro-text">
            <p>A practice rooted in three decades of service inside the Indian Revenue Service, and continued advocacy before the Customs, Excise &amp; Service Tax Appellate Tribunal, the High Courts, and the Supreme Court of India.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="hero__roles">
          <div className="hero__role" data-hover>Customs <em>Counsel</em></div>
          <div className="hero__role" data-hover>GST <em>Advocate</em></div>
          <div className="hero__role" data-hover><em>Appellate</em> Practitioner</div>
          <div className="hero__role" data-hover>Policy <em>Expert</em></div>
        </ScrollReveal>

        <ScrollReveal className="hero__bottom">
          <div className="hero__avatar-row">
            <div className="hero__avatar">
              <Image
                src="/assets/PP-RA_Advocate.jpg"
                alt="Rakesh Agarwal"
                width={72}
                height={72}
              />
            </div>
            <div className="hero__avatar-info">
              Rakesh Agarwal
              <span>Joint Commissioner (Retd.) &middot; IRS (C&amp;IT)</span>
            </div>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-num">30<sup>+</sup></div>
              <div className="hero__stat-label">Years IRS</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-num">45<sup>+</sup></div>
              <div className="hero__stat-label">CESTAT Cases</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-num">16</div>
              <div className="hero__stat-label">HC Appeals</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </header>
  );
}
