export type UserRole = 'master_admin' | 'sales' | 'front_office';

export type PatientSource = 
  | 'Acquire OPD'
  | 'Google'
  | 'Instagram'
  | 'Walk-in'
  | 'Referral'
  | 'Billboard'
  | 'Relatives/Friend'
  | 'Website Landing Page'
  | 'Direct Call'
  | 'WhatsApp';

export type AppointmentStatus = 
  | 'scheduled'
  | 'checked_in'
  | 'registered'
  | 'in_consultation'
  | 'completed'
  | 'cancelled';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  role: UserRole | 'system';
  action: string;
  sourceSnapshot: string;
  details: string;
}

export interface PatientRecord {
  id: string;
  mrn: string; // Medical Record Number, e.g. PUN-2026-0842
  opdToken?: string; // Token for OPD queue, e.g. OPD-A-12
  fullName: string;
  mobileNumber: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  condition: string;
  doctor: string;
  hospitalBranch: string;
  appointmentDate: string;
  appointmentTime: string;
  source: PatientSource | string;
  bookedByRole: UserRole | 'public';
  bookedByName: string;
  status: AppointmentStatus;
  notes?: string;
  vitals?: {
    bp?: string;
    pulse?: string;
    temperature?: string;
    weight?: string;
  };
  createdAt: string;
  updatedAt: string;
  history: AuditLogEntry[];
}

export interface HospitalBranch {
  id: string;
  name: string;
  city: string;
}

export interface HospitalDoctor {
  id: string;
  name: string;
  speciality: string;
  branch: string;
}
