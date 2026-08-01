import { Link } from 'react-router-dom'
import type { Project } from '../../content/projects'
import { Badge } from './Badge'

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

const categoryTone = {
  'full-stack': 'cel',
  ai: 'sun',
  hackathon: 'film',
} as const

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-paper/10 bg-ink-soft transition-colors hover:border-accent/40">
      {project.image ? (
        <Link to={`/projects/${project.id}`} className="relative block overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 rounded-md border border-paper/20 bg-ink/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
            {project.year}
          </span>
        </Link>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/projects/${project.id}`}
              className="font-heading text-lg font-semibold text-paper transition-colors group-hover:text-accent"
            >
              {project.title}
            </Link>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          </div>
          <Badge tone={categoryTone[project.category]} className="shrink-0">
            {project.category}
          </Badge>
        </div>

        {!compact ? (
          <ul className="mb-4 space-y-2 text-sm leading-relaxed text-paper-dim">
            {project.summary.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4 text-sm leading-relaxed text-paper-dim">{project.tagline}</p>
        )}

        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-paper/10 bg-ink px-2 py-1 font-mono text-[10px] text-paper-dim"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-paper/5 pt-4">
          {project.gallery?.length || project.liveUrl ? (
            <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              Demo ↗
            </span>
          ) : null}
          <Link
            to={`/projects/${project.id}`}
            className="text-sm font-medium text-accent transition-colors hover:text-paper"
          >
            Case study →
          </Link>
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
