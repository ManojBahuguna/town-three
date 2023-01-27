import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { BuildingRow } from "./BuildingsRow";
import { type BuildingData } from "./Building";
import { Control } from "./Control";

const leftBuildings: BuildingData[] = [
  { floors: 5, width: 12, depth: 12 },
  { floors: 3, width: 25, depth: 10 },
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
      <ambientLight intensity={0.2} />
      <Stars radius={250} fade />
      <fog attach="fog" args={[0x443355, 2, 130]} />
      <directionalLight
        position={[200, 150, 200]}
        castShadow
        color={0xffffff}
        intensity={0.8}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-top={-100}
        shadow-camera-bottom={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
      />

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
