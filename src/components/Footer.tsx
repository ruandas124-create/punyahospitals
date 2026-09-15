import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { PunyaLogo } from './PunyaLogo';
import { ConditionId } from '../types';

interface FooterProps {
  onNavigate: (condition: ConditionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-purple-100 text-[#252525] pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-gray-100">
          {/* Col 1: Logo & Mission (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <PunyaLogo size="md" />
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              PUNYA Hospital is Bangalore's dedicated surgical and multi-speciality centre providing evidence-based, compassionate care for proctology, hepato-biliary, and abdominal wall conditions.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#579B35] font-semibold bg-[#EAF4E5] px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Healthcare Safety Protocols</span>
            </div>
          </div>

          {/* Col 2: Speciality Treatments (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D367F]">
              Speciality Treatments
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('piles')}
                  className="hover:text-[#7B4FA3] hover:underline transition-colors text-left"
                >
                  Piles Treatment in Bangalore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallstone')}
                  className="hover:text-[#7B4FA3] hover:underline transition-colors text-left"
                >
                  Gallstone Treatment in Bangalore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hernia')}
                  className="hover:text-[#7B4FA3] hover:underline transition-colors text-left"
                >
                  Hernia Treatment in Bangalore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('uterine-fibroids')}
                  className="hover:text-[#7B4FA3] hover:underline transition-colors text-left"
                >
                  Uterine Fibroids Care in Bangalore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('endometriosis')}
                  className="hover:text-[#7B4FA3] hover:underline transition-colors text-left"
                >
                  Endometriosis Care in Bangalore
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hospital Contact Info (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3 text-xs sm:text-sm text-gray-600">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D367F]">
              Hospital Contact & Location
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#7B4FA3] mt-0.5 flex-shrink-0" />
              <span>PUNYA Hospital, Bengaluru, Karnataka 560001, India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#579B35] flex-shrink-0" />
              <span>+91 80 4568 9000 (Helpline & Appointments)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#7B4FA3] flex-shrink-0" />
              <span>OPD Timings: Monday – Saturday: 8:00 AM – 8:00 PM</span>
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
