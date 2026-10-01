import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Plus, Search, Calendar, Clock, User, Phone, CheckCircle2, 
  ShieldCheck, ArrowRight, Target, AlertCircle, Sparkles, Filter 
} from 'lucide-react';
import { PatientRecord } from '../../types/hospital';
import { hospitalService, HOSPITAL_BRANCHES, HOSPITAL_DOCTORS } from '../../services/hospitalService';

interface SalesDashboardProps {
  onNavigateToFrontOffice?: () => void;
  onOpenAuditForPatient?: (patient: PatientRecord) => void;
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  onNavigateToFrontOffice,
  onOpenAuditForPatient,
}) => {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sales Booking Form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('29');
  const [gender, setGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [condition, setCondition] = useState('Endometriosis Pain Care');
  const [doctor, setDoctor] = useState(HOSPITAL_DOCTORS[2].name); // Dr. Priya Sharma
  const [hospitalBranch, setHospitalBranch] = useState(HOSPITAL_BRANCHES[2]);
  const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [appointmentTime, setAppointmentTime] = useState('11:30 AM');
  const [leadNotes, setLeadNotes] = useState('');
  const [salesAgentName, setSalesAgentName] = useState('Vikram (Outbound Sales Desk)');

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

  const handleSalesSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) return;

    // CORE RULE: Whenever a patient is scheduled or booked by Sales Dashboard,
    // the source must ALWAYS be saved as "Acquire OPD".
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
      notes: `[Sales Lead]: ${leadNotes}`,
      bookedByRole: 'sales',
      bookedByName: salesAgentName,
    });

    setIsScheduleModalOpen(false);
    showToast(`✓ Sales Booking Confirmed! ${fullName} scheduled with Source: "Acquire OPD".`);

    // Reset form
    setFullName('');
    setMobileNumber('');
    setLeadNotes('');
  };

  const salesBookings = patients.filter((p) => p.bookedByRole === 'sales');
  const acquireOpdSalesBookings = salesBookings.filter((p) => p.source === 'Acquire OPD');

  const filteredSalesList = salesBookings.filter((p) => {
    return (
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobileNumber.includes(searchTerm) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1F162B] text-white border-2 border-[#579B35] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#201633] via-[#352055] to-[#201633] text-white p-5 sm:p-6 rounded-2xl shadow-md border border-purple-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#579B35]" />
            <span>Sales & Patient Outreach Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Sales Dashboard: Schedule Patient
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl mt-1">
            Convert prospective patient leads into confirmed OPD consultations. In compliance with hospital policy, 
            every appointment booked here is <strong className="text-white underline">always saved as Acquire OPD</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleModalOpen(true)}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm tracking-wide transition-all shadow-lg active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>+ SCHEDULE PATIENT (SALES)</span>
        </button>
      </div>

      {/* Sales KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Sales Bookings</div>
          <div className="text-2xl font-black text-[#5D367F] mt-1">{salesBookings.length}</div>
          <div className="text-[11px] text-gray-400 mt-1">Total leads converted</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-green-200 shadow-xs bg-green-50/20">
          <div className="text-xs text-[#579B35] font-bold uppercase">Acquire OPD Compliance</div>
          <div className="text-2xl font-black text-[#579B35] mt-1">
            {salesBookings.length > 0
              ? `${Math.round((acquireOpdSalesBookings.length / salesBookings.length) * 100)}%`
              : '100%'}
          </div>
          <div className="text-[11px] text-green-700 mt-1">
            {acquireOpdSalesBookings.length} of {salesBookings.length} = Acquire OPD
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Front Office Received</div>
          <div className="text-2xl font-black text-gray-800 mt-1">
            {salesBookings.filter((p) => p.status === 'scheduled' || p.status === 'registered').length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">In Front Office roster</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs">
          <div className="text-xs text-gray-500 font-semibold uppercase">Consultation Conversion</div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {salesBookings.filter((p) => p.status === 'in_consultation' || p.status === 'completed').length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Admitted to OPD registry</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sales appointments by patient name, phone, MRN..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
          />
        </div>

        {onNavigateToFrontOffice && (
          <button
            type="button"
            onClick={onNavigateToFrontOffice}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-50 text-[#5D367F] hover:bg-purple-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Track in Front Office Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Sales Scheduled Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800">
            Appointments Scheduled by Sales ({filteredSalesList.length})
          </h3>
          <span className="text-xs text-gray-500">
            All records permanently maintain Source: Acquire OPD
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100/60 text-xs text-gray-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Patient / MRN</th>
                <th className="py-3 px-4">Condition & Doctor</th>
                <th className="py-3 px-4">Slot</th>
                <th className="py-3 px-4 text-[#5D367F]">
                  <div className="flex items-center gap-1">
                    <span>Source</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#579B35]" />
                  </div>
                </th>
                <th className="py-3 px-4">Sales Agent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSalesList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No sales bookings found. Click "+ SCHEDULE PATIENT (SALES)" to book a patient.
                  </td>
                </tr>
              ) : (
                filteredSalesList.map((p) => (
                  <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#252525]">{p.fullName}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          {p.mrn}
                        </span>
                        <span>•</span>
                        <span>+91 {p.mobileNumber}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{p.condition}</div>
                      <div className="text-xs text-[#5D367F] font-semibold">{p.doctor}</div>
                    </td>

                    <td className="py-3.5 px-4 text-xs font-semibold text-gray-800">
                      <div>{p.appointmentDate}</div>
                      <div className="text-gray-500 font-normal">{p.appointmentTime}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-[#EAF4E5] text-[#2F6B12] border border-[#BDE0AC] shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-[#579B35]" />
                        Source: {p.source}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-bold text-gray-800">{p.bookedByName}</div>
                      <div className="text-gray-400 text-[11px]">Sales Team</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        p.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                        p.status === 'registered' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {onOpenAuditForPatient && (
                        <button
                          type="button"
                          onClick={() => onOpenAuditForPatient(p)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-[#5D367F] hover:text-white transition-colors cursor-pointer"
                        >
                          Audit Source Flow
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SALES SCHEDULE MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            <div className="bg-[#1F162B] px-6 py-4 text-white flex items-center justify-between flex-shrink-0 border-b border-purple-900/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#579B35]" />
                <h3 className="text-base font-extrabold tracking-wide uppercase">
                  Sales Dashboard: Schedule Patient
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-base">✕</span>
              </button>
            </div>

            <form onSubmit={handleSalesSchedule} className="p-6 overflow-y-auto space-y-4">
              {/* Mandatory Policy Banner */}
              <div className="p-3.5 bg-[#EAF4E5] border border-[#BDE0AC] rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#579B35] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#2F6B12]">
                  <strong className="block font-bold">Sales Source Rule:</strong>
                  Whenever a patient is scheduled by Sales Dashboard, the source is <strong>automatically and permanently saved as Acquire OPD</strong>.
                </div>
              </div>

              {/* Source Field: Automatically set to Acquire OPD */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Source * (Auto-Enforced)
                </label>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#BDE0AC] bg-[#F5FBF2] text-[#2F6B12] font-black text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#579B35]" />
                    Acquire OPD
                  </span>
                  <span className="text-[11px] font-bold text-[#579B35] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#BDE0AC]">
                    Locked for Sales Bookings
                  </span>
                </div>
              </div>

              {/* Sales Agent Identification */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Sales Representative *
                </label>
                <select
                  value={salesAgentName}
                  onChange={(e) => setSalesAgentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                >
                  <option value="Vikram (Outbound Sales Desk)">Vikram (Outbound Sales Desk)</option>
                  <option value="Sneha (Inbound Lead Qualification)">Sneha (Inbound Lead Qualification)</option>
                  <option value="Karthik (Corporate Health Desk)">Karthik (Corporate Health Desk)</option>
                </select>
              </div>

              {/* Patient Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shalini Nair"
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
                    Condition Required
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
                    Preferred Time Slot *
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                  >
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>01:00 PM</option>
                    <option>03:30 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Lead Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Sales Discussion Notes
                </label>
                <textarea
                  rows={2}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Patient expressed urgency, needs laparoscopic specialist evaluation..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-[#7B4FA3]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#579B35] hover:bg-[#467e2a] text-white font-extrabold text-sm shadow-md active:scale-95 cursor-pointer"
                >
                  Confirm & Schedule (Source: Acquire OPD)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
