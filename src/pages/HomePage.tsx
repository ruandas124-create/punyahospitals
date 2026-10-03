import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Stethoscope, Award, Users, CheckCircle2, Clock, MapPin, Phone, MessageSquare, ChevronRight } from 'lucide-react';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { DoctorSection } from '../components/DoctorSection';
import { WhyPunyaSection } from '../components/WhyPunyaSection';
import { PatientTrustSection } from '../components/PatientTrustSection';
import { HospitalLocationSection } from '../components/HospitalLocationSection';
import { FinalCtaSection } from '../components/FinalCtaSection';

interface HomePageProps {
  onOpenAppointmentModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAppointmentModal }) => {
  const navigate = useNavigate();

  const specialities = [
    {
      id: 'piles' as const,
      name: 'Piles & Proctology Care',
      tagline: 'Laser & Stapler Procedures',
      description: 'Painless daycare laser and stapler interventions for internal & external hemorrhoids, fissures, and fistulas.',
      badge: 'Minimally Invasive',
      path: '/piles',
      bgGradient: 'from-purple-50 to-white',
    },
    {
      id: 'gallstone' as const,
      name: 'Gallstone Treatment',
      tagline: 'Single-Keyhole Laparoscopy',
      description: 'Advanced laparoscopic cholecystectomy for gallstones with minimal scarring, quick recovery, and same-day discharge.',
      badge: 'Daycare Surgery',
      path: '/gallstone',
      bgGradient: 'from-green-50 to-white',
    },
    {
      id: 'hernia' as const,
      name: 'Hernia Repair',
      tagline: 'Advanced 3D Mesh Repair',
      description: 'Laparoscopic 3D mesh repair for inguinal, umbilical, and incisional hernias providing long-term structural strength.',
      badge: 'Zero-Recurrence Focus',
      path: '/hernia',
      bgGradient: 'from-purple-50 to-white',
    },
    {
      id: 'uterine-fibroids' as const,
      name: 'Uterine Fibroids',
      tagline: "Women's Laparoscopic Care",
      description: 'Uterus-preserving laparoscopic myomectomy led by senior female laparoscopic gynecologists in Bangalore.',
      badge: 'Fertility Preserving',
      path: '/uterine-fibroids',
      bgGradient: 'from-purple-50 to-white',
    },
    {
      id: 'endometriosis' as const,
      name: 'Endometriosis Care',
      tagline: 'Pelvic Pain & Excision',
      description: 'Comprehensive laparoscopic excision for deep infiltrating endometriosis and pelvic pain management.',
      badge: 'Specialist Female Doctor',
      path: '/endometriosis',
      bgGradient: 'from-green-50 to-white',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Home Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-900 via-[#5D367F] to-[#7B4FA3] text-white overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#579B35]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF4E5] text-xs sm:text-sm font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#579B35]" />
                <span>PUNYA Hospital — Healthcare par Excellence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Bangalore’s Leading <br className="hidden sm:inline" />
                <span className="text-[#A2E083]">Surgical & Specialty</span> Center
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl leading-relaxed">
                Dedicated surgical excellence with over three decades of clinical expertise. Providing precision laser & laparoscopic procedures in Basaveshwar Nagar, Bengaluru.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm font-semibold text-purple-100">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#579B35]" />
                  <span>30+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#579B35]" />
                  <span>Cashless Insurance</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-[#579B35]" />
                  <span>24/7 OPD & Emergency</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-base tracking-wide transition-all shadow-xl active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>BOOK CONSULTATION</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={HOSPITAL_CONTACT.phoneTelLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base transition-all"
                >
                  <Phone className="w-5 h-5 text-[#579B35]" />
                  <span>CALL: {HOSPITAL_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Column Highlights */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 text-white">
              <h3 className="text-xl font-bold border-b border-white/20 pb-3 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#A2E083]" />
                <span>Specialist Consultation Desks</span>
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="text-xs text-[#A2E083] font-bold uppercase tracking-wider mb-1">
                    Chief Surgeon — General & Proctology
                  </div>
                  <div className="text-lg font-black">Dr. Nagaraj B. Puttaswamy</div>
                  <div className="text-xs text-purple-200">MBBS, MS • 30+ Years Surgical Expertise</div>
                </div>

                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="text-xs text-[#A2E083] font-bold uppercase tracking-wider mb-1">
                    Chief Gynecologist — Women's Health
                  </div>
                  <div className="text-lg font-black">Dr. Punyavathi C. Nagaraj</div>
                  <div className="text-xs text-purple-200">MBBS, MD, Diploma (Germany) • 20+ Years Expertise</div>
                </div>
              </div>

              <div className="pt-2 text-xs text-purple-200 flex items-center justify-between border-t border-white/20">
                <span>📍 Basaveshwar Nagar, Bengaluru</span>
                <span className="font-bold text-white">Pincode: 560079</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Grid Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
              Core Clinical Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
              Specialized Minimally Invasive Care
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Select a speciality below to explore symptoms, treatment procedures, specialist doctors, and recovery timelines on its dedicated page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {specialities.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-white to-[#F5F0F8]/40 rounded-3xl p-6 sm:p-7 border border-purple-100 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#579B35] bg-[#EAF4E5] px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{item.tagline}</span>
                  </div>

                  <h3 className="text-2xl font-black text-[#252525] group-hover:text-[#7B4FA3] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-purple-100/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#7B4FA3] group-hover:text-[#5D367F] hover:underline cursor-pointer"
                  >
                    <span>View Speciality Page</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenAppointmentModal}
                    className="p-2 rounded-xl bg-purple-50 text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white transition-colors cursor-pointer"
                    title="Book Consultation"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* General Consultation Card */}
            <div className="bg-gradient-to-br from-[#7B4FA3] to-[#5D367F] text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-[#A2E083] bg-white/10 px-3 py-1 rounded-full">
                  All Specialities
                </span>
                <h3 className="text-2xl font-black text-white">
                  General & Laparoscopic Consultations
                </h3>
                <p className="text-sm text-purple-100 leading-relaxed font-medium">
                  Need a comprehensive evaluation for general abdominal, gastrointestinal, or gynecological concerns? Speak directly with senior faculty.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK OPD CONSULTATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section Preview */}
      <DoctorSection condition="piles" onOpenAppointmentModal={onOpenAppointmentModal} />

      {/* Why Choose PUNYA Hospital */}
      <WhyPunyaSection condition="piles" />

      {/* Patient Trust Section */}
      <PatientTrustSection condition="piles" />

      {/* Hospital Location Section */}
      <HospitalLocationSection condition="piles" onOpenAppointmentModal={onOpenAppointmentModal} />

      {/* Final Call To Action */}
      <FinalCtaSection
        content={LANDING_PAGES_DATA.piles}
        onOpenAppointmentModal={onOpenAppointmentModal}
      />
    </div>
  );
};
