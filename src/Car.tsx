import { useRef } from "react";
import { type Mesh } from "three";
import { useFrame, type MeshProps } from "@react-three/fiber";
import {
  getCachedBoxGeometry,
  getCachedCylinderGeometry,
  getCachedLambertMaterial,
  getCachedPhongMaterial,
} from "./caches";
import { HeadLights } from "./HeadLights";
import { random } from "./utils";

function CarTyre({
  radius,
  thickness,
  ...props
}: MeshProps & { radius: number; thickness: number }) {
  return (
    <mesh
      position-y={radius}
      rotation-x={Math.PI / 2}
      geometry={getCachedCylinderGeometry([radius, radius, thickness])}
      material={getCachedLambertMaterial({ color: 0xffffff })}
      {...props}
    />
  );
}

function useMoveCar(minSpeed = 20, maxSpeed = 150, distance = 250) {
  const ref = useRef<Mesh | null>(null);
  const speedRef = useRef(random(minSpeed, maxSpeed));
  useFrame((state, delta) => {
    const car = ref.current;
    if (!car) return;

    const direction = car.rotation.y > Math.PI / 2 ? 1 : -1;
    car.position.x += delta * speedRef.current * direction;

    if (Math.abs(car.position.x) > distance) {
      car.position.x = distance * -direction;
      speedRef.current = random(minSpeed, maxSpeed); // random speed in each run
    }
  });
  return ref;
}

export function Car({
  height = 3,
  width = 2,
  length = 5,
  ...props
}: MeshProps & { height?: number; width?: number; length?: number }) {
  const tyreHeight = height * 0.45;
  const upperBodyHeight = height * 0.3;
  const lowerBodyHeight = height * 0.4;

  const lowerBodyY = tyreHeight / 2 + lowerBodyHeight / 3;
  const upperBodyY = lowerBodyY + lowerBodyHeight / 2 + upperBodyHeight / 2;

  const tyreRadius = tyreHeight / 2;
  const tyreThickness = tyreRadius * 0.3;
  const tyreXOffset = length * 0.3;
  const tyreZOffest = width / 2 + tyreThickness / 2;

  const carRef = useMoveCar();

  return (
    <mesh ref={carRef} {...props}>
      {/* Tyres */}
      <CarTyre
        // front left
        position-x={-tyreXOffset}
        position-z={tyreZOffest}
        radius={tyreRadius}
        thickness={tyreThickness}
      />
      <CarTyre
        // front right
        position-x={-tyreXOffset}
        position-z={-tyreZOffest}
        radius={tyreRadius}
        thickness={tyreThickness}
      />
      <CarTyre
        // rear left
        position-x={tyreXOffset}
        position-z={tyreZOffest}
        radius={tyreRadius}
        thickness={tyreThickness}
      />
      <CarTyre
        // rear right
        position-x={tyreXOffset}
        position-z={-tyreZOffest}
        radius={tyreRadius}
        thickness={tyreThickness}
      />

      {/* upper base */}
      <mesh
        position-y={upperBodyY}
        position-x={(length / 2) * 0.3}
        castShadow
        receiveShadow
        geometry={getCachedBoxGeometry([length * 0.6, upperBodyHeight, width])}
        material={getCachedPhongMaterial({
          color: 0x110005,
          emissive: 0xffaaaa,
          emissiveIntensity: 1,
          shininess: 1000,
        })}
      />

      {/* lower base */}
      <mesh
        position-y={lowerBodyY}
        castShadow
        receiveShadow
        geometry={getCachedBoxGeometry([length, lowerBodyHeight, width])}
        material={getCachedPhongMaterial({
          color: 0x110005,
          emissive: 0x775555,
          emissiveIntensity: 1,
          shininess: 1000,
        })}
      >
        <HeadLights
          position-x={-length / 2}
          radius={lowerBodyHeight / 5}
          offset={width / 3}
        />
      </mesh>
    </mesh>
  );
}
