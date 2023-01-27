import { PointLightProps } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { randomItem } from "./utils";

const windowColors = [0xff0000, 0xffff00, 0x00ff00, 0x222244, 0];

export function Window({
  width,
  height,
  ...props
}: PointLightProps & { width: number; height: number }) {
  const [color] = useState(() => randomItem(windowColors));
  const [intensity, setIntensity] = useState(
    Math.max(Math.random() - 0.85, 0) * 10 // initially very small percent of windows will be lit
  );

  useEffect(() => {
    if (Math.random() < 0.2) return; // don't ever change for a small percentage of windows

    const intervalRef = setInterval(() => {
      setIntensity(Math.max(Math.random() - 0.2, 0) * 10);
    }, Math.random() * 3000 + 1000); // random interval for each window

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <pointLight args={[0xbbbbff, intensity, 20, 2]} {...props}>
      <mesh>
        <boxGeometry args={[width, height, 0.5]} />
        <meshLambertMaterial
          color={0x000022}
          emissive={color}
          emissiveIntensity={intensity}
        />
      </mesh>
    </pointLight>
  );
}
