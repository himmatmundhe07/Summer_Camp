export default function AbacusBeads({ className = '' }) {
  // Three horizontal lines with circles on them
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
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M9 16H39" />
      <path d="M9 24H39" />
      <path d="M9 32H39" />
      <circle cx="16" cy="16" r="3" />
      <circle cx="28" cy="16" r="3" />
      <circle cx="22" cy="24" r="3" />
      <circle cx="34" cy="24" r="3" />
      <circle cx="14" cy="32" r="3" />
      <circle cx="26" cy="32" r="3" />
    </svg>
  );
}
