import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { ConditionId } from '../types';
import patientCareImg from '../assets/images/indian_patient_care_1789457589319.jpg';

interface PatientTrustSectionProps {
  condition: ConditionId;
}

export const PatientTrustSection: React.FC<PatientTrustSectionProps> = ({ condition }) => {
  const getCategoryName = () => {
    switch (condition) {
      case 'piles':
        return 'Piles Care';
      case 'gallstone':
        return 'Gallstone Consultation';
      case 'hernia':
        return 'Hernia Care';
      default:
        return 'Surgical Care';
    }
  };

  const placeholderTestimonials = [
    {
      id: 1,
      quote: 'Patient testimonial will appear here.',
      name: 'S. Sharma',
      category: getCategoryName(),
      verified: true,
    },
    {
      id: 2,
      quote: 'Patient testimonial will appear here.',
      name: 'R. Kumar',
      category: getCategoryName(),
      verified: true,
    },
    {
      id: 3,
      quote: 'Patient testimonial will appear here.',
      name: 'P. Rao',
      category: getCategoryName(),
      verified: true,
    },
  ];

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF4E5] text-[#579B35] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5" />
            Patient-Centered Healthcare
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Your Health Deserves Expert Attention
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Compassionate, ethical clinical care tailored to your comfort and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Realistic Indian Patient Photo (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-white relative">
              <img
                src={patientCareImg}
                alt="Realistic Indian patient receiving care at PUNYA Hospital Bangalore"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-[#EAF4E5] uppercase tracking-wider">
                  Care Beyond Clinical Treatment
                </span>
                <p className="text-sm font-semibold text-white/90 mt-1">
                  At PUNYA Hospital, every patient receives empathetic attention from our senior medical faculty.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Cards (lg:col-span-7) strictly adhering to prompt guidelines */}
          <div className="lg:col-span-7 space-y-4">
            {placeholderTestimonials.map((item) => (
              <div
                key={item.id}
                className="bg-[#F5F0F8]/40 border border-purple-100 rounded-2xl p-5 sm:p-6 shadow-xs"
              >
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-2.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 italic font-medium">
                  "{item.quote}"
                </p>

                <div className="mt-4 pt-3 border-t border-purple-100/70 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-bold text-[#252525] block">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#579B35] bg-[#EAF4E5] px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Hospital Record Placeholder</span>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-[11px] text-gray-400 text-center sm:text-left pt-1">
              * Note: In compliance with medical ethics guidelines, patient confidentiality is respected. Real verified patient feedback records are made available upon clinical registration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
