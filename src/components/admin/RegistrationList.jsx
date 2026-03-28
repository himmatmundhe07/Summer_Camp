import { Backpack, Tent, Sun } from 'lucide-react';

export default function RegistrationList({ data, onRowClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-[#00B386] bg-[#85E1C8]/30';
      case 'Pending': return 'text-[#E6AC00] bg-[#FFE285]/30';
      case 'Failed': return 'text-[#E04868] bg-[#FF9EC0]/30';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getCampIcon = (type) => {
    switch (type) {
      case 'class': return <Backpack className="w-4 h-4 text-[var(--color-text-main)]" />;
      case 'daycare': return <Sun className="w-4 h-4 text-[var(--color-text-main)]" />;
      case 'hostel': return <Tent className="w-4 h-4 text-[var(--color-text-main)]" />;
      default: return <Backpack className="w-4 h-4 text-[var(--color-text-main)]" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div 
          key={item.id} 
          onClick={() => onRowClick(item)}
          className="card-fun border-2 border-[var(--color-text-main)] rounded-2xl p-4 bg-white cursor-pointer hover:bg-yellow-50 active:scale-[0.98] transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="font-nunito font-black text-lg text-[var(--color-text-main)] block">
                {item.name}
              </span>
              <span className="font-quicksand font-bold text-xs text-gray-500 uppercase tracking-widest">
                {item.gender} • {item.age} Yrs • Cls {item.class}
              </span>
            </div>
            <div className={`px-2 py-1 rounded text-[10px] font-nunito font-black uppercase tracking-widest border border-current ${getStatusColor(item.status)}`}>
              {item.status}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3 mt-1">
            <div className="flex items-center gap-1.5 font-quicksand font-bold text-sm text-[var(--color-text-main)]">
              {getCampIcon(item.campType)}
              <span className="truncate">{item.campType === 'class' ? 'Class Only' : item.campType === 'daycare' ? 'Day Care' : 'Hostel'}</span>
            </div>
            
            <div className="font-nunito font-black text-lg text-[var(--color-primary)]">
              ₹{item.amount}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onRowClick(item); }}
              className="flex-1 py-2 bg-white border-2 border-[var(--color-text-main)] rounded-xl text-xs font-nunito font-bold hover:bg-gray-50 active:translate-y-0.5 shadow-sm"
            >
              View
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); window.print(); }}
              className="flex-1 py-2 bg-[var(--color-text-main)] text-white border-2 border-[var(--color-text-main)] rounded-xl text-xs font-nunito font-bold shadow-[2px_2px_0px_0px_rgba(45,55,72,0.3)] active:translate-y-0.5 transition-all"
            >
              Print
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
