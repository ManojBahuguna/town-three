export function randomItem<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function random(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}
