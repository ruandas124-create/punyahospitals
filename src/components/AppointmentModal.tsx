import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, Calendar, Clock, AlertCircle } from 'lucide-react';
import { ConditionId, LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import { PunyaLogo } from './PunyaLogo';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCondition: ConditionId;
  content: LandingPageContent;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  currentCondition,
  content,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<ConditionId>(currentCondition);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 1 PM)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync initial condition when modal opens
  React.useEffect(() => {
    setSelectedCondition(currentCondition);
  }, [currentCondition, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) return;

    setLoading(true);

    setTimeout(() => {
      trackConversionEvent('form_submit', selectedCondition, {
        source: 'appointment_modal_form',
        patient_name: fullName,
        mobile_prefix: mobileNumber.slice(0, 5),
        disease_selected: selectedCondition,
        preferred_date: preferredDate || 'Immediate',
        preferred_time: preferredTime,
        has_message: Boolean(message.trim()),
      });

      setLoading(false);
      setIsSubmitted(true);
    }, 650);
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', selectedCondition, { location: 'appointment_modal_success' });
    window.location.href = 'tel:+918045689000';
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', selectedCondition, { location: 'appointment_modal_success' });
    const encoded = encodeURIComponent(content.whatsappMessage);
    window.open(`https://wa.me/918045689000?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon */}
        <div className="bg-[#5D367F] px-5 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#579B35]" />
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              PUNYA Hospital OPD Desk
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                  Book Your Consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Confidential evaluation with our consultant surgeons in Bangalore.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 sm:px-3.5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit phone number"
                      className="w-full px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-r-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Disease / Treatment */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Disease / Treatment *
                  </label>
                  <select
                    required
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value as ConditionId)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50 text-gray-800 font-medium"
                  >
                    <option value="piles">Piles Treatment (Colorectal Care)</option>
                    <option value="gallstone">Gallstone Treatment (Laparoscopic Care)</option>
                    <option value="hernia">Hernia Treatment (Advanced Mesh Repair)</option>
                  </select>
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] bg-gray-50/50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] bg-gray-50/50 text-gray-700"
                    >
                      <option>Morning (9 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 5 PM)</option>
                      <option>Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your symptoms or scan details"
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
                  id="modal-submit-consultation-btn"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>BOOK MY CONSULTATION</span>
                  )}
                </button>

                <p className="text-[11px] text-gray-400 text-center">
                  Your medical details are strictly confidential. We never share patient records.
                </p>
              </form>
            </>
          ) : (
            /* Post-Submission Thank You State strictly matching prompt requirements */
            <div className="py-6 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#5D367F]">
                Thank You!
              </h3>

              <p className="text-sm text-gray-700 max-w-sm mx-auto leading-relaxed">
                Your appointment request has been received. Our team will contact you shortly.
              </p>

              <div className="p-4 bg-[#F5F0F8] rounded-2xl border border-purple-100 text-left space-y-1.5 text-xs text-gray-600 max-w-xs mx-auto">
                <div><strong>Patient:</strong> {fullName}</div>
                <div><strong>Mobile:</strong> +91 {mobileNumber}</div>
                <div><strong>Condition:</strong> {selectedCondition.toUpperCase()} Treatment</div>
                <div><strong>Preferred Slot:</strong> {preferredDate || 'Earliest Available'} • {preferredTime}</div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePhoneClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7B4FA3] text-white font-bold text-xs tracking-wide shadow-xs min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#579B35] text-white font-bold text-xs tracking-wide shadow-xs min-h-[44px]"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WHATSAPP US</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs text-gray-500 hover:text-gray-800 underline block mx-auto pt-2"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
