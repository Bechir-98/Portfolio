import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { featuredProjects } from '../../content/projects'
import { ProjectCard } from '../ui/ProjectCard'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

export function Featured() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const spotlight = featuredProjects[0]
  const rest = featuredProjects.slice(1)

  return (
    <section id="featured" className="pb-24">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel section="featured" />
          <Heading className="mt-3">Selected work.</Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid gap-6 lg:grid-cols-3"
        >
          {spotlight ? (
            <article className="group relative overflow-hidden rounded-lg border border-paper/10 bg-ink-soft lg:col-span-2">
              {spotlight.image ? (
                <img
                  src={spotlight.image}
                  alt={`${spotlight.title} screenshot`}
                  loading="lazy"
                  className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Featured
                  </span>
                  {spotlight.gallery?.length || spotlight.liveUrl ? (
                    <span className="rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                      Demo ↗
                    </span>
                  ) : null}
                </div>
                <Link
                  to={`/projects/${spotlight.id}`}
                  className="font-heading text-3xl font-bold text-paper transition-colors hover:text-accent"
                >
                  {spotlight.title}
                </Link>
                <p className="mt-2 max-w-lg text-sm text-paper-dim">{spotlight.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {spotlight.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-paper/15 bg-ink/70 px-2 py-1 font-mono text-[10px] text-paper"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-6">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
