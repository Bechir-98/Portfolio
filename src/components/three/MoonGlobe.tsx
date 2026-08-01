import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { asset } from '../../lib/paths'

const MOON_URL = asset('/models/moon.glb')

interface MoonGlobeProps {
  position: [number, number, number]
  scale: number
}

export function MoonGlobe({ position, scale }: MoonGlobeProps) {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MOON_URL)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={ref} position={position} scale={scale} rotation={[0.25, 0, 0.35]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MOON_URL)
