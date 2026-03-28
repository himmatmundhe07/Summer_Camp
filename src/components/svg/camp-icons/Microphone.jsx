export default function Microphone({ className = '' }) {
  // A capsule mic on a stand
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
      <rect x="18" y="6" width="12" height="20" rx="6" />
      <path d="M12 20V24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24V20" />
      <path d="M24 36V44" />
      <path d="M16 44H32" />
    </svg>
  );
}
