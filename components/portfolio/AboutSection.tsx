import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="section section--bordered">
      <div className="wrap">
        <ScrollReveal className="sec-header">
          <div className="sec-header__left">
            <div className="sec-num">01 &mdash; Biography</div>
            <h2 className="sec-title">Think, Argue,<br /><em>Deliver.</em></h2>
          </div>
          <div className="sec-kicker">An institution of one.</div>
        </ScrollReveal>

        <div className="about__layout">
          <div>
            <ScrollReveal className="about__portrait-wrap">
              <Image
                src="/assets/PP-RA.jpg"
                alt="Rakesh Agarwal, IRS (Retd.)"
                width={500}
                height={667}
              />
              <div className="about__portrait-tag">Joint Commissioner &middot; IRS</div>
            </ScrollReveal>
          </div>

          <div>
            <div className="about__prose">
              <ScrollReveal>
                <p>Rakesh Agarwal joined the Indian Revenue Service on recommendation by the UPSC as a Direct Recruit Superintendent (Technical) and retired as Joint Commissioner Group A, IRS (C&amp;IT), 2012 Batch. His final posting was as Department Representative (Counsel) in CESTAT, arguing landmark matters involving high stakes of revenue.</p>
              </ScrollReveal>
              <ScrollReveal>
                <p>His career spans field experience in Belgaum and Bangalore, foreign trade policy formulation at DGEP, intelligence and investigation at DRI New Delhi, GST policy coordination at CBIC and the GST Council Secretariat, and five years of litigation before CESTAT at New Delhi, Chandigarh, and Bangalore.</p>
              </ScrollReveal>
              <ScrollReveal>
                <p>Now enrolled as an Advocate with the Delhi Bar Council (D/20542/2025) after passing the All India Bar Examination, he brings three decades of institutional knowledge to a practice built on a simple view: a well-drafted brief and a Tribunal that trusts the counsel in front of it.</p>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <dl className="about__credentials">
                <div className="about__cred">
                  <dt>Service</dt>
                  <dd>Indian Revenue Service<br /><em>Joint Commissioner (Retd.)</em></dd>
                </div>
                <div className="about__cred">
                  <dt>Enrollment</dt>
                  <dd>D/20542/2025<br />Delhi Bar Council</dd>
                </div>
                <div className="about__cred">
                  <dt>Forums</dt>
                  <dd>CESTAT &middot; High Courts<br />Supreme Court of India</dd>
                </div>
                <div className="about__cred">
                  <dt>Batch</dt>
                  <dd>2012 Batch, IRS (C&amp;IT)</dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
