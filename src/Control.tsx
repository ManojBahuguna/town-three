import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const maxPanDistance = 50;
export function Control() {
  const controlsRef = useRef<any>();

  useEffect(() => {
    const onControlsChange = () => {
      if (controlsRef.current.target.x < -maxPanDistance) {
        controlsRef.current.target.x = -maxPanDistance;
      } else if (controlsRef.current.target.x > maxPanDistance) {
        controlsRef.current.target.x = maxPanDistance;
      }

      if (controlsRef.current.target.z < -maxPanDistance) {
        controlsRef.current.target.z = -maxPanDistance;
      } else if (controlsRef.current.target.z > maxPanDistance) {
        controlsRef.current.target.z = maxPanDistance;
      }

      if (controlsRef.current.target.y < 1) {
        controlsRef.current.target.y = 1;
      } else if (controlsRef.current.target.y > maxPanDistance) {
        controlsRef.current.target.y = maxPanDistance;
      }
    };

    // limit pan distance
    controlsRef.current?.addEventListener("change", onControlsChange);

    return () => {
      controlsRef.current?.removeEventListener("change", onControlsChange);
    };
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      dampingFactor={0.04}
      minDistance={20}
      maxDistance={130}
      maxPolarAngle={Math.PI * 0.49}
      autoRotate
      autoRotateSpeed={.2}
    />
  );
}
