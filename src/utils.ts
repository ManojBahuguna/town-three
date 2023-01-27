export function randomItem<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}
