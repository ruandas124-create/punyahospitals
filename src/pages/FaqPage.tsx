import React from 'react';
import { FaqSection } from '../components/FaqSection';
import { LANDING_PAGES_DATA } from '../data/landingPagesData';

interface FaqPageProps {
  onOpenAppointmentModal: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenAppointmentModal }) => {
  return (
    <div className="py-10 bg-gray-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#252525] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-base text-gray-600">
          Find answers to common questions regarding surgical procedures, insurance claims, daycare discharge, and OPD consultations at PUNYA Hospital.
        </p>
      </div>

      <FaqSection content={LANDING_PAGES_DATA.piles} onOpenAppointmentModal={onOpenAppointmentModal} />
    </div>
  );
};
