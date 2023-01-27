import { PointLightProps } from "@react-three/fiber";

export function Window({
  width,
  height,
  ...props
}: PointLightProps & { width: number; height: number }) {
  /**
   * @todo sometimes randomly blink window lights by increasing/decreasing material-emissiveIntensity & light-intensity
   */

  return (
    <pointLight args={[0xbbbbff, 2, 20, 2]} {...props}>
      <mesh>
        <boxGeometry args={[width, height, 0.5]} />
        <meshLambertMaterial
          color={0x0000ff}
          emissive={0xaaaaff}
          emissiveIntensity={1.5}
        />
      </mesh>
    </pointLight>
  );
}
