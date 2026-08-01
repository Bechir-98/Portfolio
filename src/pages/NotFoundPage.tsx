import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  useDocumentMeta('404 · Not found', 'This page does not exist.')

  return (
    <section className="flex min-h-screen items-center justify-center px-4 pt-16">
      <Container size="narrow" className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          404 · Not found
        </p>
        <h1 className="mt-4 font-heading text-7xl font-bold text-paper sm:text-8xl">
          404<span className="text-accent">.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-paper-dim">
          The page you're looking for doesn't exist or has moved. Let's get you back on
          course.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:brightness-110"
          >
            Back to home
          </Link>
          <Link
            to="/#projects"
            className="rounded-md border border-paper/25 px-6 py-2.5 text-sm text-paper transition-colors hover:border-accent/60 hover:text-accent"
          >
            View projects
          </Link>
        </div>
      </Container>
    </section>
  )
}
