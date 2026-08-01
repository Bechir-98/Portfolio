interface LogoProps {
  className?: string
  markOnly?: boolean
}

export function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="7"
          fill="var(--color-ink-lift)"
          stroke="rgba(232,237,243,0.18)"
        />
        <circle cx="13" cy="16" r="4.5" fill="var(--color-paper)" />
        <ellipse
          cx="13"
          cy="16"
          rx="9"
          ry="4"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          transform="rotate(-24 13 16)"
        />
        <circle cx="24" cy="10" r="1.4" fill="var(--color-accent)" />
      </svg>
      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold tracking-tight text-paper">
            BECHIR<span className="text-accent">.</span>
          </span>
          <span className="mt-0.5 h-[2px] w-full bg-accent" />
        </span>
      ) : null}
    </span>
  )
}
