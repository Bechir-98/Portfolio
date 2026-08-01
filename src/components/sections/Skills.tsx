import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { languages, skillGroups } from '../../content/skills'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="pb-24">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel section="skills" />
          <Heading className="mt-3">Skills & tools.</Heading>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-lg border border-paper/10 bg-ink-soft p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-paper">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-paper/15 bg-ink px-2.5 py-1 font-mono text-[10px] text-paper-dim transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10"
        >
          <h3 className="mb-4 font-heading text-xl font-semibold text-paper">Languages</h3>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <span
                key={lang.name}
                className="border border-paper/15 bg-ink-soft px-4 py-2 text-sm text-paper"
              >
                {lang.name} <span className="font-mono text-[10px] text-muted">({lang.level})</span>
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
