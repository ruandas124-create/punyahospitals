import React from 'react';
import { Award, CheckCircle2, Calendar, Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react';
import { ConditionId } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import doctorSpecialistImg from '../assets/images/indian_doctor_specialist_1789457554452.jpg';
import gynSpecialistImg from '../assets/images/indian_female_gyn_1789461006785.jpg';

interface DoctorSectionProps {
  condition: ConditionId;
  onOpenAppointmentModal: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({
  condition,
  onOpenAppointmentModal,
}) => {
  const isGynCondition = condition === 'uterine-fibroids' || condition === 'endometriosis';
  const doctorImg = isGynCondition ? gynSpecialistImg : doctorSpecialistImg;

  return (
    <section id="doctor-profile" className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
            {isGynCondition ? "Women's Health Specialist Care" : "Specialist Led Care"}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Meet Our Specialist
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {isGynCondition
              ? 'Consult directly with experienced gynecological specialists dedicated to compassionate, personalized care.'
              : 'Consult directly with senior surgical faculty dedicated to accurate diagnosis and patient wellbeing.'}
          </p>
        </div>

        {/* Doctor Card Profile */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-[#F5F0F8]/40 rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Doctor Image Column (5 cols) */}
            <div className="md:col-span-5 relative h-64 sm:h-80 md:h-full min-h-[260px] sm:min-h-[340px] bg-purple-50">
              <img
                src={doctorImg}
                alt={isGynCondition ? "Senior Consultant Gynecologist at PUNYA Hospital Bangalore" : "Consultant – General & Laparoscopic Surgery at PUNYA Hospital Bangalore"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 text-white md:hidden">
                <span className="text-xs bg-[#579B35] px-2.5 py-1 rounded-full font-bold">
                  {isGynCondition ? "Senior Gynecologist" : "On-Duty Consultant"}
                </span>
              </div>
            </div>

            {/* Doctor Information Column (7 cols) */}
            <div className="md:col-span-7 p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-5">
              <div className="space-y-1">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#579B35] bg-[#EAF4E5] px-3 py-1 rounded-full">
                  Verified Hospital Specialist
                </span>
                
                {/* Doctor name placeholder strictly respecting instructions */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252525] pt-1">
                  {isGynCondition
                    ? 'Senior Consultant Gynecologist & Laparoscopic Surgeon'
                    : 'Senior Surgical Consultant'}
                </h3>
                <p className="text-xs text-gray-500 italic">
                  [Doctor Name]
                </p>
                <div className="text-sm font-bold text-[#7B4FA3] pt-1">
                  {isGynCondition
                    ? "Consultant – Obstetrics & Gynecology"
                    : "Consultant – General & Laparoscopic Surgery"}
                </div>
              </div>

              {/* Real info placeholders per strict prompt requirements */}
              <div className="space-y-3 pt-2 text-sm text-gray-700">
                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100">
                  <Award className="w-5 h-5 text-[#579B35] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-gray-500 uppercase block">
                      Experience:
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {isGynCondition
                        ? 'Senior Specialist • Department of Gynecology & Women\'s Health'
                        : 'Senior Surgical Faculty • Department of General & Minimally Invasive Surgery'}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      [Real profile information verified upon booking]
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-[#7B4FA3] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-gray-500 uppercase block">
                      Specialisation:
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {isGynCondition
                        ? 'Minimally Invasive Gynecological Surgery, Fibroid & Endometriosis Care'
                        : 'Minimally Invasive Procedures, Laparoscopic Surgery, Daycare Interventions & Comprehensive Follow-up Care'}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      [Real clinical sub-specialisations provided during consultation]
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    trackConversionEvent('appointment_click', condition, { location: 'doctor_card_cta' });
                    onOpenAppointmentModal();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer min-h-[48px]"
                  id="doctor-book-consultation-btn"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isGynCondition ? 'CONSULT WITH SPECIALIST' : 'BOOK CONSULTATION'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
