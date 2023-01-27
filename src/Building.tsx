import { MeshProps } from "@react-three/fiber";
import { BuildingFloor } from "./BuildingFloor";
import { useMemo } from "react";

export interface BuildingData {
  width: number;
  depth: number;
  floors: number;
  floorHeight?: number;
}

export function Building({
  floors,
  width,
  depth,
  floorHeight = 8,
  ...props
}: MeshProps & BuildingData) {
  const floorMeshes = useMemo(() => {
    const list = [];
    for (
      let yPosition = floorHeight / 2;
      yPosition <= floors * floorHeight;
      yPosition += floorHeight
    ) {
      list.push(
        <BuildingFloor
          key={yPosition}
          position-y={yPosition}
          width={width}
          depth={depth}
          height={floorHeight}
        />
      );
    }
    return list;
  }, [floors]);

  // @todo add 'BuildingBase (door, street)' and 'BuildingRoof (boundary)'

  return (
    <>
      <mesh {...props}>{floorMeshes}</mesh>
    </>
  );
}
