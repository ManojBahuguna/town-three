import { MeshProps } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { randomItem } from "./utils";
import { getCachedBoxGeometry, getCachedPhongMaterial } from "./caches";

// only keep limited variants so that they can be cached and reused for performance
const windowColors = [0xff7777, 0xffff77, 0x223344];
const windowEmissiveIntensities = [0, 0.3, 1];

export function Window({
  width,
  height,
  ...props
}: MeshProps & { width: number; height: number }) {
  const [color] = useState(() => randomItem(windowColors));
  const [intensity, setIntensity] = useState(
    () => (Math.random() > 0.8 ? randomItem(windowEmissiveIntensities) : 0) // initially most windows are not lit
  );

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setIntensity(randomItem(windowEmissiveIntensities));
    }, Math.random() * 5000 + 1500); // random interval for each window

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <mesh
      geometry={getCachedBoxGeometry([width, height, 0.5])}
      material={getCachedPhongMaterial({
        color: 0x000011,
        shininess: 5000,
        emissive: color,
        emissiveIntensity: intensity,
      })}
      {...props}
    />
  );
}
