import { lazy, Suspense, useState } from 'react'
import { profile } from '../../content/profile'
import { Button } from '../ui/Button'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((module) => ({
    default: module.HeroScene,
  })),
)

function ProfileAvatar() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative mx-auto mb-8 h-32 w-32">
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-b from-accent/40 via-accent-dim/60 to-ink-lift blur-[2px]" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-paper/15 bg-ink-soft">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-accent">
            MBC
          </div>
        ) : (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6"
    >
      <Suspense
        fallback={
          <div className="bg-scene absolute inset-0" />
        }
      >
        <HeroScene />
      </Suspense>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          AI & full-stack engineer · {profile.location.toUpperCase()}
        </p>

        <ProfileAvatar />

        <h1 className="font-heading text-4xl font-bold text-paper sm:text-5xl lg:text-6xl">
          {profile.name}
          <span className="text-accent">.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper-dim sm:text-lg">
          {profile.headline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/#projects">View Projects</Button>
          <Button href={profile.cvUrl} download variant="outline">
            Download CV
          </Button>
          <Button
            href="https://linkedin.com/in/bechirchemam"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            LinkedIn
          </Button>
        </div>
      </div>

      <div className="absolute bottom-24 left-4 z-10 hidden -rotate-90 font-mono text-[10px] uppercase tracking-[0.35em] text-muted lg:block">
        <span className="inline-block h-px w-12 bg-muted align-middle" /> scroll
      </div>
    </section>
  )
}
