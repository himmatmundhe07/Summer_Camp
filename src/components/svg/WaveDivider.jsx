export default function WaveDivider({ color, className = '' }) {
  // A gentle organic wave used between sections. 
  // Prop: color (fill color of the incoming section).
  // Using viewBox="0 0 1440 100" to allow it to stretch across.
  return (
    <svg 
      viewBox="0 0 1440 100" 
      preserveAspectRatio="none" 
      className={`w-full h-12 md:h-16 ${className}`}
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,0 
           C480,100 960,100 1440,0 
           L1440,100 
           L0,100 Z" 
      />
    </svg>
  );
}
