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

const siteUrl = 'https://rakesh-agarwal-advocates.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rakesh Agarwal — Advocate & Advisor | Customs & Indirect Tax | IRS (Retd.)',
    template: '%s | Rakesh Agarwal Advocates',
  },
  description:
    'Rakesh Agarwal, IRS (Retd.) Joint Commissioner — Advocate specializing in Customs, GST, Central Excise, Service Tax, Foreign Trade, CESTAT litigation, EOU, SEZ, PMLA, DRT. 30+ years IRS experience. Delhi, Agra, Bangalore offices.',
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
    'Joint Commissioner IRS Retired',
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
    title: 'Rakesh Agarwal — Advocate & Advisor | Customs & Indirect Tax',
    description:
      'Customs & Indirect Tax | Joint Commissioner (Rtd.) | 30+ Years IRS | 45+ CESTAT Cases | GST, Customs, Central Excise, Service Tax, PMLA, DRT',
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
    title: 'Rakesh Agarwal — Advocate & Advisor | Customs & Indirect Tax',
    description:
      'Customs & Indirect Tax | Joint Commissioner (Rtd.) | 30+ Years IRS | CESTAT Practitioner',
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
  alternates: {
    canonical: siteUrl,
  },
  category: 'Legal Services',
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Attorney',
      '@id': `${siteUrl}/#attorney`,
      name: 'Rakesh Agarwal',
      alternateName: 'Rakesh Agarwal IRS',
      description:
        'Advocate specializing in Customs & Indirect Tax with 30+ years of IRS experience. Former Joint Commissioner and Department Representative at CESTAT.',
      url: siteUrl,
      image: `${siteUrl}/assets/PP-RA_Advocate.jpg`,
      telephone: ['+91-9818830557', '011-40571716'],
      email: 'rakeshagarwal.irs@gmail.com',
      jobTitle: 'Advocate & Advisor',
      honorificSuffix: 'IRS (Retd.)',
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'National Academy of Customs, Indirect Taxes and Narcotics (NACIN)' },
      ],
      knowsAbout: [
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
      ],
      areaServed: [
        { '@type': 'City', name: 'New Delhi' },
        { '@type': 'City', name: 'Agra' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'Country', name: 'India' },
      ],
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'B9, 1st Apartment, 207 IP Extension, Patparganj',
          addressLocality: 'New Delhi',
          postalCode: '110092',
          addressCountry: 'IN',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '5/7/2/B-3, Kaveri Center, Sanjay Palace',
          addressLocality: 'Agra',
          postalCode: '282002',
          addressCountry: 'IN',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: '8th, 21st Main, 9th Cross, Indiranagar 1st Stage',
          addressLocality: 'Bangalore',
          postalCode: '560038',
          addressCountry: 'IN',
        },
      ],
      memberOf: {
        '@type': 'Organization',
        name: 'Delhi Bar Council',
      },
    },
    {
      '@type': 'LegalService',
      '@id': `${siteUrl}/#firm`,
      name: 'Rakesh Agarwal Advocates',
      url: siteUrl,
      description:
        'Law firm specializing in Customs, GST, Indirect Tax, CESTAT litigation, Central Excise, Service Tax, Foreign Trade Policy, EOU, SEZ, PMLA and DRT matters.',
      image: `${siteUrl}/og-card.png`,
      telephone: '+91-9818830557',
      email: 'rakeshagarwal.irs@gmail.com',
      priceRange: '₹₹₹',
      founder: { '@id': `${siteUrl}/#attorney` },
      areaServed: { '@type': 'Country', name: 'India' },
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
      publisher: { '@id': `${siteUrl}/#firm` },
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
