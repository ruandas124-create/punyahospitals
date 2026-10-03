import React, { useState, useEffect, useRef } from 'react';
import { ConditionId } from './types';
import { PatientRecord } from './types/hospital';
import { LANDING_PAGES_DATA } from './data/landingPagesData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SymptomsSection } from './components/SymptomsSection';
import { MedicalDiagramSection } from './components/MedicalDiagramSection';
import { TreatmentOptionsSection } from './components/TreatmentOptionsSection';
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
import { trackConversionEvent } from './utils/analytics';
import { resolveConditionFromPath, TREATMENT_URLS } from './constants/treatmentRoutes';

// Staff Portal Dashboards
import { StaffPortalHeader } from './components/hospital/StaffPortalHeader';
import { MasterAdminDashboard } from './components/hospital/MasterAdminDashboard';
import { SalesDashboard } from './components/hospital/SalesDashboard';
import { FrontOfficeDashboard } from './components/hospital/FrontOfficeDashboard';
import { DataFlowAuditModal } from './components/hospital/DataFlowAuditModal';

type StaffTab = 'master_admin' | 'sales' | 'front_office' | 'audit';

export default function App() {
  // Determine initial condition based on pathname
  const getConditionFromPath = (): ConditionId => {
    if (typeof window === 'undefined') return 'piles';
    return resolveConditionFromPath(window.location.pathname);
  };

  // Check if pathname points to internal staff portal
  const checkStaffPortalFromPath = (): { isActive: boolean; tab: StaffTab } => {
    if (typeof window === 'undefined') return { isActive: false, tab: 'master_admin' };
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/admin') || path.includes('/master-admin')) {
      return { isActive: true, tab: 'master_admin' };
    }
    if (path.includes('/sales')) {
      return { isActive: true, tab: 'sales' };
    }
    if (path.includes('/front-office') || path.includes('/frontoffice')) {
      return { isActive: true, tab: 'front_office' };
    }
    if (path.includes('/audit')) {
      return { isActive: true, tab: 'audit' };
    }
    return { isActive: false, tab: 'master_admin' };
  };

  const initialPortal = checkStaffPortalFromPath();
  const [isStaffPortalActive, setIsStaffPortalActive] = useState<boolean>(initialPortal.isActive);
  const [staffTab, setStaffTab] = useState<StaffTab>(initialPortal.tab);
  const [selectedAuditPatient, setSelectedAuditPatient] = useState<PatientRecord | null>(null);

  const [currentCondition, setCurrentCondition] = useState<ConditionId>(getConditionFromPath);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Track scroll depth triggers
  const scrolled50Ref = useRef(false);
  const scrolled90Ref = useRef(false);

  // Sync initial URL if loaded on root /
  useEffect(() => {
    const portalCheck = checkStaffPortalFromPath();
    if (!portalCheck.isActive) {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath === '/' || currentPath === '') {
        window.history.replaceState(null, '', TREATMENT_URLS[currentCondition]);
      }
    }
  }, []);

  // Handle URL changes & popstate
  useEffect(() => {
    const handlePopState = () => {
      const portalCheck = checkStaffPortalFromPath();
      if (portalCheck.isActive) {
        setIsStaffPortalActive(true);
        setStaffTab(portalCheck.tab);
      } else {
        setIsStaffPortalActive(false);
        const condition = resolveConditionFromPath(window.location.pathname);
        setCurrentCondition(condition);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reset scroll triggers and register scroll tracking (only for public landing pages)
  useEffect(() => {
    if (isStaffPortalActive) return;

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
  }, [currentCondition, isStaffPortalActive]);

  const handleNavigate = (condition: ConditionId) => {
    setIsStaffPortalActive(false);
    setCurrentCondition(condition);
    const targetPath = TREATMENT_URLS[condition];
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenStaffPortal = (tab: StaffTab = 'master_admin') => {
    setIsStaffPortalActive(true);
    setStaffTab(tab);
    const pathMap: Record<StaffTab, string> = {
      master_admin: '/admin',
      sales: '/sales',
      front_office: '/front-office',
      audit: '/audit',
    };
    if (window.location.pathname !== pathMap[tab]) {
      window.history.pushState(null, '', pathMap[tab]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPublicWebsite = () => {
    setIsStaffPortalActive(false);
    const targetPath = TREATMENT_URLS[currentCondition];
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenAuditForPatient = (patient: PatientRecord) => {
    setSelectedAuditPatient(patient);
    setStaffTab('audit');
    if (window.location.pathname !== '/audit') {
      window.history.pushState(null, '', '/audit');
    }
  };

  const content = LANDING_PAGES_DATA[currentCondition];

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-[#252525] flex flex-col font-sans selection:bg-[#7B4FA3]/20 selection:text-[#5D367F]">
      {/* Dynamic SEO Meta & JSON-LD Structured Data */}
      <SeoStructuredData content={content} />

      {/* Staff Portal View when URL is /admin, /sales, /front-office, /audit */}
      {isStaffPortalActive ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          <StaffPortalHeader
            currentTab={staffTab}
            onSelectTab={(tab) => {
              setStaffTab(tab);
              const pathMap: Record<StaffTab, string> = {
                master_admin: '/admin',
                sales: '/sales',
                front_office: '/front-office',
                audit: '/audit',
              };
              if (window.location.pathname !== pathMap[tab]) {
                window.history.pushState(null, '', pathMap[tab]);
              }
            }}
            onBackToWebsite={handleBackToPublicWebsite}
          />

          <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            {staffTab === 'master_admin' && (
              <MasterAdminDashboard
                onOpenAuditForPatient={handleOpenAuditForPatient}
                onNavigateToFrontOffice={() => {
                  setStaffTab('front_office');
                  window.history.pushState(null, '', '/front-office');
                }}
              />
            )}

            {staffTab === 'sales' && (
              <SalesDashboard
                onOpenAuditForPatient={handleOpenAuditForPatient}
                onNavigateToFrontOffice={() => {
                  setStaffTab('front_office');
                  window.history.pushState(null, '', '/front-office');
                }}
              />
            )}

            {staffTab === 'front_office' && (
              <FrontOfficeDashboard
                onOpenAuditForPatient={handleOpenAuditForPatient}
              />
            )}

            {staffTab === 'audit' && (
              <DataFlowAuditModal
                isOpen={true}
                onClose={() => {
                  setStaffTab('master_admin');
                  window.history.pushState(null, '', '/admin');
                }}
                selectedPatient={selectedAuditPatient}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Header with Navigation and Conversion CTAs */}
          <Header
            currentCondition={currentCondition}
            onNavigate={handleNavigate}
            onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            onOpenStaffPortal={handleOpenStaffPortal}
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

            {/* 5. Separate URL Showcase for All 5 Treatments */}
            <AllTreatmentsSection
              currentCondition={currentCondition}
              onNavigate={handleNavigate}
            />

            {/* 6. Why Choose PUNYA Hospital Section */}
            <WhyPunyaSection condition={currentCondition} />

            {/* 7. Doctor Profile Section */}
            <DoctorSection
              condition={currentCondition}
              onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            />

            {/* 8. How It Works Section */}
            <HowItWorksSection
              condition={currentCondition}
              onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            />

            {/* 9. Patient Trust Section */}
            <PatientTrustSection condition={currentCondition} />

            {/* 10. Treatment Journey Section */}
            <TreatmentJourneySection condition={currentCondition} />

            {/* 11. Accordion FAQ Section */}
            <FaqSection
              content={content}
              onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            />

            {/* 12. Hospital Location & Direct Contact Section */}
            <HospitalLocationSection
              condition={currentCondition}
              onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            />

            {/* 13. Final High-Converting Purple & Green CTA Section */}
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
        </>
      )}
    </div>
  );
}
