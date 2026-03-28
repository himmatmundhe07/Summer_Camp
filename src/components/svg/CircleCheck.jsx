export default function CircleCheck({ className = '', animated = false }) {
  // A circle with a checkmark path inside. 
  // Animated via stroke-dashoffset class provided in CSS.
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path 
        className={animated ? "animate-draw" : ""}
        style={animated ? { strokeDasharray: 24, strokeDashoffset: 24 } : {}}
        d="M8 12L11 15L16 9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
