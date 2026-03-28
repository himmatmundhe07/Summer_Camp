import React, { useState } from 'react';
import MobileTabBar from '../../components/admin/MobileTabBar';
import DesktopSidebar from '../../components/admin/DesktopSidebar';
import StatsGrid from '../../components/admin/StatsGrid';
import RegistrationList from '../../components/admin/RegistrationList';
import RegistrationTable from '../../components/admin/RegistrationTable';
import DetailPanel from '../../components/admin/DetailPanel';
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
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchRegistrations = async () => {
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
          date: new Date(row.created_at).toLocaleDateString(),
          address: row.address,
        }));
        setRegistrations(mappedData);
      }
    };
    fetchRegistrations();
  }, []);

  const handleTabChange = async (tab) => {
    if (tab === 'logout') {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } else {
      setActiveTab(tab);
      window.scrollTo(0, 0);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('registrations').update({ status: newStatus }).eq('id', id);
    if (error) {
      toast.error("Failed to update status!");
      return;
    }
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg));
    setSelectedReg(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
    toast.success(`Status updated to ${newStatus}`);
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
    const headers = ['ID', 'Name', 'Gender', 'Age', 'Class', 'Mobile', 'Camp', 'Amount', 'Status', 'Date', 'Address'];
    const rows = filteredData.map(d => [d.id, d.name, d.gender, d.age, d.class, d.mobile, d.campType, d.amount, d.status, d.date, `"${d.address}"`]);
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
            <StatsGrid stats={{ total: 50, revenue: 25000, classOnly: 32, extended: 18 }} />

            <div className="flex flex-col lg:flex-row gap-6">
              
              <div className="flex-1 bg-white border-2 border-[var(--color-text-main)] rounded-2xl p-6 shadow-solid">
                <h2 className="font-nunito font-black text-2xl text-[var(--color-text-main)] mb-6 flex justify-between items-center">
                  Recent Activities
                  <Activity className="w-5 h-5 text-[var(--color-primary)]" />
                </h2>
                <div className="space-y-4">
                  {[
                    { action: 'New Registration', user: 'Aarav Patel', tag: 'Hostel', time: '10 mins ago', color: 'bg-green-100 text-green-700 ring-green-500' },
                    { action: 'Payment Failed', user: 'Neha Sharma', tag: 'Class Only', time: '1 hour ago', color: 'bg-red-100 text-red-700 ring-red-500' },
                    { action: 'New Registration', user: 'Viaan Shah', tag: 'Day Care', time: '2 hours ago', color: 'bg-green-100 text-green-700 ring-green-500' },
                    { action: 'Updated Info', user: 'John Doe', tag: 'System', time: '3 hours ago', color: 'bg-blue-100 text-blue-700 ring-blue-500' }
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start pb-4 border-b-2 border-dashed border-gray-200 last:border-0 last:pb-0">
                      <div className={`mt-2 w-2 h-2 rounded-full ring-2 ${act.color.split(' ').pop()}`} />
                      <div>
                         <p className="font-nunito font-black text-base text-[var(--color-text-main)]">{act.action}: <span className="font-quicksand font-bold font-normal">{act.user}</span></p>
                         <p className="font-quicksand font-bold text-xs text-gray-500 mt-0.5">{act.time} • <span className={`px-2 py-0.5 rounded text-[10px] ${act.color.split(' ').slice(0,2).join(' ')} uppercase`}>{act.tag}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-[400px] flex flex-col gap-6">
                <div className="bg-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6">
                   <h2 className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-4">Quick Actions</h2>
                   <div className="space-y-3">
                     <button onClick={() => toast.success("Manual Entry Form coming soon!")} className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-quicksand font-bold text-sm hover:border-[var(--color-text-main)] hover:bg-[var(--color-bg-yellow)] transition-colors flex justify-between group">
                       <span className="text-[var(--color-text-main)] group-hover:text-black">Add Manual Entry</span> 
                       <span className="text-gray-300 group-hover:text-[var(--color-text-main)]">→</span>
                     </button>
                     <button onClick={() => toast.success("Payment reminders sent to 4 parents via WhatsApp!")} className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-quicksand font-bold text-sm hover:border-[var(--color-text-main)] hover:bg-[var(--color-bg-blue)] transition-colors flex justify-between group">
                       <span className="text-[var(--color-text-main)] group-hover:text-black">Send Payment Reminders</span> 
                       <span className="text-gray-300 group-hover:text-[var(--color-text-main)]">→</span>
                     </button>
                     <button onClick={() => { setActiveTab('registrations'); setTimeout(() => window.print(), 300); }} className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-quicksand font-bold text-sm hover:border-[var(--color-text-main)] hover:bg-[#FF9EC0] transition-colors flex justify-between group">
                       <span className="text-[var(--color-text-main)] group-hover:text-black">Print Today's Report</span> 
                       <span className="text-gray-300 group-hover:text-[var(--color-text-main)]">→</span>
                     </button>
                   </div>
                </div>

                <div className="bg-[var(--color-text-main)] text-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10" />
                   <h3 className="font-nunito font-black text-5xl mb-1 tracking-tighter">50</h3>
                   <p className="font-quicksand font-bold text-white/70 text-xs uppercase tracking-[0.2em]">Seats Remaining</p>
                   <div className="w-full h-2 bg-white/20 mt-5 rounded-full overflow-hidden">
                     <div className="h-full bg-[var(--color-secondary)] w-1/2 rounded-full" />
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
                 <button onClick={() => window.print()} className="h-10 px-4 bg-white border-2 border-[var(--color-text-main)] rounded-xl font-nunito font-bold text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm active:translate-y-0.5">
                   Print List
                 </button>
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
                    <option value="class">Class Only</option>
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
            />
          </div>
        )}

      </main>

      <MobileTabBar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Dim overlay for detail panel on mobile */}
      {selectedReg && (
         <div 
           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
           onClick={() => setSelectedReg(null)}
         />
      )}
    </div>
  );
}
