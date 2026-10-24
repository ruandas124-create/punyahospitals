import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';

interface MobileStickyBarProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'mobile_sticky_bar' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };

  return (
    <aside 
      aria-label="Quick contact and booking options" 
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl md:hidden"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* CALL NOW */}
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#7B4FA3] text-[#7B4FA3] bg-purple-50/50 active:bg-[#7B4FA3] active:text-white transition-all text-center min-h-[44px]"
          id="sticky-mobile-call"
        >
          <Phone className="w-4 h-4 text-inherit" />
          <span className="text-xs font-extrabold tracking-tight">CALL NOW</span>
        </button>

        {/* BOOK APPOINTMENT */}
        <button
          type="button"
          onClick={() => {
            trackConversionEvent('appointment_click', content.id, { location: 'mobile_sticky_bar' });
            onOpenAppointmentModal();
          }}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#7B4FA3] text-white active:bg-[#5D367F] transition-all text-center shadow-xs min-h-[44px]"
          id="sticky-mobile-book"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-extrabold tracking-tight">BOOK VISIT</span>
        </button>
      </div>
    </aside>
  );
};
