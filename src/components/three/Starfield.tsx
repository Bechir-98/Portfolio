import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { inkVertex, inkFragment } from './shaders/ink'

const STAR_COLORS = [
  new THREE.Color('#e8edf3'),
  new THREE.Color('#ffffff'),
  new THREE.Color('#3fd7e4'),
  new THREE.Color('#7aa2b7'),
  new THREE.Color('#4a6b7f'),
]

export function Starfield({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    }),
    [],
  )

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = 24 + Math.random() * 10
      const theta = Math.acos(2 * Math.random() - 1)
      const phi = Math.random() * Math.PI * 2

      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 0.6
      positions[i * 3 + 2] = r * Math.cos(theta)

      const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = 0.1 + Math.random() * 0.4
      phases[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    return geo
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: inkVertex,
        fragmentShader: inkFragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms],
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta * 0.4
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.008
    }
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}
