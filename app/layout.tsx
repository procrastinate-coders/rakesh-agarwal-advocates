import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import {
  newsreader,
  playfairDisplay,
  spaceGrotesk,
  inter,
  manrope,
} from '@/lib/fonts';
import { SITE, BAR_ENROLMENT } from '@/lib/constants';
import { contact } from '@/lib/data/contact';
import { education } from '@/lib/data/education';

const siteUrl = SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rakesh Agarwal, IRS (Retd.) — Customs, GST & CESTAT Advocate | Delhi',
    template: '%s | Rakesh Agarwal Advocates',
  },
  description:
    'Rakesh Agarwal, IRS, Additional Commissioner (Retd.) — Advocate specializing in Customs, GST, Central Excise, Service Tax, Foreign Trade, CESTAT litigation, EOU, SEZ, PMLA, DRT. 30+ years IRS experience. Delhi, Agra, Bangalore offices.',
  applicationName: 'Rakesh Agarwal Advocates',
  keywords: [
    'Rakesh Agarwal Advocate',
    'Rakesh Agarwal IRS',
    'Customs Advocate Delhi',
    'Customs Lawyer Delhi',
    'Indirect Tax Advocate',
    'Indirect Tax Lawyer India',
    'GST Advocate Delhi',
    'GST Lawyer',
    'CESTAT Advocate',
    'CESTAT Lawyer Delhi',
    'Central Excise Advocate',
    'Service Tax Advocate',
    'Customs Duty Lawyer',
    'Foreign Trade Policy Advocate',
    'EOU SEZ Advocate',
    'PMLA Advocate Delhi',
    'DRT Advocate Delhi',
    'CHA Licensing Advocate',
    'Additional Commissioner (Retd.) IRS',
    'IRS Officer Advocate',
    'Department Representative CESTAT',
    'Customs Appeal Lawyer',
    'Tribunal Advocate India',
    'Tax Litigation Advocate Delhi',
    'Indirect Tax Consultant Delhi',
    'Customs Broker Advocate',
    'Anti Dumping Advocate',
    'Export Promotion Schemes Advocate',
    'DGFT Advocate',
    'CBIC Advocate',
    'Rakesh Agarwal Advocates Delhi',
    'Rakesh Agarwal Advocates Agra',
    'Rakesh Agarwal Advocates Bangalore',
    'Best Customs Advocate India',
    'Best GST Lawyer Delhi',
  ],
  authors: [{ name: 'Rakesh Agarwal', url: siteUrl }],
  creator: 'Rakesh Agarwal Advocates',
  publisher: 'Rakesh Agarwal Advocates',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Rakesh Agarwal Advocates',
    title: 'Rakesh Agarwal, IRS (Retd.) — Customs, GST & CESTAT Advocate',
    description:
      'Customs & Indirect Tax | Additional Commissioner (Retd.) | 30+ Years IRS | 45+ CESTAT Cases | GST, Customs, Central Excise, Service Tax, PMLA, DRT',
    images: [
      {
        url: '/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Rakesh Agarwal — Advocate & Advisor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakesh Agarwal, IRS (Retd.) — Customs, GST & CESTAT Advocate',
    description:
      'Customs & Indirect Tax | Additional Commissioner (Retd.) | 30+ Years IRS | CESTAT Practitioner',
    images: ['/og-card.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Canonical is set per page — a canonical here would be inherited by
  // every route and point them all at the home page.
  category: 'Legal Services',
};

const PRACTICE = [
  'Customs Law',
  'GST',
  'Central Excise',
  'Service Tax',
  'Foreign Trade Policy',
  'CESTAT Litigation',
  'EOU',
  'SEZ',
  'PMLA',
  'DRT',
  'CHA Licensing',
  'Anti-Dumping',
  'Export Promotion Schemes',
];

// Must match lib/data/offices.ts — search engines and AI assistants
// cross-check name/address/phone across the web.
const OFFICE_ADDRESSES = [
  {
    '@type': 'PostalAddress',
    streetAddress: '65, Jai Apartment, 102, I.P. Extension, Patparganj',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110092',
    addressCountry: 'IN',
  },
  {
    '@type': 'PostalAddress',
    streetAddress: '5/7/2/B-3, Kaveri Center, Sanjay Palace',
    addressLocality: 'Agra',
    addressRegion: 'Uttar Pradesh',
    postalCode: '282002',
    addressCountry: 'IN',
  },
  {
    '@type': 'PostalAddress',
    streetAddress: '8, 21st Main, 9th Cross, Indiranagar 1st Stage',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560038',
    addressCountry: 'IN',
  },
];

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Rakesh Agarwal',
      alternateName: ['Rakesh Agarwal IRS', 'Rakesh Agarwal, IRS (Retd.)', 'Advocate Rakesh Agarwal'],
      description:
        'Advocate specializing in Customs & Indirect Tax with 30+ years of IRS experience. Additional Commissioner (Retd.) and former Department Representative at CESTAT.',
      url: siteUrl,
      image: `${siteUrl}/assets/PP-RA_Advocate.jpg`,
      telephone: [contact.mobile, '+91-11-40571716'],
      email: contact.email,
      jobTitle: 'Advocate & Advisor — Customs & Indirect Tax',
      honorificSuffix: 'IRS (Retd.)',
      worksFor: { '@id': `${siteUrl}/#firm` },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'National Academy of Customs, Indirect Taxes and Narcotics (NACIN)' },
        ...education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
      ],
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Advocate enrolment',
        identifier: BAR_ENROLMENT.number,
        recognizedBy: { '@type': 'Organization', name: BAR_ENROLMENT.council },
      },
      memberOf: { '@type': 'Organization', name: BAR_ENROLMENT.council },
      knowsAbout: PRACTICE,
    },
    {
      '@type': 'LegalService',
      '@id': `${siteUrl}/#firm`,
      name: 'Rakesh Agarwal Advocates',
      alternateName: 'RAA',
      url: siteUrl,
      description:
        'Law practice specializing in Customs, GST, Indirect Tax, CESTAT litigation, Central Excise, Service Tax, Foreign Trade Policy, EOU, SEZ, PMLA and DRT matters.',
      image: `${siteUrl}/og-card.png`,
      logo: `${siteUrl}/og-card.png`,
      telephone: contact.mobile,
      email: contact.email,
      priceRange: '₹₹₹',
      address: OFFICE_ADDRESSES[0],
      location: OFFICE_ADDRESSES.map((address) => ({ '@type': 'Place', address })),
      founder: { '@id': `${siteUrl}/#person` },
      areaServed: [
        { '@type': 'City', name: 'New Delhi' },
        { '@type': 'City', name: 'Agra' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'Country', name: 'India' },
      ],
      knowsAbout: PRACTICE,
      serviceType: [
        'Customs Law',
        'GST Advisory',
        'CESTAT Appeals',
        'Indirect Tax Litigation',
        'Central Excise',
        'Service Tax',
        'Foreign Trade Policy',
        'EOU & SEZ Advisory',
        'PMLA Matters',
        'DRT Matters',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Rakesh Agarwal Advocates',
      alternateName: ['Rakesh Agarwal, IRS', 'rakeshagarwaladvocates.com'],
      inLanguage: 'en-IN',
      publisher: { '@id': `${siteUrl}/#firm` },
      about: { '@id': `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} ${inter.variable} ${manrope.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
