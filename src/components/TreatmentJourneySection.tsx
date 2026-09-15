import React from 'react';
import { ArrowDown, Check, X, ShieldAlert, HeartHandshake, AlertCircle } from 'lucide-react';
import { ConditionId } from '../types';

interface TreatmentJourneySectionProps {
  condition: ConditionId;
}

export const TreatmentJourneySection: React.FC<TreatmentJourneySectionProps> = ({ condition }) => {
  return (
    <section className="py-14 sm:py-16 md:py-20 bg-[#F5F0F8]/30 border-y border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-200 text-[#5D367F] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#579B35]" />
            Clinical Care Pathway
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            The Treatment Journey
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Clear expectations and structured clinical milestones for your health journey.
          </p>
        </div>

        {/* Before vs After Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative items-center">
            {/* BEFORE APPROPRIATE TREATMENT */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  CURRENT STATE
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-red-900 mb-4">
                BEFORE APPROPRIATE TREATMENT
              </h3>

              <ul className="space-y-3.5 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span><strong>Symptoms:</strong> Unaddressed pain, swelling, or localized distress.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span><strong>Discomfort:</strong> Unease during work, exercise, or everyday postures.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span><strong>Daily activities affected:</strong> Hesitation or anxiety around meals, movement, or tasks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <span><strong>Persistent problems:</strong> Risk of symptoms worsening without medical assessment.</span>
                </li>
              </ul>
            </div>

            {/* Down Arrow / Transition Indicator on Mobile */}
            <div className="md:hidden flex justify-center py-2">
              <div className="w-10 h-10 rounded-full bg-[#7B4FA3] text-white flex items-center justify-center shadow-md">
                <ArrowDown className="w-5 h-5" />
              </div>
            </div>

            {/* AFTER APPROPRIATE TREATMENT */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#579B35]/30 shadow-md relative overflow-hidden ring-4 ring-green-50/50">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF4E5] text-[#579B35]">
                  <Check className="w-3.5 h-3.5" />
                  POST-TREATMENT GOAL
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-[#579B35] mb-4">
                AFTER APPROPRIATE TREATMENT
              </h3>

              <ul className="space-y-3.5 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <span><strong>Better symptom management:</strong> Targeted medical or surgical intervention.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <span><strong>Improved comfort:</strong> Alleviation of underlying causes and physiological strain.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <span><strong>Return to normal activities as advised:</strong> Stepwise recovery guided by your surgeon.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  <span><strong>Follow-up care:</strong> Continuous physician monitoring to ensure long-term wellness.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mandatory Disclaimer from prompt */}
          <div className="mt-8 text-center bg-white border border-gray-200 rounded-xl p-4 max-w-2xl mx-auto shadow-xs">
            <p className="text-xs text-gray-500 italic">
              <strong>Disclaimer:</strong> Results and recovery vary from patient to patient depending on individual medical history, condition severity, and clinical response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
