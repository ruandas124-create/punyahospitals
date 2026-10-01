import React from 'react';
import { ShieldCheck, Activity, Users, ClipboardList, Database, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PunyaLogo } from '../PunyaLogo';
import { UserRole } from '../../types/hospital';
import { getSupabaseStatus } from '../../services/supabaseClient';

interface StaffPortalHeaderProps {
  currentTab: 'master_admin' | 'sales' | 'front_office' | 'audit';
  onSelectTab: (tab: 'master_admin' | 'sales' | 'front_office' | 'audit') => void;
  onBackToWebsite: () => void;
}

export const StaffPortalHeader: React.FC<StaffPortalHeaderProps> = ({
  currentTab,
  onSelectTab,
  onBackToWebsite,
}) => {
  const supabaseStatus = getSupabaseStatus();

  return (
    <header className="sticky top-0 z-50 bg-[#1F162B] text-white border-b border-purple-900/60 shadow-lg">
      {/* Top micro policy bar */}
      <div className="bg-[#150F1D] px-4 py-1.5 text-[11px] sm:text-xs flex flex-wrap items-center justify-between border-b border-purple-900/30 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#579B35] animate-ping" />
          <span className="font-semibold text-purple-200">PUNYA Hospital Internal HMS</span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1 text-[#EAF4E5] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
            Source Policy Active: Master Admin / Sales → <span className="underline decoration-[#579B35] text-white">Acquire OPD</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-[#7B4FA3]" />
            <span className="text-[10px] sm:text-[11px]">
              Supabase Sync: <strong className="text-gray-300">{supabaseStatus.isConfigured ? 'Connected' : 'Durable Local + Cloud Ready'}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onBackToWebsite}
            className="text-xs text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Public Site</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-lg">
              <PunyaLogo size="sm" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Patient Scheduling & OPD Management
              </h1>
              <p className="text-xs text-purple-300">
                Data Flow & Source Preservation Control Centre
              </p>
            </div>
          </div>

          {/* Role Navigation Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {/* Master Admin Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('master_admin')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'master_admin'
                  ? 'bg-[#7B4FA3] text-white shadow-md shadow-purple-900/50'
                  : 'bg-white/5 text-purple-200 hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4 text-purple-300" />
              <span>Master Admin</span>
            </button>

            {/* Sales Dashboard Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('sales')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'sales'
                  ? 'bg-[#7B4FA3] text-white shadow-md shadow-purple-900/50'
                  : 'bg-white/5 text-purple-200 hover:bg-white/10'
              }`}
            >
              <Activity className="w-4 h-4 text-purple-300" />
              <span>Sales Dashboard</span>
            </button>

            {/* Front Office Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('front_office')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'front_office'
                  ? 'bg-[#579B35] text-white shadow-md shadow-green-900/50 font-bold'
                  : 'bg-white/5 text-purple-200 hover:bg-white/10'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-green-300" />
              <span>Front Office</span>
              <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full text-green-200">Roster & OPD</span>
            </button>

            {/* Supabase Audit Tab */}
            <button
              type="button"
              onClick={() => onSelectTab('audit')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                currentTab === 'audit'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/50 font-bold'
                  : 'bg-white/5 text-amber-200 hover:bg-white/10'
              }`}
            >
              <Database className="w-4 h-4 text-amber-300" />
              <span>Data Flow Audit</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
