import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useCamera } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { BuildingRow } from "./BuildingsRow";
import { type BuildingData } from "./Building";
import { Control } from "./Control";

const leftBuildings: BuildingData[] = [
  { floors: 5, width: 15, depth: 13 },
  { floors: 3, width: 25, depth: 10, },
  { floors: 15, width: 10, depth: 20, floorHeight: 3 },
];

const rightBuildings: BuildingData[] = [
  { floors: 5, width: 20, depth: 30 },
  { floors: 6, width: 20, depth: 14 },
  { floors: 2, width: 10, depth: 14, floorHeight: 8 },
];

export function Town() {
  return (
    <Canvas shadows camera={{ position: [30, 60, 70], far: 1000 }}>
      {/* Objects */}
      <BuildingRow
        position-x={-40}
        position-z={-11}
        rotation-y={Math.PI / 2}
        rowData={leftBuildings}
      />
      <BuildingRow
        position-x={40}
        position-z={-11}
        rotation-y={-Math.PI / 2}
        rowData={rightBuildings}
      />

      {/* Environment */}
      <color attach="background" args={[0x222232]} />
      <hemisphereLight args={[0x443333, 0xeeeeff, 1]} />
      <ambientLight intensity={0.3} />
      <Stars radius={250} fade />
      <fog attach="fog" args={[0x664444, 2, 140]} />

      {/* Plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[500]} />
        {/* <planeGeometry args={[80, 80]} /> */}
        <meshLambertMaterial color={0x153322} />
      </mesh>

      {/* Controls */}
      <Control />
    </Canvas>
  );
}
