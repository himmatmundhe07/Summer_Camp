import { useState } from 'react';

export default function TextField({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder, 
  type = "text",
  multiline = false,
  readOnly = false,
  prefix = null,
  inputMode
}) {
  const [focused, setFocused] = useState(false);

  const baseClasses = `
    w-full bg-[#FAFAFA] font-quicksand font-bold text-base text-[var(--color-text-main)] 
    focus:outline-none placeholder-gray-400 transition-all rounded-xl
  `;

  // Thicker fun borders!
  const inputContainerClasses = `
    relative flex w-full border-2 transition-all rounded-xl
    ${focused && !readOnly 
      ? 'border-[var(--color-text-main)] shadow-[4px_4px_0px_0px_rgba(45,55,72,1)] -translate-y-[2px] -translate-x-[2px]' 
      : 'border-[var(--color-text-main)] shadow-[0px_0px_0px_0px_rgba(45,55,72,1)]'
    }
    ${error ? '!border-[var(--color-primary)] shadow-[4px_4px_0px_0px_rgba(255,94,126,1)]' : ''}
    ${readOnly ? 'bg-gray-100 opacity-80' : 'bg-[#FAFAFA]'}
  `;

  return (
    <div className="w-full flex flex-col mb-5">
      <label className="font-nunito font-black text-sm text-[var(--color-text-main)] mb-1.5 ml-1">
        {label}
      </label>
      
      <div className={inputContainerClasses}>
        {prefix && (
          <div className="flex items-center justify-center px-4 border-r-2 border-[var(--color-text-main)] text-[var(--color-text-main)] font-quicksand font-bold text-base bg-[#FFE285] rounded-l-xl">
            {prefix}
          </div>
        )}
        
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            readOnly={readOnly}
            placeholder={placeholder}
            className={`${baseClasses} p-4 min-h-[100px] resize-none ${prefix ? 'rounded-l-none' : ''}`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            readOnly={readOnly}
            placeholder={placeholder}
            inputMode={inputMode}
            className={`${baseClasses} h-14 px-4 ${prefix ? 'rounded-l-none' : ''}`}
          />
        )}
      </div>

      {error && (
        <p className="font-quicksand font-bold text-sm text-[var(--color-primary)] mt-1.5 ml-1 animate-bounce-slow">
          {error}
        </p>
      )}
    </div>
  );
}
