import { Canvas } from '@react-three/fiber';
import { SceneController } from './SceneController';

export function CanvasBG() {
  return (
    <Canvas className="canvas-bg" dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }}>
      <SceneController />
    </Canvas>
  );
}
