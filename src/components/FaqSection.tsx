import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';

interface FaqSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  // First item open by default for immediate engagement
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'faq_support_link' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };



  return (
    <section id="faq-section" className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#579B35]" />
            Patient Clarifications & Guidance
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Clear, honest medical answers regarding clinical evaluation, daycare options, recovery timelines, and insurance documentation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {content.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#7B4FA3] bg-[#F5F0F8]/30 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? 'text-[#5D367F]' : 'text-[#252525]'}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#7B4FA3] text-white rotate-180' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-purple-100/50 pt-3 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions footer */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#EAF4E5]/60 to-[#F5F0F8] border border-green-200/80 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-gray-900">
              Have questions about your condition or insurance?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Our clinical desk will gladly review your symptoms and assist with documentation.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                trackConversionEvent('appointment_click', content.id, { location: 'faq_insurance_cta' });
                onOpenAppointmentModal();
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white text-xs font-bold shadow-xs cursor-pointer min-h-[42px]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ask About Insurance</span>
            </button>

            <button
              type="button"
              onClick={handlePhoneClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-800 hover:bg-gray-50 shadow-xs cursor-pointer min-h-[42px]"
            >
              <Phone className="w-3.5 h-3.5 text-[#7B4FA3]" />
              <span>Call Us</span>
            </button>


          </div>
        </div>
      </div>
    </section>
  );
};
