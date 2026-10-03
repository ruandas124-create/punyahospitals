import { PatientRecord, UserRole, PatientSource, AppointmentStatus } from '../types/hospital';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'punya_hospital_records_v2';
const AUDIT_LOG_KEY = 'punya_hospital_audit_logs_v2';

// Standard doctors & branches for PUNYA Hospital
export const HOSPITAL_BRANCHES = [
  'PUNYA Hospital - 52/10, 80 Feet Ring Rd, Basaveshwar Nagar, Bengaluru, 560079',
];

export const HOSPITAL_DOCTORS = [
  { name: 'Dr. Punyavathi C. Nagaraj', speciality: 'Best Laparoscopic Gynecologist & Endometriosis Specialist (20+ Yrs Exp)', branch: 'Rajajinagar' },
  { name: 'Dr. Nagaraj B. Puttaswamy', speciality: 'Senior Consultant – General & Laparoscopic Surgery (30+ Yrs Exp)', branch: 'Rajajinagar' },
  { name: 'Dr. Anita Rao', speciality: 'Gynecology & Laparoscopic Surgery', branch: 'Rajajinagar' },
  { name: 'Dr. Priya Sharma', speciality: 'Obstetrics & Gynecological Endoscopy', branch: 'Jayanagar' },
  { name: 'Dr. Vikram Patel', speciality: 'Proctology & Colorectal Surgery', branch: 'Indiranagar' },
  { name: 'Dr. Sunita Deshmukh', speciality: 'Minimally Invasive Hernia Specialist', branch: 'Whitefield' },
];

export const FRONT_OFFICE_SOURCE_OPTIONS: PatientSource[] = [
  'Walk-in',
  'Google',
  'Instagram',
  'Referral',
  'Billboard',
  'Relatives/Friend',
  'Direct Call',
  'WhatsApp',
  'Website Landing Page',
  'Acquire OPD', // Available in list, but auto-locked for Master Admin/Sales records
];

// Initial seed data ensuring realistic examples
const SEED_PATIENTS: PatientRecord[] = [
  {
    id: 'pat-seed-001',
    mrn: 'PUN-2026-1042',
    opdToken: 'OPD-A-01',
    fullName: 'Lakshmi Venkatesh',
    mobileNumber: '9845012345',
    age: 38,
    gender: 'Female',
    condition: 'Uterine Fibroids Evaluation',
    doctor: 'Dr. Anita Rao',
    hospitalBranch: 'PUNYA Hospital - Main Hospital, Rajajinagar, Bangalore',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '10:30 AM',
    source: 'Acquire OPD', // Scheduled by Master Admin
    bookedByRole: 'master_admin',
    bookedByName: 'Master Admin (Admin Ops)',
    status: 'scheduled',
    notes: 'Patient requested direct laparoscopic evaluation for symptomatic fibroids.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    history: [
      {
        id: 'hist-001',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        role: 'master_admin',
        action: 'Scheduled by Master Admin',
        sourceSnapshot: 'Acquire OPD',
        details: 'Initial appointment booking created from Master Admin Dashboard. Source set to Acquire OPD.',
      },
    ],
  },
  {
    id: 'pat-seed-002',
    mrn: 'PUN-2026-1043',
    opdToken: 'OPD-A-02',
    fullName: 'Meera Krishnan',
    mobileNumber: '9845012345',
    age: 32,
    gender: 'Female',
    condition: 'Endometriosis Pain Consultation',
    doctor: 'Dr. Priya Sharma',
    hospitalBranch: 'PUNYA Hospital - Women & Surgical Wing, Jayanagar, Bangalore',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '11:15 AM',
    source: 'Acquire OPD', // Scheduled by Sales Dashboard
    bookedByRole: 'sales',
    bookedByName: 'Sales Executive (Rajesh M)',
    status: 'scheduled',
    notes: 'Referred from specialist outbound health camp. High priority consultation.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    history: [
      {
        id: 'hist-002',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        role: 'sales',
        action: 'Scheduled by Sales Dashboard',
        sourceSnapshot: 'Acquire OPD',
        details: 'Lead converted to confirmed appointment in Sales Dashboard. Source set to Acquire OPD.',
      },
    ],
  },
  {
    id: 'pat-seed-003',
    mrn: 'PUN-2026-1044',
    opdToken: 'OPD-B-07',
    fullName: 'Ramesh Sundaram',
    mobileNumber: '9448023456',
    age: 46,
    gender: 'Male',
    condition: 'Gallstone Consultation',
    doctor: 'Dr. Rajesh Kumar',
    hospitalBranch: 'PUNYA Hospital - Main Hospital, Rajajinagar, Bangalore',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '09:00 AM',
    source: 'Walk-in', // Native Front Office Walk-in
    bookedByRole: 'front_office',
    bookedByName: 'Front Office Reception (Desk 1)',
    status: 'registered',
    notes: 'Walk-in patient arriving directly at reception with abdominal ultrasound report.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    history: [
      {
        id: 'hist-003',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        role: 'front_office',
        action: 'Direct Front Office Registration',
        sourceSnapshot: 'Walk-in',
        details: 'Walk-in registration at Front Office.',
      },
    ],
  },
];

