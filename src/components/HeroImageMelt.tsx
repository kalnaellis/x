import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, ShaderMaterial } from 'three';

const v = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const f = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    float noise = random(vUv + uTime * 0.03);
    float edge = smoothstep(uProgress - 0.08, uProgress + 0.08, vUv.y + noise * 0.03);
    vec3 base = vec3(1.0);
    vec3 ink = vec3(0.96, 0.96, 0.96);
    gl_FragColor = vec4(mix(base, ink, edge), 0.06);
  }
`;

export function HeroImageMelt() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const mat = meshRef.current?.material as ShaderMaterial | undefined;
    if (!mat) {
      return;
    }
    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[16, 10]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0.5 },
        }}
        vertexShader={v}
        fragmentShader={f}
        transparent
      />
    </mesh>
  );
}
