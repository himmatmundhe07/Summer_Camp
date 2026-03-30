import React, { useState } from 'react';
import MobileTabBar from '../../components/admin/MobileTabBar';
import DesktopSidebar from '../../components/admin/DesktopSidebar';
import StatsGrid from '../../components/admin/StatsGrid';
import RegistrationList from '../../components/admin/RegistrationList';
import RegistrationTable from '../../components/admin/RegistrationTable';
import DetailPanel from '../../components/admin/DetailPanel';
import AttendanceTracker from '../../components/admin/AttendanceTracker';
import { useNavigate } from 'react-router-dom';
import { Download, Search, Filter, Activity } from 'lucide-react';
import toast from 'react-hot-toast';



import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReg, setSelectedReg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [campFilter, setCampFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    let subscription = null;

    const fetchRegistrations = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const fetchAll = async () => {
        const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
        if (error) {
          toast.error("Error fetching data!");
        } else if (data) {
          const mappedData = data.map(row => ({
            id: row.id,
            name: row.student_name,
            gender: row.gender,
            age: row.age,
            class: row.class_name,
            mobile: row.parent_mobile,
            campType: row.camp_type,
            amount: row.amount,
            status: row.status,
            date: new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            time: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            address: row.address,
            adminNotes: row.admin_notes || '',
            emergencyContact: row.emergency_contact || '',
            attendance: row.attendance_data || {},
          }));
          
          const dataWithSiblings = mappedData.map(reg => {
            const siblingsList = mappedData.filter(r => r.mobile === reg.mobile && r.id !== reg.id);
            return {
               ...reg,
               siblings: siblingsList.map(s => s.name)
            };
          });

          setRegistrations(dataWithSiblings);
        }
      };

      await fetchAll();

      // Fix: Realtime subscription for race conditions
      subscription = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
          fetchAll(); 
        })
        .subscribe();

      // Fetch Audit Logs
      const { data: logsData } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(50);
      if (logsData) {
        setAuditLogs(logsData);
      }
    };
    
    fetchRegistrations();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [navigate]);

  const handleTabChange = async (tab) => {
    if (tab === 'logout') {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } else {
      setActiveTab(tab);
      window.scrollTo(0, 0);
    }
  };

  const logAction = async (actionType, camperName, details) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const adminEmail = session?.user?.email || 'Unknown Admin';
      const newLog = {
        admin_email: adminEmail,
        action: actionType,
        camper_name: camperName,
        details: details,
      };
      
      const { error } = await supabase.from('audit_logs').insert([newLog]);
      if (!error) {
         setAuditLogs(prev => [{ ...newLog, created_at: new Date().toISOString() }, ...prev]);
      }
    } catch (err) {
      console.error("Failed to log action", err);
    }
  };

  const updateAdminNotes = async (id, notes) => {
    const { error } = await supabase.from('registrations').update({ admin_notes: notes }).eq('id', id);
    if (error) { toast.error("Failed to save note. Check if your database column exists."); return; }
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, adminNotes: notes } : reg));
    const targetReg = registrations.find(r => r.id === id);
    setSelectedReg(prev => prev && prev.id === id ? { ...prev, adminNotes: notes } : prev);
    logAction('UPDATE_NOTE', targetReg?.name || 'Unknown', 'Updated internal admin notes');
    toast.success("Admin note saved!");
  };

  const updateCamperDetails = async (id, updatedData) => {
    const dbUpdate = {
      student_name: updatedData.name,
      gender: updatedData.gender,
      age: updatedData.age,
      class_name: updatedData.class,
      parent_mobile: updatedData.mobile,
      emergency_contact: updatedData.emergencyContact,
      camp_type: updatedData.campType,
      address: updatedData.address
    };
    const { error } = await supabase.from('registrations').update(dbUpdate).eq('id', id);
    if (error) { toast.error("Database blocked the update!"); return; }
    
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, ...updatedData } : reg));
    const targetReg = registrations.find(r => r.id === id);
    setSelectedReg(prev => prev && prev.id === id ? { ...prev, ...updatedData } : prev);
    logAction('UPDATE_DETAILS', updatedData.name, 'Edited core camper profile details');
    toast.success("Camper details updated!");
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('registrations').update({ status: newStatus }).eq('id', id);
    if (error) {
      toast.error("Failed to update status!");
      return;
    }
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg));
    const targetReg = registrations.find(r => r.id === id);
    setSelectedReg(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
    logAction('STATUS_CHANGE', targetReg?.name || 'Unknown', `Marked payment status as ${newStatus}`);
    toast.success(`Status updated to ${newStatus}`);
  };

  const deleteRegistration = async (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    
    if (error) {
      toast.error("Database blocked the deletion. Did you add the Delete policy?");
      console.error(error);
      return;
    }
    
    const targetReg = registrations.find(r => r.id === id);
    logAction('DELETE_RECORD', targetReg?.name || 'Unknown', 'Completely erased camper from system');

    setRegistrations(prev => prev.filter(reg => reg.id !== id));
    setSelectedReg(null);
    toast.success("Camper fully erased from system!");
  };

  const filteredData = registrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.mobile.includes(searchTerm);
    const matchesCamp = campFilter ? item.campType === campFilter : true;
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesGender = genderFilter ? item.gender === genderFilter : true;
    return matchesSearch && matchesCamp && matchesStatus && matchesGender;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setCampFilter('');
    setStatusFilter('');
    setGenderFilter('');
  };

  const exportCSV = () => {
    const esc = (val) => {
      const s = String(val ?? '');
      if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const headers = ['ID', 'Name', 'Gender', 'Age', 'Class', 'Mobile', 'Camp', 'Amount', 'Status', 'Date', 'Address', 'Siblings'];
    const rows = filteredData.map(d => [d.id, d.name, d.gender, d.age, d.class, d.mobile, d.campType, d.amount, d.status, d.date, d.address, (d.siblings || []).join(' / ')].map(esc));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "kalpana_camp_registrations.csv";
    link.click();
  };

  return (
    <div className="min-h-[100svh] bg-[var(--color-bg-light)] lg:pl-[240px] flex flex-col relative font-quicksand">
      <DesktopSidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      <main className="flex-1 w-full flex flex-col pt-8 lg:pt-12 pb-[100px] lg:pb-12 px-6 lg:px-12">
        
        {activeTab === 'overview' && (
          <div className="max-w-[1200px] mx-auto w-full">
            <h1 className="font-nunito font-black text-3xl lg:text-5xl text-[var(--color-text-main)] mb-10 tracking-tight">
              Dashboard Overview
            </h1>
            <StatsGrid stats={{ 
               total: registrations.length, 
               revenue: registrations.filter(r => r.status === 'Paid').reduce((sum, r) => sum + Number(r.amount || 0), 0), 
               pending: registrations.filter(r => r.status === 'Pending').reduce((sum, r) => sum + Number(r.amount || 0), 0),
               classOnly: registrations.filter(r => r.campType === 'class').length, 
               extended: registrations.filter(r => r.campType !== 'class').length 
            }} />

            <div className="flex flex-col lg:flex-row gap-6">
              
              <div className="flex-1 bg-white border-2 border-[var(--color-text-main)] rounded-2xl p-6 shadow-solid">
                <h2 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-6 flex justify-between items-center">
                  Live Activity Audit
                  <Activity className="w-5 h-5 text-[var(--color-primary)]" />
                </h2>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {auditLogs.length === 0 ? (
                    <p className="font-quicksand font-bold text-gray-400">No admin actions tracked yet...</p>
                  ) : auditLogs.map((log, i) => (
                    <div key={i} className="flex gap-4 items-start pb-4 border-b-2 border-dashed border-gray-200 last:border-0 last:pb-0">
                      <div className="mt-2 w-2 h-2 rounded-full ring-2 ring-[var(--color-text-main)] bg-[var(--color-primary)] shrink-0" />
                      <div>
                         <p className="font-nunito font-black text-sm text-[var(--color-text-main)] leading-snug">
                           <span className="text-[var(--color-primary)]">{log.admin_email.split('@')[0]}</span> did <span className="underline decoration-2 decoration-gray-300">{log.action.replace(/_/g, ' ')}</span> on <span className="font-normal">{log.camper_name}</span>
                         </p>
                         <p className="font-quicksand font-bold text-xs text-gray-500 mt-1">"{log.details}" • {new Date(log.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-[400px] flex flex-col gap-6">
                <div className="bg-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6">
                   <h2 className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-4">Quick Actions</h2>
                   <div className="space-y-3">
                     <button onClick={() => navigate('/register')} className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-quicksand font-bold text-sm hover:border-[var(--color-text-main)] hover:bg-[var(--color-bg-yellow)] transition-colors flex justify-between group">
                       <span className="text-[var(--color-text-main)] group-hover:text-black">Add Manual Entry</span> 
                       <span className="text-gray-300 group-hover:text-[var(--color-text-main)]">→</span>
                     </button>
                   </div>
                </div>

                <div className="bg-[var(--color-text-main)] text-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10" />
                   <h3 className="font-nunito font-black text-5xl mb-1 tracking-tighter">{Math.max(0, 100 - registrations.length)}</h3>
                   <p className="font-quicksand font-bold text-white/70 text-xs uppercase tracking-[0.2em]">Seats Remaining</p>
                   <div className="w-full h-2 bg-white/20 mt-5 rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--color-secondary)] rounded-full" style={{ width: `${Math.min(100, (registrations.length / 100) * 100)}%` }} />
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="max-w-[1200px] mx-auto w-full flex-1 flex flex-col min-h-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
              <h1 className="font-nunito font-black text-3xl lg:text-5xl text-[var(--color-text-main)] tracking-tight">
                Registrations
              </h1>
              <div className="flex gap-2">
                 <button onClick={exportCSV} className="h-10 px-4 bg-[var(--color-text-main)] text-white border-2 border-[var(--color-text-main)] rounded-xl font-nunito font-bold text-sm flex items-center gap-2 hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(45,55,72,0.3)] active:translate-y-0.5 transition-all">
                   <Download className="w-4 h-4" /> Export CSV
                 </button>
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-sm">
              
              <div className="relative w-full lg:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search adventurer or phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 font-quicksand font-bold text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              
              <div className="flex flex-wrap lg:flex-nowrap gap-3 lg:w-[auto]">
                <div className="relative w-[calc(50%-6px)] lg:w-[130px] h-10">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 z-10" />
                  <select value={campFilter} onChange={e=>setCampFilter(e.target.value)} className="absolute inset-0 w-full h-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-2 font-quicksand font-bold text-xs focus:outline-none focus:border-[var(--color-accent)] appearance-none cursor-pointer">
                    <option value="">All Camps</option>
                    <option value="class">Daily 3 Hours</option>
                    <option value="daycare">Day Care</option>
                    <option value="hostel">Hostel</option>
                  </select>
                </div>
                <div className="relative w-[calc(50%-6px)] lg:w-[120px] h-10">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 z-10" />
                  <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="absolute inset-0 w-full h-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-2 font-quicksand font-bold text-xs focus:outline-none focus:border-[var(--color-secondary)] appearance-none cursor-pointer">
                    <option value="">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="relative w-[calc(50%-6px)] lg:w-[110px] h-10">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3 z-10" />
                  <select value={genderFilter} onChange={e=>setGenderFilter(e.target.value)} className="absolute inset-0 w-full h-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-2 font-quicksand font-bold text-xs focus:outline-none focus:border-[var(--color-primary)] appearance-none cursor-pointer">
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <button onClick={clearFilters} className="w-[calc(50%-6px)] lg:w-[80px] h-10 text-xs font-bold text-gray-500 hover:text-red-500 bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                  Clear
                </button>
              </div>
            </div>

            {/* Desktop Table (Hidden on Mobile) */}
            <RegistrationTable data={filteredData} onRowClick={setSelectedReg} />

            {/* Mobile List (Hidden on Desktop) */}
            <div className="lg:hidden">
              <RegistrationList data={filteredData} onRowClick={setSelectedReg} />
            </div>

            <DetailPanel 
              isOpen={selectedReg !== null} 
              data={selectedReg} 
              onClose={() => setSelectedReg(null)} 
              onUpdateStatus={updateStatus}
              onDelete={deleteRegistration}
              onUpdateNotes={updateAdminNotes}
              onUpdateCamper={updateCamperDetails}
            />
          </div>
        )}

        {activeTab === 'attendance' && (
           <AttendanceTracker registrations={registrations} setRegistrations={setRegistrations} logAction={logAction} />
        )}

      </main>

      <MobileTabBar activeTab={activeTab} setActiveTab={handleTabChange} />

      {selectedReg && (
         <div 
           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
           onClick={() => setSelectedReg(null)}
         />
      )}

      {/* Custom Delete Confirmation Modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6" onClick={() => setPendingDeleteId(null)}>
          <div 
            className="bg-white rounded-3xl border-2 border-[var(--color-text-main)] shadow-[8px_8px_0px_0px_rgba(45,55,72,1)] p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-300">
              <span className="text-3xl">🗑️</span>
            </div>
            <h3 className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-2">Erase this camper?</h3>
            <p className="font-quicksand font-bold text-sm text-gray-500 mb-2">
              <span className="text-[var(--color-primary)] font-black">{registrations.find(r => r.id === pendingDeleteId)?.name}</span> will be permanently deleted.
            </p>
            <p className="font-quicksand font-bold text-xs text-red-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 h-12 rounded-xl font-nunito font-black border-2 border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 h-12 rounded-xl font-nunito font-black border-2 border-[var(--color-text-main)] bg-[#FF5E7E] text-white hover:bg-red-600 transition-colors shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] active:translate-y-1 active:shadow-none"
              >
                Yes, Erase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
