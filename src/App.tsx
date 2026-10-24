import React, { useState, useEffect, useRef } from 'react';
import { ConditionId } from './types';
import { LANDING_PAGES_DATA } from './data/landingPagesData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PatientBenefitsSection } from './components/PatientBenefitsSection';
import { SymptomsSection } from './components/SymptomsSection';
import { MedicalDiagramSection } from './components/MedicalDiagramSection';
import { TreatmentOptionsSection } from './components/TreatmentOptionsSection';
import { InsuranceSupportSection } from './components/InsuranceSupportSection';
import { AllTreatmentsSection } from './components/AllTreatmentsSection';
import { WhyPunyaSection } from './components/WhyPunyaSection';
import { DoctorSection } from './components/DoctorSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PatientTrustSection } from './components/PatientTrustSection';
import { TreatmentJourneySection } from './components/TreatmentJourneySection';
import { FaqSection } from './components/FaqSection';
import { HospitalLocationSection } from './components/HospitalLocationSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AppointmentModal } from './components/AppointmentModal';
import { SeoStructuredData } from './components/SeoStructuredData';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { trackConversionEvent } from './utils/analytics';
import { resolveConditionFromPath, TREATMENT_URLS } from './constants/treatmentRoutes';

export default function App() {
  // Determine initial condition based on pathname
  const getConditionFromPath = (): ConditionId => {
    if (typeof window === 'undefined') return 'piles';
    return resolveConditionFromPath(window.location.pathname);
  };

  const [currentCondition, setCurrentCondition] = useState<ConditionId>(getConditionFromPath);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Track scroll depth triggers
  const scrolled50Ref = useRef(false);
  const scrolled90Ref = useRef(false);

  // Sync initial URL if loaded on root /
  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath === '/' || currentPath === '' || currentPath.includes('/admin') || currentPath.includes('/sales') || currentPath.includes('/front-office')) {
      window.history.replaceState(null, '', TREATMENT_URLS[currentCondition]);
    }
  }, []);

  // Handle URL changes & popstate
  useEffect(() => {
    const handlePopState = () => {
      const condition = resolveConditionFromPath(window.location.pathname);
      setCurrentCondition(condition);
      window.scrollTo({ top: 0, behavior: 'instant' });
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
    const targetPath = TREATMENT_URLS[condition];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const content = LANDING_PAGES_DATA[currentCondition];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-[#252525] flex flex-col font-sans selection:bg-[#7B4FA3]/20 selection:text-[#5D367F]">
      {/* Dynamic SEO Meta & JSON-LD Structured Data */}
      <SeoStructuredData content={content} />

      {/* Header with Navigation and Conversion CTAs */}
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

        {/* 2. Patient Benefits & Highlights Section */}
        <PatientBenefitsSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 3. Symptoms Section */}
        <SymptomsSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 4. Medical Diagram Section */}
        <MedicalDiagramSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 5. Treatment Options Section */}
        <TreatmentOptionsSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 6. Insurance Support & Documentation Section */}
        <InsuranceSupportSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 7. Separate URL Showcase for All 5 Treatments */}
        <AllTreatmentsSection
          currentCondition={currentCondition}
          onNavigate={handleNavigate}
        />

        {/* 8. Why Choose PUNYA Hospital Section */}
        <WhyPunyaSection condition={currentCondition} />

        {/* 9. Doctor Profile Section */}
        <DoctorSection
          condition={currentCondition}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 10. How It Works Section */}
        <HowItWorksSection
          condition={currentCondition}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 11. Patient Trust Section */}
        <PatientTrustSection condition={currentCondition} />

        {/* 12. Treatment Journey Section */}
        <TreatmentJourneySection condition={currentCondition} />

        {/* 13. Accordion FAQ Section */}
        <FaqSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 14. Hospital Location & Direct Contact Section */}
        <HospitalLocationSection
          condition={currentCondition}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />

        {/* 15. Final High-Converting CTA Section */}
        <FinalCtaSection
          content={content}
          onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Bottom Bar: CALL NOW | WHATSAPP | BOOK VISIT */}
      <MobileStickyBar
        content={content}
        onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
      />

      {/* Floating WhatsApp Button (Only One Across Project) */}
      <FloatingWhatsAppButton />

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
