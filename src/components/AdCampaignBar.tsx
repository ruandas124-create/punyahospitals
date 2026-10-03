import React from 'react';
import { ConditionId } from '../types';
import { ALL_TREATMENTS } from '../constants/treatmentRoutes';

interface AdCampaignBarProps {
  currentCondition: ConditionId;
  onSelectCondition: (condition: ConditionId) => void;
}

export const AdCampaignBar: React.FC<AdCampaignBarProps> = ({
  currentCondition,
  onSelectCondition,
}) => {
  return (
    <div className="bg-[#252525] text-white py-2 px-3 sm:px-4 text-xs border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-[#7B4FA3] text-white font-bold text-[10px] uppercase tracking-wider">
            DEDICATED TREATMENT URLS
          </span>
          <span className="text-gray-400 hidden sm:inline text-xs">
            Directly test the 5 separate treatment pages:
          </span>
        </div>

        {/* 5 Dedicated Treatment Page Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {ALL_TREATMENTS.map((c) => {
            const isActive = currentCondition === c.id;
            return (
              <a
                key={c.id}
                href={c.url}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCondition(c.id);
                }}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#579B35] text-white shadow-xs'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span>{c.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
