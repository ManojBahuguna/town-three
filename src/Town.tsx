import { Canvas } from "@react-three/fiber";
import { Building, BuildingData } from "./Building";
import { OrbitControls } from "@react-three/drei";
import { Stars } from "@react-three/drei/core";
import { BuildingRow } from "./BuildingsRow";
import { DoubleSide } from "three";

const leftBuildings: BuildingData[] = [
  { floors: 5, width: 10, depth: 10 },
  { floors: 3, width: 20, depth: 10 },
  { floors: 8, width: 10, depth: 20 },
];

export function Town() {
  return (
    <Canvas shadows camera={{ position: [10, 30, 50] }}>
      {/* Objects */}
      <mesh position-x={-35} position-z={15}>
        <BuildingRow rotation-y={Math.PI / 2} rowData={leftBuildings} />
      </mesh>

      {/* Environment */}
      <color attach="background" args={[0x222232]} />
      <hemisphereLight args={[0x443333, 0xeeeeff, 1]} />
      <ambientLight intensity={0.3} />
      <Stars radius={200} />
      <fog attach="fog" args={[0x664444, -60, 130]} />

      {/* Plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshLambertMaterial color={0x252233} side={DoubleSide} />
      </mesh>

      {/* Controls */}
      <OrbitControls
        dampingFactor={0.02}
        maxDistance={130}
        maxPolarAngle={Math.PI * 0.495}
        enablePan={false}
      />
    </Canvas>
  );
}
