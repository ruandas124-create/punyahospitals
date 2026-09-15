import React, { useState } from 'react';
import { ConditionId, LandingPageContent } from '../types';
import { Eye, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { trackConversionEvent } from '../utils/analytics';

interface MedicalDiagramSectionProps {
  content: LandingPageContent;
  onOpenAppointmentModal: () => void;
}

export const MedicalDiagramSection: React.FC<MedicalDiagramSectionProps> = ({
  content,
  onOpenAppointmentModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Render Piles diagram
  const renderPilesDiagram = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Stage 1: Normal tissue */}
        <div className={`p-5 rounded-2xl border transition-all ${activeStep === 1 ? 'border-[#7B4FA3] bg-[#F5F0F8]/50 shadow-md ring-2 ring-purple-100' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF4E5] text-[#579B35]">
              STAGE 1
            </span>
            <span className="text-xs text-gray-500 font-medium">Healthy State</span>
          </div>
          
          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Healthy anal canal outline */}
              <path d="M 40 20 Q 60 80 60 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 160 20 Q 140 80 140 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* Healthy normal vascular cushions */}
              <ellipse cx="70" cy="80" rx="8" ry="14" fill="#579B35" opacity="0.8" />
              <ellipse cx="130" cy="80" rx="8" ry="14" fill="#579B35" opacity="0.8" />
              <circle cx="70" cy="80" r="4" fill="#EAF4E5" />
              <circle cx="130" cy="80" r="4" fill="#EAF4E5" />
              
              <text x="100" y="30" textAnchor="middle" fill="#5D367F" fontSize="11" fontWeight="bold">Normal Canal</text>
              <text x="100" y="85" textAnchor="middle" fill="#579B35" fontSize="10">Smooth blood flow</text>
              <text x="100" y="145" textAnchor="middle" fill="#777" fontSize="10">No irritation</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">1. Normal Tissue</h4>
          <p className="text-xs text-gray-600 mt-1">
            Healthy vascular cushions support normal bowel movements with zero pain or swelling.
          </p>
        </div>

        {/* Stage 2: Swollen hemorrhoidal tissue */}
        <div className={`p-5 rounded-2xl border transition-all ${activeStep === 2 ? 'border-[#7B4FA3] bg-[#F5F0F8]/50 shadow-md ring-2 ring-purple-100' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3]">
              STAGE 2
            </span>
            <span className="text-xs text-[#7B4FA3] font-bold">Early Strain</span>
          </div>

          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Canal outline under strain */}
              <path d="M 40 20 Q 60 80 60 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 160 20 Q 140 80 140 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* Swelling tissue */}
              <ellipse cx="75" cy="80" rx="16" ry="22" fill="#7B4FA3" opacity="0.6" />
              <ellipse cx="125" cy="80" rx="14" ry="20" fill="#7B4FA3" opacity="0.6" />
              <circle cx="75" cy="80" r="7" fill="#5D367F" />
              <circle cx="125" cy="80" r="6" fill="#5D367F" />
              
              <text x="100" y="30" textAnchor="middle" fill="#5D367F" fontSize="11" fontWeight="bold">Pressure Build-up</text>
              <text x="100" y="85" textAnchor="middle" fill="#7B4FA3" fontSize="10" fontWeight="bold">Veins Dilate</text>
              <text x="100" y="145" textAnchor="middle" fill="#777" fontSize="10">Mild discomfort</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">2. Swollen Hemorrhoidal Tissue</h4>
          <p className="text-xs text-gray-600 mt-1">
            Increased venous pressure causes the cushion veins to expand and become inflamed.
          </p>
        </div>

        {/* Stage 3: Piles mass */}
        <div className={`p-5 rounded-2xl border transition-all ${activeStep === 3 ? 'border-[#7B4FA3] bg-[#F5F0F8]/50 shadow-md ring-2 ring-purple-100' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-[#5D367F]">
              STAGE 3
            </span>
            <span className="text-xs text-red-600 font-bold">Needs Care</span>
          </div>

          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Narrowed canal outline */}
              <path d="M 40 20 Q 60 80 60 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 160 20 Q 140 80 140 140" stroke="#7B4FA3" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* Protruding pile mass */}
              <path d="M 60 65 Q 95 80 75 105 Q 60 95 60 65 Z" fill="#5D367F" />
              <circle cx="80" cy="85" r="5" fill="#579B35" />
              
              <text x="100" y="30" textAnchor="middle" fill="#5D367F" fontSize="11" fontWeight="bold">Hemorrhoidal Pile</text>
              <text x="135" y="85" textAnchor="middle" fill="#5D367F" fontSize="10" fontWeight="bold">Palpable Mass</text>
              <text x="100" y="145" textAnchor="middle" fill="#252525" fontSize="10">Bleeding or pain</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">3. Piles (Hemorrhoids)</h4>
          <p className="text-xs text-gray-600 mt-1">
            Enlarged vascular cluster forms a noticeable lump that may cause bleeding during passage.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-purple-100 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#5D367F] text-center">
        <span>Normal Tissue</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span>Swollen Hemorrhoidal Tissue</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span className="text-[#7B4FA3] font-bold">Piles Formation</span>
      </div>
    </div>
  );

  // Render Gallstone diagram
  const renderGallstoneDiagram = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
        <div className="max-w-3xl mx-auto">
          {/* Anatomical Schematic SVG */}
          <div className="h-64 sm:h-72 w-full flex items-center justify-center bg-[#F5F0F8]/30 rounded-xl p-4 border border-purple-50">
            <svg viewBox="0 0 500 240" className="w-full h-full max-h-64">
              {/* 1. LIVER */}
              <path d="M 50 40 C 130 20 220 50 210 130 C 140 140 70 120 50 40 Z" fill="#EAF4E5" stroke="#579B35" strokeWidth="3" />
              <text x="120" y="80" textAnchor="middle" fill="#579B35" fontSize="14" fontWeight="bold">LIVER</text>
              <text x="120" y="100" textAnchor="middle" fill="#4b5563" fontSize="10">Produces Bile</text>

              {/* Bile Duct System */}
              <path d="M 180 110 Q 230 130 250 170 Q 260 210 320 220" stroke="#579B35" strokeWidth="6" fill="none" strokeLinecap="round" />
              
              {/* 2. GALLBLADDER */}
              <path d="M 220 120 C 260 90 320 120 300 160 C 270 180 230 160 220 120 Z" fill="#F5F0F8" stroke="#7B4FA3" strokeWidth="3.5" />
              <text x="270" y="135" textAnchor="middle" fill="#5D367F" fontSize="13" fontWeight="bold">GALLBLADDER</text>
              <text x="270" y="152" textAnchor="middle" fill="#5D367F" fontSize="9.5">Stores Bile</text>

              {/* 3. BILE DUCT */}
              <line x1="280" y1="180" x2="350" y2="180" stroke="#579B35" strokeDasharray="3,3" strokeWidth="1.5" />
              <text x="390" y="184" textAnchor="middle" fill="#579B35" fontSize="12" fontWeight="bold">BILE DUCT</text>

              {/* 4. GALLSTONES */}
              <circle cx="285" cy="142" r="6.5" fill="#5D367F" />
              <circle cx="272" cy="155" r="5" fill="#5D367F" />
              <circle cx="250" cy="170" r="5.5" fill="#7B4FA3" stroke="#fff" strokeWidth="1.5" />

              {/* Gallstone indicator callout */}
              <line x1="250" y1="170" x2="220" y2="210" stroke="#7B4FA3" strokeWidth="1.5" />
              <text x="210" y="226" textAnchor="middle" fill="#7B4FA3" fontSize="12" fontWeight="bold">GALLSTONE</text>
              <text x="210" y="238" textAnchor="middle" fill="#666" fontSize="9">Can block duct</text>
            </svg>
          </div>

          {/* 4 Flow Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-6">
            <div className="p-3 bg-[#EAF4E5] rounded-xl text-center border border-green-100">
              <span className="text-xs font-bold text-[#579B35] block">1. LIVER</span>
              <p className="text-[11px] text-gray-700 mt-0.5">Synthesizes and secretes vital digestive bile fluid.</p>
            </div>
            <div className="p-3 bg-[#F5F0F8] rounded-xl text-center border border-purple-100">
              <span className="text-xs font-bold text-[#7B4FA3] block">2. GALLBLADDER</span>
              <p className="text-[11px] text-gray-700 mt-0.5">Stores and concentrates bile between meals.</p>
            </div>
            <div className="p-3 bg-[#EAF4E5] rounded-xl text-center border border-green-100">
              <span className="text-xs font-bold text-[#579B35] block">3. BILE DUCT</span>
              <p className="text-[11px] text-gray-700 mt-0.5">Channels bile into intestine for fat digestion.</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl text-center border border-purple-200">
              <span className="text-xs font-bold text-[#5D367F] block">4. GALLSTONE</span>
              <p className="text-[11px] text-gray-700 mt-0.5">Crystals form stones, causing pain or obstruction.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-purple-100 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#5D367F] text-center">
        <span>Liver</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span>Gallbladder</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span>Bile Duct</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span className="text-[#7B4FA3] font-bold">Gallstone</span>
      </div>
    </div>
  );

  // Render Hernia diagram
  const renderHerniaDiagram = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Step 1: Abdominal wall */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EAF4E5] text-[#579B35]">
              STEP 1
            </span>
            <span className="text-xs text-gray-500 font-medium">Healthy</span>
          </div>

          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Intact muscle layer */}
              <rect x="70" y="20" width="16" height="120" rx="4" fill="#579B35" />
              <rect x="90" y="20" width="10" height="120" rx="3" fill="#EAF4E5" stroke="#579B35" strokeWidth="1" />
              
              {/* Internal peritoneal contents contained */}
              <path d="M 20 30 Q 55 80 20 130" fill="#F5F0F8" stroke="#7B4FA3" strokeWidth="2" />
              
              <text x="135" y="55" textAnchor="middle" fill="#579B35" fontSize="10" fontWeight="bold">Abdominal</text>
              <text x="135" y="70" textAnchor="middle" fill="#579B35" fontSize="10" fontWeight="bold">Wall</text>
              <text x="135" y="100" textAnchor="middle" fill="#666" fontSize="9">Strong & Intact</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">1. Abdominal Wall</h4>
          <p className="text-xs text-gray-600 mt-1">
            Strong abdominal muscles and connective tissues firmly contain internal organs.
          </p>
        </div>

        {/* Step 2: Muscle weakness */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F5F0F8] text-[#7B4FA3]">
              STEP 2
            </span>
            <span className="text-xs text-[#7B4FA3] font-bold">Defect Develops</span>
          </div>

          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Muscle layer with opening/gap */}
              <rect x="70" y="20" width="16" height="40" rx="4" fill="#579B35" />
              <rect x="70" y="100" width="16" height="40" rx="4" fill="#579B35" />
              
              {/* Gap / weakness in the middle */}
              <rect x="68" y="60" width="20" height="40" fill="none" stroke="#7B4FA3" strokeDasharray="3,3" strokeWidth="2" />
              
              <text x="135" y="75" textAnchor="middle" fill="#7B4FA3" fontSize="10" fontWeight="bold">Muscle</text>
              <text x="135" y="90" textAnchor="middle" fill="#7B4FA3" fontSize="10" fontWeight="bold">Weakness</text>
              <text x="135" y="115" textAnchor="middle" fill="#666" fontSize="9">Tear / Gap</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">2. Muscle Weakness</h4>
          <p className="text-xs text-gray-600 mt-1">
            Strain, pressure, or tissue thinning creates a localized structural gap in the muscle wall.
          </p>
        </div>

        {/* Step 3: Tissue / bowel protrusion */}
        <div className="p-5 rounded-2xl border border-purple-200 bg-[#F5F0F8]/40 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-[#5D367F]">
              STEP 3
            </span>
            <span className="text-xs text-red-600 font-bold">Visible Bulge</span>
          </div>

          <div className="h-44 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-2">
            <svg viewBox="0 0 200 160" className="w-full h-full max-h-40">
              {/* Muscle layers */}
              <rect x="70" y="20" width="16" height="35" rx="4" fill="#579B35" />
              <rect x="70" y="105" width="16" height="35" rx="4" fill="#579B35" />
              
              {/* Protruding bowel/tissue through defect */}
              <path d="M 30 45 Q 85 55 115 80 Q 85 105 30 115 Z" fill="#5D367F" opacity="0.85" />
              <ellipse cx="110" cy="80" rx="15" ry="18" fill="#7B4FA3" />
              
              <text x="155" y="75" textAnchor="middle" fill="#5D367F" fontSize="10" fontWeight="bold">Hernia</text>
              <text x="155" y="90" textAnchor="middle" fill="#5D367F" fontSize="10" fontWeight="bold">Protrusion</text>
              <text x="155" y="115" textAnchor="middle" fill="#666" fontSize="9">Tissue pushes out</text>
            </svg>
          </div>

          <h4 className="font-bold text-sm text-[#252525] mt-3">3. Tissue / Bowel Protrusion</h4>
          <p className="text-xs text-gray-600 mt-1">
            Internal tissue or intestines bulge outward through the opening, creating an external lump.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-purple-100 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#5D367F] text-center">
        <span>Abdominal Wall</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span>Muscle Weakness</span>
        <ArrowRight className="w-4 h-4 text-[#579B35] flex-shrink-0" />
        <span className="text-[#7B4FA3] font-bold">Tissue / Bowel Protrusion</span>
      </div>
    </div>
  );

  return (
    <section id="medical-diagram" className="py-14 sm:py-16 md:py-20 bg-[#F5F0F8]/50 border-y border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-[#5D367F] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-[#579B35]" />
            5-Second Medical Overview
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
            {content.diagramTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {content.diagramDescription}
          </p>
        </div>

        {/* Dynamic Diagram */}
        <div className="max-w-5xl mx-auto">
          {content.id === 'piles' && renderPilesDiagram()}
          {content.id === 'gallstone' && renderGallstoneDiagram()}
          {content.id === 'hernia' && renderHerniaDiagram()}

          {/* Quick Doctor Consultation Prompt */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-3">
              Confused about your diagnosis? Our specialists examine and clearly explain your scan reports.
            </p>
            <button
              type="button"
              onClick={() => {
                trackConversionEvent('appointment_click', content.id, { location: 'diagram_consult_btn' });
                onOpenAppointmentModal();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer min-h-[48px]"
            >
              <span>DISCUSS YOUR SCAN REPORTS WITH A SPECIALIST</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
