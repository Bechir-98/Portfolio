import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { achievements, certifications } from '../../content/achievements'
import type { Certification } from '../../content/achievements'
import { AchievementBadge } from '../ui/AchievementBadge'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Lightbox } from '../ui/Lightbox'
import { SectionLabel } from '../ui/SectionLabel'

function CertificationCard({ cert }: { cert: Certification }) {
  const [imageError, setImageError] = useState(false)
  const [open, setOpen] = useState(false)

  if (!cert.image || imageError) {
    return (
      <div className="flex h-full flex-col justify-between rounded-lg border border-paper/10 bg-ink-soft p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          Certificate
        </span>
        <p className="mt-3 font-heading text-sm font-semibold text-paper">{cert.name}</p>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          Image pending
        </span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group overflow-hidden rounded-lg border border-paper/10 bg-ink-soft text-left transition-colors hover:border-accent/40"
    >
      <img
        src={cert.image}
        alt={cert.name}
        loading="lazy"
        onError={() => setImageError(true)}
        className="aspect-[4/3] w-full bg-ink object-contain p-2 transition-transform duration-500 group-hover:scale-105"
      />
      <p className="border-t border-paper/5 p-4 font-heading text-sm font-semibold text-paper">
        {cert.name}
      </p>
      {open ? (
        <Lightbox src={cert.image} alt={cert.name} onClose={() => setOpen(false)} />
      ) : null}
    </button>
  )
}

export function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="pb-24">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel section="achievements" />
          <Heading className="mt-3">Hackathon wins, leadership & certificates.</Heading>
        </motion.div>

        <div className="relative mt-8 space-y-6">
          <div className="absolute left-[21px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/40 via-accent-dim to-transparent md:block" />

          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="md:pl-12"
            >
              <div className="relative">
                <span className="absolute -left-12 top-8 hidden h-3 w-3 rounded-full border-2 border-accent bg-ink md:block" />
                <AchievementBadge achievement={achievement} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12"
        >
          <h3 className="mb-4 font-heading text-xl font-semibold text-paper">
            Certifications
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
