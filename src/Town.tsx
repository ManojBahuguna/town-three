import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useCamera } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { BuildingRow } from "./BuildingsRow";
import { type BuildingData } from "./Building";
import { Control } from "./Control";

const leftBuildings: BuildingData[] = [
  { floors: 5, width: 10, depth: 13 },
  { floors: 3, width: 20, depth: 10 },
  { floors: 8, width: 10, depth: 20 },
];

export function Town() {
  return (
    <Canvas shadows camera={{ position: [10, 40, 60], far: 1000 }}>
      {/* Objects */}
      <mesh position-x={-35} position-z={15}>
        <BuildingRow rotation-y={Math.PI / 2} rowData={leftBuildings} />
      </mesh>

      {/* Environment */}
      <color attach="background" args={[0x222232]} />
      <hemisphereLight args={[0x443333, 0xeeeeff, 1]} />
      <ambientLight intensity={0.3} />
      <Stars radius={300} fade />
      <fog attach="fog" args={[0x664444, -60, 130]} />

      {/* Plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[500]} />
        <meshLambertMaterial color={0x252233} />
      </mesh>

      {/* Controls */}
      <Control />
    </Canvas>
  );
}
