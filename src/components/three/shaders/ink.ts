export const inkVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;

attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;

  float swirl = sin(uTime * 0.25 + aPhase * 6.2831);
  p.x += cos(uTime * 0.18 + aPhase * 3.0) * 0.06;
  p.y += sin(uTime * 0.22 + aPhase * 2.0) * 0.06;
  p.z += cos(uTime * 0.16 + aPhase * 4.0) * 0.04;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = aSize * uPixelRatio * (140.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vColor = aColor;
  vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.6 + aPhase * 6.2831));
}
`

export const inkFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, vAlpha * a);
}
`
