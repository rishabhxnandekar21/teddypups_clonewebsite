export default function ScallopHem({
  color = 'var(--color-milk)',
  height = 14,
  inverted = false,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        lineHeight: 0,
        transform: inverted ? 'rotate(180deg)' : 'none',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height={height}
        viewBox="0 0 1200 14"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="tp-scallop-pat" width="44" height="14" patternUnits="userSpaceOnUse">
            {/* Semicircular scallop arc */}
            <path
              d="M0 0 H44 V2 A22 11 0 0 1 0 2 Z"
              fill={color}
            />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill="url(#tp-scallop-pat)" />
      </svg>
    </div>
  );
}
