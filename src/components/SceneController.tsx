import { HeroImageMelt } from './HeroImageMelt';
import { CursorSparkles } from './CursorSparkles';

export function SceneController() {
  return (
    <>
      <ambientLight intensity={1.1} />
      <HeroImageMelt />
      <CursorSparkles />
    </>
  );
}
