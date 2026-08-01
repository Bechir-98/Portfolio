# Model credits

All 3D assets in this folder are public domain / CC0. Keep this file when
redistributing the project.

## Moon

- `moon.glb` — NASA "CGI Moon Kit" / SVS 14959 `moon_small.glb`

Source: <https://svs.gsfc.nasa.gov/14959>. Public domain (NASA). Albedo
texture resized 4096 → 2048 to keep the hero payload small.

## Night-sky starfield (HDR)

- `starfield.hdr` — "Qwantani Night Pure Sky" 2K panorama

Source: <https://polyhaven.com/a/qwantani_night_puresky>. CC0, Poly Haven.
Rendered behind the scene by `src/components/three/StarSphere.tsx`.

The star particles (`Starfield`) are procedural — no model file.

## Avatar

- `avatar.glb` — personal stylized avatar (e.g. Ready Player Me export), used by
  `src/components/three/FloatingAvatar.tsx`. Own asset, not redistributed.
  Draco-compressed with `gltf-transform` (decoded at runtime by drei).
