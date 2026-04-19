import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionHeader from './SectionHeader';
import { SECTIONS, ABOUT_BIO, SITE } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="gm-about">
      <div className="gm-about__inner">
        <ScrollReveal>
          <SectionHeader section={SECTIONS.about} />
        </ScrollReveal>
        <ScrollReveal>
          <div className="gm-about__panel">
            <div className="gm-about__photo-wrap">
              <Image
                src="/assets/Photo_Rakesh Agarwal_28042025.jpg"
                alt={SITE.name}
                width={413}
                height={532}
                className="gm-about__photo"
                sizes="(max-width: 640px) 50vw, 220px"
              />
            </div>
            {ABOUT_BIO.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
