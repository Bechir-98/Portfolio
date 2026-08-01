import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile } from '../../content/profile'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

export function Now() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="now" className="pb-24">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-lg border border-paper/10 bg-ink-soft"
        >
          <div className="flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                    Current status
                  </span>
                </div>
                <SectionLabel section="now" />
              </div>
              <Heading className="mt-3">What I'm building now.</Heading>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                What I'm building, teaching, and reading right now.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:max-w-xl">
              {profile.now.map((item, index) => (
                <li
                  key={item}
                  className="rounded-md border border-paper/10 bg-ink/60 px-4 py-3 text-sm text-paper"
                >
                  <span className="mr-2 font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
