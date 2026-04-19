import type { Metadata } from 'next';
import Preloader from '@/components/shared/Preloader';
import { SECTIONS } from '@/lib/constants';
import { education } from '@/lib/data/education';
import { awards } from '@/lib/data/awards';
import { training } from '@/lib/data/training';
import {
  Navbar,
  Hero,
  PracticeRibbon,
  PortraitEditorial,
  AboutSection,
  PullQuote,
  Timeline,
  SpineSection,
  CaseHighlight,
  CaseLedger,
  OfficesSection,
  ContactSection,
  Footer,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Rakesh Agarwal — Advocate & Advisor',
  description: 'Customs & Indirect Tax | Joint Commissioner (Rtd.)',
  openGraph: {
    title: 'Rakesh Agarwal — Advocate & Advisor',
    description: 'Customs & Indirect Tax | Joint Commissioner (Rtd.) | CESTAT Practitioner',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className="gm-page">
      <Preloader />
      <Navbar />
      <Hero />
      <PracticeRibbon />
      <PortraitEditorial />
      <AboutSection />

      <Timeline
        section={SECTIONS.education}
        items={education.map((e) => ({
          year: e.year,
          primary: e.degree,
          secondary: e.institution,
        }))}
      />

      <SpineSection
        section={SECTIONS.training}
        items={training.map((t) => ({
          title: t.title,
          description: t.org,
        }))}
      />

      <Timeline
        section={SECTIONS.awards}
        items={awards.map((a) => ({
          year: a.year,
          primary: a.text,
        }))}
      />

      <CaseLedger />
      <OfficesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
