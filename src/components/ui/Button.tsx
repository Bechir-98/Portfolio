import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'bg-accent text-ink font-semibold shadow-accent hover:brightness-110',
  ghost: 'text-paper-dim hover:text-accent',
  outline: 'border border-paper/25 text-paper hover:border-accent/60 hover:text-accent',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...rest
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-md transition-colors ${variants[variant]} ${sizes[size]} ${className}`

  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <Link to={href} className={baseClasses} {...(rest as any)}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={baseClasses} {...rest}>
      {children}
    </a>
  )
}
