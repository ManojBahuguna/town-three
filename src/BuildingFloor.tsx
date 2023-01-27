import { MeshProps } from "@react-three/fiber";
import { Window } from "./Window";

export function BuildingFloor({
  width,
  depth,
  height = 5,
  ...props
}: MeshProps & { width: number; depth: number; height?: number }) {
  return (
    <mesh {...props}>
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

      <boxGeometry args={[width, height, depth]} />
      <meshLambertMaterial args={[{ color: 0x222244 }]} />
    </mesh>
  );
}
