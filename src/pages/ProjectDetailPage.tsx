import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjectById } from '../content/projects'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Badge } from '../components/ui/Badge'
import { Gallery } from '../components/ui/Gallery'
import { NotFoundPage } from './NotFoundPage'

const categoryTone = {
  'full-stack': 'cel',
  ai: 'sun',
  hackathon: 'film',
} as const

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-paper/10 bg-ink-soft p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-1 text-sm text-paper">{children}</p>
    </div>
  )
}

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = getProjectById(id)

  useDocumentMeta(
    project ? `${project.title} · Bechir Chemam` : 'Project not found',
    project?.tagline,
  )

  if (!project) {
    return <NotFoundPage />
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <Container>
          <Link
            to="/#projects"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            ← Back to projects
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge tone={categoryTone[project.category]}>{project.category}</Badge>
              <Heading variant="page" className="mt-4">
                {project.title}
              </Heading>
              <p className="mt-3 text-lg text-paper-dim">{project.subtitle}</p>
              <p className="mt-2 text-paper-dim">{project.tagline}</p>
            </div>

            <div className="flex gap-3">
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:brightness-110"
                >
                  {link.label} ↗
                </a>
              ))}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-paper/25 px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent/60 hover:text-accent"
                >
                  Live demo ↗
                </a>
              ) : null}
            </div>
          </div>

          {project.gallery && project.gallery.length > 0 ? (
            <div className="mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Heading variant="label">Demo / Screenshots</Heading>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {project.gallery.length} images · click to zoom
                </span>
              </div>
              <p className="mt-2 max-w-xl text-sm text-paper-dim">
                Use the arrows to browse the demo screenshots.
              </p>
              <div className="mt-4">
                <Gallery images={project.gallery} title={project.title} />
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            <DetailRow label="Year">{project.year}</DetailRow>
            <DetailRow label="Role">{project.role}</DetailRow>
            <DetailRow label="Timeline">{project.timeline}</DetailRow>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-10">
              <div>
                <Heading variant="label">The problem</Heading>
                <p className="mt-3 text-base leading-relaxed text-paper-dim">
                  {project.challenge}
                </p>
              </div>

              <div>
                <Heading variant="label">What I did</Heading>
                <ul className="mt-4 space-y-3">
                  {project.solutions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Heading variant="label">Impact</Heading>
                <ul className="mt-4 space-y-3">
                  {project.impact.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="h-fit rounded-lg border border-paper/10 bg-ink-soft">
              <div className="border-b border-paper/10 px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Tech stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-paper/15 bg-ink px-2.5 py-1.5 font-mono text-[10px] text-paper-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="border-t border-paper/5 px-5 py-4">
                <Link
                  to="/#projects"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
                >
                  ← More projects
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
