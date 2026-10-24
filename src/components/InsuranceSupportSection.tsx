import React from 'react';
import { ShieldCheck, FileText, Phone, MessageSquare, CheckCircle2, HelpCircle } from 'lucide-react';
import { ConditionId, LandingPageContent } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';

interface InsuranceSupportSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const InsuranceSupportSection: React.FC<InsuranceSupportSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const insuranceData = content.insuranceInfo || {
    title: 'Insurance Assistance Available',
    badge: 'Documentation & TPA Support',
    description:
      'Our team can help you understand the insurance documentation and support available for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
    ctaText: 'Enquire About Insurance Support',
    coverageNote:
      'Cashless hospitalisation facility is available subject to verification of your specific insurer, active policy terms, and third-party administrator (TPA) approval.',
    points: [
      'Comprehensive pre-authorization paperwork assistance and claim documentation',
      'Dedicated hospital desk to guide you through insurer-required diagnostic records',
      'Coordination support for both corporate health policies and individual mediclaim plans',
      'Transparent estimates provided upfront for hassle-free claim submission',
    ],
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'insurance_section' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };



  return (
    <section id="insurance-support" className="py-12 sm:py-16 bg-gradient-to-br from-[#F5F0F8]/80 via-white to-[#EAF4E5]/40 border-y border-purple-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-100 shadow-xl relative overflow-hidden">
          {/* Background Soft Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#7B4FA3]/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#579B35]/5 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#579B35]" />
                <span>{insuranceData.badge}</span>
              </div>
              <span className="text-xs font-semibold text-gray-500">
                PUNYA Hospital • Patient Helpdesk
              </span>
            </div>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight mb-3">
              {insuranceData.title}
            </h2>

            {/* Core Verified Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
              “{insuranceData.description}”
            </p>

            {/* Key Documentation Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {insuranceData.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDFCFE] border border-purple-50 text-xs sm:text-sm text-gray-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#579B35] flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Policy & Cashless Clarification Note */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-gray-600 leading-relaxed mb-6">
              <strong className="text-[#5D367F] font-bold block mb-1">
                Cashless & Policy Information:
              </strong>
              {insuranceData.coverageNote}
            </div>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 border-t border-gray-100">
              {/* Primary: Enquire About Insurance Support */}
              <button
                type="button"
                onClick={() => {
                  trackConversionEvent('appointment_click', content.id, { location: 'insurance_primary_btn' });
                  onOpenAppointmentModal();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
                id="insurance-enquire-btn"
              >
                <FileText className="w-4 h-4" />
                <span>Enquire About Insurance Support</span>
              </button>

              {/* Secondary: Speak to Our Team */}
              <button
                type="button"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-sm tracking-wide transition-all active:scale-98 cursor-pointer"
                id="insurance-call-btn"
              >
                <Phone className="w-4 h-4" />
                <span>Speak to Our Team About Insurance</span>
              </button>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
