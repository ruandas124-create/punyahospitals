import React from 'react';
import { MessageSquare } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';

export const FloatingWhatsAppButton: React.FC = () => {
  const handleClick = () => {
    trackConversionEvent('whatsapp_click', 'piles', { location: 'bottom_right_floating_button' });
    const message = encodeURIComponent("Hello PUNYA Hospital, I would like to inquire about specialist treatment, appointments, and hospital care.");
    window.open(`${HOSPITAL_CONTACT.whatsappLink}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Hover Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block">
        Chat with Punya Hospital WhatsApp
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        id="floating-whatsapp-btn"
        aria-label="Contact Punya Hospital on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10" />
      </button>
    </div>
  );
};
