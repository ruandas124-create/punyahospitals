import React from 'react';
import { Calendar, Phone, MessageSquare, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { ConditionId, LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';

interface FinalCtaSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'final_cta_call' });
    window.location.href = 'tel:+918045689000';
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', content.id, { location: 'final_cta_whatsapp' });
    const encoded = encodeURIComponent(content.whatsappMessage);
    window.open(`https://wa.me/918045689000?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#5D367F] via-[#7B4FA3] to-[#5D367F] text-white relative overflow-hidden">
      {/* Decorative background radial highlights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#579B35]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#EAF4E5] text-xs font-bold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
          Confidential Hospital Consultations
        </span>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
          Don't Let Your Symptoms Control Your Daily Life
        </h2>

        {/* Supporting text */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
          Get evaluated by a qualified specialist and understand the appropriate treatment options for your condition.
        </p>

        {/* 3 Conversion Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto">
          {/* Book Appointment */}
          <button
            type="button"
            onClick={() => {
              trackConversionEvent('appointment_click', content.id, { location: 'final_cta_book' });
              onOpenAppointmentModal();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#5D367F] hover:bg-gray-100 font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-xl active:scale-98 cursor-pointer min-h-[48px]"
            id="final-cta-book-appointment"
          >
            <Calendar className="w-4 h-4 text-[#7B4FA3]" />
            <span>BOOK APPOINTMENT</span>
            <ArrowRight className="w-4 h-4 text-[#7B4FA3]" />
          </button>

          {/* Call Now */}
          <button
            type="button"
            onClick={handlePhoneClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#579B35] hover:bg-[#48822c] text-white font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer min-h-[48px]"
            id="final-cta-call-now"
          >
            <Phone className="w-4 h-4" />
            <span>CALL NOW</span>
          </button>

          {/* WhatsApp Us */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-extrabold text-sm sm:text-base tracking-wide transition-all active:scale-98 cursor-pointer backdrop-blur-xs min-h-[48px]"
            id="final-cta-whatsapp-us"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WHATSAPP US</span>
          </button>
        </div>

        {/* Phone Number Banner */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-purple-200">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#EAF4E5]" />
            <span>Direct Helpline:</span>
            <strong className="text-white text-base tracking-wider">+91 80 4568 9000</strong>
          </div>
          <div className="hidden sm:inline text-purple-300">•</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#579B35]" />
            <span>PUNYA Hospital, Bengaluru, Karnataka</span>
          </div>
          <div className="hidden sm:inline text-purple-300">•</div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-200" />
            <span>OPD: Mon - Sat 8:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
