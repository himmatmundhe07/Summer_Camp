export default function ArrowRight({ className = '' }) {
  // A minimal right-pointing arrow. 20x20px. Used inside buttons instead of text arrows.
  return (
    <svg 
      className={`w-5 h-5 ${className}`} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 10H16M16 10L10 4M16 10L10 16" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
