import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
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

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', content.id, { location: 'mobile_sticky_bar' });
    const encoded = encodeURIComponent(content.whatsappMessage);
    window.open(`${HOSPITAL_CONTACT.whatsappLink}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside 
      aria-label="Quick contact and booking options" 
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl md:hidden"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* CALL NOW */}
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 rounded-xl border border-[#7B4FA3] text-[#7B4FA3] bg-purple-50/50 active:bg-[#7B4FA3] active:text-white transition-all text-center min-h-[44px]"
          id="sticky-mobile-call"
        >
          <Phone className="w-4 h-4 text-inherit" />
          <span className="text-[11px] font-extrabold tracking-tight">CALL NOW</span>
        </button>

        {/* WHATSAPP */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#579B35] text-white active:bg-[#467e2a] transition-all text-center shadow-xs min-h-[44px]"
          id="sticky-mobile-whatsapp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="text-[11px] font-extrabold tracking-tight">WHATSAPP</span>
        </button>

        {/* BOOK APPOINTMENT */}
        <button
          type="button"
          onClick={() => {
            trackConversionEvent('appointment_click', content.id, { location: 'mobile_sticky_bar' });
            onOpenAppointmentModal();
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#7B4FA3] text-white active:bg-[#5D367F] transition-all text-center shadow-xs min-h-[44px]"
          id="sticky-mobile-book"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[11px] font-extrabold tracking-tight truncate">BOOK VISIT</span>
        </button>
      </div>
    </aside>
  );
};
