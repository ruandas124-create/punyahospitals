import React from 'react';
import { Stethoscope, Sparkles, Shield, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';

interface TreatmentOptionsSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const TreatmentOptionsSection: React.FC<TreatmentOptionsSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  return (
    <section id="treatment-options" className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Evidence-Based Clinical Pathways
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Treatment Options at PUNYA Hospital
          </h2>
          <p className="mt-3 text-base text-gray-600">
            We offer tailored treatment strategies ranging from conservative management to advanced minimally invasive interventions.
          </p>
        </div>

        {/* Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {content.treatmentOptions.map((opt, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F0F8] rounded-bl-full -z-0 group-hover:bg-[#EAF4E5] transition-colors" />

              <div className="relative z-10">
                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#F5F0F8] text-[#7B4FA3] mb-4">
                  {opt.badge}
                </span>

                <h3 className="text-xl font-extrabold text-[#252525] group-hover:text-[#5D367F] transition-colors">
                  {opt.title}
                </h3>
                <h4 className="text-xs font-semibold text-[#579B35] uppercase tracking-wider mt-0.5 mb-3">
                  {opt.subtitle}
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {opt.description}
                </p>
              </div>

              {/* Suitable-for box */}
              <div className="relative z-10 pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-start gap-2 bg-[#F5F0F8]/50 p-3 rounded-xl border border-purple-50">
                  <Check className="w-4 h-4 text-[#579B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block">
                      Suitability:
                    </span>
                    <span className="text-xs text-gray-700 font-medium leading-tight">
                      {opt.suitableFor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="bg-[#EAF4E5]/60 border border-[#579B35]/20 rounded-2xl p-5 sm:p-6 mb-10 flex items-center gap-3.5 max-w-4xl mx-auto">
          <Shield className="w-6 h-6 text-[#579B35] flex-shrink-0" />
          <p className="text-xs sm:text-sm text-gray-800 font-medium">
            <strong className="text-[#579B35] font-bold">Important Clinical Note: </strong>
            {content.id === 'uterine-fibroids' ? (
              'The best treatment depends on factors such as symptom severity, fibroid size and location, age and personal treatment preferences. A doctor will help guide your options.'
            ) : content.id === 'endometriosis' ? (
              'Treatment depends on symptom severity, location of tissue and personal goals. A specialist will help you understand the most appropriate option for your situation.'
            ) : (
              'Treatment options and recommendations depend strictly upon an in-person medical examination, symptom severity, diagnostic imaging, and clinical assessment by our certified surgical specialists.'
            )}
          </p>
        </div>

        {/* Section CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              trackConversionEvent('appointment_click', content.id, { location: 'treatment_options_cta' });
              onOpenAppointmentModal();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-xs sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer min-h-[48px]"
            id="treatment-options-book-consult-btn"
          >
            <span>
              {content.id === 'uterine-fibroids' || content.id === 'endometriosis'
                ? 'DISCUSS TREATMENT OPTIONS'
                : 'BOOK A SPECIALIST CONSULTATION'}
            </span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
