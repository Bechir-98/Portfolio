import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[], offset = 0.35) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: `${-offset * 100}% 0px -${(1 - offset) * 100}% 0px`, threshold: 0 },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
