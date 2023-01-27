import { MeshProps } from "@react-three/fiber";
import { useMemo } from "react";
import { Building, type BuildingData } from "./Building";

export function BuildingRow({
  rowData,
  gap = 4,
  ...props
}: MeshProps & {
  rowData: BuildingData[];
  gap?: number;
}) {
  const buildings = useMemo(() => {
    let nextPositionX = 0;

    return rowData.map((b) => {
      const building = (
        <Building
          key={nextPositionX}
          position-x={nextPositionX + b.width/2}
          position-z={b.depth / 2}
          width={b.width}
          depth={b.depth}
          floors={b.floors}
          floorHeight={b.floorHeight}
        />
      );

      nextPositionX += b.width + gap;

      return building;
    });
  }, [rowData, gap]);

  return <mesh {...props}>{buildings}</mesh>;
}
