import React, { useState } from 'react';
import { CheckCircle2, Phone, MessageSquare, Calendar, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { ConditionId, LandingPageContent } from '../types';
import { trackConversionEvent } from '../utils/analytics';
import doctorConsultationImg from '../assets/images/indian_doctor_consultation_1789457537922.jpg';
import gynConsultationImg from '../assets/images/gyn_consultation_1789460990250.jpg';

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
  // Desktop compact quick consultation form state
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getTrustPoints = (id: ConditionId) => {
    if (id === 'uterine-fibroids') {
      return [
        "Experienced Women's Health Specialists",
        'Personalised Treatment',
        'Modern Diagnostic & Treatment Options',
        'Complete Hospital Support',
      ];
    }
    if (id === 'endometriosis') {
      return [
        'Specialist Evaluation',
        'Personalised Care',
        'Modern Diagnostic Support',
        "Complete Women's Healthcare",
      ];
    }
    return [
      'Experienced Doctors',
      'Modern Treatment Options',
      'Personalised Care',
      'Hospital Support',
    ];
  };

  const trustPoints = getTrustPoints(content.id);
  const isGynCondition = content.id === 'uterine-fibroids' || content.id === 'endometriosis';
  const heroImage = isGynCondition ? gynConsultationImg : doctorConsultationImg;

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', content.id, { location: 'hero_call_button' });
    window.location.href = 'tel:+918045689000';
  };

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', content.id, { location: 'hero_whatsapp_button' });
    const encoded = encodeURIComponent(content.whatsappMessage);
    window.open(`https://wa.me/918045689000?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      trackConversionEvent('form_submit', content.id, {
        source: 'hero_compact_form',
        patient_name: name,
        mobile_prefix: mobile.slice(0, 5),
        preferred_date: preferredDate || 'Not specified',
      });
      setSubmitting(false);
      setFormSubmitted(true);
      if (onFormSubmittedSuccess) {
        onFormSubmittedSuccess();
      }
    }, 600);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F0F8]/70 via-white to-white pt-6 pb-12 md:pt-10 md:pb-16 lg:pt-12 lg:pb-20 border-b border-purple-50">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EAF4E5]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F5F0F8] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ad Intent Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 shadow-xs mb-4 text-xs font-semibold text-[#5D367F]">
          <span className="w-2 h-2 rounded-full bg-[#579B35]" />
          <span>Specialist Hospital Care • Bangalore</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#579B35] font-bold">NABH Protocol Standards</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines, Trust Points, and CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* H1 Headline */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#252525] tracking-tight leading-[1.2] sm:leading-[1.15]">
              {content.heroHeadline}
            </h1>

            {/* Supporting Headline */}
            <p className="text-sm sm:text-base md:text-xl text-gray-700 leading-relaxed font-normal max-w-2xl">
              {content.heroSupportingText}
            </p>

            {/* Trust Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1 max-w-xl">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/95 border border-purple-100 shadow-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0" />
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
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Call Now */}
              <button
                type="button"
                onClick={handlePhoneClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#7B4FA3] text-[#7B4FA3] hover:bg-[#7B4FA3] hover:text-white font-bold text-sm tracking-wide transition-all active:scale-98 cursor-pointer min-h-[48px]"
                id="hero-secondary-call-now"
              >
                <Phone className="w-4 h-4 text-inherit" />
                <span>CALL NOW</span>
              </button>

              {/* Additional CTA: WhatsApp Us */}
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#478229] text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer min-h-[48px]"
                id="hero-whatsapp-us"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WHATSAPP US</span>
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
                Zero Waiting Appointments
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                Senior Surgeon Led
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Indian Doctor & Patient Image + Desktop Compact Form (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Realistic Indian Doctor & Patient Consultation Photography */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white group">
              <img
                src={heroImage}
                alt={`Realistic Indian doctor consulting patient for ${content.title} at PUNYA Hospital Bangalore`}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 md:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              {/* Gradient Badge on Image */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <div className="text-xs font-bold uppercase tracking-wider text-[#EAF4E5] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#579B35]" />
                  PUNYA Hospital Consultation Suite
                </div>
                <div className="text-sm font-semibold text-white/95">
                  {isGynCondition ? "Senior Women's Health Specialist • Bengaluru" : "Qualified Surgical Specialists • Bengaluru"}
                </div>
              </div>
            </div>

            {/* Compact Appointment Form (Desktop & Tablet) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100 shadow-lg relative">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#5D367F]">
                    BOOK YOUR CONSULTATION
                  </h3>
                  <p className="text-xs text-gray-500">
                    Prompt response from our hospital care team
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#EAF4E5] flex items-center justify-center text-[#579B35]">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-6 text-center space-y-3 bg-[#F5F0F8] rounded-xl p-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#579B35] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#5D367F]">
                    Thank You!
                  </h4>
                  <p className="text-xs text-gray-600">
                    Your appointment request has been received. Our clinical coordinator will contact you shortly to confirm your slot.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handlePhoneClick}
                      className="px-3 py-1.5 rounded-lg bg-[#7B4FA3] text-white text-xs font-bold"
                    >
                      Call Hospital Desk
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="px-3 py-1.5 rounded-lg bg-[#579B35] text-white text-xs font-bold"
                    >
                      WhatsApp Us
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
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
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
                        className="w-full px-3.5 py-3 sm:py-2.5 rounded-r-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50"
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
                      className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-base sm:text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100 transition-all bg-gray-50/50 text-gray-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-2 py-4 sm:py-3.5 px-4 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
                    id="hero-form-submit-btn"
                  >
                    {submitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>REQUEST A CALL BACK</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">
                    Your details are kept strictly private & confidential.
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
