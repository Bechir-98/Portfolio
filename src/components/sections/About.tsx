import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../../content/profile'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <motion.div {...reveal} transition={{ duration: 0.5 }}>
            <SectionLabel section="about" />
            <Heading className="mt-3">About me.</Heading>

            <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-paper-dim">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.aside
            ref={ref}
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg border border-paper/10 bg-ink-soft"
          >
            <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                profile data
              </span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            <ul className="divide-y divide-paper/5 px-5 py-2">
              {profile.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center justify-between gap-4 py-3 text-sm text-paper"
                >
                  <span>{fact}</span>
                  <span className="font-mono text-xs text-accent">›</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </Container>
    </section>
  )
}
