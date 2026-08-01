import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../content/projects'
import type { ProjectCategory } from '../../content/projects'
import { ProjectCard } from '../ui/ProjectCard'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

const filters: Array<{ label: string; value: ProjectCategory | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Full-stack', value: 'full-stack' },
  { label: 'AI', value: 'ai' },
  { label: 'Hackathon', value: 'hackathon' },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="projects" className="pb-24">
      <Container>
        <div
          ref={ref}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <SectionLabel section="projects" />
            <Heading className="mt-3">Projects.</Heading>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActive(filter.value)}
                aria-pressed={active === filter.value}
                className={`rounded-md border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                  active === filter.value
                    ? 'border-accent/60 bg-accent/10 text-accent'
                    : 'border-paper/15 text-muted hover:border-paper/30 hover:text-paper'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
