export default function Scissors({ className = '' }) {
  // Simple open scissors silhouette
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
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="36" r="6" />
      <path d="M17 16L40 36" />
      <path d="M17 32L40 12" />
    </svg>
  );
}
