import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, ShaderMaterial, Vector2 } from 'three';

const v = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const f = `
  varying vec2 vUv;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;

  float sparkle(vec2 uv, vec2 p) {
    float d = length(uv - p);
    return 0.015 / max(d, 0.01);
  }

  void main() {
    float s = sparkle(vUv, uMouse);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0);
    float c = s * pulse * uIntensity;
    gl_FragColor = vec4(vec3(c), c * 0.1);
  }
`;

export function CursorSparkles() {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const mat = meshRef.current?.material as ShaderMaterial | undefined;
      if (!mat) {
        return;
      }

      mat.uniforms.uMouse.value = new Vector2(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(({ clock }) => {
    const mat = meshRef.current?.material as ShaderMaterial | undefined;
    if (!mat) {
      return;
    }

    mat.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.5]}>
      <planeGeometry args={[16, 10]} />
      <shaderMaterial
        transparent
        uniforms={{
          uMouse: { value: new Vector2(0.5, 0.5) },
          uTime: { value: 0 },
          uIntensity: { value: 0.18 },
        }}
        vertexShader={v}
        fragmentShader={f}
      />
    </mesh>
  );
}
