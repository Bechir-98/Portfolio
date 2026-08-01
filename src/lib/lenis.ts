import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function scrollToId(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  if (lenis) {
    lenis.scrollTo(element, { offset: -72, duration: 1.2 })
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
