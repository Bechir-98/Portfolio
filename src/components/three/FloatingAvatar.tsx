import {
  Component,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useLocation } from 'react-router-dom'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { asset } from '../../lib/paths'

useGLTF.setDecoderPath(asset('draco/'))

const MODEL_PATH = asset('/models/avatar.glb')
const TARGET_HEIGHT = 2.2
const CAMERA_DISTANCE = 4.2
const EYE_LIMIT_X = 0.35
const EYE_LIMIT_Y = 0.3
const LEAN_YAW = 0.12
const LEAN_PITCH = 0.08
const FX_SPIN = 0
const FX_HOP = 1
const FX_SHAKE = 2
const FX_BOW = 3
const FX_DURATIONS = [0.8, 0.9, 0.4, 0.7]
const DRAG_SENS = 0.008
const PITCH_LIMIT = 0.6
const DRAG_THRESHOLD = 4

const _eyeEuler = new THREE.Euler()
const _eyeOffset = new THREE.Quaternion()

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3)

function playFx(group: THREE.Group, anim: number, p: number) {
  switch (anim) {
    case FX_SPIN:
      group.rotation.y += Math.PI * 2 * easeOutCubic(p)
      break
    case FX_HOP: {
      const bounce = Math.pow(Math.sin(p * Math.PI * 2), 2)
      group.position.y += bounce * 0.5
      const squash = 1 + Math.sin(p * Math.PI * 2) * 0.08
      group.scale.set(2 - squash, squash, 2 - squash)
      break
    }
    case FX_SHAKE:
      group.rotation.y += Math.sin(p * Math.PI * 8) * 0.18 * (1 - p)
      break
    case FX_BOW:
      group.rotation.x += Math.sin(p * Math.PI) * 0.55
      break
  }
}

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return pointer
}

function AvatarModel({
  reduced,
  clickBus,
  routeBus,
  dragBus,
}: {
  reduced: boolean
  clickBus: { count: number }
  routeBus: { count: number }
  dragBus: { yaw: number; pitch: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const dragRef = useRef<THREE.Group>(null)
  const fxRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)
  const pointer = usePointer()
  const fx = useRef({ anim: -1, start: 0, playing: false })
  const lastClick = useRef(0)
  const lastRoute = useRef(0)
  const { scene } = useGLTF(MODEL_PATH)

  useEffect(() => {
    return () => useGLTF.clear(MODEL_PATH)
  }, [])

  useEffect(() => {
    let raf = 0
    const handle = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        scrollRef.current = max > 0 ? window.scrollY / max : 0
      })
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => {
      window.removeEventListener('scroll', handle)
      cancelAnimationFrame(raf)
    }
  }, [])

  const model = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (!mesh.isMesh) return
      if (mesh.material) {
        const original = mesh.material
        const materials = Array.isArray(original) ? original : [original]
        const cloned = materials.map((material) => {
          const mat = material.clone()
          if ((mat as THREE.MeshStandardMaterial).metalness !== undefined) {
            const standard = mat as THREE.MeshStandardMaterial
            standard.metalness = Math.min(standard.metalness || 1, 0.35)
          }
          return mat
        })
        mesh.material = Array.isArray(original) ? cloned : cloned[0]
      }
      mesh.castShadow = true
    })
    return clone
  }, [scene])

  const fitRef = useRef({ scale: 1, offsetY: 0 })
  const eyeRef = useRef<{ object: THREE.Object3D; base: THREE.Quaternion } | null>(null)

  useLayoutEffect(() => {
    if (!model) return
    const eye = model.getObjectByName('Eye')
    eyeRef.current = eye ? { object: eye, base: eye.quaternion.clone() } : null
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    const height = size.y || 1
    const scale = TARGET_HEIGHT / height
    fitRef.current.scale = scale
    fitRef.current.offsetY = -center.y * scale
  }, [model])

  useFrame((state, delta) => {
    const group = groupRef.current
    const dragGroup = dragRef.current
    const fxGroup = fxRef.current
    if (!group || !dragGroup || !fxGroup) return

    const t = state.clock.elapsedTime

    if (clickBus.count !== lastClick.current) {
      lastClick.current = clickBus.count
      fx.current.anim = (fx.current.anim + 1) % FX_DURATIONS.length
      fx.current.start = t
      fx.current.playing = true
    }

    if (routeBus.count !== lastRoute.current) {
      lastRoute.current = routeBus.count
      fx.current.anim = FX_SPIN
      fx.current.start = t
      fx.current.playing = true
    }

    if (!reduced) {
      dragGroup.rotation.set(dragBus.pitch, dragBus.yaw, 0)

      const bob = Math.sin(t * 1.1) * 0.03
      const sway = Math.cos(t * 0.7) * 0.04

      const smoothed = THREE.MathUtils.damp(
        group.userData.scroll ?? 0,
        scrollRef.current,
        4,
        delta,
      )
      group.userData.scroll = smoothed

      group.scale.setScalar(fitRef.current.scale)
      group.position.y = fitRef.current.offsetY + bob
      group.rotation.z = sway
      group.rotation.y = smoothed * 1.6
      group.position.x = smoothed * 0.25

      const leanYaw = THREE.MathUtils.damp(
        fxGroup.userData.leanYaw ?? 0,
        pointer.current.x * LEAN_YAW,
        3,
        delta,
      )
      const leanPitch = THREE.MathUtils.damp(
        fxGroup.userData.leanPitch ?? 0,
        -pointer.current.y * LEAN_PITCH,
        3,
        delta,
      )
      fxGroup.userData.leanYaw = leanYaw
      fxGroup.userData.leanPitch = leanPitch

      fxGroup.position.set(0, 0, 0)
      fxGroup.scale.set(1, 1, 1)
      fxGroup.rotation.set(leanPitch, leanYaw, 0)

      if (fx.current.playing) {
        const p = Math.min((t - fx.current.start) / FX_DURATIONS[fx.current.anim], 1)
        playFx(fxGroup, fx.current.anim, p)
        if (p >= 1) fx.current.playing = false
      }

      if (eyeRef.current) {
        const { object: eye, base } = eyeRef.current
        const yaw = THREE.MathUtils.damp(
          eye.userData.eyeYaw ?? 0,
          pointer.current.x * EYE_LIMIT_X,
          6,
          delta,
        )
        const pitch = THREE.MathUtils.damp(
          eye.userData.eyePitch ?? 0,
          -pointer.current.y * EYE_LIMIT_Y,
          6,
          delta,
        )
        eye.userData.eyeYaw = yaw
        eye.userData.eyePitch = pitch
        eye.quaternion
          .copy(base)
          .multiply(_eyeOffset.setFromEuler(_eyeEuler.set(pitch, yaw, 0)))
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, fitRef.current.offsetY, 0]} scale={fitRef.current.scale}>
      <group ref={dragRef}>
        <group ref={fxRef}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  )
}

