import { useRef } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { asset } from '../../lib/paths'

const NIGHT_TINT = new THREE.Color('#0a1420')

export function StarSphere() {
  const ref = useRef<THREE.Mesh>(null)
  const texture = useLoader(RGBELoader, asset('/models/starfield.hdr'))

  texture.mapping = THREE.EquirectangularReflectionMapping
  texture.needsUpdate = true

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.004
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[160, 48, 32]} />
      <meshBasicMaterial
        map={texture}
        color={NIGHT_TINT}
        side={THREE.BackSide}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  )
}
