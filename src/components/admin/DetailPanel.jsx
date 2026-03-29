import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ticket, Trash2, Edit3, Save, MessageSquare } from 'lucide-react';

export default function DetailPanel({ isOpen, data, onClose, onUpdateStatus, onDelete, onUpdateNotes, onUpdateCamper }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (data) setEditForm(data);
    setIsEditing(false);
  }, [data]);

  const handleSaveEdit = () => {
    onUpdateCamper && onUpdateCamper(data.id, editForm);
    setIsEditing(false);
  };

  if (!isOpen || !data) return null;

  const isDesktop = window.innerWidth >= 1024;

  const variants = {
    hidden: { y: isDesktop ? 0 : "100%", x: isDesktop ? "100%" : 0, opacity: isDesktop ? 0 : 1 },
    visible: { y: 0, x: 0, opacity: 1 },
    exit: { y: isDesktop ? 0 : "100%", x: isDesktop ? "100%" : 0, opacity: isDesktop ? 0 : 1 }
  };

  const EditableRow = ({ label, field, type="text" }) => (
    <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-200 last:border-b-0 items-center">
      <span className="font-nunito font-black text-[10px] text-gray-400 uppercase tracking-[0.05em] w-1/3 shrink-0">{label}</span>
      {isEditing ? (
        <input 
          type={type} 
          value={editForm[field] || ''} 
          onChange={(e) => setEditForm(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-2/3 border-2 border-gray-300 rounded px-2 py-1 font-quicksand font-bold text-sm focus:border-[var(--color-primary)] outline-none"
        />
      ) : (
        <span className="font-quicksand font-bold text-sm text-[var(--color-text-main)] text-right break-words w-2/3">{data[field] || "-"}</span>
      )}
    </div>
  );

  const EditableSelectRow = ({ label, field, options }) => (
    <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-200 last:border-b-0 items-center">
      <span className="font-nunito font-black text-[10px] text-gray-400 uppercase tracking-[0.05em] w-1/3 shrink-0">{label}</span>
      {isEditing ? (
        <select 
          value={editForm[field] || ''} 
          onChange={(e) => setEditForm(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-2/3 border-2 border-gray-300 rounded px-2 py-1 font-quicksand font-bold text-sm focus:border-[var(--color-primary)] outline-none bg-white"
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <span className="font-quicksand font-bold text-sm text-[var(--color-text-main)] text-right break-words w-2/3">
          {options.find(o => o.value === data[field])?.label || data[field] || "-"}
        </span>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed z-50 bg-white border-t-2 lg:border-t-0 lg:border-l-2 border-[var(--color-text-main)] flex flex-col
                     left-0 bottom-0 w-full h-[90svh] rounded-t-3xl lg:rounded-none lg:w-[420px] lg:top-0 lg:left-auto lg:right-0 lg:h-full lg:shadow-[-8px_0px_0px_0px_rgba(45,55,72,1)]"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Mobile Handle */}
          <div className="w-full flex justify-center pt-4 pb-2 lg:hidden">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-24 lg:pt-8 min-h-0 custom-scrollbar">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                {isEditing ? (
                  <input 
                    value={editForm.name || ''} 
                    onChange={e => setEditForm(prev => ({...prev, name: e.target.value}))}
                    className="font-nunito font-black text-2xl text-[var(--color-text-main)] border-b-2 hover:-translate-0 focus:border-[var(--color-primary)] outline-none w-full mb-1 border-gray-300"
                    placeholder="Camper Name"
                  />
                ) : (
                  <h2 className="font-nunito font-black text-3xl text-[var(--color-text-main)] leading-tight mb-1">
                    {data.name}
                  </h2>
                )}
                <div className="font-quicksand text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">
                   REG: {data.id}
                </div>
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                   <button onClick={handleSaveEdit} className="p-2 bg-[#85E1C8] text-[#00604A] rounded-full hover:bg-[#00D09C] hover:text-white transition-colors">
                     <Save className="w-5 h-5" />
                   </button>
                ) : (
                   <button onClick={() => setIsEditing(true)} className="p-2 bg-gray-100 text-gray-500 rounded-full hover:text-[var(--color-primary)] hover:bg-pink-50 transition-colors">
                     <Edit3 className="w-5 h-5" />
                   </button>
                )}
                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-[var(--color-text-main)] hover:bg-[var(--color-accent)] border border-transparent hover:border-[var(--color-text-main)] transition-colors active:scale-95">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="bg-[var(--color-bg-light)] border-2 border-[var(--color-text-main)] rounded-2xl px-5 mb-6 shadow-solid hover:-translate-y-1 transition-transform">
              <EditableSelectRow 
                label="Gender" field="gender" 
                options={[ {label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'} ]} 
              />
              <EditableRow label="Age" field="age" type="number" />
              <EditableRow label="Class" field="class" />
              <EditableRow label="Address" field="address" />
              <EditableRow label="Contact" field="mobile" />
              <EditableRow label="Emergency" field="emergencyContact" />
              {data.siblings?.length > 0 && (
                <div className="flex justify-between py-3 border-t-2 border-[var(--color-text-main)] items-center bg-[#8CB8FF]/10 -mx-5 px-5 rounded-b-[14px]">
                  <span className="font-nunito font-black text-[10px] text-blue-500 uppercase tracking-[0.05em] w-1/3 shrink-0">Siblings</span>
                  <span className="font-quicksand font-bold text-sm text-[var(--color-text-main)] text-right break-words w-2/3">
                    {data.siblings.join(', ')}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-[#FFFBEA] border-2 border-[var(--color-text-main)] rounded-2xl p-5 mb-6 shadow-solid hover:-translate-y-1 transition-transform">
              <div className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-3 border-b-2 border-dashed border-[var(--color-text-main)] pb-2 flex items-center justify-between">
                Camp Details
                <Ticket className="w-5 h-5 text-[var(--color-text-main)]" />
              </div>
              <EditableSelectRow 
                label="Package" field="campType" 
                options={[ {label: 'Daily 3 Hours', value: 'class'}, {label: 'Day Care', value: 'daycare'}, {label: 'Hostel', value: 'hostel'} ]} 
              />
              <EditableRow label="Paid (₹)" field="amount" type="number" />
              
              <div className="flex justify-between py-3 border-b-0 items-center">
                <span className="font-nunito font-black text-[10px] text-gray-400 uppercase tracking-[0.05em] w-1/3 shrink-0">Status</span>
                <span className={`px-2 py-1 rounded text-[10px] font-nunito font-black uppercase tracking-widest text-white border-2 border-[var(--color-text-main)] shadow-solid ${data.status === 'Paid' ? 'bg-[#00D09C]' : data.status === 'Failed' ? 'bg-[#FF5E7E]' : 'bg-[#FFC000]'}`}>
                  {data.status}
                </span>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t-2 border-dashed border-gray-200 justify-end">
                 <button 
                   onClick={() => onUpdateStatus(data.id, 'Paid')}
                   className="px-3 py-1 bg-[#85E1C8] text-[#00604A] border-2 border-[#00B386] rounded-lg text-[10px] font-nunito font-black uppercase tracking-wider hover:bg-[#00D09C] hover:text-white transition-colors"
                 >Mark Paid</button>
                 <button 
                   onClick={() => onUpdateStatus(data.id, 'Pending')}
                   className="px-3 py-1 bg-[#FFE285] text-[#997300] border-2 border-[#E6AC00] rounded-lg text-[10px] font-nunito font-black uppercase tracking-wider hover:bg-[#FFC000] hover:text-white transition-colors"
                 >Wait</button>
                 <button 
                   onClick={() => onUpdateStatus(data.id, 'Failed')}
                   className="px-3 py-1 bg-[#FF9EC0] text-[#8C102C] border-2 border-[#E04868] rounded-lg text-[10px] font-nunito font-black uppercase tracking-wider hover:bg-[#FF5E7E] hover:text-white transition-colors"
                 >Fail</button>
              </div>
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-5 mb-6 shadow-sm hover:shadow-solid hover:border-[var(--color-text-main)] hover:-translate-y-1 transition-all">
                <div className="font-nunito font-black text-base text-[var(--color-text-main)] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  Secret Admin Notes
                </div>
                <textarea 
                  defaultValue={data.adminNotes}
                  onBlur={(e) => onUpdateNotes && onUpdateNotes(data.id, e.target.value)}
                  placeholder="Record allergies, siblings, or payment promises here. (Auto-saves when you click away)"
                  className="w-full bg-white border-2 border-gray-300 rounded-xl p-3 font-quicksand font-bold text-sm min-h-[80px] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-y"
                />
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => onDelete(data.id)}
                  className="btn-fun bg-white border-4 border-[#FF5E7E] text-[#FF5E7E] w-full h-14 rounded-xl font-nunito font-black text-lg flex items-center justify-center gap-2 hover:bg-[#FF5E7E] hover:text-white transition-all shadow-solid hover:shadow-none translate-y-0 hover:translate-y-1"
                >
                  <Trash2 className="w-5 h-5" />
                  Erase Record
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
