import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LogoLockup from '@/components/shared/LogoLockup';
import SubpageNav from '@/components/shared/SubpageNav';
import { publications } from '@/lib/data/publications';
import { SITE } from '@/lib/constants';

const NAV = [
  { href: '/publications', label: '\u2190 Publications' },
  { href: '/', label: 'Home' },
  { href: '/#contact', label: 'Contact' },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return {};
  return {
    title: pub.title,
    description: `${pub.title} — an article by Rakesh Agarwal, IRS (Retd.), Advocate in Customs & Indirect Tax.`,
    alternates: { canonical: `/publications/${pub.slug}` },
    openGraph: {
      type: 'article',
      url: `/publications/${pub.slug}`,
      siteName: 'Rakesh Agarwal Advocates',
      locale: 'en_IN',
      title: pub.title,
      authors: ['Rakesh Agarwal'],
      images: [{ url: '/og-card.png', width: 1200, height: 630 }],
    },
  };
}

export default async function PublicationPage({ params }: Props) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pub.title,
    url: `${SITE.url}/publications/${pub.slug}`,
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#firm` },
    inLanguage: 'en-IN',
    encoding: {
      '@type': 'MediaObject',
      contentUrl: encodeURI(`${SITE.url}${pub.file}`),
      encodingFormat: 'application/pdf',
    },
  };

  return (
    <div className="gm-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SubpageNav links={NAV} />

      <main className="gm-pub-viewer">
        <header className="gm-pub-viewer__header">
          <h1 className="gm-pub-viewer__title">{pub.title}</h1>
          <a
            href={pub.file}
            download
            className="gm-pub-viewer__download"
          >
            Download PDF
          </a>
        </header>

        <div className="gm-pub-viewer__embed">
          <iframe
            src={pub.file}
            title={pub.title}
            className="gm-pub-viewer__iframe"
          />
        </div>
      </main>

      <footer className="gm-footer">
        <LogoLockup />
        <p>{SITE.copyright}</p>
      </footer>
    </div>
  );
}
