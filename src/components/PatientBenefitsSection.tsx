import React from 'react';
import { 
  Heart, Clock, Users, IndianRupee, ShieldCheck, 
  Compass, Sparkles, ArrowRight, Phone, MessageSquare 
} from 'lucide-react';
import { LandingPageContent } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';

interface PatientBenefitsSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const PatientBenefitsSection: React.FC<PatientBenefitsSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'patient_benefits_call' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };



  const scrollToInsurance = () => {
    const el = document.getElementById('insurance-support');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenAppointmentModal();
    }
  };

  // 7 Core Patient Benefit Themes written in warm, natural Indian English
  const coreBenefits = [
    {
      icon: <Heart className="w-6 h-6 text-[#7B4FA3]" />,
      badge: 'Comfort First',
      headline: 'Your Comfort Matters to Us',
      content:
        'We understand that surgery can feel stressful. Our team will help you understand your treatment options and guide you through the next steps with genuine care.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#579B35]" />,
      badge: 'Daycare Options',
      headline: 'Ask About Same-Day Discharge Options',
      content:
        'Some procedures allow patients to return home on the same day. Our team will explain the expected discharge time based on your treatment and medical condition.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#7B4FA3]" />,
      badge: 'Helpful Team',
      headline: 'Friendly Staff, Always Ready to Help',
      content:
        'Have questions about your treatment or appointment? Our team can help you understand the process and get the information you need without hassle.',
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-[#579B35]" />,
      badge: 'Clear Estimates',
      headline: 'Quality Care With Clear Treatment Cost Guidance',
      content:
        'We understand that treatment costs matter to every family. Speak to our team to understand the available treatment options and expected costs before making a decision.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#7B4FA3]" />,
      badge: 'Documentation Help',
      headline: 'Need Help With Insurance? Speak to Our Team',
      content:
        'Our team can guide you on available insurance assistance and required documentation for your treatment. Coverage and approval depend on your insurance policy and insurer’s terms.',
      hasInsuranceCta: true,
    },
    {
      icon: <Compass className="w-6 h-6 text-[#579B35]" />,
      badge: 'Step-by-Step Care',
      headline: 'Know What to Expect Before Your Treatment',
      content:
        'Understand your treatment process, expected recovery, and follow-up care with patient, clear guidance from your healthcare team.',
    },
  ];

  return (
    <section id="patient-benefits" className="py-14 sm:py-16 md:py-20 bg-gradient-to-b from-white via-[#F5F0F8]/40 to-white border-b border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Patient-Focused Care at PUNYA Hospital
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Care Designed Around You and Your Family
          </h2>
          <p className="mt-3 text-base text-gray-600">
            We believe good medical care should be comfortable, easy to understand, and supported by a team that listens to your concerns.
          </p>
        </div>

        {/* Condition-Specific Content Cards (Highlighted at Top) */}
        {content.benefitCards && content.benefitCards.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D367F] mb-4 text-center sm:text-left">
              Key Highlights for {content.heroHeadline.split('—')[0]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {content.benefitCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-purple-100/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#F5F0F8] text-[#7B4FA3] mb-3 inline-block">
                      {card.badge || 'Care Highlight'}
                    </span>
                    <h4 className="text-base font-bold text-[#252525] group-hover:text-[#5D367F] transition-colors mb-1.5">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6 Core Patient Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {coreBenefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs hover:shadow-lg hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F0F8] group-hover:bg-[#EAF4E5] flex items-center justify-center transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#252525] group-hover:text-[#5D367F] transition-colors mb-2">
                  {item.headline}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.content}
                </p>
              </div>

              {item.hasInsuranceCta && (
                <div className="pt-3 border-t border-gray-100 mt-auto">
                  <button
                    type="button"
                    onClick={scrollToInsurance}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B4FA3] hover:text-[#5D367F] hover:underline cursor-pointer"
                  >
                    <span>Enquire About Insurance Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Warm Indian English Callout Card */}
        <div className="bg-gradient-to-r from-[#5D367F] via-[#7B4FA3] to-[#5D367F] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EAF4E5]">
              We Are Here for You & Your Family
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Have Questions About Your Treatment or Expected Costs?
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
              Speak directly to our hospital desk. We are happy to explain appointment timings, expected recovery, and answer your doubts in simple words.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handlePhoneClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#5D367F] hover:bg-gray-100 font-extrabold text-xs sm:text-sm shadow-md active:scale-98 cursor-pointer min-h-[46px]"
            >
              <Phone className="w-4 h-4 text-[#7B4FA3]" />
              <span>Call Our Hospital Desk</span>
            </button>


          </div>
        </div>
      </div>
    </section>
  );
};
