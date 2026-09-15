import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, ChevronDown, Award, Stethoscope, HelpCircle, ShieldCheck } from 'lucide-react';
import { PunyaLogo } from './PunyaLogo';
import { ConditionId } from '../types';
import { trackConversionEvent } from '../utils/analytics';

interface HeaderProps {
  currentCondition: ConditionId;
  onNavigate: (condition: ConditionId) => void;
  onOpenAppointmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCondition,
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);

  const treatments: { id: ConditionId; name: string; tag: string }[] = [
    { id: 'piles', name: 'Piles Treatment', tag: 'Colorectal Care' },
    { id: 'gallstone', name: 'Gallstone Treatment', tag: 'Laparoscopic Care' },
    { id: 'hernia', name: 'Hernia Treatment', tag: 'Advanced Mesh Repair' },
    { id: 'uterine-fibroids', name: 'Uterine Fibroids', tag: "Women's Health & Laparoscopy" },
    { id: 'endometriosis', name: 'Endometriosis', tag: 'Pelvic Pain & Care' },
  ];

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', currentCondition, { location: 'header_call' });
    window.location.href = 'tel:+918045689000';
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', currentCondition, { location: 'header_whatsapp' });
    const messages: Record<ConditionId, string> = {
      piles: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Piles treatment. Please help me with an appointment.',
      gallstone: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Gallstone treatment. Please help me with an appointment.',
      hernia: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Hernia treatment. Please help me with an appointment.',
      'uterine-fibroids': 'Hello PUNYA Hospital, I would like to consult a specialist regarding Uterine Fibroids treatment. Please help me with an appointment.',
      endometriosis: 'Hello PUNYA Hospital, I would like to consult a specialist regarding Endometriosis treatment. Please help me with an appointment.',
    };
    const encoded = encodeURIComponent(messages[currentCondition]);
    window.open(`https://wa.me/918045689000?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      {/* Top micro-bar showing hospital accreditation / ad banner */}
      <div className="bg-[#5D367F] text-white text-[11px] sm:text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#579B35] animate-pulse"></span>
        <span>Bangalore's Premier Specialist Care Centre</span>
        <span className="hidden md:inline text-purple-200">•</span>
        <span className="hidden md:inline text-purple-100">Direct Doctor Consultations Available Today</span>
        <span className="hidden lg:inline text-purple-200">•</span>
        <span className="hidden lg:inline font-bold text-[#EAF4E5]">Call: +91 80 4568 9000</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <div 
            className="cursor-pointer py-1 flex-shrink-0"
            onClick={() => onNavigate(currentCondition)}
          >
            <PunyaLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#252525]">
            {/* Treatment Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setTreatmentDropdownOpen(!treatmentDropdownOpen)}
                onBlur={() => setTimeout(() => setTreatmentDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 hover:text-[#7B4FA3] py-2 transition-colors cursor-pointer"
                id="header-treatment-menu-button"
              >
                <span>Treatments</span>
                <ChevronDown className="w-4 h-4 text-[#7B4FA3]" />
              </button>

              {treatmentDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Speciality Services
                  </div>
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onNavigate(t.id);
                        setTreatmentDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between hover:bg-[#F5F0F8] transition-colors ${
                        currentCondition === t.id ? 'bg-[#F5F0F8] text-[#7B4FA3] font-bold' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-xs text-gray-500 font-normal">{t.tag}</div>
                      </div>
                      {currentCondition === t.id && (
                        <span className="text-xs bg-[#579B35] text-white px-1.5 py-0.5 rounded font-medium">Active</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('why-punya')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-why-punya"
            >
              Why PUNYA
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('doctor-profile')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-doctors"
            >
              Doctors
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-faqs"
            >
              FAQs
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 md:gap-3">
            {/* Call Now */}
            <button
              type="button"
              onClick={handlePhoneClick}
              className="inline-flex items-center gap-2 px-3.5 md:px-4 py-2.5 rounded-full border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-xs md:text-sm tracking-wide transition-all shadow-xs active:scale-95 cursor-pointer"
              id="header-call-btn-desktop"
            >
              <Phone className="w-4 h-4 text-inherit" />
              <span>CALL NOW</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3.5 md:px-4 py-2.5 rounded-full bg-[#579B35] hover:bg-[#467e2a] text-white font-bold text-xs md:text-sm tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
              id="header-whatsapp-btn-desktop"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WHATSAPP</span>
            </button>

            {/* Quick Book Consultation CTA */}
            <button
              type="button"
              onClick={onOpenAppointmentModal}
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-bold text-xs md:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              id="header-book-consult-desktop"
            >
              <span>BOOK VISIT</span>
            </button>
          </div>

          {/* Mobile Right Quick Action Icons + Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5 flex-shrink-0">
            {/* Quick Call icon */}
            <button
              type="button"
              onClick={handlePhoneClick}
              aria-label="Call PUNYA Hospital"
              className="w-10 h-10 rounded-full bg-purple-50 text-[#7B4FA3] border border-purple-200 flex items-center justify-center active:bg-[#7B4FA3] active:text-white transition-colors"
              id="header-call-btn-mobile"
            >
              <Phone className="w-4 h-4" />
            </button>

            {/* Quick WhatsApp icon */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              aria-label="WhatsApp PUNYA Hospital"
              className="w-10 h-10 rounded-full bg-[#579B35] text-white flex items-center justify-center active:bg-[#467e2a] shadow-xs transition-colors"
              id="header-whatsapp-btn-mobile"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#7B4FA3] active:bg-gray-100 transition-colors"
              id="header-hamburger-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          {/* Quick Disease Switcher on Mobile */}
          <div className="bg-[#F5F0F8] p-3 rounded-xl">
            <div className="text-xs font-bold text-[#5D367F] uppercase tracking-wider mb-2">
              Select Treatment Landing Page:
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              {treatments.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    onNavigate(t.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-2 rounded-lg text-center transition-all ${
                    currentCondition === t.id
                      ? 'bg-[#7B4FA3] text-white font-bold shadow-xs'
                      : 'bg-white text-gray-700 border border-purple-100 hover:bg-purple-50'
                  }`}
                >
                  {t.name.replace(' Treatment', '')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-base font-semibold text-gray-800">
            <button
              type="button"
              onClick={() => scrollToSection('symptoms-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Symptoms Check
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('medical-diagram')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Medical Diagram & Cause
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('treatment-options')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Treatment Options
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('why-punya')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Why PUNYA Hospital
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('doctor-profile')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Meet Specialist Doctor
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePhoneClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>CALL NOW</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#579B35] text-white font-bold text-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WHATSAPP</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
