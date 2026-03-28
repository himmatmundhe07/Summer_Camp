import { ArrowRight } from 'lucide-react';

export default function PrimaryButton({ children, onClick, disabled, className = '', icon = true, type = "button" }) {
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full h-14 rounded-xl font-nunito font-black text-xl 
        flex items-center justify-center gap-2 transition-all active:scale-[0.98]
        ${disabled 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-transparent' 
          : 'btn-fun bg-[var(--color-primary)] text-white'}
        ${className}
      `}
    >
      {children}
      {icon && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}
