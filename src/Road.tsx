import { type MeshProps } from "@react-three/fiber";
import { StreetLight } from "./StreetLight";
import { getCachedBoxGeometry, getCachedLambertMaterial, getCachedPhongMaterial } from "./caches";
import { useMemo } from "react";

const ROAD_LENGTH = 400;

function RoadMarking(props: MeshProps) {
  return (
    <mesh
      receiveShadow
      geometry={getCachedBoxGeometry([8, 1, .5])}
      material={getCachedLambertMaterial({
        color: 0xffffff,
      })}
      position-y={0.1}
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

  return (
    <mesh
      receiveShadow
      geometry={getCachedBoxGeometry([ROAD_LENGTH, 1, 20])}
      material={getCachedPhongMaterial({ color: 0x110008, shininess: 2 })}
      {...props}
    >
      <StreetLight position-x={-100} position-z={-8} />
      <StreetLight position-x={-60} position-z={8} rotation-y={Math.PI} />

      <StreetLight position-x={-20} position-z={-8} />
      <StreetLight position-x={20} position-z={8} rotation-y={Math.PI} />

      <StreetLight position-x={60} position-z={-8} />
      <StreetLight position-x={100} position-z={8} rotation-y={Math.PI} />

      {roadMarkings}
    </mesh>
  );
}
