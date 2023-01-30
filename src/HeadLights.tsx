import { useState } from "react";
import { type Mesh } from "three";
import { type MeshProps } from "@react-three/fiber";
import {
  getCachedBoxGeometry,
  getCachedCylinderGeometry,
  getCachedPhongMaterial,
} from "./caches";

export function HeadLights({
  offset,
  radius,
  ...props
}: MeshProps & { radius: number; offset: number }) {
  const [target, setTarget] = useState<Mesh | null>(null);

  return (
    <mesh {...props}>
      {target && (
        <spotLight
          position-y={0}
          rotation-z={Math.PI / 2}
          target={target}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          color={0xeeffee}
          angle={.6}
          intensity={0.5}
          penumbra={0.3}
          distance={30}
          power={800}
        >
          <mesh
            position-z={-offset}
            geometry={getCachedCylinderGeometry([radius, radius, 0.2])}
            material={getCachedPhongMaterial({
              color: 0xffffff,
              emissive: 0xffffff,
              emissiveIntensity: 1,
              shininess: 5000,
            })}
          />

          <mesh
            position-z={offset}
            geometry={getCachedCylinderGeometry([radius, radius, 0.2])}
            material={getCachedPhongMaterial({
              color: 0xffffff,
              emissive: 0xffffff,
              emissiveIntensity: 1,
              shininess: 5000,
            })}
          />
        </spotLight>
      )}

      {/* spotlight will look at this target */}
      <mesh
        ref={(t) => setTarget(t)}
        position-x={-1}
        position-y={-0.2}
        geometry={getCachedBoxGeometry([0, 0, 0])}
      />
    </mesh>
  );
}
