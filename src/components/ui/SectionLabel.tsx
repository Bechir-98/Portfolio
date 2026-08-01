import { getSection } from '../../content/sections'

interface SectionLabelProps {
  section: string
  className?: string
}

export function SectionLabel({ section, className = '' }: SectionLabelProps) {
  const data = getSection(section)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        {data.number} / {data.title}
      </span>
      <span className="h-px flex-1 bg-paper/10" />
    </div>
  )
}
