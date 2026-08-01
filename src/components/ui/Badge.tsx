import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'sun' | 'cel' | 'film' | 'paper'
  className?: string
}

const tones = {
  sun: 'text-accent border-accent/40 bg-accent/10',
  cel: 'text-accent-bright border-accent/50 bg-accent/10',
  film: 'text-danger border-danger/50 bg-danger/10',
  paper: 'text-paper-dim border-paper/20 bg-paper/5',
}

export function Badge({ children, tone = 'paper', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
