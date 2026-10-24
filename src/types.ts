export type ConditionId = 'piles' | 'gallstone' | 'hernia' | 'uterine-fibroids' | 'endometriosis';

export interface Symptom {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface TreatmentOption {
  title: string;
  subtitle: string;
  description: string;
  suitableFor: string;
  badge: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DaycareInfo {
  headline: string;
  summary: string;
  bulletPoints: string[];
  recoveryTimeline: string;
  clinicalDisclaimer: string;
}

export interface WarningSignsInfo {
  title: string;
  description: string;
  signs: string[];
}

export interface InsuranceInfo {
  title: string;
  badge: string;
  description: string;
  ctaText: string;
  coverageNote: string;
  points: string[];
}

export interface PatientBenefitCard {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface LandingPageContent {
  id: ConditionId;
  path: string;
  canonicalUrl?: string;
  adKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroSupportingText: string;
  heroBadge?: string;
  heroCtaText?: string;
  whatsappMessage: string;
  doctorSpeciality: string;
  symptoms: Symptom[];
  warningSigns?: WarningSignsInfo;
  diagramTitle: string;
  diagramDescription: string;
  treatmentOptions: TreatmentOption[];
  daycareInfo?: DaycareInfo;
  insuranceInfo?: InsuranceInfo;
  benefitCards?: PatientBenefitCard[];
  faqs: FaqItem[];
}

export interface AppointmentFormData {
  fullName: string;
  mobileNumber: string;
  condition: ConditionId;
  preferredDate: string;
  preferredTime: string;
  needInsuranceHelp?: boolean;
  message?: string;
}

export interface AnalyticsEvent {
  eventName: 'form_submit' | 'phone_click' | 'whatsapp_click' | 'appointment_click' | 'scroll_50' | 'scroll_90';
  condition: ConditionId;
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
}
