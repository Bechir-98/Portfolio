import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Container } from '../components/ui/Container'
import { Heading } from '../components/ui/Heading'
import { Button } from '../components/ui/Button'

export function AboutPage() {
  useDocumentMeta('About · Bechir Chemam', 'About Mohamed Bechir Chemam, full-stack developer and AI enthusiast.')

  return (
    <>
      <section className="pt-32 pb-12">
        <Container size="narrow">
          <Heading variant="label">About</Heading>
          <Heading variant="page" className="mt-3">
            Hi, I'm Bechir<span className="text-accent">.</span>
          </Heading>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-paper-dim">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container size="narrow">
          <Heading variant="label">Currently</Heading>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {profile.now.map((item, index) => (
              <li
                key={item}
                className="rounded-md border border-paper/10 bg-ink-soft px-4 py-3 text-sm text-paper"
              >
                <span className="mr-2 font-mono text-[10px] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pb-24">
        <Container size="narrow">
          <Heading variant="label">Quick facts</Heading>
          <ul className="mt-4 divide-y divide-paper/5 rounded-lg border border-paper/10 bg-ink-soft">
            {profile.facts.map((fact) => (
              <li key={fact} className="flex items-center justify-between px-4 py-3 text-sm text-paper">
                <span>{fact}</span>
                <span className="font-mono text-xs text-accent">›</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/#contact">Work with me</Button>
            <Button href="/#projects" variant="outline">
              See the projects
            </Button>
            <Link
              to="/"
              className="inline-flex items-center px-2 py-2 text-sm text-muted transition-colors hover:text-accent"
            >
              ← Home
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
