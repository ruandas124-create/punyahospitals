import React, { useState } from 'react';
import { Menu, X, ChevronDown, Award, Stethoscope, HelpCircle, ShieldCheck, Calendar } from 'lucide-react';
import { PunyaLogo } from './PunyaLogo';
import { ConditionId } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { ALL_TREATMENTS, TREATMENT_URLS } from '../constants/treatmentRoutes';

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

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      <div className="bg-[#5D367F] text-white text-[11px] sm:text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#579B35] animate-pulse"></span>
        <span>Bangalore's Premier Specialist Care Centre</span>
        <span className="hidden md:inline text-purple-200">•</span>
        <span className="hidden md:inline text-purple-100">Direct Doctor Consultations Available Today</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <a 
            href={TREATMENT_URLS[currentCondition]}
            className="cursor-pointer py-1 flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(currentCondition);
            }}
          >
            <PunyaLogo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#252525]">
            {/* Treatment Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setTreatmentDropdownOpen(!treatmentDropdownOpen)}
                onBlur={() => setTimeout(() => setTreatmentDropdownOpen(false), 250)}
                className="flex items-center gap-1.5 hover:text-[#7B4FA3] py-2 transition-colors cursor-pointer"
                id="header-treatment-menu-button"
              >
                <span>5 Treatments</span>
                <ChevronDown className="w-4 h-4 text-[#7B4FA3]" />
              </button>

              {treatmentDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl border border-purple-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                    Speciality Treatments
                  </div>
                  {ALL_TREATMENTS.map((t) => (
                    <a
                      key={t.id}
                      href={t.url}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onNavigate(t.id);
                        setTreatmentDropdownOpen(false);
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(t.id);
                        setTreatmentDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-[#F5F0F8] transition-colors group cursor-pointer ${
                        currentCondition === t.id ? 'bg-[#F5F0F8]' : ''
                      }`}
                    >
                      <div>
                        <div className={`font-semibold transition-colors ${currentCondition === t.id ? 'text-[#7B4FA3] font-bold' : 'text-[#252525] group-hover:text-[#5D367F]'}`}>
                          {t.name}
                        </div>
                        <div className="text-xs text-gray-500 font-normal mt-0.5">
                          {t.tag}
                        </div>
                      </div>
                      {currentCondition === t.id && (
                        <span className="text-[10px] bg-[#579B35] text-white px-2 py-0.5 rounded-full font-semibold">
                          Active
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('patient-benefits')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-benefits"
            >
              Patient Benefits
            </button>

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
              onClick={() => scrollToSection('hospital-location')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-location"
            >
              Location
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('insurance-support')}
              className="hover:text-[#7B4FA3] transition-colors cursor-pointer"
              id="header-nav-insurance"
            >
              Insurance
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

          {/* Desktop Right: Single Book Appointment Button */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={onOpenAppointmentModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-bold text-xs md:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              id="header-book-appointment-desktop"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>

          {/* Mobile Right: Single Book Appointment Button + Hamburger */}
          <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenAppointmentModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7B4FA3] text-white font-bold text-xs shadow-xs active:scale-95 cursor-pointer"
              id="header-book-appointment-mobile"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>BOOK APPOINTMENT</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:text-black ml-1"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          {/* Quick Treatment URL Switcher on Mobile */}
          <div className="bg-[#F5F0F8] p-3 rounded-xl">
            <div className="text-xs font-bold text-[#5D367F] uppercase tracking-wider mb-2">
              Select Treatment:
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              {ALL_TREATMENTS.map((t) => (
                <a
                  key={t.id}
                  href={t.url}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(t.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2.5 px-3 rounded-lg flex items-center justify-between transition-all ${
                    currentCondition === t.id
                      ? 'bg-[#7B4FA3] text-white font-bold shadow-xs'
                      : 'bg-white text-gray-700 border border-purple-100 hover:bg-purple-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className={`text-xs ${currentCondition === t.id ? 'text-purple-100' : 'text-gray-500'}`}>
                      {t.tag}
                    </div>
                  </div>
                  {currentCondition === t.id && (
                    <span className="text-[10px] bg-[#579B35] text-white px-2 py-0.5 rounded-full font-semibold">
                      Active
                    </span>
                  )}
                </a>
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
              onClick={() => scrollToSection('patient-benefits')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Patient Benefits & Comfort
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
              onClick={() => scrollToSection('all-treatments')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              All 5 Treatment Pages
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
              onClick={() => scrollToSection('hospital-location')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Hospital Location & Map
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('insurance-support')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Insurance Support
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('faq-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-[#7B4FA3]"
            >
              Frequently Asked Questions
            </button>

          </div>

          {/* Mobile Single Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointmentModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all cursor-pointer"
              id="header-mobile-drawer-book-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK APPOINTMENT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
