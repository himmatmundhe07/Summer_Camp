import { useState } from 'react';
import PrimaryButton from '../shared/PrimaryButton';
import { Tent, Sun, TreePine, Map, Check, Backpack } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StepTwo({ data, updateData, onNext, onBack }) {
  const [error, setError] = useState('');

  const camps = [
    {
      id: "class",
      name: "Class Only",
      desc: "Morning only · 8 AM to 11 AM",
      price: "₹500",
      color: "bg-[#8CB8FF]/20 hover:bg-[#8CB8FF]/40 border-[var(--color-text-main)]",
      Icon: Backpack
    },
    {
      id: "daycare",
      name: "Day Care",
      desc: "Full day care · Meals included",
      price: "₹500 + charges",
      color: "bg-[#FFE285]/30 hover:bg-[#FFE285]/60 border-[var(--color-text-main)]",
      popular: true,
      Icon: Sun
    },
    {
      id: "hostel",
      name: "Hostel",
      desc: "Residential stay facility",
      price: "₹500 + charges",
      color: "bg-[#B066FF]/20 hover:bg-[#B066FF]/40 border-[var(--color-text-main)]",
      Icon: Tent
    }
  ];

  const handleNext = (e) => {
    if (!data.campType) {
      setError("Pick your adventure first!");
      return;
    }
    if (!data.agreed) {
      setError("Please check the confirmation box!");
      return;
    }
    setError('');
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x, y },
      colors: ['#FF5E7E', '#00D09C', '#FFC000', '#B066FF'],
      disableForReducedMotion: true,
      zIndex: 150,
      ticks: 100,
      gravity: 0.8
    });
    
    onNext();
  };

  return (
    <div className="w-full flex-shrink-0 px-4 sm:px-6 py-6 sm:py-8 max-w-lg mx-auto bg-white rounded-3xl border-2 border-[var(--color-text-main)] shadow-solid mb-12 flex flex-col min-h-[calc(100svh-150px)] relative overflow-hidden">
      
      <div className="text-center bg-[#85E1C8] -mx-4 sm:-mx-6 -mt-6 sm:-mt-8 mb-6 p-6 border-b-2 border-dashed border-[var(--color-text-main)] relative">
        <div className="absolute top-2 left-2 text-[var(--color-primary)] opacity-50 transform rotate-12">
          <TreePine className="w-16 h-16" />
        </div>
        <div className="absolute -bottom-2 right-2 text-white opacity-40 transform -rotate-12">
          <Sun className="w-16 h-16" />
        </div>
        <h2 className="font-nunito font-black text-3xl text-[var(--color-text-main)] mb-1 relative z-10 flex items-center justify-center gap-2">
          Pick Your Camp! <Map className="w-8 h-8 text-[var(--color-purple)]" />
        </h2>
        <p className="font-quicksand font-bold text-[var(--color-text-main)]/80 text-sm relative z-10">Choose the best fit for your summer.</p>
      </div>

      <div className="flex flex-col gap-5">
        {camps.map((camp) => {
          const isSelected = data.campType === camp.id;
          return (
            <div 
              key={camp.id}
              onClick={() => updateData({ campType: camp.id, agreed: false })}
              className={`
                relative flex items-center p-4 cursor-pointer transition-all rounded-2xl border-2
                ${isSelected ? `${camp.color.split(' ')[0]} border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] scale-[1.02] -translate-y-1` : `bg-[#FAFAFA] border-gray-300 ${camp.color.split(' ')[1]}`}
              `}
            >
              {camp.popular && (
                <div className="absolute -top-3 right-4 bg-[var(--color-primary)] text-white text-[10px] tracking-widest uppercase font-nunito font-black px-3 py-1 rounded-full border-2 border-[var(--color-text-main)] shadow-[2px_2px_0px_0px_rgba(45,55,72,1)] flex items-center gap-1">
                  POPULAR
                </div>
              )}
              
              <div className="shrink-0 mr-4">
                <div className={`
                  w-6 h-6 flex items-center justify-center rounded-full transition-colors border-2
                  ${isSelected ? 'bg-white border-[var(--color-text-main)]' : 'bg-white border-gray-400'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-[var(--color-text-main)] rounded-full" />}
                </div>
              </div>

              <div className="shrink-0 mr-3 hidden sm:block">
                <div className={`p-2 rounded-xl bg-white border-2 border-[var(--color-text-main)] shadow-sm ${isSelected ? 'text-[var(--color-primary)]' : 'text-gray-400'}`}>
                  <camp.Icon className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="font-nunito font-black text-lg text-[var(--color-text-main)] mb-0.5">{camp.name}</div>
                <div className="font-quicksand font-bold text-xs text-[var(--color-text-main)]/70">{camp.desc}</div>
              </div>

              <div className={`font-nunito font-black text-xl text-right shrink-0 ml-2 ${isSelected ? 'text-[var(--color-text-main)]' : 'text-gray-500'}`}>
                {camp.price.split(' ')[0]}
                {camp.price.includes('+') && <div className="text-[10px] text-gray-500 font-quicksand font-bold uppercase">+ charges</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 mb-auto">
        <label className="flex items-start gap-4 cursor-pointer group bg-[#FAFAFA] p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[var(--color-secondary)] hover:bg-[#00D09C]/10 transition-colors">
          <div className="shrink-0 mt-1 relative">
            <input 
              type="checkbox" 
              className="absolute opacity-0 w-0 h-0"
              checked={data.agreed || false}
              onChange={(e) => {
                updateData({ agreed: e.target.checked });
                if(e.target.checked && error) setError('');
              }}
            />
            <div className={`
              w-6 h-6 flex items-center justify-center rounded-lg transition-colors border-2
              ${data.agreed ? 'bg-[var(--color-secondary)] border-[var(--color-text-main)] shadow-[2px_2px_0px_0px_rgba(45,55,72,1)]' : 'bg-white border-gray-400'}
            `}>
              {data.agreed && <Check className="w-4 h-4 text-white stroke-[4]" />}
            </div>
          </div>
          <span className="font-quicksand font-bold text-xs sm:text-sm text-[var(--color-text-main)]/80 leading-relaxed select-none">
            I confirm that the magical student is between 3–12 years of age and details entered are perfectly correct!
          </span>
        </label>
      </div>
      
      {error && <p className="font-quicksand font-bold text-sm text-[var(--color-primary)] mt-4 animate-bounce-slow text-center">{error}</p>}

      <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
        <div className="mb-5 flex justify-between items-center bg-[#F8FAFC] border-2 border-[var(--color-text-main)] p-3 rounded-xl">
          <span className="font-nunito font-black text-[var(--color-text-muted)] text-sm uppercase">Total Booking Fee</span>
          <span className="font-nunito font-black text-2xl text-[var(--color-text-main)]">₹500</span>
        </div>

        <PrimaryButton 
          onClick={handleNext}
          disabled={!data.campType || !data.agreed}
          className={data.campType && data.agreed ? 'bg-[var(--color-blue)]' : ''}
        >
          Sounds Good!
        </PrimaryButton>
        <button 
          onClick={onBack}
          className="w-full mt-4 h-12 font-quicksand font-bold text-base text-[var(--color-text-main)]/60 hover:text-[var(--color-text-main)] active:scale-95 transition-all rounded-xl hover:bg-gray-100"
        >
          ← Let me change something
        </button>
      </div>

    </div>
  );
}
