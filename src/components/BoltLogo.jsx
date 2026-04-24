export default function BoltLogo({ size = 22, className = '', glow = true }) {
  // Matches the team's actual logo: outlined monochrome lightning bolt,
  // wrapped in a soft thunder-yellow glow.
  const glowStyle = glow
    ? {
        filter:
          'drop-shadow(0 0 2px rgba(253,216,53,0.95)) drop-shadow(0 0 6px rgba(253,216,53,0.55)) drop-shadow(0 0 14px rgba(250,143,49,0.35))'
      }
    : undefined;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Perkūnas"
      className={className}
      style={glowStyle}
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
