import { useCallback, useEffect, useState } from 'react'
import { Lightbox } from './Lightbox'

interface GalleryProps {
  images: string[]
  title: string
}

export function Gallery({ images, title }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null)
  const [index, setIndex] = useState(0)

  const showPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showPrev, showNext])

  return (
    <div className="group relative overflow-hidden rounded-lg border border-paper/10 bg-ink-soft">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="relative w-full shrink-0 cursor-zoom-in text-left"
            aria-label={`${title} demo ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} demo ${i + 1}`}
              className="aspect-[16/10] w-full object-cover"
            />
            <span className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
              Demo {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={showPrev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/15 bg-ink-lift/80 p-2.5 text-paper backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-paper/15 bg-ink-lift/80 p-2.5 text-paper backdrop-blur-sm transition-colors hover:border-accent/60 hover:text-accent"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <span className="absolute bottom-4 right-4 rounded-md border border-paper/10 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </span>

      {active !== null ? (
        <Lightbox
          src={images[active]}
          alt={`${title} demo ${active + 1}`}
          onClose={() => setActive(null)}
        />
      ) : null}
    </div>
  )
}
