export default function PawIcon({ size = 16, color = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main pad */}
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.5" />
      {/* 4 toe beans */}
      <circle cx="6" cy="9.5" r="2.2" />
      <circle cx="10" cy="6.8" r="2.2" />
      <circle cx="14" cy="6.8" r="2.2" />
      <circle cx="18" cy="9.5" r="2.2" />
    </svg>
  );
}
