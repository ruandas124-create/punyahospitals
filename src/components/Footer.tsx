import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { PunyaLogo } from './PunyaLogo';
import { ConditionId } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { ALL_TREATMENTS } from '../constants/treatmentRoutes';

interface FooterProps {
  onNavigate: (condition: ConditionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-purple-100 text-[#252525] pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-gray-100">
          {/* Col 1: Logo & Mission (md:col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <PunyaLogo size="md" />
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              PUNYA Hospital is Bangalore's dedicated surgical and multi-speciality centre providing evidence-based, compassionate care for proctology, hepato-biliary, abdominal wall, and gynecological conditions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#579B35] font-semibold bg-[#EAF4E5] px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Healthcare Safety Protocols</span>
            </div>
          </div>

          {/* Col 2: Speciality Treatments (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D367F]">
              5 Treatment Pages
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {ALL_TREATMENTS.map((t) => (
                <li key={t.id}>
                  <a
                    href={t.url}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(t.id);
                    }}
                    className="hover:text-[#7B4FA3] hover:underline transition-colors block text-left"
                  >
                    {t.name} in Bangalore
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hospital Contact Info (md:col-span-5) */}
          <div className="md:col-span-5 space-y-3.5 text-xs sm:text-sm text-gray-600">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D367F]">
              Hospital Contact & Support
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#7B4FA3] mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <span className="font-semibold text-gray-900 block">Hospital Address:</span>
                <span className="text-gray-700 leading-snug block">
                  {HOSPITAL_CONTACT.address}
                </span>
                <a
                  href={HOSPITAL_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7B4FA3] hover:underline pt-0.5"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-[#579B35] flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 mr-2">Call Support:</span>
                <a
                  href={HOSPITAL_CONTACT.phoneTelLink}
                  className="font-bold text-[#252525] hover:text-[#579B35] underline"
                >
                  {HOSPITAL_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#579B35] flex-shrink-0" />
              <div>
                <span className="font-semibold text-gray-900 mr-2">WhatsApp Support:</span>
                <a
                  href={HOSPITAL_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#579B35] hover:underline"
                >
                  {HOSPITAL_CONTACT.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 text-gray-500">
              <Clock className="w-4 h-4 text-[#7B4FA3] flex-shrink-0" />
              <span>OPD Timings: Monday – Saturday: 8:00 AM – 8:00 PM (Emergency 24/7)</span>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimer */}
        <div className="pt-6 space-y-3 text-[11px] text-gray-500 text-center sm:text-left">
          <p>
            <strong>Medical Disclaimer:</strong> The medical information provided on this landing page is for patient awareness and educational purposes only and should not be construed as a substitute for professional clinical medical advice, diagnosis, or treatment. Always consult a qualified physician or healthcare provider regarding any health condition or surgical procedure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-gray-100 text-gray-400">
            <div>
              © {new Date().getFullYear()} PUNYA Hospital. All rights reserved. "Health care par Excellence".
            </div>
            <div className="flex items-center gap-4">
              <span>Patient Privacy Policy</span>
              <span>•</span>
              <span>Terms of Clinical Care</span>
              <span>•</span>
              <span>Consent Protocols</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
