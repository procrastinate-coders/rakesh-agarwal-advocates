import Preloader from '@/components/portfolio/Preloader';
import CustomCursor from '@/components/portfolio/CustomCursor';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import Marquee from '@/components/portfolio/Marquee';
import PortraitEditorial from '@/components/portfolio/PortraitEditorial';
import AboutSection from '@/components/portfolio/AboutSection';
import EducationScroll from '@/components/portfolio/EducationScroll';
import AwardsSection from '@/components/portfolio/AwardsSection';
import ExpertiseSection from '@/components/portfolio/ExpertiseSection';
import TrainingSection from '@/components/portfolio/TrainingSection';
import LandmarksSection from '@/components/portfolio/LandmarksSection';
import PullQuote from '@/components/portfolio/PullQuote';
import CaseLedger from '@/components/portfolio/CaseLedger';
import OfficesSection from '@/components/portfolio/OfficesSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';

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
