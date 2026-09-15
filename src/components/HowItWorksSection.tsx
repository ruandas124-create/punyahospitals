import React from 'react';
import { Calendar, UserCheck, Stethoscope, HeartPulse, ArrowRight } from 'lucide-react';
import { ConditionId } from '../types';
import { trackConversionEvent } from '../utils/analytics';

interface HowItWorksSectionProps {
  condition: ConditionId;
  onOpenAppointmentModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  condition,
  onOpenAppointmentModal,
}) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Book Appointment',
      description: 'Choose your preferred date online, via quick call, or via WhatsApp message.',
      icon: <Calendar className="w-5 h-5 text-[#7B4FA3]" />,
    },
    {
      stepNumber: '02',
      title: 'Consult Our Specialist',
      description: 'Meet in-person at PUNYA Hospital Bangalore for a confidential, respectful evaluation.',
      icon: <UserCheck className="w-5 h-5 text-[#579B35]" />,
    },
    {
      stepNumber: '03',
      title: 'Get Proper Diagnosis',
      description: 'Thorough clinical examination and high-precision diagnostics to identify root causes.',
      icon: <Stethoscope className="w-5 h-5 text-[#7B4FA3]" />,
    },
    {
      stepNumber: '04',
      title: 'Start Your Treatment Plan',
      description: 'Receive an individualised treatment roadmap — from conservative care to surgical options.',
      icon: <HeartPulse className="w-5 h-5 text-[#579B35]" />,
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-gradient-to-b from-[#F5F0F8]/30 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider mb-3">
            Streamlined Patient Care
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-gray-600">
            A clear, transparent path to getting relief under specialist hospital guidance.
          </p>
        </div>

        {/* 4-Step Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-lg hover:border-purple-200 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-[#5D367F]/20 group-hover:text-[#7B4FA3]/40 transition-colors">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0F8] group-hover:bg-[#EAF4E5] flex items-center justify-center transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#252525] group-hover:text-[#5D367F] transition-colors">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-[#579B35]">
                <span>Step {step.stepNumber} of 04</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              trackConversionEvent('appointment_click', condition, { location: 'how_it_works_cta' });
              onOpenAppointmentModal();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-xs sm:text-base tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer min-h-[48px]"
            id="how-it-works-book-btn"
          >
            <span>BOOK YOUR APPOINTMENT TODAY</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
