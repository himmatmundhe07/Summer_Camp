import { Award, School, Baby } from 'lucide-react';

export default function InfoBar() {
  const items = [
    { text: "Certificate on completion", icon: Award },
    { text: "All schools welcome", icon: School },
    { text: "Age 3 to 12 years", icon: Baby }
  ];

  return (
    <div className="w-full bg-[var(--color-text-main)] py-6 px-6 relative z-20 border-y-2 border-[var(--color-text-main)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white font-nunito font-bold text-lg lg:text-xl">
            <div className="w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-text-main)] shrink-0 border-2 border-[var(--color-text-main)]">
              <item.icon className="w-5 h-5" />
            </div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
