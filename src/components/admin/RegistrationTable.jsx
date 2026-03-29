export default function RegistrationTable({ data, onRowClick }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': 
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-nunito font-black bg-[#85E1C8]/30 text-[#00B386] border border-[#00B386]">Paid</span>;
      case 'Pending': 
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-nunito font-black bg-[#FFE285]/30 text-[#E6AC00] border border-[#E6AC00]">Pending</span>;
      case 'Failed': 
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-nunito font-black bg-[#FF9EC0]/30 text-[#E04868] border border-[#E04868]">Failed</span>;
      default: 
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-nunito font-black bg-gray-100 text-gray-600 border border-gray-300">Unknown</span>;
    }
  };

  const getCampBadge = (type) => {
    switch (type) {
      case 'class': 
        return <span className="bg-[#FFE285] px-2 py-0.5 rounded text-[10px] font-nunito font-black text-yellow-900 shadow-solid !shadow-[1px_1px_0px_0px_rgba(45,55,72,1)] border border-[var(--color-text-main)]">Daily 3 Hours</span>;
      case 'daycare': 
        return <span className="bg-[#FF9EC0] px-2 py-0.5 rounded text-[10px] font-nunito font-black text-pink-900 shadow-solid !shadow-[1px_1px_0px_0px_rgba(45,55,72,1)] border border-[var(--color-text-main)]">Day Care</span>;
      case 'hostel': 
        return <span className="bg-[#8CB8FF] px-2 py-0.5 rounded text-[10px] font-nunito font-black text-blue-900 shadow-solid !shadow-[1px_1px_0px_0px_rgba(45,55,72,1)] border border-[var(--color-text-main)]">Hostel</span>;
      default: return type;
    }
  }

  return (
    <div className="w-full overflow-x-auto border-2 border-[var(--color-text-main)] bg-white rounded-2xl hidden lg:block shadow-solid">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-[var(--color-text-main)]">
            {['#', 'Explorer Name', 'Bio', 'Contact', 'Adventure', 'Amount', 'Status', 'Actions'].map((header) => (
              <th key={header} className="px-5 py-4 font-nunito font-black text-[11px] uppercase tracking-widest text-[var(--color-text-main)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-dashed divide-gray-200 font-quicksand font-bold text-[13px] text-[var(--color-text-main)]">
          {data.map((item, idx) => (
            <tr 
              key={item.id} 
              onClick={() => onRowClick(item)}
              className="hover:bg-blue-50 cursor-pointer transition-colors even:bg-slate-50"
            >
              <td className="px-5 py-4 text-gray-400 font-nunito shrink-0">{idx + 1}</td>
              <td className="px-5 py-4">
                <div className="font-nunito font-black text-sm whitespace-nowrap">{item.name}</div>
                <div className="flex flex-col items-start gap-1 mt-1">
                  {item.adminNotes && (
                     <div className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 inline-block px-1.5 py-0.5 rounded uppercase tracking-widest max-w-[150px] truncate" title={item.adminNotes}>
                       📝 {item.adminNotes}
                     </div>
                  )}
                  {item.siblings?.length > 0 && (
                     <div className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 inline-block px-1.5 py-0.5 rounded uppercase tracking-widest max-w-[150px] truncate" title={item.siblings.join(', ')}>
                       👥 {item.siblings.length} Sibling{item.siblings.length > 1 ? 's' : ''}
                     </div>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{item.gender} · {item.age}yrs · Cls {item.class}</td>
              <td className="px-5 py-4 text-[var(--color-secondary-dark)] whitespace-nowrap">+91 {item.mobile}</td>
              <td className="px-5 py-4 whitespace-nowrap">
                {getCampBadge(item.campType)}
              </td>
              <td className="px-5 py-4 font-nunito font-black">₹{item.amount}</td>
              <td className="px-5 py-4 whitespace-nowrap">
                {getStatusBadge(item.status)}
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRowClick(item); }}
                    className="px-3 py-1 bg-white border border-[var(--color-text-main)] rounded text-xs hover:bg-[var(--color-bg-yellow)]"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
