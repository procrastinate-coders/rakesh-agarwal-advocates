import type { Metadata } from 'next';
import Link from 'next/link';
import LogoLockup from '@/components/shared/LogoLockup';
import SubpageNav from '@/components/shared/SubpageNav';
import { publications } from '@/lib/data/publications';
import { SITE } from '@/lib/constants';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/#cases', label: 'Cases' },
  { href: '/#contact', label: 'Contact' },
];

export const metadata: Metadata = {
  title: `Publications — ${SITE.name}`,
  description: 'Articles and papers on Customs, Indirect Tax & Jurisprudence.',
};

export default function PublicationsPage() {
  return (
    <div className="gm-page">
      <SubpageNav links={NAV} />

      <main className="gm-pub">
        <header className="gm-pub__header">
          <div className="gm-section-tag">
            <span className="gm-section-tag__num">10</span>
            <span className="gm-section-tag__sep">/</span>
            <span>Publications</span>
          </div>
          <h1 className="gm-pub__title">
            Written word, <em>lasting impact.</em>
          </h1>
          <p className="gm-pub__subtitle">
            Articles and papers on Customs Law, Indirect Taxation & Jurisprudence.
          </p>
        </header>

        <div className="gm-pub__list">
          {publications.map((pub, i) => (
            <Link
              key={pub.slug}
              href={`/publications/${pub.slug}`}
              className="gm-pub__card"
            >
              <span className="gm-pub__card-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="gm-pub__card-body">
                <h2 className="gm-pub__card-title">{pub.title}</h2>
                <span className="gm-pub__card-type">PDF Article</span>
              </div>
              <span className="gm-pub__card-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="gm-footer">
        <LogoLockup />
        <p>{SITE.copyright}</p>
      </footer>
    </div>
  );
}
