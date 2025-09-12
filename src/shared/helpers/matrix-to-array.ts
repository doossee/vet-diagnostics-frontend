export function matrixToArray<T>(matrix: T[][]): T[] {
  let array: T[] = [];

  matrix?.forEach((item) => {
    array = array.concat(item);
  });

  return array;
}
