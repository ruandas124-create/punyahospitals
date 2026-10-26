import React, { useState } from 'react';
import { 
  Phone, MessageSquare, ArrowRight, Shield, Clock, Users, 
  CheckCircle2, Sparkles, Stethoscope, FileText, Calendar 
} from 'lucide-react';
import { LandingPageContent } from '../types';
import { HOSPITAL_CONTACT } from '../constants/contactInfo';
import { trackConversionEvent } from '../utils/analytics';
import { hospitalService } from '../services/hospitalService';

interface HeroSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
  onFormSubmittedSuccess?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  onOpenAppointmentModal,
  onFormSubmittedSuccess,
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [needInsuranceHelp, setNeedInsuranceHelp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'hero_call_button' });
    window.location.href = HOSPITAL_CONTACT.phoneTelLink;
  };



  // Realistic consultation imagery tailored to conditions
  const isGyn = content.id === 'uterine-fibroids' || content.id === 'endometriosis';
  const heroImage = 'https://images.unsplash.com/photo-1620989983305-be972a0e290e?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';

  const doctorName = isGyn ? 'Dr. Punyavathi C. Nagaraj' : 'Dr. Nagaraj B. Puttaswamy';
  const doctorExperience = isGyn ? '20+ Yrs Exp (Trained in Germany)' : '30+ Yrs Surgical Excellence';

  const trustPoints = isGyn
    ? [
        'Experienced Senior Lady Gynecologist',
        'Comfortable Care & Fertility Protection',
        'Friendly Hospital Staff Ready to Help',
        'Clear Treatment Cost Guidance & Insurance',
      ]
    : [
        'Consultation With Senior Specialist Doctor',
        'Modern Keyhole & Daycare Surgery Options',
        'Clear Cost Information Before Treatment',
        'Insurance Assistance & Paperwork Support',
      ];

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) return;

    setSubmitting(true);
    trackConversionEvent('form_submit', content.id, {
      location: 'hero_inline_form',
      preferredDate: preferredDate || 'Flexible',
      needInsuranceHelp: needInsuranceHelp,
    });

    const patientName = name.trim() || 'Patient Enquiry';
    const patientMobile = mobile.trim();
    const formattedDate = preferredDate ? preferredDate : 'Earliest Available / Flexible';
    const insuranceText = needInsuranceHelp 
      ? 'Yes, please guide on insurance documentation & TPA support' 
      : 'Self-pay / General enquiry';

    // Record lead in hospital service
    hospitalService.addPublicWebLead({
      name: patientName,
      mobile: patientMobile,
      condition: content.id,
      treatmentName: content.title,
      doctor: doctorName,
      source: 'Google Ads Landing Page',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      insuranceHelpRequested: needInsuranceHelp,
    });

    // Construct full WhatsApp message with all patient data and date
    const waMessage = `🏥 *PUNYA HOSPITAL — CONSULTATION ENQUIRY*

👤 *Patient Name:* ${patientName}
📱 *Contact Mobile:* +91 ${patientMobile}
🩺 *Treatment:* ${content.title}
👨‍⚕️ *Specialist Doctor:* ${doctorName}
📅 *Preferred Appointment Date:* ${formattedDate}
📋 *Insurance Support:* ${insuranceText}

_Enquiry submitted via website. Please confirm doctor consultation availability._`;

    const waUrl = `${HOSPITAL_CONTACT.whatsappLink}?text=${encodeURIComponent(waMessage)}`;
    setSubmittedWhatsAppUrl(waUrl);

    setSubmitting(false);
    setFormSubmitted(true);
    if (onFormSubmittedSuccess) {
      onFormSubmittedSuccess();
    }

    // Direct redirection to Hospital WhatsApp number with all data
    window.location.href = waUrl;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0F8]/70 via-white to-white pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 border-b border-purple-50">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EAF4E5]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F5F0F8] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ad Intent Tag / Breadcrumb Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 shadow-xs mb-4 text-xs font-semibold text-[#5D367F]">
          <span className="w-2 h-2 rounded-full bg-[#579B35] animate-pulse" />
          <span>{content.heroBadge || "Specialist Hospital Care • Bangalore"}</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#579B35] font-bold">NABH Protocol Standards</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Trust Points, and CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* H1 Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold text-[#252525] tracking-tight leading-[1.2] sm:leading-[1.15]">
              {content.heroHeadline}
            </h1>

            {/* Subheadline (Patient-Focused) */}
            {content.heroSubheadline && (
              <p className="text-base sm:text-lg md:text-xl text-[#5D367F] font-semibold leading-relaxed">
                {content.heroSubheadline}
              </p>
            )}

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal max-w-2xl">
              {content.heroSupportingText}
            </p>

            {/* Daycare & Insurance Quick Banner */}
            <div className="inline-flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-[#5D367F] font-medium max-w-xl">
              <span className="inline-flex items-center gap-1 font-bold text-[#579B35]">
                <Sparkles className="w-3.5 h-3.5" />
                Daycare Surgery Options
              </span>
              <span className="text-purple-300">•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                <FileText className="w-3.5 h-3.5 text-[#7B4FA3]" />
                Insurance Documentation Assistance
              </span>
              <span className="text-purple-300">•</span>
              <span className="text-gray-600">Zero Wait Consultations</span>
            </div>

            {/* Trust Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 max-w-xl">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 border border-purple-100 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#579B35] flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary, Secondary, and WhatsApp CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => {
                  trackConversionEvent('appointment_click', content.id, { location: 'hero_primary_button' });
                  onOpenAppointmentModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer min-h-[48px]"
                id="hero-primary-book-consultation"
              >
                <span>{content.heroCtaText ? content.heroCtaText.toUpperCase() : 'REQUEST A CONSULTATION'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Call Now */}
              <button
                type="button"
                onClick={handlePhoneClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-sm tracking-wide transition-all active:scale-98 cursor-pointer min-h-[48px]"
                id="hero-secondary-call-now"
                title={`Call: ${HOSPITAL_CONTACT.phoneDisplay}`}
              >
                <Phone className="w-4 h-4 text-inherit" />
                <span>CALL NOW</span>
              </button>


            </div>

            {/* Quick Micro Trust Footer */}
            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#579B35]" />
                100% Confidential
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7B4FA3]" />
                Direct Doctor Evaluation
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                Senior Specialist Led
              </span>
            </div>
          </div>

          {/* Right Column: Compact Direct Booking Form (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* High-Converting Consultation Request Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100 shadow-xl relative">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#252525]">
                    Request a Specialist Consultation
                  </h3>
                  <p className="text-xs text-gray-500">
                    Quick callback & appointment confirmation
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EAF4E5] text-[#579B35]">
                  Fast Response
                </span>
              </div>

              {formSubmitted ? (
                <div className="py-6 text-center space-y-3 bg-[#EAF4E5]/40 rounded-xl p-4 border border-[#579B35]/20 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#579B35] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#5D367F]">
                    Thank You! Request Received
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Connecting you directly to PUNYA Hospital WhatsApp (+91 94038 90559) with your consultation details and date.
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-purple-100 text-left text-xs space-y-1">
                    <div><strong>Patient:</strong> {name || 'Patient Enquiry'}</div>
                    <div><strong>Mobile:</strong> +91 {mobile}</div>
                    <div><strong>Preferred Date:</strong> {preferredDate || 'Earliest Available'}</div>
                    {needInsuranceHelp && (
                      <div className="text-[#579B35] font-semibold">✓ Insurance Assistance Requested</div>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={submittedWhatsAppUrl || HOSPITAL_CONTACT.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#579B35] hover:bg-[#48822B] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Open in WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handlePhoneClick}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Hospital Desk</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter patient name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-600 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50 text-gray-700"
                    />
                  </div>



                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-1 py-3.5 px-4 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 min-h-[46px]"
                    id="hero-form-submit-btn"
                  >
                    {submitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>ENQUIRE ABOUT TREATMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    Confidential • Direct hospital contact • Zero spam
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
