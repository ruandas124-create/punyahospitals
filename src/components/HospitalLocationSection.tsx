import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';
import { ConditionId } from '../types';

interface HospitalLocationSectionProps {
  condition: ConditionId;
  onOpenAppointmentModal: () => void;
}

export const HospitalLocationSection: React.FC<HospitalLocationSectionProps> = ({
  condition,
  onOpenAppointmentModal,
}) => {
  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', condition, { location: 'location_section_call' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', condition, { location: 'location_section_whatsapp' });
    const message = `Hello PUNYA Hospital, I need directions/help to visit the hospital at Basaveshwar Nagar for ${condition} consultation.`;
    window.open(`${HOSPITAL_CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hospital-location" className="py-14 sm:py-16 md:py-20 bg-[#F5F0F8]/30 border-t border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#579B35]" />
            <span>Hospital Address & Contact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            Visit PUNYA Hospital
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Conveniently located on 80 Feet Ring Road in Basaveshwar Nagar, Bengaluru with ample patient parking and 24/7 facility access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Quick Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-[#F5F0F8] rounded-2xl text-[#7B4FA3] flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#7B4FA3]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Official Hospital Address
                  </h3>
                  <p className="text-base sm:text-lg font-bold text-[#252525] leading-snug">
                    {HOSPITAL_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100">
                <div className="p-3 bg-[#EAF4E5] rounded-2xl text-[#579B35] flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#579B35]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    Direct Call / Helpline
                  </h3>
                  <a
                    href={HOSPITAL_CONTACT.phoneTelLink}
                    onClick={handlePhoneClick}
                    className="text-xl sm:text-2xl font-black text-[#252525] hover:text-[#579B35] transition-colors"
                  >
                    {HOSPITAL_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100">
                <div className="p-3 bg-[#EAF4E5] rounded-2xl text-[#579B35] flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#579B35]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    WhatsApp Desk
                  </h3>
                  <a
                    href={HOSPITAL_CONTACT.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="text-lg sm:text-xl font-bold text-[#579B35] hover:underline"
                  >
                    {HOSPITAL_CONTACT.whatsappDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
                <div className="p-3 bg-purple-50 rounded-2xl text-[#7B4FA3] flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#7B4FA3]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
                    OPD Hours
                  </h3>
                  <p className="font-semibold text-gray-800">
                    Mon – Sat: 8:00 AM – 8:00 PM
                  </p>
                  <span className="text-xs text-[#579B35] font-bold">24/7 Emergency & Admissions Open</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={HOSPITAL_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm tracking-wide transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-white" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handlePhoneClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>CALL HOSPITAL: {HOSPITAL_CONTACT.phoneDisplay}</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Embed / Visual Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-xl flex flex-col">
            <div className="p-4 bg-[#7B4FA3] text-white flex items-center justify-between text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#579B35]" />
                <span>PUNYA Hospital — Basaveshwar Nagar, Bengaluru</span>
              </div>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">Pincode: 560079</span>
            </div>
            <div className="w-full flex-1 min-h-[300px] sm:min-h-[380px] bg-gray-100 relative">
              <iframe
                title="PUNYA Hospital Location Map"
                src="https://maps.google.com/maps?q=52/10,+80+Feet+Ring+Rd,+A+D+Halli,+2nd+Stage,+KHB+Colony,+Basaveshwar+Nagar,+Bengaluru,+Karnataka+560079&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
