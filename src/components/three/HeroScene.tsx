import { Component, Suspense, useEffect, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { StarSphere } from './StarSphere'
import { MoonGlobe } from './MoonGlobe'
import { Starfield } from './Starfield'

class PostProcessingBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function usePointer() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return mouse
}

function useScrollFraction() {
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    let raf = 0
    const handle = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const progress = window.scrollY / Math.max(window.innerHeight, 1)
        setScroll(Math.max(0, Math.min(progress, 1)))
      })
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => {
      window.removeEventListener('scroll', handle)
      cancelAnimationFrame(raf)
    }
  }, [])

  return scroll
}

function CameraRig({ mouseX, mouseY, scroll }: { mouseX: number; mouseY: number; scroll: number }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 0.45, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouseY * 0.3 + scroll * 0.4, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={1.5} color="#dff0f7" />
      <directionalLight position={[-8, -4, 2]} intensity={0.5} color="#3fd7e4" />
      <directionalLight position={[0, 3, -6]} intensity={0.45} color="#445266" />
    </>
  )
}

interface SceneContentProps {
  particleCount: number
  postprocess: boolean
  showMoon: boolean
}

function SceneContent({ particleCount, postprocess, showMoon }: SceneContentProps) {
  const mouse = usePointer()
  const scroll = useScrollFraction()

  return (
    <>
      <CameraRig mouseX={mouse.x} mouseY={mouse.y} scroll={scroll} />
      <Lights />
      <Starfield count={particleCount} />
      <Suspense fallback={null}>
        <StarSphere />
        {showMoon ? <MoonGlobe position={[4.4, 1.7, -9]} scale={2} /> : null}
      </Suspense>
      {postprocess ? (
        <PostProcessingBoundary>
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.5} luminanceThreshold={0.3} mipmapBlur />
          </EffectComposer>
        </PostProcessingBoundary>
      ) : null}
    </>
  )
}

interface Settings {
  particleCount: number
  postprocess: boolean
  showMoon: boolean
  show3d: boolean
}

function useSceneSettings(): Settings {
  const [settings, setSettings] = useState<Settings>({
    particleCount: 1200,
    postprocess: true,
    showMoon: true,
    show3d: true,
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const lowMemory =
      'deviceMemory' in navigator &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) < 4

    if (reducedMotion || lowMemory) {
      setSettings({ particleCount: 0, postprocess: false, showMoon: false, show3d: false })
    } else if (isMobile) {
      setSettings({ particleCount: 500, postprocess: false, showMoon: false, show3d: true })
    }
  }, [])

  return settings
}

export function HeroScene() {
  const { particleCount, postprocess, showMoon, show3d } = useSceneSettings()

  if (!show3d) {
    return <div className="bg-scene absolute inset-0" />
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={<div className="bg-scene absolute inset-0" />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <SceneContent particleCount={particleCount} postprocess={postprocess} showMoon={showMoon} />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
    </div>
  )
}
