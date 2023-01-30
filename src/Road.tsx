import { type MeshProps } from "@react-three/fiber";
import { StreetLight } from "./StreetLight";
import {
  getCachedBoxGeometry,
  getCachedLambertMaterial,
  getCachedPhongMaterial,
} from "./caches";
import { useMemo } from "react";

const ROAD_LENGTH = 500;

function RoadMarking(props: MeshProps) {
  return (
    <mesh
      receiveShadow
      geometry={getCachedBoxGeometry([8, 1, 0.5])}
      material={getCachedLambertMaterial({
        color: 0xffffff,
      })}
      position-y={0.05}
      {...props}
    />
  );
}

export function Road(props: MeshProps) {
  const roadMarkings = useMemo(() => {
    const list = [];
    for (let posX = -ROAD_LENGTH / 2; posX < ROAD_LENGTH / 2; posX += 15) {
      list.push(<RoadMarking key={posX} position-x={posX} />);
    }
    return list;
  }, []);

  const streetLights = useMemo(() => {
    const startAt = -160;
    const gap = 50;
    const count = 7;

    // don't need shadows on lights that are far from view for performance
    const startShadowAtX = -70;
    const endShadowAtX = 70;

    const list = [];
    let posZ = -8;
    for (let posX = startAt, i = 0; i < count; posX += gap, i++) {
      list.push(
        <StreetLight
          castShadow={posX >= startShadowAtX && posX <= endShadowAtX}
          key={posX + posZ}
          position-x={posX}
          position-z={posZ}
          rotation-y={posZ > 0 ? Math.PI : 0}
        />
      );
      posZ = -posZ;
    }
    return list;
  }, []);

  return (
    <mesh
      receiveShadow
      geometry={getCachedBoxGeometry([ROAD_LENGTH, 1, 22])}
      material={getCachedLambertMaterial({ color: 0x110008 })}
      {...props}
    >
      {streetLights}

      {/* Left Road line */}
      <mesh
        receiveShadow
        geometry={getCachedBoxGeometry([ROAD_LENGTH, 1, 0.5])}
        material={getCachedPhongMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1,
          shininess: 5000,
        })}
        position-y={0.05}
        position-z={10}
      />

      {/* Right Road Line */}
      <mesh
        receiveShadow
        geometry={getCachedBoxGeometry([ROAD_LENGTH, 1, 0.5])}
        material={getCachedPhongMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1,
          shininess: 5000,
        })}
        position-y={0.05}
        position-z={-10}
      />

      {roadMarkings}
    </mesh>
  );
}
