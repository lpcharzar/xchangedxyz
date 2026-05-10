import { Suspense, lazy, useEffect, useState } from "react";

const Scene = lazy(() => import("./HeroSceneInner"));

const HeroScene = () => {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile && !reduced) setEnable(true);
  }, []);

  if (!enable) return null;

  return (
    <div className="hero-canvas opacity-80">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
};

export default HeroScene;
