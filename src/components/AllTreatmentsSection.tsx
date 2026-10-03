import React from 'react';
import { ArrowRight, CheckCircle2, Stethoscope, Sparkles, ExternalLink } from 'lucide-react';
import { ConditionId } from '../types';
import { ALL_TREATMENTS, TREATMENT_URLS } from '../constants/treatmentRoutes';
import { trackConversionEvent } from '../utils/analytics';

interface AllTreatmentsSectionProps {
  currentCondition: ConditionId;
  onNavigate: (condition: ConditionId) => void;
}

export const AllTreatmentsSection: React.FC<AllTreatmentsSectionProps> = ({
  currentCondition,
  onNavigate,
}) => {
  return (
    <section id="all-treatments" className="py-14 sm:py-16 md:py-20 bg-[#F5F0F8]/40 border-t border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Speciality Surgical & Gynecological Centres
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Our 5 Dedicated Treatment Centres
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Each speciality at PUNYA Hospital has a dedicated surgical department and clinical page. Select any treatment below to visit its dedicated page:
          </p>
        </div>

        {/* 5 Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_TREATMENTS.map((treatment) => {
            const isCurrent = currentCondition === treatment.id;
            return (
              <div
                key={treatment.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-xl ${
                  isCurrent
                    ? 'border-2 border-[#7B4FA3] ring-4 ring-[#7B4FA3]/10'
                    : 'border-purple-100 hover:border-[#7B4FA3]/50'
                }`}
              >
                {/* Header Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3]">
                      {treatment.badge}
                    </span>
                    {isCurrent ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#579B35] text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-[#7B4FA3]">
                        Specialist Care
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-extrabold text-[#252525] mb-1">
                    {treatment.name}
                  </h3>
                  <div className="text-xs font-bold text-[#579B35] uppercase tracking-wider mb-3">
                    {treatment.tag}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {treatment.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-purple-50/60 p-2.5 rounded-xl border border-purple-100/60 mb-5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#7B4FA3] flex-shrink-0" />
                    <span>Lead Specialist: <strong>{treatment.doctor}</strong></span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-3 border-t border-gray-100">
                  <a
                    href={treatment.url}
                    onClick={(e) => {
                      e.preventDefault();
                      trackConversionEvent('scroll_50', treatment.id, { from: currentCondition });
                      onNavigate(treatment.id);
                    }}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs tracking-wide transition-all ${
                      isCurrent
                        ? 'bg-[#EAF4E5] text-[#579B35] cursor-default'
                        : 'bg-[#7B4FA3] hover:bg-[#5D367F] text-white shadow-xs hover:shadow-md cursor-pointer'
                    }`}
                  >
                    <span>
                      {isCurrent ? 'Viewing This Page' : `Open ${treatment.shortName} Treatment Page`}
                    </span>
                    {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
