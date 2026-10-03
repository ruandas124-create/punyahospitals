import React from 'react';
import { WhyPunyaSection } from '../components/WhyPunyaSection';
import { PatientTrustSection } from '../components/PatientTrustSection';
import { TreatmentJourneySection } from '../components/TreatmentJourneySection';
import { ShieldCheck, Award, Users, CheckCircle2, Building, HeartPulse } from 'lucide-react';

interface AboutPageProps {
  onOpenAppointmentModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="space-y-0">
      {/* Banner */}
      <section className="py-14 sm:py-18 bg-gradient-to-br from-[#5D367F] via-[#7B4FA3] to-[#5D367F] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF4E5] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#579B35]" />
            About PUNYA Hospital
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            Healthcare Par Excellence in Bangalore
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Established as Bangalore's premier surgical & women's healthcare hospital, PUNYA Hospital combines 30+ years of clinical faculty expertise with advanced laser and laparoscopic technology.
          </p>
        </div>
      </section>

      {/* Why Choose Punya Full Section */}
      <WhyPunyaSection condition="piles" />

      {/* Patient Trust Section */}
      <PatientTrustSection condition="piles" />

      {/* Treatment Journey */}
      <TreatmentJourneySection condition="piles" />
    </div>
  );
};
