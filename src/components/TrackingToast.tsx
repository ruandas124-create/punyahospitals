import React, { useState, useEffect } from 'react';
import { subscribeToAnalytics } from '../utils/analytics';
import { AnalyticsEvent, ConditionId } from '../types';
import { Activity, Check, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface TrackingToastProps {
  currentCondition: ConditionId;
}

export const TrackingToast: React.FC<TrackingToastProps> = ({ currentCondition }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastEvent, setLastEvent] = useState<AnalyticsEvent | null>(null);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAnalytics((event) => {
      setEvents((prev) => [event, ...prev.slice(0, 9)]);
      setLastEvent(event);
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 3500);
      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-20 right-4 z-40 max-w-xs transition-all">
      {/* Toast popup on recent conversion trigger */}
      {showFlash && lastEvent && !isExpanded && (
        <div className="mb-2 bg-[#5D367F] text-white p-3 rounded-2xl shadow-xl border border-purple-300 animate-in slide-in-from-top duration-300 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#579B35] text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#EAF4E5] uppercase tracking-wide block">
              Ad Conversion Fired
            </span>
            <span className="text-white/90">
              {lastEvent.eventName} • {lastEvent.condition}
            </span>
          </div>
        </div>
      )}

      {/* Collapsible Inspector Pill for Media Buyers / Ad Managers */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-purple-100 overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-3 py-2 flex items-center justify-between gap-2 text-gray-700 hover:bg-purple-50 transition-colors"
        >
          <div className="flex items-center gap-1.5 font-bold text-[#5D367F]">
            <span className="w-2 h-2 rounded-full bg-[#579B35] animate-ping" />
            <span>Ad Tracking & Pixels</span>
          </div>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="p-3 border-t border-purple-100 space-y-2 bg-[#F5F0F8]/30 max-h-56 overflow-y-auto">
            <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider flex justify-between">
              <span>Event Log</span>
              <span className="text-[#579B35]">Google / Meta / GA4</span>
            </div>

            {events.length === 0 ? (
              <p className="text-[11px] text-gray-400 italic py-2">
                Click Call, WhatsApp, or Book to test conversion tracking.
              </p>
            ) : (
              <div className="space-y-1.5">
                {events.map((e, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-white border border-gray-100 text-[11px] flex items-center justify-between"
                  >
                    <span className="font-mono text-[#7B4FA3] font-semibold">{e.eventName}</span>
                    <span className="text-gray-500 capitalize">{e.condition}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
