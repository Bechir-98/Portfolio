import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/lenis'
import { useReducedMotion } from './useReducedMotion'

export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setLenis(null)
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])
}
