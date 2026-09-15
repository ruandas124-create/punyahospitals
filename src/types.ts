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

export interface LandingPageContent {
  id: ConditionId;
  path: string;
  adKeyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSupportingText: string;
  whatsappMessage: string;
  doctorSpeciality: string;
  symptoms: Symptom[];
  diagramTitle: string;
  diagramDescription: string;
  treatmentOptions: TreatmentOption[];
  faqs: FaqItem[];
}

export interface AppointmentFormData {
  fullName: string;
  mobileNumber: string;
  condition: ConditionId;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface AnalyticsEvent {
  eventName: 'form_submit' | 'phone_click' | 'whatsapp_click' | 'appointment_click' | 'scroll_50' | 'scroll_90';
  condition: ConditionId;
  timestamp: number;
  metadata?: Record<string, string | number | boolean>;
}
