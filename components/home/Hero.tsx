import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { SITE, HERO_INTRO, HERO_ROLES } from '@/lib/constants';
import PullQuote from './PullQuote';

export default function Hero() {
  return (
    <section className="gm-hero">
      <div className="gm-hero__bg" />
      <div className="gm-hero__content">
        <div className="gm-hero__text">
          <p className="gm-hero__tag">{SITE.tagline}</p>
          <h1 className="gm-hero__name">
            {SITE.name.split(' ')[0]} {" "}
            {SITE.name.split(' ')[1]}, <em>{SITE.suffix}</em>
          </h1>
          <p className="gm-hero__sub">{SITE.subtitle}</p>
          <ScrollReveal className="gm-hero__intro-text">
            <p>{HERO_INTRO}</p>
          </ScrollReveal>
        </div>
        <div className="gm-hero__photo">
          <Image
            src="/assets/PP-RA_Advocate.jpg"
            alt={SITE.name}
            width={413}
            height={532}
            className="gm-hero__img"
            sizes="(max-width: 768px) 80vw, 400px"
            priority
          />
        </div>
      </div>
      <PullQuote />
      <ScrollReveal className="gm-hero__roles">
        {HERO_ROLES.map((role) => (
          <div key={`${role.label}-${role.emphasis}`} className="gm-hero__role">
            {role.emphasisFirst ? (
              <><em>{role.label}</em> {role.emphasis}</>
            ) : (
              <>{role.label} <em>{role.emphasis}</em></>
            )}
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
