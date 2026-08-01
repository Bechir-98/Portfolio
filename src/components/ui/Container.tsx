import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow'
}

const sizes = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  narrow: 'max-w-3xl',
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
