import type { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  variant?: 'section' | 'page' | 'card' | 'label'
  className?: string
}

const variants = {
  section: 'font-heading text-3xl font-bold text-paper sm:text-4xl',
  page: 'font-heading text-4xl font-bold text-paper sm:text-5xl',
  card: 'font-heading text-lg font-semibold text-paper',
  label: 'font-mono text-xs uppercase tracking-[0.25em] text-accent',
}

export function Heading({ children, variant = 'section', className = '' }: HeadingProps) {
  const Tag = variant === 'page' ? 'h1' : variant === 'card' ? 'h3' : 'h2'
  return <Tag className={`${variants[variant]} ${className}`}>{children}</Tag>
}