function StudioEnvironment() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap
    return () => {
      scene.environment = null
      envMap.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#e8f4fa" />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#3fd7e4" />
      <directionalLight position={[0, 3, -4]} intensity={0.35} color="#445266" />
    </>
  )
}

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function FloatingAvatar() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()
  const clickBus = useRef({ count: 0 })
  const routeBus = useRef({ count: 0 })
  const dragBus = useRef({ yaw: 0, pitch: 0 })
  const drag = useRef({ active: false, startX: 0, startY: 0, moved: false })
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      routeBus.current.count += 1
    }
  }, [pathname])

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = true
    drag.current.moved = false
    drag.current.startX = event.clientX
    drag.current.startY = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.style.cursor = 'grabbing'
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const dx = event.clientX - drag.current.startX
    const dy = event.clientY - drag.current.startY
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.current.moved = true
    drag.current.startX = event.clientX
    drag.current.startY = event.clientY
    dragBus.current.yaw += dx * DRAG_SENS
    dragBus.current.pitch = THREE.MathUtils.clamp(
      dragBus.current.pitch - dy * DRAG_SENS,
      -PITCH_LIMIT,
      PITCH_LIMIT,
    )
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    event.currentTarget.style.cursor = ''
  }

  const handleClick = () => {
    if (drag.current.moved) return
    clickBus.current.count += 1
  }

  if (isMobile || reduced) return null

  return createPortal(
    <div
      className="pointer-events-auto fixed bottom-6 right-6 z-30 hidden h-64 w-48 cursor-grab touch-none select-none md:block"
      role="button"
      aria-label="Spin the avatar; click for an animation"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      <AvatarErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, CAMERA_DISTANCE], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Lights />
          <AvatarModel
            reduced={reduced}
            clickBus={clickBus.current}
            routeBus={routeBus.current}
            dragBus={dragBus.current}
          />
          <StudioEnvironment />
        </Canvas>
      </AvatarErrorBoundary>
    </div>,
    document.body,
  )
}
