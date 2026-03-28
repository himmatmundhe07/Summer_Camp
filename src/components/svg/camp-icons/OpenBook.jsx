export default function OpenBook({ className = '' }) {
  // Two open pages with a spine curve
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8 12C12.4183 12 16 13.7909 16 16V40C16 37.7909 12.4183 36 8 36H6V12H8Z" />
      <path d="M40 12C35.5817 12 32 13.7909 32 16V40C32 37.7909 35.5817 36 40 36H42V12H40Z" />
      <path d="M16 16C18.6667 14 22 13 24 13C26 13 29.3333 14 32 16" />
      <path d="M16 40C18.6667 38 22 37 24 37C26 37 29.3333 38 32 40" />
      <path d="M24 13V37" />
    </svg>
  );
}
