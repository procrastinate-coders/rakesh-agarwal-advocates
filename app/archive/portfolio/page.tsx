import Preloader from '@/components/shared/Preloader';
import CustomCursor from '@/components/archive/portfolio/CustomCursor';
import Navbar from '@/components/archive/portfolio/Navbar';
import Hero from '@/components/archive/portfolio/Hero';
import Marquee from '@/components/archive/portfolio/Marquee';
import PortraitEditorial from '@/components/archive/portfolio/PortraitEditorial';
import AboutSection from '@/components/archive/portfolio/AboutSection';
import EducationScroll from '@/components/archive/portfolio/EducationScroll';
import AwardsSection from '@/components/archive/portfolio/AwardsSection';
import ExpertiseSection from '@/components/archive/portfolio/ExpertiseSection';
import TrainingSection from '@/components/archive/portfolio/TrainingSection';
import LandmarksSection from '@/components/archive/portfolio/LandmarksSection';
import PullQuote from '@/components/archive/portfolio/PullQuote';
import CaseLedger from '@/components/archive/portfolio/CaseLedger';
import OfficesSection from '@/components/archive/portfolio/OfficesSection';
import ContactSection from '@/components/archive/portfolio/ContactSection';
import Footer from '@/components/archive/portfolio/Footer';

export default function Home() {
  return (
    <div className="portfolio-body bg-bg text-ink font-[family-name:var(--font-body)] font-normal cursor-default overflow-x-hidden">
      <CustomCursor />
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <PortraitEditorial />
      <AboutSection />
      <EducationScroll />
      <AwardsSection />
      <ExpertiseSection />
      <TrainingSection />
      <LandmarksSection />
      <PullQuote />
      <CaseLedger />
      <OfficesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
