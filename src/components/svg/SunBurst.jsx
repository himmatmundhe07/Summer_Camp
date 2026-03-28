export default function SunBurst({ className = '' }) {
  // 12 rays as thin rectangles, rotated 30deg each
  const rays = Array.from({ length: 12 }).map((_, i) => (
    <rect
      key={i}
      x="-3"
      y="-95"
      width="6"
      height="40"
      rx="3"
      fill="currentColor"
      transform={`rotate(${i * 30})`}
    />
  ));

  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(100,100)">
        {rays}
        <circle r="45" fill="currentColor" />
      </g>
    </svg>
  );
}
