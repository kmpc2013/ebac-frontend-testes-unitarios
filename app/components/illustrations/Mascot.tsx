type MascotProps = {
  variant?: 'idle' | 'empty' | 'celebrating'
  className?: string
}

export default function Mascot({ variant = 'idle', className }: MascotProps) {
  const smilePath =
    variant === 'celebrating'
      ? 'M36 58 Q50 76 64 58'
      : 'M38 58 Q50 68 62 58'

  const leftArmTransform =
    variant === 'celebrating' ? 'rotate(-50 22 60)' : 'rotate(-10 22 60)'
  const rightArmTransform =
    variant === 'celebrating' ? 'rotate(50 78 60)' : 'rotate(10 78 60)'

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {variant === 'celebrating' && (
        <g fill="var(--color-accent)">
          <path d="M12 20 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" />
          <path d="M88 30 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" />
          <path d="M78 10 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" />
        </g>
      )}

      {/* Braços */}
      <rect
        x="10"
        y="52"
        width="24"
        height="12"
        rx="6"
        fill="var(--color-primary-dark)"
        transform={leftArmTransform}
      />
      <rect
        x="66"
        y="52"
        width="24"
        height="12"
        rx="6"
        fill="var(--color-primary-dark)"
        transform={rightArmTransform}
      />

      {/* Corpo (blob orgânico) */}
      <path
        d="M50 8 C71 6 92 24 94 46 C96 68 79 90 53 92 C28 94 6 76 5 51 C4 27 25 10 50 8 Z"
        fill="var(--color-primary)"
      />

      {/* Prancheta */}
      <rect
        x="38"
        y="66"
        width="24"
        height="20"
        rx="4"
        fill="var(--color-surface)"
        opacity="0.9"
      />
      <rect x="42" y="70" width="16" height="2.5" rx="1.25" fill="var(--color-text-muted)" />
      <rect x="42" y="75" width="10" height="2.5" rx="1.25" fill="var(--color-text-muted)" />
      <path
        d="M43 81 l3 3 6 -6"
        fill="none"
        stroke="var(--color-success)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Olhos */}
      <circle cx="38" cy="45" r="7" fill="var(--color-surface)" />
      <circle cx="62" cy="45" r="7" fill="var(--color-surface)" />
      <circle cx="39" cy="46" r="3" fill="var(--color-text)" />
      <circle cx="63" cy="46" r="3" fill="var(--color-text)" />
      <circle cx="40.5" cy="44.5" r="1" fill="var(--color-surface)" />
      <circle cx="64.5" cy="44.5" r="1" fill="var(--color-surface)" />

      {variant === 'empty' && (
        <path
          d="M56 34 q6 -4 12 -1"
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}

      {/* Sorriso */}
      <path
        d={smilePath}
        fill="none"
        stroke="var(--color-surface)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
