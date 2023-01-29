import { MeshProps } from "@react-three/fiber";
import { Window } from "./Window";
import { getCachedBoxGeometry, getCachedLambertMaterial } from "./caches";

export function BuildingFloor({
  width,
  depth,
  height,
  ...props
}: MeshProps & { width: number; depth: number; height: number }) {
  return (
    <mesh
      castShadow
      receiveShadow
      material={getCachedLambertMaterial({ color: 0x251115 })}
      geometry={getCachedBoxGeometry([width, height, depth])}
      {...props}
    >
      {/* Front, Rear, Left, Right Windows */}
      <Window
        height={height * 0.6}
        width={width * 0.7}
        position-z={depth / 2 + 0.01}
      />

      <Window
        height={height * 0.6}
        width={width * 0.7}
        position-z={-depth / 2 - 0.01}
      />
      <Window
        height={height * 0.6}
        width={depth * 0.7}
        position-x={-width / 2 - 0.01}
        rotation-y={Math.PI / 2}
      />
      <Window
        height={height * 0.6}
        width={depth * 0.7}
        position-x={width / 2 + 0.01}
        rotation-y={Math.PI / 2}
      />
    </mesh>
  );
}
