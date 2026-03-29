import { useState, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, CheckCircle2, XCircle, Users, Filter, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AttendanceTracker({ registrations, setRegistrations, logAction }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [campFilter, setCampFilter] = useState('');

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(r => campFilter ? r.campType === campFilter : true);
  }, [registrations, campFilter]);

  const presentCount = filteredRegistrations.filter(r => r.attendance && r.attendance[selectedDate]).length;
  const totalCount = filteredRegistrations.length;
  const attendancePercentage = totalCount === 0 ? 0 : Math.round((presentCount / totalCount) * 100);

  const toggleAttendance = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    
    const camper = registrations.find(r => r.id === id);
    const updatedAttendance = { ...(camper.attendance || {}), [selectedDate]: newStatus };
    
    // Optimistic UI Update
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, attendance: updatedAttendance } : r));
    
    const { error } = await supabase.from('registrations')
                                    .update({ attendance_data: updatedAttendance })
                                    .eq('id', id);
    if (error) {
      toast.error("Database error! Missing JSONB column?");
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, attendance: camper.attendance } : r));
    } else {
      if (logAction) {
         logAction(newStatus ? 'MARK_PRESENT' : 'MARK_ABSENT', camper.name, `For date: ${selectedDate}`);
      }
    }
  };

  const handleBulkUpdate = async (makePresent) => {
    if (totalCount === 0) return;

    toast.loading(makePresent ? "Marking everyone present..." : "Resetting attendance to absent...", { id: "bulk" });

    const updates = [];
    const newRegistrations = registrations.map(camper => {
      if (!campFilter || camper.campType === campFilter) {
        const isCurrentlyPresent = camper.attendance && camper.attendance[selectedDate];
        if ((makePresent && !isCurrentlyPresent) || (!makePresent && isCurrentlyPresent)) {
          const updatedAttendance = { ...(camper.attendance || {}), [selectedDate]: makePresent };
          updates.push({ id: camper.id, updatedAttendance });
          return { ...camper, attendance: updatedAttendance };
        }
      }
      return camper;
    });

    if (updates.length === 0) {
      toast.success("Already completely up to date!", { id: "bulk" });
      return;
    }

    setRegistrations(newRegistrations);

    try {
      await Promise.all(updates.map(u => 
        supabase.from('registrations').update({ attendance_data: u.updatedAttendance }).eq('id', u.id)
      ));
      
      if (logAction) {
         logAction(makePresent ? 'BULK_MARK_PRESENT' : 'BULK_MARK_ABSENT', `${updates.length} Kids`, `Mass marked ${makePresent ? 'present' : 'absent'} for ${selectedDate}`);
      }

      toast.success("Bulk update complete!", { id: "bulk" });
    } catch (e) {
      toast.error("Some database updates failed.", { id: "bulk" });
    }
  };

  const getStatus = (camper) => camper.attendance && camper.attendance[selectedDate];

  return (
    <div className="max-w-[1200px] mx-auto w-full pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <h1 className="font-nunito font-black text-3xl lg:text-5xl text-[var(--color-text-main)] tracking-tight flex items-center gap-4">
          <Calendar className="w-10 h-10 text-[#B066FF]" /> Attendance
        </h1>
        <div className="bg-white px-4 py-2 border-2 border-[var(--color-text-main)] rounded-xl flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(45,55,72,1)]">
          <Users className="w-5 h-5 text-[var(--color-primary)]" />
          <span className="font-quicksand font-bold text-sm">Showing: <span className="text-[var(--color-text-main)] font-black">{totalCount} Kids</span></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 mb-8">
         <div className="bg-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="w-full md:w-auto">
               <h2 className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-1">Select Date</h2>
               <input 
                 type="date"
                 value={selectedDate}
                 onChange={(e) => setSelectedDate(e.target.value)}
                 className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl font-quicksand font-bold text-[var(--color-text-main)] focus:border-[#B066FF] outline-none"
               />
            </div>
            <div className="hidden md:block w-0.5 h-16 bg-gray-200"></div>
            <div className="w-full md:w-auto">
               <h2 className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-1 flex items-center gap-2">
                 <Filter className="w-4 h-4 text-gray-400" /> Filter Package
               </h2>
               <select 
                 value={campFilter}
                 onChange={e => setCampFilter(e.target.value)}
                 className="w-full h-12 px-4 border-2 border-gray-300 rounded-xl font-quicksand font-bold text-[var(--color-text-main)] focus:border-[#B066FF] outline-none cursor-pointer appearance-none bg-white"
               >
                 <option value="">All Kids</option>
                 <option value="class">Daily 3 Hours</option>
                 <option value="daycare">Day Care</option>
                 <option value="hostel">Hostel</option>
               </select>
            </div>
         </div>

         <div className="bg-[var(--color-text-main)] text-white border-2 border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] rounded-2xl p-6 flex flex-col justify-center min-w-[280px]">
            <div className="flex justify-between items-end mb-2">
               <div className="font-quicksand font-bold text-xs uppercase tracking-widest text-[#85E1C8]">Attendance Rate</div>
               <div className="font-nunito font-black text-4xl leading-none">{attendancePercentage}%</div>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-3">
               <div className="h-full bg-[#00D09C] rounded-full transition-all duration-500" style={{ width: `${attendancePercentage}%` }}></div>
            </div>
            <div className="font-quicksand font-bold text-sm text-gray-300 flex justify-between">
              <span>{presentCount} Present</span>
              <span>{totalCount - presentCount} Absent</span>
            </div>
         </div>
      </div>

      <div className="flex justify-end mb-4 gap-3">
        {presentCount > 0 && (
          <button 
            onClick={() => handleBulkUpdate(false)}
            className="h-10 px-4 bg-white border-2 border-[var(--color-text-main)] rounded-xl font-nunito font-bold text-sm flex items-center gap-2 hover:bg-[#FF9EC0] hover:text-[#B30036] transition-colors shadow-sm"
          >
            <XCircle className="w-4 h-4" />
            Mark All Absent
          </button>
        )}
        {presentCount < totalCount && (
          <button 
            onClick={() => handleBulkUpdate(true)}
            className="h-10 px-4 bg-white border-2 border-[var(--color-text-main)] rounded-xl font-nunito font-bold text-sm flex items-center gap-2 hover:bg-[#85E1C8] hover:text-[#00604A] transition-colors shadow-sm"
          >
            <CheckSquare className="w-4 h-4" />
            Mark All Present
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {filteredRegistrations.length === 0 && (
           <p className="font-quicksand font-bold text-gray-500 text-center py-10">No campers match your filter.</p>
        )}
        {filteredRegistrations.map(camper => {
          const isPresent = getStatus(camper);
          return (
            <div key={camper.id} className="bg-white border-2 border-[var(--color-text-main)] rounded-2xl p-4 flex items-center justify-between hover:scale-[1.01] transition-transform shadow-[2px_2px_0px_0px_rgba(45,55,72,0.1)] relative overflow-hidden">
               {isPresent && <div className="absolute left-0 top-0 w-2 h-full bg-[#00D09C]" />}
               <div className="flex flex-col pl-2">
                  <span className="font-nunito font-black text-lg text-[var(--color-text-main)] leading-none">{camper.name}</span>
                  <span className="font-quicksand font-bold text-xs text-gray-500 mt-1 block uppercase tracking-wider">{camper.id} • {camper.campType === 'class' ? 'Daily 3 Hours' : camper.campType === 'daycare' ? 'Day Care' : 'Hostel'}</span>
               </div>
               <button 
                 onClick={() => toggleAttendance(camper.id, isPresent)}
                 className={`h-12 px-4 lg:px-6 rounded-xl border-2 border-[var(--color-text-main)] flex items-center gap-2 font-nunito font-black text-sm lg:text-base shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] active:translate-y-0.5 active:shadow-none transition-colors
                  ${isPresent ? 'bg-[#85E1C8] text-[#00604A]' : 'bg-white text-gray-400 hover:bg-gray-100'}
                 `}
               >
                 {isPresent ? <><CheckCircle2 className="w-5 h-5"/> Present</> : <><XCircle className="w-5 h-5"/> Absent</>}
               </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}
