import { useState } from "react";
import { type Mesh } from "three";
import { type MeshProps } from "@react-three/fiber";
import {
  getCachedBoxGeometry,
  getCachedCylinderGeometry,
  getCachedPhongMaterial,
} from "./caches";

const STREET_LIGHT_HEIGHT = 15;
const BULB_LENGTH = 3;
const ROD_RADIUS = 0.15;

export function StreetLight({ castShadow = true, ...props }: MeshProps) {
  const [target, setTarget] = useState<Mesh | null>(null);

  return (
    <mesh {...props}>
      {target && (
        <spotLight
          target={target}
          position-y={STREET_LIGHT_HEIGHT / 2}
          position-z={-BULB_LENGTH}
          castShadow={castShadow}
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          color={0xaaaaff}
          angle={0.8}
          intensity={0.4}
          penumbra={0.6}
          distance={60}
          power={200}
        >
          <mesh
            // bulb (white part)
            position-y={STREET_LIGHT_HEIGHT / 2 + 0.65}
            geometry={getCachedBoxGeometry([0.8, 0.2, BULB_LENGTH * 0.8])}
            material={getCachedPhongMaterial({
              color: 0x441122,
              emissive: 0xffffff,
              emissiveIntensity: 5,
              shininess: 2000,
            })}
            rotation-x={-0.6}
          />
          <mesh
            position-y={STREET_LIGHT_HEIGHT / 2 + 0.7}
            castShadow
            geometry={getCachedBoxGeometry([1, 0.2, BULB_LENGTH])}
            material={getCachedPhongMaterial({
              color: 0x331118,
              emissive: 0x000000,
              emissiveIntensity: 1,
              shininess: 1000,
            })}
            rotation-x={-0.6}
            position-z={-0.3}
          />
          <mesh
            castShadow
            position-z={-BULB_LENGTH / 2 + ROD_RADIUS}
            geometry={getCachedCylinderGeometry([
              ROD_RADIUS,
              ROD_RADIUS,
              STREET_LIGHT_HEIGHT,
            ])}
            material={getCachedPhongMaterial({
              color: 0x331118,
              emissive: 0x000000,
              emissiveIntensity: 1,
              shininess: 1000,
            })}
          />
        </spotLight>
      )}

      {/* spotlight will look at this target */}
      <mesh
        ref={(t) => setTarget(t)}
        position-z={12}
        geometry={getCachedBoxGeometry([0, 0, 0])}
      />
    </mesh>
  );
}
