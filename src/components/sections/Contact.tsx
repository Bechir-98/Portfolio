import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { profile } from '../../content/profile'
import { sendContactMessage } from '../../lib/email'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { SectionLabel } from '../ui/SectionLabel'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const ref = useRef(null)
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setStatus('sending')
    try {
      await sendContactMessage({
        name: String(data.get('name')),
        email: String(data.get('email')),
        message: String(data.get('message')),
      })
      event.currentTarget.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-md border border-paper/15 bg-ink px-4 py-3 text-sm text-paper placeholder:text-muted focus:border-accent/60 focus:outline-none'

  return (
    <section id="contact" className="pb-24" ref={ref}>
      <Container>
        <SectionLabel section="contact" />
        <Heading className="mt-3">Let's build something.</Heading>
        <p className="mt-3 max-w-2xl text-paper-dim">
          Open to internships, collaborations, and interesting projects. Messages are
          delivered straight to my inbox. No backend to maintain, just a human reply.
        </p>

        <div className="accent-line mt-10" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleSubmit} className="rounded-lg border border-paper/10 bg-ink-soft p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Name
                </span>
                <input name="name" required placeholder="Your name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about the project…"
                className={`${inputClass} resize-none`}
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending'
                ? 'Sending…'
                : status === 'sent'
                  ? 'Message sent'
                  : 'Send message'}
            </button>
            {status === 'sent' && (
              <p className="mt-3 text-sm text-accent">Thanks! Your message is on its way.</p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-sm text-danger">
                Something went wrong. Please email me directly at {profile.email}.
              </p>
            )}
          </form>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {profile.socials.map((social) => (
              <a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-paper/10 bg-ink-soft p-5 transition-colors hover:border-accent/40"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {social.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-paper">
                    {social.icon === 'email' ? profile.email : 'Visit profile →'}
                  </p>
                </div>
                <span className="font-heading text-2xl text-accent">↗</span>
              </a>
            ))}
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-between rounded-lg border border-paper/10 bg-ink-soft p-5 transition-colors hover:border-accent/40"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium text-paper">{profile.phone}</p>
              </div>
              <span className="font-heading text-2xl text-accent">↗</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
