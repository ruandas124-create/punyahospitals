import React from 'react';
import { Award, CheckCircle2, Calendar, Stethoscope, ArrowRight, GraduationCap } from 'lucide-react';
import { ConditionId } from '../types';
import { trackConversionEvent } from '../utils/analytics';

interface DoctorSectionProps {
  condition: ConditionId;
  onOpenAppointmentModal: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({
  condition,
  onOpenAppointmentModal,
}) => {
  const isGynCondition = condition === 'uterine-fibroids' || condition === 'endometriosis';
  const isGeneralSurgicalCondition = condition === 'piles' || condition === 'hernia' || condition === 'gallstone';

  const doctorImg = isGynCondition
    ? '/dr-punyavathi.jpg'
    : '/dr-nagaraj.png';

  return (
    <section id="doctor-profile" className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
            {isGynCondition ? "Women's Health Specialist Faculty" : "Senior Surgical Faculty"}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Meet Our Specialist
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {isGynCondition
              ? 'Consult directly with Dr. Punyavathi C. Nagaraj, one of the most trusted female laparoscopic gynecologists in Bangalore.'
              : 'Get expert evaluation from Dr. Nagaraj B. Puttaswamy, our chief consultant surgeon specializing in minimally invasive procedures in Bangalore.'}
          </p>
        </div>

        {/* Doctor Card Profile */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-[#F5F0F8]/40 rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Doctor Image Column (5 cols) */}
            <div className="md:col-span-5 relative h-72 sm:h-80 md:h-full min-h-[280px] sm:min-h-[360px] bg-purple-50">
              <img
                src={doctorImg}
                alt={isGynCondition ? "Dr. Punyavathi C. Nagaraj - Best Laparoscopic Gynecologist at PUNYA Hospital Bangalore" : "Dr. Nagaraj B. Puttaswamy - Senior Consultant Surgeon at PUNYA Hospital Bangalore"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (isGynCondition) {
                    target.src = 'https://punyahospitals.com/assets/images/team/dr.jpg';
                  } else {
                    target.src = 'https://punyahospitals.com/assets/images/team/dr-nagaraj.png';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 text-white md:hidden">
                <span className="text-xs bg-[#579B35] px-2.5 py-1 rounded-full font-bold">
                  {isGynCondition ? "20+ Years Experience" : "30+ Years Experience"}
                </span>
                <div className="text-lg font-black mt-1">
                  {isGynCondition ? "Dr. Punyavathi C. Nagaraj" : "Dr. Nagaraj B. Puttaswamy"}
                </div>
              </div>
            </div>

            {/* Doctor Information Column (7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#579B35] bg-[#EAF4E5] px-3 py-1 rounded-full">
                    Verified Chief Specialist
                  </span>
                  <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#7B4FA3] bg-[#F5F0F8] px-3 py-1 rounded-full">
                    {isGynCondition ? "20+ Years Experience" : "30+ Years Experience"}
                  </span>
                </div>

                {isGynCondition ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#252525]">
                      Dr. Punyavathi C. Nagaraj
                    </h3>
                    <div className="text-sm font-bold text-[#7B4FA3]">
                      Best Laparoscopic Gynecologist & Endometriosis Specialist
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#252525]">
                      Dr. Nagaraj B. Puttaswamy
                    </h3>
                    <div className="text-sm font-bold text-[#7B4FA3]">
                      Senior Consultant – General & Laparoscopic Surgeon
                    </div>
                  </>
                )}
              </div>

              {/* Doctor Details */}
              {isGynCondition ? (
                /* Dr. Punyavathi C. Nagaraj Profile */
                <div className="space-y-3.5 text-sm text-gray-700">
                  {/* Experience & Expertise */}
                  <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#579B35]">
                      <Award className="w-4 h-4 text-[#579B35]" />
                      <span>Experience & Expertise</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      Dr. Punyavathi achieves excellent outcomes with over two decades of expertise in minimally invasive gynecologic surgery. She is widely regarded as one of the top female laparoscopic surgeons in Bangalore. For her mastery of advanced surgical techniques and patient-centered care, women across Bangalore trust her and feel completely comfortable with her as a senior lady doctor.
                    </p>
                  </div>

                  {/* Education & International Training */}
                  <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7B4FA3]">
                      <GraduationCap className="w-4 h-4 text-[#7B4FA3]" />
                      <span>Education & International Training</span>
                    </div>
                    <p className="text-xs text-gray-600 italic">
                      Her international exposure to laparoscopic modernism has made her one of the most trusted female gynecologists for laparoscopic and endometriosis surgery in Bangalore.
                    </p>
                    <ul className="text-xs text-gray-700 space-y-1.5 font-medium pt-1">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span><strong>MBBS</strong> – KIMS, Bangalore (1993–94)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span><strong>MD (Obstetrics & Gynecology)</strong> – KIMS, Bangalore (2000–01, Best Outgoing Student)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span><strong>Diploma in Gynaec Endoscopic Surgeries</strong> – The Kiel School, Hamburg, Germany</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span><strong>Fellowship in Minimal Access Surgery (FMAS)</strong> – World Laparoscopy Hospital, Delhi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Advanced Training in Laparoscopic Hysterectomy under Dr. Hafeez Rehman & Dr. Rajesh Modi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Training in IVF, ICSI, IMSI, Embryology, Ovum Pick-up, and Embryo Transfer Techniques</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* Dr. Nagaraj B. Puttaswamy Profile */
                <div className="space-y-3.5 text-sm text-gray-700">
                  {/* Experience & Expertise */}
                  <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-1">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#579B35]">
                      <Award className="w-4 h-4 text-[#579B35]" />
                      <span>Experience & Expertise</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                      Dr. Nagaraj B. Puttaswamy combines surgical modernism with more than three decades of experience and compassionate care. His expert hands have performed thousands of laparoscopic procedures across Bangalore, focusing on surgical precision, safety, and patient comfort at affordable costs.
                    </p>
                  </div>

                  {/* Educational Background & Training */}
                  <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs space-y-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#7B4FA3]">
                      <GraduationCap className="w-4 h-4 text-[#7B4FA3]" />
                      <span>Educational Background & Training</span>
                    </div>
                    <ul className="text-xs text-gray-700 space-y-1.5 font-medium">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span><strong>MBBS & MS (General Surgery)</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Specialized training under Prof. Srimurthy, renowned Pediatric Laparoscopic Surgeon</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Certified in Advanced Hernia Repair, Colorectal, and Bariatric Laparoscopic Surgery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Advanced Laparoscopy Training – Ethicon Institute, Chennai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                        <span>Active participant in national and international surgical conferences</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Booking CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    trackConversionEvent('appointment_click', condition, { location: 'doctor_card_cta' });
                    onOpenAppointmentModal();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer min-h-[48px]"
                  id="doctor-book-consultation-btn"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    BOOK CONSULTATION WITH {isGynCondition ? 'DR. PUNYAVATHI' : 'DR. NAGARAJ'}
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
