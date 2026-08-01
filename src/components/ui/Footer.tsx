import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { scrollToTop } from '../../lib/lenis'
import { Logo } from '../ui/Logo'

const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-paper/5">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div>
            <Link to="/" aria-label="Home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
              {profile.headline}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Index
              </p>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-paper-dim transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Signal
              </p>
              <ul className="space-y-2">
                {profile.socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-paper-dim transition-colors hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="self-start font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            ↑ Back to top
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Tailwind.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Online · {profile.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
