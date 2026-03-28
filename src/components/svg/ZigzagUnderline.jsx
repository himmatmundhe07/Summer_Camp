export default function ZigzagUnderline({ className = '' }) {
  // A hand-drawn zigzag SVG line used under key headings
  // Width 100%, Height 12px. Color: var(--marigold) but defaults to currentColor
  return (
    <svg 
      className={`w-full h-3 ${className}`} 
      viewBox="0 0 100 12" 
      preserveAspectRatio="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,6 L5,1 L15,11 L25,1 L35,11 L45,1 L55,11 L65,1 L75,11 L85,1 L95,11 L100,6" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
