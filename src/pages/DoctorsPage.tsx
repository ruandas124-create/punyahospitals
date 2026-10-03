import React from 'react';
import { Award, CheckCircle2, Calendar, Stethoscope, GraduationCap, ShieldCheck, Phone, MessageSquare } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';

interface DoctorsPageProps {
  onOpenAppointmentModal: () => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
            Senior Hospital Faculty
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#252525] tracking-tight">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Consult directly with highly experienced, award-winning senior surgeons at PUNYA Hospital, Bangalore.
          </p>
        </div>

        {/* Doctor 1: Dr. Nagaraj B. Puttaswamy */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="md:col-span-5 relative bg-purple-50 min-h-[320px] sm:min-h-[400px]">
              <img
                src="https://aeghhbrvlefahqdbnudc.supabase.co/storage/v1/object/public/IMG/ChatGPT%20Image%20Oct%204,%202026,%2012_42_01%20AM.png"
                alt="Dr. Nagaraj B. Puttaswamy - Senior Consultant Surgeon at PUNYA Hospital Bangalore"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = '/dr-nagaraj.png';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#579B35] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  30+ Years Experience
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#579B35] bg-[#EAF4E5] px-3 py-1 rounded-full">
                  Chief Surgeon — General & Laparoscopy
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#252525]">
                  Dr. Nagaraj B. Puttaswamy
                </h2>
                <div className="text-sm font-bold text-[#7B4FA3]">
                  Senior Consultant – General, Laparoscopic & Colorectal Surgeon
                </div>

                <div className="p-4 bg-[#F5F0F8]/50 rounded-2xl border border-purple-100 space-y-1 text-xs sm:text-sm text-gray-700 font-medium">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#579B35] uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#579B35]" />
                    <span>Experience & Surgical Mastery</span>
                  </div>
                  <p className="leading-relaxed">
                    Dr. Nagaraj B. Puttaswamy combines surgical modernism with more than three decades of experience and compassionate care. His expert hands have performed thousands of laparoscopic procedures across Bangalore, focusing on surgical precision, safety, and patient comfort at affordable costs.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-2 text-xs text-gray-700 font-medium">
                  <div className="flex items-center gap-2 font-extrabold text-[#7B4FA3] uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-[#7B4FA3]" />
                    <span>Education & Advanced Certifications</span>
                  </div>
                  <ul className="space-y-1.5">
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
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK CONSULTATION WITH DR. NAGARAJ</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor 2: Dr. Punyavathi C. Nagaraj */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Image Column */}
            <div className="md:col-span-5 relative bg-purple-50 min-h-[320px] sm:min-h-[400px]">
              <img
                src="https://aeghhbrvlefahqdbnudc.supabase.co/storage/v1/object/public/IMG/ChatGPT%20Image%20Oct%204,%202026,%2012_45_27%20AM.png"
                alt="Dr. Punyavathi C. Nagaraj - Best Laparoscopic Gynecologist at PUNYA Hospital Bangalore"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = '/dr-punyavathi.jpg';
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#7B4FA3] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  20+ Years Experience
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B4FA3] bg-[#F5F0F8] px-3 py-1 rounded-full">
                  Chief Gynecologist — Women's Health
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#252525]">
                  Dr. Punyavathi C. Nagaraj
                </h2>
                <div className="text-sm font-bold text-[#579B35]">
                  Best Laparoscopic Gynecologist & Endometriosis Specialist
                </div>

                <div className="p-4 bg-[#EAF4E5]/50 rounded-2xl border border-green-100 space-y-1 text-xs sm:text-sm text-gray-700 font-medium">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#579B35] uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#579B35]" />
                    <span>Experience & Expertise</span>
                  </div>
                  <p className="leading-relaxed">
                    Dr. Punyavathi achieves excellent outcomes with over two decades of expertise in minimally invasive gynecologic surgery. She is widely regarded as one of the top female laparoscopic surgeons in Bangalore. For her mastery of advanced surgical techniques and patient-centered care, women across Bangalore trust her and feel completely comfortable with her as a lady doctor.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-2 text-xs text-gray-700 font-medium">
                  <div className="flex items-center gap-2 font-extrabold text-[#7B4FA3] uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-[#7B4FA3]" />
                    <span>Education & International Credentials</span>
                  </div>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#579B35] mt-0.5 flex-shrink-0" />
                      <span><strong>MBBS & MD (Obstetrics & Gynecology)</strong> – KIMS, Bangalore (Best Outgoing Student)</span>
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
                      <span>Advanced Training in IVF, ICSI, Embryology & Fertility-Preserving Laparoscopic Surgeries</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm tracking-wide transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK CONSULTATION WITH DR. PUNYAVATHI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
