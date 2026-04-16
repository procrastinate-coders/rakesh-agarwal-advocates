import type { Metadata } from 'next';
import './globals.css';
import {
  newsreader,
  playfairDisplay,
  spaceGrotesk,
  inter,
  manrope,
} from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    default: 'Rakesh Agarwal — Advocate · IRS (Retd.)',
    template: '%s | Rakesh Agarwal Advocates',
  },
  description:
    'Rakesh Agarwal, IRS (Retd.) Joint Commissioner — Advocate specializing in Customs, GST, Central Excise, Service Tax and Foreign Trade.',
  openGraph: {
    type: 'website',
    title: 'Rakesh Agarwal — Advocate · IRS (Retd.)',
    description:
      'Customs & Indirect Tax | Joint Commissioner (Rtd.) | 30+ Years IRS | 45+ CESTAT Cases',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakesh Agarwal — Advocate · IRS (Retd.)',
    description: 'Customs & Indirect Tax | Joint Commissioner (Rtd.)',
    images: ['/og-card.png'],
  },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
