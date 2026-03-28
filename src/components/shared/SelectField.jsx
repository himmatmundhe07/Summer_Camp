export default function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="w-full flex flex-col mb-5">
      <label className="font-nunito font-black text-sm text-[var(--color-text-main)] mb-1.5 ml-1">
        {label}
      </label>
      
      <div className={`
        relative flex w-full h-14 border-2 transition-all bg-[#FAFAFA] rounded-xl
        focus-within:border-[var(--color-text-main)] focus-within:shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] focus-within:-translate-y-[2px] focus-within:-translate-x-[2px]
        ${error ? '!border-[var(--color-primary)] focus-within:shadow-[4px_4px_0px_0px_rgba(255,94,126,1)]' : 'border-[var(--color-text-main)]'}
      `}>
        <select
          value={value}
          onChange={onChange}
          className="w-full h-full pl-4 pr-14 appearance-none bg-transparent font-quicksand font-bold text-base text-[var(--color-text-main)] focus:outline-none cursor-pointer rounded-xl"
        >
          <option value="" disabled className="text-gray-400">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-main)] bg-[var(--color-accent)] w-8 h-8 rounded-lg border-2 border-[var(--color-text-main)] flex items-center justify-center">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {error && (
        <p className="font-quicksand font-bold text-sm text-[var(--color-primary)] mt-1.5 ml-1 animate-bounce-slow">
          {error}
        </p>
      )}
    </div>
  );
}
