import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Ticket } from 'lucide-react';

export default function DetailPanel({ isOpen, data, onClose, onUpdateStatus }) {
  if (!isOpen || !data) return null;

  const isDesktop = window.innerWidth >= 1024;

  const variants = {
    hidden: { 
      y: isDesktop ? 0 : "100%", 
      x: isDesktop ? "100%" : 0, 
      opacity: isDesktop ? 0 : 1 
    },
    visible: { 
      y: 0, 
      x: 0, 
      opacity: 1 
    },
    exit: { 
      y: isDesktop ? 0 : "100%", 
      x: isDesktop ? "100%" : 0, 
      opacity: isDesktop ? 0 : 1 
    }
  };

  const SummaryRow = ({ label, value }) => (
    <div className="flex justify-between py-3 border-b-2 border-dashed border-gray-200 last:border-b-0">
      <span className="font-nunito font-black text-[10px] text-gray-400 uppercase tracking-[0.05em] w-1/3 shrink-0">{label}</span>
      <span className="font-quicksand font-bold text-sm text-[var(--color-text-main)] text-right break-words w-2/3">{value}</span>
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
                <h2 className="font-nunito font-black text-3xl text-[var(--color-text-main)] leading-tight mb-1">
                  {data.name}
                </h2>
                <div className="font-quicksand text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 inline-block px-2 py-1 rounded">
                   REG: {data.id}
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-[var(--color-text-main)] hover:bg-[var(--color-accent)] border border-transparent hover:border-[var(--color-text-main)] transition-colors active:scale-95">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-[var(--color-bg-light)] border-2 border-[var(--color-text-main)] rounded-2xl px-5 mb-6 shadow-solid hover:-translate-y-1 transition-transform">
              <SummaryRow label="Gender" value={data.gender} />
              <SummaryRow label="Age" value={`${data.age} yrs`} />
              <SummaryRow label="Class" value={data.class} />
              <SummaryRow label="Address" value={data.address || "123 Magic Lane"} />
              <SummaryRow label="Contact" value={`+91 ${data.mobile}`} />
            </div>

            <div className="bg-[#FFFBEA] border-2 border-[var(--color-text-main)] rounded-2xl p-5 mb-6 shadow-solid hover:-translate-y-1 transition-transform">
              <div className="font-nunito font-black text-xl text-[var(--color-text-main)] mb-3 border-b-2 border-dashed border-[var(--color-text-main)] pb-2 flex items-center justify-between">
                Camp Details
                <Ticket className="w-5 h-5 text-[var(--color-text-main)]" />
              </div>
              <SummaryRow label="Type" value={data.campType === 'class' ? 'Daily 3 Hours' : data.campType === 'daycare' ? 'Day Care' : 'Hostel'} />
              <SummaryRow label="Paid" value={`₹${data.amount}`} />
              <SummaryRow label="Status" value={
                <span className={`px-2 py-1 rounded text-[10px] font-nunito font-black uppercase tracking-widest text-white border-2 border-[var(--color-text-main)] shadow-solid ${data.status === 'Paid' ? 'bg-[#00D09C]' : data.status === 'Failed' ? 'bg-[#FF5E7E]' : 'bg-[#FFC000]'}`}>
                  {data.status}
                </span>
              } />
              
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
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={() => window.print()}
                className="btn-fun bg-[var(--color-primary)] text-white w-full h-14 rounded-xl font-nunito font-black text-lg flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Ticket
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
