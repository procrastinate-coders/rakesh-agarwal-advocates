import type { Metadata } from 'next';
import CoverBanner from '@/components/card/CoverBanner';
import ProfileSection from '@/components/card/ProfileSection';
import CardShowcase from '@/components/card/CardShowcase';
import CtaRow from '@/components/card/CtaRow';
import ContactList from '@/components/card/ContactList';
import PracticeAreas from '@/components/card/PracticeAreas';
import CardOffices from '@/components/card/CardOffices';
import SocialLinks from '@/components/card/SocialLinks';
import CardFooter from '@/components/card/CardFooter';

export const metadata: Metadata = {
  title: 'Rakesh Agarwal, IRS — Digital Visiting Card',
  description:
    'Save contact, call, or email Rakesh Agarwal — Advocate & Advisor specializing in Customs & Indirect Tax. Joint Commissioner (Rtd.), IRS.',
  openGraph: {
    type: 'profile',
    title: 'Rakesh Agarwal, IRS — Digital Visiting Card',
    description:
      'Save contact, call, or email Rakesh Agarwal — Advocate & Advisor specializing in Customs & Indirect Tax. Joint Commissioner (Rtd.), IRS.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakesh Agarwal, IRS — Digital Visiting Card',
    description:
      'Save contact, call, or email Rakesh Agarwal — Advocate & Advisor | Customs & Indirect Tax',
    images: ['/og-card.png'],
  },
};

export default function VisitingCard() {
  return (
    <div className="card-page">
      {/* Material Symbols font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="card-page__inner">
        <CoverBanner />
        <ProfileSection />
        <a className="card-visit-link" href="/">Visit Website &rarr;</a>
        <div className="gold-rule" />
        <CardShowcase />
        <div className="gold-rule" />
        <CtaRow />
        <ContactList />
        <PracticeAreas />
        <CardOffices />
        <SocialLinks />
        <CardFooter />
      </div>
    </div>
  );
}
