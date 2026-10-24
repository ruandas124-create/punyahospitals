import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, Calendar, Clock, AlertCircle, ShieldCheck, FileText } from 'lucide-react';
import { ConditionId, LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { hospitalService } from '../services/hospitalService';
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
  const [needInsuranceHelp, setNeedInsuranceHelp] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');

  // Sync initial condition when modal opens
  React.useEffect(() => {
    setSelectedCondition(currentCondition);
  }, [currentCondition, isOpen]);

  if (!isOpen) return null;

  const conditionLabels: Record<ConditionId, string> = {
    piles: 'Piles Treatment (Laser Proctology & Daycare Care)',
    gallstone: 'Gallstone Treatment (Single-Incision & Laparoscopic)',
    hernia: 'Hernia Treatment (Advanced 3D Mesh Repair)',
    'uterine-fibroids': "Uterine Fibroids Care (Women's Health & Laparoscopy)",
    endometriosis: 'Endometriosis Care (Pelvic Pain & Advanced Laparoscopy)',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) return;

    setLoading(true);

    const isGyn = selectedCondition === 'uterine-fibroids' || selectedCondition === 'endometriosis';
    const doctorName = isGyn ? 'Dr. Punyavathi C. Nagaraj' : 'Dr. Nagaraj B. Puttaswamy';

    const patientName = fullName.trim();
    const patientMobile = mobileNumber.trim();
    const formattedDate = preferredDate ? preferredDate : 'Earliest Available / Flexible';
    const insuranceText = needInsuranceHelp 
      ? 'Yes, please guide on insurance documentation & TPA support' 
      : 'Self-pay / General enquiry';
    const symptomsText = message.trim() ? message.trim() : 'None provided';
    const treatmentText = conditionLabels[selectedCondition] || selectedCondition;

    // Google Ads conversion tracking
    trackConversionEvent('form_submit', selectedCondition, {
      source: 'appointment_modal_form',
      patient_name: patientName,
      mobile_prefix: patientMobile.slice(0, 5),
      disease_selected: selectedCondition,
      preferred_date: formattedDate,
      preferred_time: preferredTime,
      need_insurance_help: needInsuranceHelp,
      has_message: Boolean(message.trim()),
    });

    // Record lead in internal hospital service
    hospitalService.addPublicWebLead({
      name: patientName,
      mobile: patientMobile,
      condition: selectedCondition,
      treatmentName: treatmentText,
      doctor: doctorName,
      source: 'Website Modal Enquiry',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      insuranceHelpRequested: needInsuranceHelp,
    });

    // Construct full WhatsApp message with all patient data, dates, and preferences
    const waMessage = `🏥 *PUNYA HOSPITAL — APPOINTMENT BOOKING*

👤 *Patient Name:* ${patientName}
📱 *Contact Mobile:* +91 ${patientMobile}
🩺 *Treatment Required:* ${treatmentText}
👨‍⚕️ *Consultant Doctor:* ${doctorName}
📅 *Preferred Appointment Date:* ${formattedDate}
⏰ *Preferred Time:* ${preferredTime}
📋 *Insurance Support:* ${insuranceText}
📝 *Symptoms / Notes:* ${symptomsText}

_Booked via official PUNYA Hospital website. Please confirm doctor availability and appointment slot._`;

    const waUrl = `${HOSPITAL_CONTACT.whatsappLink}?text=${encodeURIComponent(waMessage)}`;
    setSubmittedWhatsAppUrl(waUrl);

    setLoading(false);
    setIsSubmitted(true);

    // Direct redirection to Hospital WhatsApp number with all data
    window.location.href = waUrl;
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', selectedCondition, { location: 'appointment_modal_success' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', selectedCondition, { location: 'appointment_modal_success' });
    const fallbackUrl = submittedWhatsAppUrl || HOSPITAL_CONTACT.whatsappLink;
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setMessage('');
    setNeedInsuranceHelp(false);
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#579B35] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              PUNYA Hospital Consultation Desk
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

        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#252525]">
                  Request a Consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Direct evaluation with our senior specialists in Basaveshwar Nagar, Bangalore.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Contact Mobile Number *
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
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 sm:px-4 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                {/* Treatment Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Treatment Required *
                  </label>
                  <select
                    required
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value as ConditionId)}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50 text-gray-800 font-medium"
                  >
                    <option value="piles">Piles Treatment (Laser Proctology & Daycare Care)</option>
                    <option value="gallstone">Gallstone Treatment (Single-Incision & Laparoscopic)</option>
                    <option value="hernia">Hernia Treatment (Advanced 3D Mesh Repair)</option>
                    <option value="uterine-fibroids">Uterine Fibroids Care (Women's Health & Laparoscopy)</option>
                    <option value="endometriosis">Endometriosis Care (Pelvic Pain & Advanced Laparoscopy)</option>
                  </select>
                </div>

                {/* Preferred Date & Time */}
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
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] bg-gray-50/50 text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] bg-gray-50/50 text-gray-700"
                    >
                      <option>Morning (9 AM - 1 PM)</option>
                      <option>Afternoon (1 PM - 5 PM)</option>
                      <option>Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Insurance Support Request Checkbox */}
                <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="modal-insurance-check"
                    checked={needInsuranceHelp}
                    onChange={(e) => setNeedInsuranceHelp(e.target.checked)}
                    className="mt-0.5 rounded border-gray-300 text-[#7B4FA3] focus:ring-[#7B4FA3]"
                  />
                  <label htmlFor="modal-insurance-check" className="text-xs text-gray-700 cursor-pointer select-none">
                    <strong className="text-[#5D367F] block">Insurance Assistance:</strong>
                    I would like guidance on insurance documentation & TPA support for my treatment.
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Symptoms or Scan Details (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="E.g. Duration of symptoms, ultrasound findings, or previous consultation notes"
                    className="w-full px-3.5 sm:px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
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
                    <span>CONFIRM CONSULTATION REQUEST</span>
                  )}
                </button>

                <p className="text-[11px] text-gray-400 text-center">
                  Your medical details are strictly confidential. We never share patient records.
                </p>
              </form>
            </>
          ) : (
            /* Post-Submission State */
            <div className="py-6 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EAF4E5] text-[#579B35] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#5D367F]">
                Thank You! Request Received
              </h3>

              <p className="text-sm text-gray-700 max-w-sm mx-auto leading-relaxed">
                Connecting you directly to PUNYA Hospital WhatsApp (+91 94038 90559) with your appointment request and preferred date.
              </p>

              <div className="p-4 bg-[#F5F0F8] rounded-2xl border border-purple-100 text-left space-y-1.5 text-xs text-gray-700 max-w-xs mx-auto shadow-xs">
                <div><strong>Patient:</strong> {fullName}</div>
                <div><strong>Mobile:</strong> +91 {mobileNumber}</div>
                <div><strong>Treatment:</strong> {conditionLabels[selectedCondition] || selectedCondition}</div>
                <div><strong>Preferred Slot:</strong> {preferredDate || 'Earliest Available'} • {preferredTime}</div>
                {message.trim() && (
                  <div><strong>Notes:</strong> {message.trim()}</div>
                )}
                {needInsuranceHelp && (
                  <div className="text-[#579B35] font-semibold pt-0.5">✓ Insurance Assistance Requested</div>
                )}
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedWhatsAppUrl || HOSPITAL_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#579B35] hover:bg-[#48822B] text-white font-extrabold text-xs tracking-wide shadow-md min-h-[44px] cursor-pointer"
                  id="modal-open-whatsapp-btn"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>OPEN IN WHATSAPP NOW</span>
                </a>

                <button
                  type="button"
                  onClick={handlePhoneClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-bold text-xs tracking-wide shadow-xs min-h-[44px] cursor-pointer"
                  id="modal-call-hospital-btn"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL HOSPITAL DESK</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="text-xs text-gray-500 hover:text-gray-800 underline block mx-auto pt-2 cursor-pointer"
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
