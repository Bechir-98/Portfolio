import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { ScrollManager } from './ScrollManager'
import { FloatingAvatar } from '../components/three/FloatingAvatar'
import { useLenis } from '../hooks/useLenis'

export function SiteLayout() {
  useLenis()
  const { pathname } = useLocation()

  return (
    <div className="relative min-h-screen bg-ink text-paper">
      <ScrollManager />
      <Navbar />
      <main>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Loading…
              </span>
            </div>
          }
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <FloatingAvatar />
    </div>
  )
}
