import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Activities from '../components/landing/Activities';
import Pricing from '../components/landing/Pricing';
import InfoBar from '../components/landing/InfoBar';
import FaqSection from '../components/landing/FaqSection';
import Footer from '../components/layout/Footer';
import MobileStickyCTA from '../components/landing/MobileStickyCTA';
import Countdown from '../components/landing/Countdown';

export default function LandingPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)] relative z-0 pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <InfoBar />
      <Countdown />
      <Activities />
      <Pricing />
      <FaqSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
