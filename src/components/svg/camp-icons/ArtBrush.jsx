export default function ArtBrush({ className = '' }) {
  // A diagonal paintbrush stroke
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
      <path d="M14 34L34 14C36.2091 11.7909 39.7909 11.7909 42 14C44.2091 16.2091 44.2091 19.7909 42 22L22 42" />
      <path d="M14 34C10 30 6 32 6 36C6 40 10 42 14 38" />
      <path d="M22 42C26 38 24 34 20 34" />
    </svg>
  );
}
