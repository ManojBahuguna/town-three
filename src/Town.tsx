import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Sky, Stars } from "@react-three/drei";
import { BuildingRow } from "./BuildingsRow";
import { type BuildingData } from "./Building";
import { Control } from "./Control";
import { useState } from "react";

// less variants used so that cached geometries can be reused
const wideFloor = { width: 24, depth: 30 };
const narrowFloor = { width: 16, depth: 20, floorHeight: 6 };

const leftBuildings: BuildingData[] = [
  { floors: 5, ...narrowFloor },
  { floors: 10, ...narrowFloor },
  { floors: 5, ...wideFloor },
];

const rightBuildings: BuildingData[] = [
  { floors: 7, ...wideFloor },
  { floors: 3, ...wideFloor },
  { floors: 3, ...narrowFloor },
];

export function Town() {
  const [dpr, setDpr] = useState(1);

  return (
    <Canvas
      dpr={dpr}
      shadows="soft"
      camera={{ position: [30, 60, 70], far: 1000 }}
    >
      <PerformanceMonitor
        onChange={({ factor }) => setDpr(Math.round(0.5 + 1.5 * factor))}
      />

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
      <Sky
        turbidity={0.8}
        rayleigh={0.00001}
        azimuth={0.34}
        inclination={0.6}
        mieCoefficient={0.0003}
      />
      <Stars radius={400} />
      <fog attach="fog" args={[0x443355, 2, 130]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[50, 80, -100]}
        castShadow
        color={0xffffff}
        intensity={0.7}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-top={-50}
        shadow-camera-bottom={50}
        shadow-camera-left={-50}
        shadow-camera-right={50}
      />

      {/* Plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[1000]} />
        {/* <planeGeometry args={[80, 80]} /> */}
        <meshLambertMaterial color={0x254342} />
      </mesh>

      {/* Controls */}
      <Control />
    </Canvas>
  );
}
