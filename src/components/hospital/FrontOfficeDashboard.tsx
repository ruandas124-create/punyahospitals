import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Search, UserCheck, Calendar, Clock, Phone, AlertCircle, 
  CheckCircle2, ShieldCheck, Edit3, ArrowRight, UserPlus, Stethoscope, 
  Activity, RefreshCw, X, Eye, FileSpreadsheet, Lock 
} from 'lucide-react';
import { PatientRecord, PatientSource, AppointmentStatus } from '../../types/hospital';
import { 
  hospitalService, 
  HOSPITAL_BRANCHES, 
  HOSPITAL_DOCTORS, 
  FRONT_OFFICE_SOURCE_OPTIONS 
} from '../../services/hospitalService';

interface FrontOfficeDashboardProps {
  onOpenAuditForPatient?: (patient: PatientRecord) => void;
}

export const FrontOfficeDashboard: React.FC<FrontOfficeDashboardProps> = ({
  onOpenAuditForPatient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'registration' | 'opd_registry'>('roster');
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Appointment Modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<PatientRecord | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDoctor, setEditDoctor] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Patient Registration state
  const [selectedPatientForReg, setSelectedPatientForReg] = useState<PatientRecord | null>(null);
  const [isDirectRegistration, setIsDirectRegistration] = useState(false);

  // Registration Form fields
  const [regFullName, setRegFullName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regAge, setRegAge] = useState('32');
  const [regGender, setRegGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [regCondition, setRegCondition] = useState('Uterine Fibroids Evaluation');
  const [regDoctor, setRegDoctor] = useState(HOSPITAL_DOCTORS[0].name);
  const [regBranch, setRegBranch] = useState(HOSPITAL_BRANCHES[0]);
  const [regSource, setRegSource] = useState<PatientSource>('Walk-in');
  const [regBp, setRegBp] = useState('120/80 mmHg');
  const [regPulse, setRegPulse] = useState('74 bpm');
  const [regTemp, setRegTemp] = useState('98.4 °F');
  const [regWeight, setRegWeight] = useState('62 kg');
  const [regNotes, setRegNotes] = useState('');

  // Subscribe to hospital data
  useEffect(() => {
    const refresh = () => {
      setPatients(hospitalService.getAllPatients());
    };
    refresh();
    const unsubscribe = hospitalService.subscribe(refresh);
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Edit Modal
  const openEditModal = (patient: PatientRecord) => {
    setSelectedPatientForEdit(patient);
    setEditDate(patient.appointmentDate);
    setEditTime(patient.appointmentTime);
    setEditDoctor(patient.doctor);
    setEditBranch(patient.hospitalBranch);
    setEditNotes(patient.notes || '');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientForEdit) return;

    // RULE: Editing appointment date, time, doctor, hospital, notes MUST NOT change the source!
    hospitalService.updateAppointmentDetails(selectedPatientForEdit.id, {
      appointmentDate: editDate,
      appointmentTime: editTime,
      doctor: editDoctor,
      hospitalBranch: editBranch,
      notes: editNotes,
      actorRole: 'front_office',
      actorName: 'Front Office Reception Desk',
    });

    setIsEditModalOpen(false);
    showToast(`✓ Appointment updated. Source strictly preserved as "${selectedPatientForEdit.source}".`);
  };

  // Start Registration for an existing scheduled patient
  const startRegistrationForPatient = (patient: PatientRecord) => {
    setSelectedPatientForReg(patient);
    setIsDirectRegistration(false);
    setRegFullName(patient.fullName);
    setRegMobile(patient.mobileNumber);
    setRegAge(String(patient.age));
    setRegGender(patient.gender);
    setRegCondition(patient.condition);
    setRegDoctor(patient.doctor);
    setRegBranch(patient.hospitalBranch);
    // FRONT OFFICE MUST READ SAVED SOURCE INSTEAD OF OVERWRITING IT!
    setRegSource(patient.source as PatientSource);
    setRegNotes(patient.notes || '');
    setActiveSubTab('registration');
  };

  // Start a fresh direct Walk-in Registration
  const startDirectRegistration = () => {
    setSelectedPatientForReg(null);
    setIsDirectRegistration(true);
    setRegFullName('');
    setRegMobile('');
    setRegAge('30');
    setRegGender('Female');
    setRegCondition('Uterine Fibroids Evaluation');
    setRegDoctor(HOSPITAL_DOCTORS[0].name);
    setRegBranch(HOSPITAL_BRANCHES[0]);
    setRegSource('Walk-in'); // Front office default for direct walk-ins
    setRegNotes('');
    setActiveSubTab('registration');
  };

  // Complete Registration Form submit
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regMobile.trim()) return;

    if (selectedPatientForReg) {
      // RULE: Moving from Scheduled Roster -> Patient Registration preserves the saved source!
      // Front Office reads saved source and keeps it intact
      hospitalService.registerPatientFromRoster(selectedPatientForReg.id, {
        vitals: {
          bp: regBp,
          pulse: regPulse,
          temperature: regTemp,
          weight: regWeight,
        },
        notes: regNotes,
        registeredByName: 'Front Office Desk 1',
      });

      showToast(`✓ Registration completed for ${regFullName}. Source preserved as "${selectedPatientForReg.source}". Issued token: ${selectedPatientForReg.opdToken}`);
    } else {
      // Direct front office booking
      const newRec = hospitalService.schedulePatient({
        fullName: regFullName,
        mobileNumber: regMobile,
        age: Number(regAge) || 30,
        gender: regGender,
        condition: regCondition,
        doctor: regDoctor,
        hospitalBranch: regBranch,
        appointmentDate: new Date().toISOString().split('T')[0],
        appointmentTime: 'Immediate',
        notes: regNotes,
        bookedByRole: 'front_office',
        bookedByName: 'Front Office Reception',
        customSourceForFrontOfficeOnly: regSource,
      });

      hospitalService.registerPatientFromRoster(newRec.id, {
        vitals: { bp: regBp, pulse: regPulse, temperature: regTemp, weight: regWeight },
        notes: regNotes,
        registeredByName: 'Front Office Desk 1',
      });

      showToast(`✓ Direct Walk-in Registered with source "${regSource}".`);
    }

    // Switch to OPD Registry tab
    setActiveSubTab('opd_registry');
  };

  // Move patient to In Consultation or Completed in OPD Registry
  const handleUpdateOpdStatus = (patientId: string, status: AppointmentStatus) => {
    const updated = hospitalService.admitToOpdRegistry(patientId, 'Front Office Nurse / Coordinator', status);
    if (updated) {
      showToast(`✓ Patient status updated to "${status.replace('_', ' ')}". Source preserved as "${updated.source}".`);
    }
  };

  // Data sets
  const scheduledPatients = patients.filter((p) => p.status === 'scheduled');
  const registeredOrConsultingPatients = patients.filter(
    (p) => p.status === 'registered' || p.status === 'in_consultation' || p.status === 'completed'
  );

  const filteredScheduled = scheduledPatients.filter((p) => {
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobileNumber.includes(searchTerm) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = filterDoctor === 'ALL' || p.doctor === filterDoctor;
    return matchesSearch && matchesDoctor;
  });

  const filteredOpdRegistry = registeredOrConsultingPatients.filter((p) => {
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobileNumber.includes(searchTerm) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = filterDoctor === 'ALL' || p.doctor === filterDoctor;
    return matchesSearch && matchesDoctor;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1F162B] text-white border-2 border-[#579B35] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Front Office Banner */}
      <div className="bg-gradient-to-r from-[#173812] via-[#2F6B12] to-[#173812] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-green-700/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-2">
            <ClipboardList className="w-3.5 h-3.5 text-[#EAF4E5]" />
            <span>Front Office Reception & OPD Coordination</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Front Office Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-green-100 max-w-3xl mt-1">
            Incoming scheduled patients from <strong>Master Admin</strong> and <strong>Sales Dashboard</strong> retain their original{' '}
            <strong className="text-white underline">Source: Acquire OPD</strong> throughout Roster, Registration, and OPD Registry. 
            Front Office reads the saved source and will not overwrite it.
          </p>
        </div>

        <button
          type="button"
          onClick={startDirectRegistration}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#173812] hover:bg-green-50 font-black text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer flex-shrink-0"
        >
          <UserPlus className="w-4 h-4 text-[#579B35]" />
          <span>+ DIRECT RECEPTION REGISTRATION</span>
        </button>
      </div>

      {/* Front Office Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('roster')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'roster'
              ? 'bg-[#579B35] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>1. Scheduled Roster ({scheduledPatients.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!selectedPatientForReg) {
              startDirectRegistration();
            } else {
              setActiveSubTab('registration');
            }
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'registration'
              ? 'bg-[#579B35] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>2. Patient Registration</span>
          {selectedPatientForReg && (
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full text-white">
              {selectedPatientForReg.fullName.split(' ')[0]}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('opd_registry')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'opd_registry'
              ? 'bg-[#579B35] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>3. OPD Registry ({registeredOrConsultingPatients.length})</span>
        </button>
      </div>

      {/* VIEW 1: SCHEDULED ROSTER */}
      {activeSubTab === 'roster' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Policy Callout Banner */}
          <div className="bg-[#EAF4E5] border border-[#BDE0AC] p-4 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#579B35] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#2F6B12] leading-relaxed">
              <strong className="block font-bold mb-0.5">Front Office Source Integrity Check:</strong>
              When scheduled patients reach this roster from Master Admin or Sales, their source is displayed as{' '}
              <strong className="underline">Source: Acquire OPD</strong>. It is not replaced by Google, Instagram, Walk-in, Referral, Billboard, or Relatives/Friend. 
              Editing the appointment time or doctor also preserves this source.
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search scheduled patients by name, mobile, MRN, or source..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 w-full sm:w-auto"
              >
                <option value="ALL">All Doctors</option>
                {HOSPITAL_DOCTORS.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Scheduled Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800">
                Front Office Scheduled Patient Roster ({filteredScheduled.length})
              </h3>
              <span className="text-xs text-[#579B35] font-bold">
                ✓ Original Source Display Enforced
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100/60 text-xs text-gray-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Patient / MRN</th>
                    <th className="py-3 px-4">Condition & Doctor</th>
                    <th className="py-3 px-4">Scheduled Slot</th>
                    <th className="py-3 px-4">
                      <div className="flex items-center gap-1 text-[#2F6B12]">
                        <span>Front Office Source</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Scheduled By</th>
                    <th className="py-3 px-4 text-right">Front Office Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredScheduled.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400">
                        No scheduled appointments found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredScheduled.map((p) => {
                      const isAcquireOpd = p.source === 'Acquire OPD';

                      return (
                        <tr key={p.id} className="hover:bg-green-50/30 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#252525]">{p.fullName}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                {p.mrn}
                              </span>
                              <span>•</span>
                              <span>+91 {p.mobileNumber}</span>
                              <span>•</span>
                              <span>{p.age}y / {p.gender[0]}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-medium text-gray-900">{p.condition}</div>
                            <div className="text-xs text-[#5D367F] font-semibold">{p.doctor}</div>
                          </td>

                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-semibold text-gray-800 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{p.appointmentDate}</span>
                              <Clock className="w-3 h-3 text-gray-400 ml-1" />
                              <span>{p.appointmentTime}</span>
                            </div>
                            <div className="text-gray-400 truncate max-w-[180px]">{p.hospitalBranch.split(',')[0]}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            {/* REQUIRED DISPLAY: Source: Acquire OPD */}
                            {isAcquireOpd ? (
                              <div className="space-y-0.5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#EAF4E5] text-[#2F6B12] border border-[#BDE0AC] shadow-xs">
                                  <span className="w-2 h-2 rounded-full bg-[#579B35]" />
                                  Source: Acquire OPD
                                </span>
                                <div className="text-[10px] text-gray-400">
                                  Not replaced • Protected
                                </div>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                Source: {p.source}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-bold text-gray-800">
                              {p.bookedByRole === 'master_admin' ? (
                                <span className="text-[#5D367F]">Master Admin</span>
                              ) : p.bookedByRole === 'sales' ? (
                                <span className="text-blue-700">Sales Dashboard</span>
                              ) : (
                                <span className="text-gray-600">Front Office Desk</span>
                              )}
                            </div>
                            <div className="text-gray-400 text-[11px]">{p.bookedByName}</div>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              {/* Edit details button - preserves source */}
                              <button
                                type="button"
                                onClick={() => openEditModal(p)}
                                title="Edit Date/Doctor/Notes (Source stays Acquire OPD)"
                                className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              {/* Proceed to Registration */}
                              <button
                                type="button"
                                onClick={() => startRegistrationForPatient(p)}
                                className="px-3 py-1.5 rounded-lg bg-[#579B35] hover:bg-[#467e2a] text-white text-xs font-extrabold flex items-center gap-1 shadow-xs active:scale-95 cursor-pointer transition-all"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Register Patient</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PATIENT REGISTRATION FORM */}
      {activeSubTab === 'registration' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="bg-[#173812] px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#579B35]" />
              <h3 className="text-base font-extrabold tracking-wide uppercase">
                {selectedPatientForReg
                  ? `Patient Registration: ${selectedPatientForReg.fullName} (${selectedPatientForReg.mrn})`
                  : 'Direct Reception Patient Registration'}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setActiveSubTab('roster')}
              className="text-xs text-green-200 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Scheduled Roster</span>
            </button>
          </div>

          <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-5">
            {/* Key Rule Verification Banner */}
            {selectedPatientForReg ? (
              <div className="p-4 bg-[#EAF4E5] border border-[#BDE0AC] rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#579B35] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#2F6B12]">
                  <strong className="block font-bold">Front Office Reads Saved Source (No Overwrite):</strong>
                  This patient was scheduled via <strong className="uppercase">{selectedPatientForReg.bookedByRole.replace('_', ' ')}</strong>.
                  Front Office reads the saved source as <strong className="underline font-bold text-[#173812]">Source: {selectedPatientForReg.source}</strong>. 
                  This value is locked and cannot be replaced with Google, Instagram, Walk-in, Referral, Billboard, or Relatives/Friend.
                </div>
              </div>
            ) : (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-xs text-[#5D367F]">
                <strong>Direct Walk-in Patient Registration:</strong> For direct walk-ins who did not book through Master Admin or Sales, 
                Front Office may select the appropriate source from the standard dropdown below.
              </div>
            )}

            {/* Source Display / Selection Row */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Patient Source *</span>
                {selectedPatientForReg && (
                  <span className="text-[11px] font-bold text-[#579B35] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Locked: Inherited from {selectedPatientForReg.bookedByRole.replace('_', ' ')}
                  </span>
                )}
              </label>

              {selectedPatientForReg ? (
                /* Scheduled patient: Source is strictly locked to original value */
                <div className="flex items-center justify-between px-4 py-3 rounded-xl border-2 border-[#BDE0AC] bg-[#F5FBF2] text-[#2F6B12] font-black text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#579B35]" />
                    <span>Source: {selectedPatientForReg.source}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    (Original Source Preserved — Front Office Read-Only)
                  </span>
                </div>
              ) : (
                /* Direct reception walk-in: Front Office can choose from standard sources */
                <select
                  value={regSource}
                  onChange={(e) => setRegSource(e.target.value as PatientSource)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-hidden focus:border-[#579B35]"
                >
                  {FRONT_OFFICE_SOURCE_OPTIONS.map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Demographics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 text-xs font-bold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={regGender}
                    onChange={(e) => setRegGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Clinical & Doctor Assignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Condition / Specialty *
                </label>
                <select
                  value={regCondition}
                  onChange={(e) => setRegCondition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                >
                  <option value="Uterine Fibroids Evaluation">Uterine Fibroids Evaluation</option>
                  <option value="Endometriosis Pain Care">Endometriosis Pain Care</option>
                  <option value="Piles & Anorectal Care">Piles Treatment</option>
                  <option value="Gallstone Laparoscopic Care">Gallstone Treatment</option>
                  <option value="Hernia Advanced Mesh Repair">Hernia Repair</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Consulting Doctor *
                </label>
                <select
                  value={regDoctor}
                  onChange={(e) => setRegDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                >
                  {HOSPITAL_DOCTORS.map((d) => (
                    <option key={d.name} value={d.name}>{d.name} ({d.speciality})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vitals Recording (Front Office Intake) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#579B35]" />
                <span>Front Office Triage & Vitals (Optional)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 font-medium">Blood Pressure</label>
                  <input
                    type="text"
                    value={regBp}
                    onChange={(e) => setRegBp(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 font-medium">Pulse Rate</label>
                  <input
                    type="text"
                    value={regPulse}
                    onChange={(e) => setRegPulse(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 font-medium">Temperature</label>
                  <input
                    type="text"
                    value={regTemp}
                    onChange={(e) => setRegTemp(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 font-medium">Weight</label>
                  <input
                    type="text"
                    value={regWeight}
                    onChange={(e) => setRegWeight(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Admission / Triage Notes
              </label>
              <textarea
                rows={2}
                value={regNotes}
                onChange={(e) => setRegNotes(e.target.value)}
                placeholder="Patient arrived with scans and ultrasound reports..."
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveSubTab('roster')}
                className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Complete Registration & Issue OPD Token
                  {selectedPatientForReg ? ` (Source: ${selectedPatientForReg.source})` : ''}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 3: OPD REGISTRY */}
      {activeSubTab === 'opd_registry' && (
        <div className="space-y-4 animate-in fade-in">
          {/* OPD Registry Notice */}
          <div className="bg-[#EAF4E5] border border-[#BDE0AC] p-4 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#2F6B12]">
              <strong className="block font-bold">End-to-End Pipeline Verification:</strong>
              When the record moves through: <strong>Master Admin/Sales → Scheduled → Front Office Scheduled Roster → Patient Registration → OPD Registry</strong>, 
              the source value <strong className="underline">remains attached as Acquire OPD</strong>.
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search OPD queue by name, token, MRN, or source..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
              />
            </div>
          </div>

          {/* OPD Registry Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800">
                Active OPD Registry Today ({filteredOpdRegistry.length})
              </h3>
              <span className="text-xs text-gray-500">
                Live Queue & Consultation Workflow
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100/60 text-xs text-gray-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Token & Patient</th>
                    <th className="py-3 px-4">Doctor & Condition</th>
                    <th className="py-3 px-4 text-[#2F6B12]">
                      <div className="flex items-center gap-1">
                        <span>Original Source</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Origin Flow</th>
                    <th className="py-3 px-4">Queue Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOpdRegistry.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400">
                        No registered patients in OPD queue yet. Register a patient from the Scheduled Roster.
                      </td>
                    </tr>
                  ) : (
                    filteredOpdRegistry.map((p) => {
                      const isAcquireOpd = p.source === 'Acquire OPD';

                      return (
                        <tr key={p.id} className="hover:bg-purple-50/20 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black bg-[#579B35] text-white px-2 py-1 rounded-lg">
                                {p.opdToken || 'OPD-01'}
                              </span>
                              <div>
                                <div className="font-bold text-[#252525]">{p.fullName}</div>
                                <div className="text-[11px] text-gray-400">
                                  {p.mrn} • +91 {p.mobileNumber}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-gray-900">{p.doctor}</div>
                            <div className="text-xs text-gray-500">{p.condition}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            {/* Original Source must still display as Acquire OPD */}
                            {isAcquireOpd ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#EAF4E5] text-[#2F6B12] border border-[#BDE0AC] shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-[#579B35]" />
                                Source: Acquire OPD
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                Source: {p.source}
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-xs">
                            <div className="font-bold text-gray-800">
                              {p.bookedByRole === 'master_admin' ? (
                                <span className="text-[#5D367F]">Master Admin → Scheduled</span>
                              ) : p.bookedByRole === 'sales' ? (
                                <span className="text-blue-700">Sales → Scheduled</span>
                              ) : (
                                <span className="text-gray-600">Front Office Walk-in</span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#579B35] font-semibold">
                              → Front Office → Registered
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={p.status}
                              onChange={(e) => handleUpdateOpdStatus(p.id, e.target.value as AppointmentStatus)}
                              className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-colors cursor-pointer ${
                                p.status === 'registered' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                p.status === 'in_consultation' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                'bg-green-50 text-green-800 border-green-200'
                              }`}
                            >
                              <option value="registered">Registered (Waiting)</option>
                              <option value="in_consultation">In Consultation</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {onOpenAuditForPatient && (
                              <button
                                type="button"
                                onClick={() => onOpenAuditForPatient(p)}
                                title="Audit Data Flow in Supabase"
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-[#5D367F] hover:text-white transition-colors cursor-pointer"
                              >
                                View Audit Trail
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR FRONT OFFICE */}
      {isEditModalOpen && selectedPatientForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#173812] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-base font-extrabold tracking-wide uppercase">
                  Front Office: Edit Appointment
                </h3>
                <p className="text-xs text-green-200">
                  Patient: {selectedPatientForEdit.fullName} • MRN: {selectedPatientForEdit.mrn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 overflow-y-auto">
              {/* Preserved Source Callout */}
              <div className="p-3.5 bg-[#EAF4E5] border border-[#BDE0AC] rounded-xl text-xs text-[#2F6B12]">
                <strong className="block font-bold">Rule: Source Cannot Be Overwritten:</strong>
                Editing appointment date, time, doctor, hospital, status, or notes preserves{' '}
                <strong className="underline">Source: {selectedPatientForEdit.source}</strong> untouched.
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Source (Read-Only)
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-gray-100 text-gray-800 font-black text-sm border border-gray-200 flex items-center justify-between">
                  <span>Source: {selectedPatientForEdit.source}</span>
                  <span className="text-[11px] text-[#579B35] font-bold">Immutable</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Doctor
                </label>
                <select
                  value={editDoctor}
                  onChange={(e) => setEditDoctor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                >
                  {HOSPITAL_DOCTORS.map((d) => (
                    <option key={d.name} value={d.name}>{d.name} ({d.speciality})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hospital Branch
                </label>
                <select
                  value={editBranch}
                  onChange={(e) => setEditBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                >
                  {HOSPITAL_BRANCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#579B35]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm shadow-md cursor-pointer"
                >
                  Save Changes (Retaining Source: {selectedPatientForEdit.source})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