class HospitalDataService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.initStorage();
  }

  private initStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (!existing) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PATIENTS));
      }
    } catch (e) {
      console.warn('Storage init fallback:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Listener notify error:', e);
      }
    });
  }

  public getAllPatients(): PatientRecord[] {
    if (typeof window === 'undefined') return SEED_PATIENTS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return SEED_PATIENTS;
      return JSON.parse(data);
    } catch {
      return SEED_PATIENTS;
    }
  }

  private savePatients(patients: PatientRecord[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
      this.notify();
    } catch (e) {
      console.error('Error saving to storage:', e);
    }
  }

  public getPatientById(id: string): PatientRecord | undefined {
    return this.getAllPatients().find((p) => p.id === id);
  }

  /**
   * CORE REQUIREMENT:
   * Whenever a patient is scheduled or booked by Master Admin or Sales Dashboard,
   * the source must ALWAYS be saved as "Acquire OPD".
   * This applies to:
   * - Master Admin -> Schedule/Book Patient
   * - Sales Dashboard -> Schedule Patient
   * - Any booking flow initiated by Master Admin or Sales
   */
  public schedulePatient(params: {
    fullName: string;
    mobileNumber: string;
    age: number;
    gender: 'Female' | 'Male' | 'Other';
    condition: string;
    doctor: string;
    hospitalBranch: string;
    appointmentDate: string;
    appointmentTime: string;
    notes?: string;
    bookedByRole: UserRole;
    bookedByName: string;
    // Note: If bookedByRole is master_admin or sales, source is hardcoded to 'Acquire OPD'
    customSourceForFrontOfficeOnly?: PatientSource;
  }): PatientRecord {
    const isMasterAdminOrSales = params.bookedByRole === 'master_admin' || params.bookedByRole === 'sales';

    // STRICT SOURCE RULE:
    // Master Admin / Sales ALWAYS produces 'Acquire OPD'
    const finalSource: PatientSource = isMasterAdminOrSales
      ? 'Acquire OPD'
      : (params.customSourceForFrontOfficeOnly || 'Walk-in');

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `pat-${Date.now()}-${randomSuffix}`;
    const mrn = `PUN-2026-${randomSuffix}`;
    const opdToken = `OPD-${params.condition.slice(0, 1).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const nowIso = new Date().toISOString();

    const roleLabel = params.bookedByRole === 'master_admin'
      ? 'Master Admin'
      : params.bookedByRole === 'sales'
      ? 'Sales Dashboard'
      : 'Front Office';

    const newRecord: PatientRecord = {
      id: newId,
      mrn,
      opdToken,
      fullName: params.fullName.trim(),
      mobileNumber: params.mobileNumber.trim(),
      age: Number(params.age) || 30,
      gender: params.gender,
      condition: params.condition,
      doctor: params.doctor,
      hospitalBranch: params.hospitalBranch,
      appointmentDate: params.appointmentDate,
      appointmentTime: params.appointmentTime,
      source: finalSource, // Guaranteed 'Acquire OPD' if Master Admin or Sales
      bookedByRole: params.bookedByRole,
      bookedByName: params.bookedByName,
      status: 'scheduled',
      notes: params.notes || '',
      createdAt: nowIso,
      updatedAt: nowIso,
      history: [
        {
          id: `hist-${Date.now()}`,
          timestamp: nowIso,
          role: params.bookedByRole,
          action: `Scheduled by ${roleLabel}`,
          sourceSnapshot: finalSource,
          details: `Patient booked by ${params.bookedByName}. Source locked as "${finalSource}".`,
        },
      ],
    };

    // Save locally
    const currentPatients = this.getAllPatients();
    const updatedList = [newRecord, ...currentPatients];
    this.savePatients(updatedList);

    // Save to Supabase if connected
    this.syncToSupabase(newRecord);

    return newRecord;
  }

  /**
   * IMPORTANT:
   * Editing appointment date, time, doctor, hospital, status, or notes must NOT change the source!
   * The source remains immutable.
   */
  public updateAppointmentDetails(
    id: string,
    updates: {
      appointmentDate?: string;
      appointmentTime?: string;
      doctor?: string;
      hospitalBranch?: string;
      notes?: string;
      status?: AppointmentStatus;
      actorRole: UserRole;
      actorName: string;
    }
  ): PatientRecord | null {
    const currentPatients = this.getAllPatients();
    const index = currentPatients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const patient = currentPatients[index];
    const nowIso = new Date().toISOString();

    // Preserve original source strictly! DO NOT OVERWRITE SOURCE!
    const preservedSource = patient.source;

    const updatedPatient: PatientRecord = {
      ...patient,
      appointmentDate: updates.appointmentDate !== undefined ? updates.appointmentDate : patient.appointmentDate,
      appointmentTime: updates.appointmentTime !== undefined ? updates.appointmentTime : patient.appointmentTime,
      doctor: updates.doctor !== undefined ? updates.doctor : patient.doctor,
      hospitalBranch: updates.hospitalBranch !== undefined ? updates.hospitalBranch : patient.hospitalBranch,
      notes: updates.notes !== undefined ? updates.notes : patient.notes,
      status: updates.status !== undefined ? updates.status : patient.status,
      source: preservedSource, // Source is completely preserved
      updatedAt: nowIso,
      history: [
        ...patient.history,
        {
          id: `hist-${Date.now()}`,
          timestamp: nowIso,
          role: updates.actorRole,
          action: 'Updated Appointment Details',
          sourceSnapshot: preservedSource,
          details: `Updated appointment details by ${updates.actorName}. Source preserved as "${preservedSource}".`,
        },
      ],
    };

    currentPatients[index] = updatedPatient;
    this.savePatients(currentPatients);
    this.syncToSupabase(updatedPatient);

    return updatedPatient;
  }

  /**
   * Patient Registration at Front Office:
   * When the scheduled patient reaches the Front Office Dashboard and moves to Patient Registration:
   * Front Office MUST READ the saved source instead of overwriting it!
   * The source ("Acquire OPD") remains strictly attached.
   */
  public registerPatientFromRoster(
    id: string,
    registrationData: {
      vitals?: {
        bp?: string;
        pulse?: string;
        temperature?: string;
        weight?: string;
      };
      notes?: string;
      registeredByName: string;
    }
  ): PatientRecord | null {
    const currentPatients = this.getAllPatients();
    const index = currentPatients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const patient = currentPatients[index];
    const nowIso = new Date().toISOString();
    const preservedSource = patient.source; // Still 'Acquire OPD'

    const updatedPatient: PatientRecord = {
      ...patient,
      status: 'registered',
      vitals: registrationData.vitals || patient.vitals,
      notes: registrationData.notes ? `${patient.notes ? patient.notes + ' | ' : ''}${registrationData.notes}` : patient.notes,
      source: preservedSource, // CRITICAL: Never replace 'Acquire OPD' with another source
      updatedAt: nowIso,
      history: [
        ...patient.history,
        {
          id: `hist-${Date.now()}`,
          timestamp: nowIso,
          role: 'front_office',
          action: 'Patient Registration Completed',
          sourceSnapshot: preservedSource,
          details: `Patient registered at Front Office by ${registrationData.registeredByName}. Retained original source: "${preservedSource}".`,
        },
      ],
    };

    currentPatients[index] = updatedPatient;
    this.savePatients(currentPatients);
    this.syncToSupabase(updatedPatient);

    return updatedPatient;
  }

  /**
   * Move from Registration to OPD Registry:
   * Status moves to 'in_consultation' or 'checked_in'.
   * Source continues to remain 'Acquire OPD'.
   */
  public admitToOpdRegistry(
    id: string,
    admittedByName: string,
    targetStatus: AppointmentStatus = 'in_consultation'
  ): PatientRecord | null {
    const currentPatients = this.getAllPatients();
    const index = currentPatients.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const patient = currentPatients[index];
    const nowIso = new Date().toISOString();
    const preservedSource = patient.source;

    const updatedPatient: PatientRecord = {
      ...patient,
      status: targetStatus,
      source: preservedSource, // Still 'Acquire OPD'
      updatedAt: nowIso,
      history: [
        ...patient.history,
        {
          id: `hist-${Date.now()}`,
          timestamp: nowIso,
          role: 'front_office',
          action: 'Admitted to OPD Registry',
          sourceSnapshot: preservedSource,
          details: `Patient moved to OPD Registry (${targetStatus}) by ${admittedByName}. Source verified intact: "${preservedSource}".`,
        },
      ],
    };

    currentPatients[index] = updatedPatient;
    this.savePatients(currentPatients);
    this.syncToSupabase(updatedPatient);

    return updatedPatient;
  }

  /**
   * Synchronize patient record to Supabase
   */
  private async syncToSupabase(patient: PatientRecord): Promise<void> {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    try {
      const payload = {
        id: patient.id,
        mrn: patient.mrn,
        full_name: patient.fullName,
        mobile_number: patient.mobileNumber,
        age: patient.age,
        gender: patient.gender,
        condition: patient.condition,
        doctor: patient.doctor,
        hospital_branch: patient.hospitalBranch,
        appointment_date: patient.appointmentDate,
        appointment_time: patient.appointmentTime,
        source: patient.source, // 'Acquire OPD' correctly stored
        booked_by_role: patient.bookedByRole,
        booked_by_name: patient.bookedByName,
        status: patient.status,
        notes: patient.notes,
        opd_token: patient.opdToken,
        updated_at: patient.updatedAt,
      };

      await supabase.from('appointments').upsert(payload, { onConflict: 'id' });
      await supabase.from('patients').upsert(payload, { onConflict: 'id' });
    } catch (err) {
      console.warn('Supabase sync background notification (local persistence active):', err);
    }
  }

  /**
   * Resets local seed data to clean initial state if needed for testing
   */
  public resetToDefaultSeed(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PATIENTS));
      this.notify();
    }
  }
}

export const hospitalService = new HospitalDataService();
