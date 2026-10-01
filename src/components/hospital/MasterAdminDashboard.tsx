import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, Calendar, Clock, User, Phone, CheckCircle2, 
  ShieldCheck, AlertCircle, Edit3, X, Eye, FileText, ArrowRight, RefreshCw 
} from 'lucide-react';
import { PatientRecord } from '../../types/hospital';
import { hospitalService, HOSPITAL_BRANCHES, HOSPITAL_DOCTORS } from '../../services/hospitalService';

interface MasterAdminDashboardProps {
  onNavigateToFrontOffice?: () => void;
  onOpenAuditForPatient?: (patient: PatientRecord) => void;
}

export const MasterAdminDashboard: React.FC<MasterAdminDashboardProps> = ({
  onNavigateToFrontOffice,
  onOpenAuditForPatient,
}) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modal states
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<PatientRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Booking Form fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('35');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [condition, setCondition] = useState('Uterine Fibroids Evaluation');
  const [doctor, setDoctor] = useState(HOSPITAL_DOCTORS[0].name);
  const [hospitalBranch, setHospitalBranch] = useState(HOSPITAL_BRANCHES[0]);
  const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  // Edit Form fields
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDoctor, setEditDoctor] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Load patients and subscribe to updates
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

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) return;

    // RULE: Master Admin booking ALWAYS saves source as "Acquire OPD"
    const newRecord = hospitalService.schedulePatient({
      fullName,
      mobileNumber,
      age: Number(age) || 30,
      gender,
      condition,
      doctor,
      hospitalBranch,
      appointmentDate,
      appointmentTime,
      notes,
      bookedByRole: 'master_admin',
      bookedByName: 'Master Admin (Central Ops)',
    });

    setIsBookModalOpen(false);
    showToast(`✓ Patient ${fullName} scheduled successfully. Source permanently saved as "Acquire OPD".`);

    // Reset fields
    setFullName('');
    setMobileNumber('');
    setNotes('');
  };

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

    // RULE: Editing appointment date, time, doctor, hospital, notes MUST NOT change source
    hospitalService.updateAppointmentDetails(selectedPatientForEdit.id, {
      appointmentDate: editDate,
      appointmentTime: editTime,
      doctor: editDoctor,
      hospitalBranch: editBranch,
      notes: editNotes,
      actorRole: 'master_admin',
      actorName: 'Master Admin (Editor)',
    });

    setIsEditModalOpen(false);
    showToast(`✓ Appointment updated. Source strictly preserved as "${selectedPatientForEdit.source}".`);
  };

  // Filter patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobileNumber.includes(searchTerm) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDoctor = filterDoctor === 'ALL' || p.doctor === filterDoctor;
    const matchesStatus = filterStatus === 'ALL' || p.status === filterStatus;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const acquireOpdCount = patients.filter((p) => p.source === 'Acquire OPD').length;
  const masterAdminBookedCount = patients.filter((p) => p.bookedByRole === 'master_admin').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1F162B] text-white border-2 border-[#579B35] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Role Notice */}
      <div className="bg-gradient-to-r from-[#5D367F] via-[#7B4FA3] to-[#5D367F] text-white p-5 sm:p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
            <span>Master Admin Control Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Central Patient Booking & Scheduling
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 max-w-2xl mt-1">
            Book appointments across departments. Every booking initiated by Master Admin is 
            automatically and immutably assigned the source <span className="font-bold underline text-white">Acquire OPD</span> across Supabase and all dashboards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsBookModalOpen(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>SCHEDULE / BOOK PATIENT</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Total Patients</div>
          <div className="text-2xl font-black text-[#252525] mt-1">{patients.length}</div>
          <div className="text-[11px] text-gray-400 mt-1">Hospital wide database</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-xs bg-purple-50/20">
          <div className="text-xs text-[#5D367F] font-bold uppercase">Master Admin Bookings</div>
          <div className="text-2xl font-black text-[#5D367F] mt-1">{masterAdminBookedCount}</div>
          <div className="text-[11px] text-purple-600 mt-1">Source = Acquire OPD</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-green-200 shadow-xs bg-green-50/20">
          <div className="text-xs text-[#579B35] font-bold uppercase">Acquire OPD Total</div>
          <div className="text-2xl font-black text-[#579B35] mt-1">{acquireOpdCount}</div>
          <div className="text-[11px] text-green-700 mt-1">Preserved across all roles</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Scheduled Today</div>
          <div className="text-2xl font-black text-gray-800 mt-1">
            {patients.filter((p) => p.appointmentDate === new Date().toISOString().split('T')[0]).length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Active appointment slots</div>
        </div>
      </div>

      {/* Search, Filter & Quick Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, mobile, MRN, or source (e.g. Acquire OPD)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3] focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50"
            >
              <option value="ALL">All Doctors</option>
              {HOSPITAL_DOCTORS.map((d) => (
                <option key={d.name} value={d.name}>{d.name}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50"
            >
              <option value="ALL">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="registered">Registered</option>
              <option value="in_consultation">In Consultation</option>
              <option value="completed">Completed</option>
            </select>

            {onNavigateToFrontOffice && (
              <button
                type="button"
                onClick={onNavigateToFrontOffice}
                className="px-4 py-2.5 rounded-xl bg-purple-50 text-[#5D367F] hover:bg-purple-100 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>View in Front Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <span>Scheduled Appointments Roster ({filteredPatients.length})</span>
          </h3>
          <span className="text-xs text-gray-500">
            Rule: Master Admin/Sales Bookings → Source = Acquire OPD
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100/60 text-xs text-gray-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Patient / MRN</th>
                <th className="py-3 px-4">Condition & Doctor</th>
                <th className="py-3 px-4">Branch & Slot</th>
                <th className="py-3 px-4">
                  <div className="flex items-center gap-1 text-[#5D367F]">
                    <span>Source</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
                  </div>
                </th>
                <th className="py-3 px-4">Booked By</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No matching patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
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
                      <div className="font-semibold text-gray-800 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{p.appointmentDate}</span>
                        <Clock className="w-3.5 h-3.5 text-gray-400 ml-1" />
                        <span>{p.appointmentTime}</span>
                      </div>
                      <div className="text-gray-500 truncate max-w-[200px] mt-0.5">
                        {p.hospitalBranch.split(',')[1] || p.hospitalBranch}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.source === 'Acquire OPD' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-[#EAF4E5] text-[#2F6B12] border border-[#BDE0AC] shadow-xs">
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
                      <div className="font-semibold text-gray-800">
                        {p.bookedByRole === 'master_admin' ? (
                          <span className="text-[#5D367F] font-bold">Master Admin</span>
                        ) : p.bookedByRole === 'sales' ? (
                          <span className="text-blue-700 font-bold">Sales Dashboard</span>
                        ) : (
                          <span className="text-gray-600">Front Office Desk</span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400">{p.bookedByName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        p.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                        p.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                        p.status === 'in_consultation' ? 'bg-amber-100 text-amber-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          title="Edit Appointment Details (Source stays Acquire OPD)"
                          className="p-1.5 text-gray-600 hover:text-[#5D367F] hover:bg-purple-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {onOpenAuditForPatient && (
                          <button
                            type="button"
                            onClick={() => onOpenAuditForPatient(p)}
                            title="Audit Complete Data Flow in Supabase"
                            className="p-1.5 text-gray-600 hover:text-[#579B35] hover:bg-green-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCHEDULE / BOOK MODAL (Master Admin) */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="bg-[#5D367F] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#579B35]" />
                <h3 className="text-base font-extrabold tracking-wide uppercase">
                  Master Admin: Schedule & Book Patient
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <form onSubmit={handleBookSubmit} className="p-6 overflow-y-auto space-y-4">
              {/* Mandatory Source Rule Notice Banner */}
              <div className="p-3.5 bg-[#EAF4E5] border border-[#BDE0AC] rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#2F6B12]">
                  <strong className="block font-bold">Mandatory Source Rule Enforced:</strong>
                  Every patient scheduled or booked by Master Admin is automatically and permanently tagged as{' '}
                  <strong className="underline">Source: Acquire OPD</strong> in Supabase and throughout the hospital pipeline.
                </div>
              </div>

              {/* Source Field: Locked to Acquire OPD */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Patient Source * (Locked Policy)
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#BDE0AC] bg-[#F5FBF2] text-[#2F6B12] font-black text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#579B35]" />
                    Acquire OPD
                  </span>
                  <span className="text-[11px] font-bold text-[#579B35] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#BDE0AC]">
                    Locked by Master Admin
                  </span>
                </div>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Geeta Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
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
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                    />
                  </div>
                </div>
              </div>

              {/* Age, Gender & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Clinical Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    <option value="Uterine Fibroids Evaluation">Uterine Fibroids</option>
                    <option value="Endometriosis Pain Care">Endometriosis</option>
                    <option value="Piles & Anorectal Care">Piles Treatment</option>
                    <option value="Gallstone Laparoscopic Care">Gallstone Treatment</option>
                    <option value="Hernia Advanced Mesh Repair">Hernia Repair</option>
                  </select>
                </div>
              </div>

              {/* Doctor & Hospital Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Consulting Doctor *
                  </label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    {HOSPITAL_DOCTORS.map((d) => (
                      <option key={d.name} value={d.name}>{d.name} ({d.speciality})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Hospital Branch *
                  </label>
                  <select
                    value={hospitalBranch}
                    onChange={(e) => setHospitalBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    {HOSPITAL_BRANCHES.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Appointment Slot *
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:15 AM</option>
                    <option>12:00 PM</option>
                    <option>02:30 PM</option>
                    <option>04:00 PM</option>
                    <option>05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Clinical / Admission Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes for Front Office & Doctor..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm shadow-md active:scale-95 cursor-pointer"
                >
                  Confirm & Save with Source: Acquire OPD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Master Admin) - Verifies source remains unchanged */}
      {isEditModalOpen && selectedPatientForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="bg-[#5D367F] px-6 py-4 text-white flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-base font-extrabold tracking-wide uppercase">
                  Edit Appointment: {selectedPatientForEdit.fullName}
                </h3>
                <p className="text-xs text-purple-200">
                  MRN: {selectedPatientForEdit.mrn} • Original Source: <strong className="text-white underline">{selectedPatientForEdit.source}</strong>
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
              {/* Source preservation highlight */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <strong>Immutable Source Rule:</strong> Editing appointment date, time, doctor, hospital branch, or notes 
                <span className="font-bold underline"> does NOT alter</span> the patient's source ({selectedPatientForEdit.source}).
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Source Status
                </label>
                <div className="px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm border border-gray-200">
                  {selectedPatientForEdit.source} (Locked & Preserved)
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                >
                  {HOSPITAL_BRANCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Updated Notes
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
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
                  className="px-6 py-2.5 rounded-xl bg-[#7B4FA3] hover:bg-[#5D367F] text-white font-extrabold text-sm shadow-md cursor-pointer"
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
