import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../../content/experience'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="pb-24">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel section="experience" />
          <Heading className="mt-3">Experience.</Heading>
        </motion.div>

        <div className="mt-8 space-y-6">
          {experience.map((role, index) => (
            <motion.article
              key={role.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-lg border border-paper/10 bg-ink-soft p-5 sm:p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-paper">
                    {role.title}
                  </h3>
                  <p className="text-accent">{role.company}</p>
                  <p className="text-sm text-muted">{role.location}</p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {role.dates}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-paper-dim">
                {role.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
