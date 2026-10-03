import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, ShieldCheck, Stethoscope, CheckCircle2, Zap } from 'lucide-react';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';

interface TreatmentsPageProps {
  onOpenAppointmentModal: () => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onOpenAppointmentModal }) => {
  const navigate = useNavigate();

  const treatmentsList = [
    {
      id: 'piles' as const,
      data: LANDING_PAGES_DATA.piles,
      badge: 'Laser & Stapler Proctology',
      color: 'purple',
      path: '/piles',
    },
    {
      id: 'gallstone' as const,
      data: LANDING_PAGES_DATA.gallstone,
      badge: 'Laparoscopic Cholecystectomy',
      color: 'green',
      path: '/gallstone',
    },
    {
      id: 'hernia' as const,
      data: LANDING_PAGES_DATA.hernia,
      badge: '3D Mesh Repair',
      color: 'purple',
      path: '/hernia',
    },
    {
      id: 'uterine-fibroids' as const,
      data: LANDING_PAGES_DATA['uterine-fibroids'],
      badge: "Female Laparoscopic Gynecology",
      color: 'purple',
      path: '/uterine-fibroids',
    },
    {
      id: 'endometriosis' as const,
      data: LANDING_PAGES_DATA.endometriosis,
      badge: 'Laparoscopic Excision',
      color: 'green',
      path: '/endometriosis',
    },
  ];

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-[#579B35]" />
            Minimally Invasive Speciality Programs
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#252525] tracking-tight">
            Advanced Surgical & Gynecological Treatments
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Daycare procedures with zero-cut or micro-keyhole techniques, minimal blood loss, and rapid 24-hour return to routine life.
          </p>
        </div>

        {/* Treatments List Grid */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {treatmentsList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-purple-300 transition-all"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#579B35] bg-[#EAF4E5] px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-xs text-purple-700 bg-[#F5F0F8] px-3 py-1 rounded-full font-bold">
                    Daycare Discharge Available
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#252525]">
                  {item.data.heroHeadline}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {item.data.heroSupportingText}
                </p>

                {/* Sub Options Badges */}
                <div className="flex items-center gap-2 pt-1 flex-wrap text-xs font-semibold text-gray-700">
                  {item.data.treatmentOptions.map((opt, idx) => (
                    <span key={idx} className="bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                      ✓ {opt.title}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm transition-all shadow-md cursor-pointer"
                >
                  <span>VIEW DEDICATED PAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenAppointmentModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#579B35] text-[#579B35] hover:bg-[#579B35] hover:text-white font-bold text-sm transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK CONSULT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
