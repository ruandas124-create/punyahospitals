import React from 'react';
import { 
  Heart, 
  Cpu, 
  Clock, 
  Users, 
  IndianRupee, 
  ShieldCheck,
  Award 
} from 'lucide-react';
import { ConditionId } from '../types';

interface WhyPunyaSectionProps {
  condition: ConditionId;
}

export const WhyPunyaSection: React.FC<WhyPunyaSectionProps> = ({ condition }) => {
  const reasons = [
    {
      icon: <Heart className="w-6 h-6 text-[#7B4FA3]" />,
      title: 'Comfortable Patient Care',
      description: 'We treat every patient like family with gentle, respectful care from consultation to recovery.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#579B35]" />,
      title: 'Modern Treatment Options',
      description: 'Advanced keyhole and laser procedures chosen carefully based on your clinical assessment.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#7B4FA3]" />,
      title: 'Same-Day Discharge for Suitable Cases',
      description: 'Many procedures allow patients to return home on the same day after a short observation period.',
    },
    {
      icon: <Users className="w-6 h-6 text-[#579B35]" />,
      title: 'Friendly Staff Always Ready to Help',
      description: 'Have doubts about appointments or hospital visits? Our team is always ready to guide you.',
    },
    {
      icon: <IndianRupee className="w-6 h-6 text-[#7B4FA3]" />,
      title: 'Clear Treatment Cost Guidance',
      description: 'We explain treatment costs openly before you decide, so you can plan with complete confidence.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#579B35]" />,
      title: 'Insurance Assistance & Support',
      description: 'Our hospital helpdesk guides you through paperwork, claim forms, and insurer documentation.',
    },
  ];

  return (
    <section id="why-punya" className="py-14 sm:py-16 md:py-20 bg-[#F5F0F8]/40 border-y border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-purple-200 text-[#5D367F] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#579B35]" />
            The PUNYA Hospital Difference
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Why Patients & Families Trust PUNYA Hospital
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Dedicated surgical care units built around clinical precision, patient comfort, and warm personal attention in Bangalore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F0F8] group-hover:bg-[#EAF4E5] flex items-center justify-center mb-5 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#252525] group-hover:text-[#5D367F] transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
