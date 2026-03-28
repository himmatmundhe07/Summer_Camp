import { Check } from 'lucide-react';

export default function StepIndicator({ currentStep }) {
  const steps = [
    { id: 1, label: "Info" },
    { id: 2, label: "Camp" },
    { id: 3, label: "Pay" }
  ];

  return (
    <div className="w-full py-4 px-6 lg:mx-auto lg:max-w-2xl">
      <div className="flex items-center justify-between w-full relative h-16">
        
        {/* Background track line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-3 bg-white border-2 border-[var(--color-text-main)] rounded-full z-0" />
        
        {/* Progress fill line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-3 z-0 rounded-full flex items-center p-0.5">
          <div 
            className="h-full bg-[var(--color-secondary)] rounded-full transition-all duration-300 ease-out border-r-2 border-[var(--color-text-main)]" 
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 flex items-center justify-center font-nunito font-black text-lg transition-all duration-300
                  ${isDone ? 'bg-[var(--color-secondary)] border-[var(--color-text-main)] text-[var(--color-text-main)] shadow-solid' : ''}
                  ${isActive ? 'bg-[var(--color-accent)] border-[var(--color-text-main)] text-[var(--color-text-main)] shadow-solid scale-110' : ''}
                  ${!isActive && !isDone ? 'bg-white border-dashed border-gray-400 text-gray-400' : ''}
                `}
              >
                {isDone ? <Check className="w-5 h-5 lg:w-6 lg:h-6 stroke-[4]" /> : step.id}
              </div>
              <span className={`absolute top-full mt-2 whitespace-nowrap font-nunito font-black text-xs lg:text-sm transition-colors duration-300 ${isActive || isDone ? 'text-[var(--color-text-main)]' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
