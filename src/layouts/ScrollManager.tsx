import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis, scrollToId } from '../lib/lenis'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = window.setTimeout(() => scrollToId(id), 80)
      return () => window.clearTimeout(timer)
    }

    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}
