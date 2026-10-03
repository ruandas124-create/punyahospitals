import React from 'react';
import { HospitalLocationSection } from '../components/HospitalLocationSection';

interface ContactPageProps {
  onOpenAppointmentModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="py-10 bg-white">
      <HospitalLocationSection condition="piles" onOpenAppointmentModal={onOpenAppointmentModal} />
    </div>
  );
};
