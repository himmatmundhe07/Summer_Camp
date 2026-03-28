export default function DesktopSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Dashboard', color: 'hover:bg-[#FF9EC0] hover:border-[var(--color-text-main)]' },
    { id: 'registrations', label: 'Kids List', color: 'hover:bg-[#85E1C8] hover:border-[var(--color-text-main)]' },
    { id: 'logout', label: 'Log Out', color: 'hover:bg-[#FFC000] hover:border-[var(--color-text-main)] mt-auto' },
  ];

  return (
    <div className="fixed top-0 left-0 w-[240px] h-screen bg-white border-r-2 border-[var(--color-text-main)] hidden lg:flex flex-col py-8 z-40 pb-12 shadow-[4px_0_0_0_rgba(45,55,72,1)]">
      
      <div className="flex items-center gap-2 mb-12 px-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-solid -rotate-3 overflow-hidden bg-white shrink-0">
           <img src="/src/assets/Logo.webp" alt="Kalpana" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-nunito font-black text-2xl text-[var(--color-text-main)] leading-none">
            Kalpana
          </h1>
          <span className="font-quicksand font-bold text-sm tracking-widest uppercase text-gray-400 leading-none">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex flex-col flex-1 px-4 gap-3">
        {tabs.filter(t => t.id !== 'logout').map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              w-full h-12 px-4 flex items-center justify-start rounded-xl font-nunito font-black text-[15px] transition-all border-2 border-transparent
              ${activeTab === tab.id ? 'bg-[var(--color-blue)] text-white border-[var(--color-text-main)] shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] scale-105 ml-2' : `text-gray-500 hover:text-[var(--color-text-main)] hover:shadow-sm ${tab.color}`}
            `}
          >
            {tab.label}
          </button>
        ))}

        <div className="mt-auto pt-6 border-t-2 border-dashed border-gray-200">
          <div className="px-2 mb-4">
            <span className="font-quicksand font-bold text-[10px] uppercase text-gray-400 tracking-wider block">Logged in as</span>
            <span className="font-nunito font-black text-sm text-[var(--color-text-main)] truncate block">admin@kalpana.com</span>
          </div>
          <button
            onClick={() => setActiveTab('logout')}
            className="w-full h-12 px-4 flex items-center justify-start rounded-xl font-nunito font-black text-[15px] transition-all border-2 border-transparent text-red-500 hover:text-[var(--color-text-main)] hover:bg-[#FF9EC0]"
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}
