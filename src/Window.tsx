import { MeshProps } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { randomItem } from "./utils";
import { getCachedBoxGeometry, getCachedPhongMaterial } from "./caches";

// only keep limited variants so that they can be cached and reused for performance
const windowColors = [0xff0000, 0xffff00, 0x222244, 0];
const windowEmissiveIntensities = [0.1, 0.3, 0.6];

export function Window({
  width,
  height,
  ...props
}: MeshProps & { width: number; height: number }) {
  const [color] = useState(() => randomItem(windowColors));
  const [intensity, setIntensity] = useState(() =>
    randomItem(windowEmissiveIntensities)
  );

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setIntensity(randomItem(windowEmissiveIntensities));
    }, Math.random() * 2000 + 500); // random interval for each window

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <mesh
      geometry={getCachedBoxGeometry([width, height, 0.5])}
      material={getCachedPhongMaterial({
        color: 0x000022,
        shininess: 100,
        emissive: color,
        emissiveIntensity: intensity,
      })}
      {...props}
    />
  );
}
