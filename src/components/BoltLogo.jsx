export default function BoltLogo({ size = 22, className = '', glow = false }) {
  // Matches the team's actual logo: outlined monochrome lightning bolt,
  // not a filled accent mark.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Perkūnas"
      className={className}
      style={glow ? { filter: 'drop-shadow(0 0 4px rgba(31,168,255,0.5))' } : undefined}
    >
      <path
        d="M14.5 2 L5 13 H11 L9.5 22 L19 11 H13 L14.5 2 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
