import { AnalyticsEvent, ConditionId } from '../types';

type EventCallback = (event: AnalyticsEvent) => void;
const listeners: Set<EventCallback> = new Set();

export const subscribeToAnalytics = (callback: EventCallback) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// In-memory set to prevent duplicate lead conversion counts within a session
const recentConversions = new Set<string>();

export const trackConversionEvent = (
  eventName: AnalyticsEvent['eventName'],
  condition: ConditionId,
  metadata?: Record<string, string | number | boolean>
) => {
  const event: AnalyticsEvent = {
    eventName,
    condition,
    timestamp: Date.now(),
    metadata,
  };

  // Standardized conversion tags mapping
  const conversionIdMap: Record<ConditionId, string> = {
    piles: 'piles',
    gallstone: 'gallstones',
    hernia: 'hernia',
    'uterine-fibroids': 'uterine_fibroids',
    endometriosis: 'endometriosis',
  };

  const diseaseIdentifier = conversionIdMap[condition] || condition;
  const pagePath =
    condition === 'uterine-fibroids'
      ? '/uterine-fibroids'
      : condition === 'endometriosis'
      ? '/endometriosis'
      : `/${condition}-treatment`;

  if (typeof window !== 'undefined') {
    // 1. Google Tag Manager / GA4 DataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      disease_category: diseaseIdentifier,
      conversion_disease: diseaseIdentifier,
      page_path: pagePath,
      ...metadata,
    });

    // 2. Google Ads gtag if initialized
    if (typeof window.gtag === 'function') {
      // General engagement tracking
      window.gtag('event', eventName, {
        event_category: 'Medical_Ad_Lead',
        event_label: diseaseIdentifier,
        conversion_disease: diseaseIdentifier,
        ...metadata,
      });

      // Fire Google Ads Lead conversion ONLY on genuine completed inquiries (form submissions)
      // and de-duplicate to prevent false inflation
      if (eventName === 'form_submit') {
        const leadIdentifier = `${diseaseIdentifier}_${metadata?.mobile_prefix || metadata?.patient_name || 'lead'}`;
        if (!recentConversions.has(leadIdentifier)) {
          recentConversions.add(leadIdentifier);
          window.gtag('event', 'conversion', {
            send_to: 'AW-18499292312/WKZUCL6-y5QdEJiZk_VE',
            ...metadata,
          });
        }
      }
    }

    // 3. Meta Pixel fbq if initialized
    if (typeof window.fbq === 'function') {
      const metaEventMap: Record<string, string> = {
        form_submit: 'Lead',
        phone_click: 'Contact',
        whatsapp_click: 'Contact',
        appointment_click: 'InitiateCheckout',
      };
      const metaName = metaEventMap[eventName] || 'CustomEvent';
      window.fbq('track', metaName, {
        content_name: `${diseaseIdentifier}_treatment`,
        content_category: diseaseIdentifier,
        ...metadata,
      });
    }
  }

  // Notify registered local listeners
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (e) {
      console.error('Analytics listener error', e);
    }
  });

  console.log(`[PUNYA Tracking] ${eventName.toUpperCase()} fired for [${condition}]`, metadata);
};
