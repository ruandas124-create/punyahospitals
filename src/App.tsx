import React, { useState, useEffect, useRef } from 'react';
import { ConditionId } from './types';
import { LANDING_PAGES_DATA } from './data/landingPagesData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SymptomsSection } from './components/SymptomsSection';
import { MedicalDiagramSection } from './components/MedicalDiagramSection';
import { TreatmentOptionsSection } from './components/TreatmentOptionsSection';
import { WhyPunyaSection } from './components/WhyPunyaSection';
import { DoctorSection } from './components/DoctorSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PatientTrustSection } from './components/PatientTrustSection';
import { TreatmentJourneySection } from './components/TreatmentJourneySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AppointmentModal } from './components/AppointmentModal';
import { SeoStructuredData } from './components/SeoStructuredData';
import { trackConversionEvent } from './utils/analytics';

export default function App() {
  // Determine initial condition based on pathname
  const getConditionFromPath = (): ConditionId => {
    if (typeof window === 'undefined') return 'piles';
    const path = window.location.pathname.toLowerCase();
    if (path.includes('gallstone')) return 'gallstone';
    if (path.includes('hernia')) return 'hernia';
    return 'piles';
  };

  const [currentCondition, setCurrentCondition] = useState<ConditionId>(getConditionFromPath);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Track scroll depth triggers
  const scrolled50Ref = useRef(false);
  const scrolled90Ref = useRef(false);

  // Handle URL changes & popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentCondition(getConditionFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reset scroll triggers and register scroll tracking
  useEffect(() => {
    scrolled50Ref.current = false;
    scrolled90Ref.current = false;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      if (scrollPercentage >= 50 && !scrolled50Ref.current) {
        scrolled50Ref.current = true;
        trackConversionEvent('scroll_50', currentCondition, { depth: '50%' });
      }

      if (scrollPercentage >= 90 && !scrolled90Ref.current) {
        scrolled90Ref.current = true;
        trackConversionEvent('scroll_90', currentCondition, { depth: '90%' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentCondition]);

  const handleNavigate = (condition: ConditionId) => {
    setCurrentCondition(condition);
    const targetPath = `/${condition}-treatment`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = LANDING_PAGES_DATA[currentCondition];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#F5F0F8] selection:text-[#5D367F]">
      {/* SEO & Structured JSON-LD Schemas */}
      <SeoStructuredData content={content} />

      {/* Sticky Conversion-Focused Header */}
      <Header
        currentCondition={currentCondition}
        onNavigate={handleNavigate}
        onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
      />

      {/* Main Landing Page Body */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 1. Hero Section */}
        <HeroSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 2. Symptoms Section */}
        <SymptomsSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 3. Medical Diagram Section (5-10 second comprehension) */}
        <MedicalDiagramSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 4. Treatment Options Section */}
        <TreatmentOptionsSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 5. Why Choose PUNYA Hospital Section */}
        <WhyPunyaSection condition={currentCondition} />

        {/* 6. Doctor Profile Section */}
        <DoctorSection
          condition={currentCondition}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 7. How It Works Section */}
        <HowItWorksSection
          condition={currentCondition}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 8. Patient Trust Section */}
        <PatientTrustSection condition={currentCondition} />

        {/* 9. Treatment Journey Section */}
        <TreatmentJourneySection condition={currentCondition} />

        {/* 10. Accordion FAQ Section */}
        <FaqSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 11. Final High-Converting Purple & Green CTA Section */}
        <FinalCtaSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Bar: CALL NOW | WHATSAPP | BOOK APPOINTMENT */}
      <MobileStickyBar
        content={content}
        onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
      />

      {/* Dedicated Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        currentCondition={currentCondition}
        content={content}
      />
    </div>
  );
}

