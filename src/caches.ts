import { BoxGeometryProps, MeshPhongMaterialProps } from "@react-three/fiber";
import {
  BoxGeometry,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  MeshPhongMaterial,
  MeshPhongMaterialParameters,
} from "three";

const cachedBoxGeometries: Record<string, BoxGeometry> = {};
export function getCachedBoxGeometry([
  width,
  height,
  depth,
]: BoxGeometryProps["args"] = []) {
  const cacheKey = [width, height, depth].join("|");

  if (!cachedBoxGeometries[cacheKey]) {
    cachedBoxGeometries[cacheKey] = new BoxGeometry(width, height, depth);
  }

  return cachedBoxGeometries[cacheKey];
}

const cachedPhongMaterials: Record<string, MeshPhongMaterial> = {};
export function getCachedPhongMaterial({
  color,
  emissive,
  emissiveIntensity,
  shininess,
}: MeshPhongMaterialParameters) {
  const cacheKey = [color, emissive, emissiveIntensity, shininess].join("");

  if (!cachedPhongMaterials[cacheKey]) {
    cachedPhongMaterials[cacheKey] = new MeshPhongMaterial({
      color,
      emissive,
      emissiveIntensity,
      shininess,
    });
  }

  return cachedPhongMaterials[cacheKey];
}

const cachedLambertMaterials: Record<string, MeshLambertMaterial> = {};
export function getCachedLambertMaterial({
  color,
}: MeshLambertMaterialParameters) {
  const cacheKey = [color].join("|");

  if (!cachedLambertMaterials[cacheKey]) {
    cachedLambertMaterials[cacheKey] = new MeshLambertMaterial({
      color,
    });
  }

  return cachedLambertMaterials[cacheKey];
}
