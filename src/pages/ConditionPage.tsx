import React from 'react';
import { ConditionId } from '../types';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';
import { HeroSection } from '../components/HeroSection';
import { SymptomsSection } from '../components/SymptomsSection';
import { MedicalDiagramSection } from '../components/MedicalDiagramSection';
import { TreatmentOptionsSection } from '../components/TreatmentOptionsSection';
import { WhyPunyaSection } from '../components/WhyPunyaSection';
import { DoctorSection } from '../components/DoctorSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PatientTrustSection } from '../components/PatientTrustSection';
import { TreatmentJourneySection } from '../components/TreatmentJourneySection';
import { FaqSection } from '../components/FaqSection';
import { HospitalLocationSection } from '../components/HospitalLocationSection';
import { FinalCtaSection } from '../components/FinalCtaSection';
import { SeoStructuredData } from '../components/SeoStructuredData';

interface ConditionPageProps {
  condition: ConditionId;
  onOpenAppointmentModal: () => void;
}

export const ConditionPage: React.FC<ConditionPageProps> = ({
  condition,
  onOpenAppointmentModal,
}) => {
  const content = LANDING_PAGES_DATA[condition];

  return (
    <>
      <SeoStructuredData content={content} />
      <HeroSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
      <SymptomsSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
      <MedicalDiagramSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
      <TreatmentOptionsSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
      <WhyPunyaSection condition={condition} />
      <DoctorSection condition={condition} onOpenAppointmentModal={onOpenAppointmentModal} />
      <HowItWorksSection condition={condition} onOpenAppointmentModal={onOpenAppointmentModal} />
      <PatientTrustSection condition={condition} />
      <TreatmentJourneySection condition={condition} />
      <FaqSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
      <HospitalLocationSection condition={condition} onOpenAppointmentModal={onOpenAppointmentModal} />
      <FinalCtaSection content={content} onOpenAppointmentModal={onOpenAppointmentModal} />
    </>
  );
};
