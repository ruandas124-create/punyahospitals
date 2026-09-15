import React from 'react';
import { ConditionId } from '../types';
import { MousePointerClick, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

interface AdCampaignBarProps {
  currentCondition: ConditionId;
  onSelectCondition: (condition: ConditionId) => void;
}

export const AdCampaignBar: React.FC<AdCampaignBarProps> = ({
  currentCondition,
  onSelectCondition,
}) => {
  const campaigns: { id: ConditionId; label: string; url: string; query: string }[] = [
    {
      id: 'piles',
      label: 'Page 1: Piles Treatment',
      url: '/piles-treatment',
      query: 'Google Ad: "Piles Treatment in Bangalore"',
    },
    {
      id: 'gallstone',
      label: 'Page 2: Gallstone Treatment',
      url: '/gallstone-treatment',
      query: 'Google Ad: "Gallstone Treatment in Bangalore"',
    },
    {
      id: 'hernia',
      label: 'Page 3: Hernia Treatment',
      url: '/hernia-treatment',
      query: 'Google Ad: "Hernia Treatment in Bangalore"',
    },
    {
      id: 'uterine-fibroids',
      label: 'Page 4: Uterine Fibroids',
      url: '/uterine-fibroids',
      query: 'Google & Meta Ad: "Uterine Fibroids Care Bangalore"',
    },
    {
      id: 'endometriosis',
      label: 'Page 5: Endometriosis',
      url: '/endometriosis',
      query: 'Google & Meta Ad: "Endometriosis Care Bangalore"',
    },
  ];

  return (
    <div className="bg-[#252525] text-white py-2 px-3 sm:px-4 text-xs border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-[#7B4FA3] text-white font-bold text-[10px] uppercase tracking-wider">
            AD CAMPAIGN SWITCHER
          </span>
          <span className="text-gray-400 hidden sm:inline text-xs">
            Directly test the 3 dedicated landing pages:
          </span>
        </div>

        {/* 3 Dedicated Landing Page Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {campaigns.map((c) => {
            const isActive = currentCondition === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectCondition(c.id)}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#579B35] text-white shadow-xs'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{c.label}</span>
                <span className="text-[10px] opacity-75 font-mono">({c.url})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
