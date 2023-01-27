import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei/core";

export function Town() {
  return (
    <Canvas shadows camera={{ position: [10, 30, 50] }}>
      {/* Objects */}

      {/* Environment */}
      <color attach="background" args={[0x222232]} />
      <hemisphereLight args={[0x443333, 0xeeeeff, 1]} />
      <ambientLight intensity={0.3} />
      <Stars />
      <fog attach="fog" args={[0x553333, -100, 200]} />

      {/* Plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={0x222244} />
      </mesh>

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
}
