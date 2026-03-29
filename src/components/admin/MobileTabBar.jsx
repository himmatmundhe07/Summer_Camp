export default function MobileTabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'registrations', label: 'List' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'logout', label: 'Log Out' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t-2 border-[var(--color-text-main)] z-40 flex lg:hidden shadow-[0_-4px_0_0_rgba(45,55,72,0.1)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex-1 flex flex-col items-center justify-center font-nunito font-black text-sm relative transition-colors
            ${activeTab === tab.id ? 'text-[var(--color-primary)] bg-[var(--color-bg-light)]' : 'text-gray-400'}
          `}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-primary)]" />
          )}
        </button>
      ))}
    </div>
  );
}
