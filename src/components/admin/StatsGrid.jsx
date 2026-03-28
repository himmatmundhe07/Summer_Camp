import { useState, useEffect } from 'react';
import { Users, IndianRupee, BookOpen, Tent } from 'lucide-react';

const StatCard = ({ label, targetValue, icon: Icon, colorClass, shadowClass }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1200; // 1.2s
    const steps = 60;
    const stepTime = duration / steps;
    const increment = targetValue / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        clearInterval(timer);
        setValue(targetValue);
      } else {
        setValue(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <div className={`card-fun bg-white border-2 border-[var(--color-text-main)] rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-transform`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 transition-transform group-hover:scale-150 ${colorClass}`} />
      
      <div className="flex items-center gap-4 mb-4 relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-[var(--color-text-main)] shadow-[3px_3px_0px_0px_#2D3748] ${colorClass}`}>
          <Icon className="w-6 h-6 text-[var(--color-text-main)]" />
        </div>
        <div className="font-nunito font-black text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
          {label}
        </div>
      </div>
      
      <div className="font-nunito font-black text-4xl lg:text-5xl text-[var(--color-text-main)] relative z-10">
        {value}
      </div>
    </div>
  );
};

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full">
      <StatCard label="Total Kids" targetValue={stats.total} icon={Users} colorClass="bg-[#FF9EC0]" />
      <StatCard label="Revenue" targetValue={stats.revenue} icon={IndianRupee} colorClass="bg-[#85E1C8]" />
      <StatCard label="Class Only" targetValue={stats.classOnly} icon={BookOpen} colorClass="bg-[#FFE285]" />
      <StatCard label="Day Care" targetValue={stats.extended} icon={Tent} colorClass="bg-[#8CB8FF]" />
    </div>
  );
}
