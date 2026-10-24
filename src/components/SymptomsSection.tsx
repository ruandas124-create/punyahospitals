import React from 'react';
import { 
  AlertTriangle, Flame, Droplets, AlertCircle, Activity, 
  Armchair, ShieldAlert, ArrowRight, Stethoscope, HeartHandshake,
  Phone, CheckCircle2
} from 'lucide-react';
import { LandingPageContent } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';

interface SymptomsSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const SymptomsSection: React.FC<SymptomsSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const getSymptomIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#7B4FA3]" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-[#579B35]" />;
      case 'AlertCircle':
        return <AlertCircle className="w-6 h-6 text-[#7B4FA3]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#579B35]" />;
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-[#7B4FA3]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#579B35]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#7B4FA3]" />;
      default:
        return <Activity className="w-6 h-6 text-[#7B4FA3]" />;
    }
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'symptoms_call_btn' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };

  return (
    <section id="symptoms-section" className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
            Clinical Symptom & Warning Signs Check
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Common Symptoms & Warning Signs to Watch For
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Recognizing these signs early allows for conservative care and minimally invasive daycare solutions before acute complications arise.
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {content.symptoms.map((symptom, idx) => (
            <div
              key={symptom.id || idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F0F8] group-hover:bg-[#EAF4E5] flex items-center justify-center flex-shrink-0 transition-colors">
                {getSymptomIcon(symptom.iconName)}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#5D367F] transition-colors">
                  {symptom.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {symptom.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Signs & When to Seek Evaluation Block */}
        {content.warningSigns && (
          <div className="bg-amber-50/60 rounded-2xl p-6 sm:p-8 border border-amber-200/80 mb-10">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-700 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-950">
                  {content.warningSigns.title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  {content.warningSigns.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {content.warningSigns.signs.map((sign, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-amber-950 bg-white/80 p-2.5 rounded-xl border border-amber-200/50"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0 mt-1.5" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Callout Box */}
        <div className="bg-gradient-to-r from-[#F5F0F8] via-[#EAF4E5]/50 to-[#F5F0F8] rounded-2xl p-6 sm:p-8 border border-purple-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center flex-shrink-0 text-[#7B4FA3] hidden sm:flex">
              <Stethoscope className="w-6 h-6 text-[#579B35]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-[#5D367F]">
                Unsure About Your Symptoms?
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 max-w-xl">
                A thorough clinical examination helps identify whether your condition can be resolved with lifestyle adjustments, medical therapy, or gentle daycare treatment.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                trackConversionEvent('appointment_click', content.id, { location: 'symptoms_cta_button' });
                onOpenAppointmentModal();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
              id="symptoms-discuss-btn"
            >
              <span>DISCUSS YOUR SYMPTOMS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePhoneClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-sm tracking-wide transition-all active:scale-98 cursor-pointer"
              id="symptoms-call-btn"
            >
              <Phone className="w-4 h-4" />
              <span>CALL NOW</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
