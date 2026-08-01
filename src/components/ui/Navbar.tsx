import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Logo } from '../ui/Logo'

const navItems = [
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Featured', href: '/#featured', section: 'featured' },
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'Achievements', href: '/#achievements', section: 'achievements' },
  { label: 'Experience', href: '/#experience', section: 'experience' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(
    navItems.map((item) => item.section),
    0.4,
  )

  useEffect(() => {
    let raf = 0
    const handle = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
      })
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => {
      window.removeEventListener('scroll', handle)
      cancelAnimationFrame(raf)
    }
  }, [])

  const itemClass = (section: string) =>
    `relative px-1 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
      isHome && active === section ? 'text-accent' : 'text-muted hover:text-paper'
    }`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-paper/5 bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={() => setOpen(false)} aria-label="Home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href} className={itemClass(item.section)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/#contact"
            className="hidden rounded-md border border-accent/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:bg-accent/10 sm:inline-block"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-paper/15 lg:hidden"
          >
            <span className={`h-px w-5 bg-paper transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-paper transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-5 bg-paper transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-16 z-40 bg-ink/97 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading text-2xl text-paper hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-block rounded-md border border-accent/60 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  )
}
