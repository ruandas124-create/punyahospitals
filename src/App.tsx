import React, { useState, useEffect, useRef } from 'react';
import { ConditionId } from './types';
import { PatientRecord } from './types/hospital';
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
    const path = window.location.pathname.toLowerCase();
    if (path.includes('uterine-fibroids') || path.includes('fibroid')) return 'uterine-fibroids';
    if (path.includes('endometriosis')) return 'endometriosis';
    if (path.includes('gallstone')) return 'gallstone';
    if (path.includes('hernia')) return 'hernia';
    return 'piles';
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

  // Handle URL changes & popstate
  useEffect(() => {
    const handlePopState = () => {
      const portalCheck = checkStaffPortalFromPath();
      if (portalCheck.isActive) {
        setIsStaffPortalActive(true);
        setStaffTab(portalCheck.tab);
      } else {
        setIsStaffPortalActive(false);
        setCurrentCondition(getConditionFromPath());
      }
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
    let targetPath = `/${condition}-treatment`;
    if (condition === 'uterine-fibroids') {
      targetPath = '/uterine-fibroids';
    } else if (condition === 'endometriosis') {
      targetPath = '/endometriosis';
    }
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    let targetPath = `/${currentCondition}-treatment`;
    if (currentCondition === 'uterine-fibroids') {
      targetPath = '/uterine-fibroids';
    } else if (currentCondition === 'endometriosis') {
      targetPath = '/endometriosis';
    }
    window.history.pushState(null, '', targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuditForPatient = (patient: PatientRecord) => {
    setSelectedAuditPatient(patient);
    setStaffTab('audit');
    if (window.location.pathname !== '/audit') {
      window.history.pushState(null, '', '/audit');
    }
  };

  const content = LANDING_PAGES_DATA[currentCondition];

  // If Staff Portal is Active, render the hospital operational dashboards
  if (isStaffPortalActive) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F7FA] text-[#252525]">
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

        <main className="flex-1">
          {staffTab === 'master_admin' && (
            <MasterAdminDashboard
              onNavigateToFrontOffice={() => {
                setStaffTab('front_office');
                window.history.pushState(null, '', '/front-office');
              }}
              onOpenAuditForPatient={handleOpenAuditForPatient}
            />
          )}

          {staffTab === 'sales' && (
            <SalesDashboard
              onNavigateToFrontOffice={() => {
                setStaffTab('front_office');
                window.history.pushState(null, '', '/front-office');
              }}
              onOpenAuditForPatient={handleOpenAuditForPatient}
            />
          )}

          {staffTab === 'front_office' && (
            <FrontOfficeDashboard
              onOpenAuditForPatient={handleOpenAuditForPatient}
            />
          )}

          {staffTab === 'audit' && (
            <DataFlowAuditModal
              selectedPatient={selectedAuditPatient}
            />
          )}
        </main>
      </div>
    );
  }

  // Otherwise, render Public Landing Pages
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] selection:bg-[#F5F0F8] selection:text-[#5D367F]">
      {/* SEO & Structured JSON-LD Schemas */}
      <SeoStructuredData content={content} />

      {/* Sticky Conversion-Focused Header */}
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
