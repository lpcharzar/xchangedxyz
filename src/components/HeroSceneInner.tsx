import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const TOKENS = [
  { color: "#f7931a", radius: 2.2, speed: 0.18, size: 0.32, offset: 0 },     // BTC orange
  { color: "#627eea", radius: 2.9, speed: -0.14, size: 0.26, offset: 1.4 },  // ETH
  { color: "#14F195", radius: 3.5, speed: 0.11, size: 0.22, offset: 2.8 },   // SOL
  { color: "#26A17B", radius: 4.1, speed: -0.09, size: 0.18, offset: 4.1 },  // USDT
  { color: "#9945FF", radius: 4.6, speed: 0.07, size: 0.16, offset: 5.5 },   // purple
];

function Orbiting({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // parallax tilt toward cursor
    groupRef.current.rotation.y += (pointer.current.x * 0.4 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (pointer.current.y * 0.3 - groupRef.current.rotation.x) * 0.05;
    // base slow spin
    groupRef.current.children.forEach((child, i) => {
      const t = TOKENS[i];
      if (!t) return;
      const time = state.clock.elapsedTime * t.speed + t.offset;
      child.position.x = Math.cos(time) * t.radius;
      child.position.z = Math.sin(time) * t.radius;
      child.position.y = Math.sin(time * 1.7) * 0.4;
    });
  });

  const meshes = useMemo(
    () =>
      TOKENS.map((t, i) => (
        <mesh key={i}>
          <sphereGeometry args={[t.size, 32, 32]} />
          <meshStandardMaterial
            color={t.color}
            emissive={t.color}
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.6}
          />
        </mesh>
      )),
    []
  );

  return <group ref={groupRef}>{meshes}</group>;
}

const HeroSceneInner = () => {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.4, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        pointer.current.x = x;
        pointer.current.y = y;
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#a855f7" />
      <Orbiting pointer={pointer} />
    </Canvas>
  );
};

export default HeroSceneInner;
