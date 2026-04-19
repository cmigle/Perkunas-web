export default function BoltLogo({ size = 22, className = '', glow = true }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Perkūnas"
      className={className}
      style={glow ? { filter: 'drop-shadow(0 0 6px rgba(250,143,49,0.6))' } : undefined}
    >
      {/* Geometric lightning bolt — angular, Nothing-inspired */}
      <path
        d="M14.5 2 L5 13 H11 L9.5 22 L19 11 H13 L14.5 2 Z"
        fill="#FA8F31"
        stroke="#FA8F31"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
