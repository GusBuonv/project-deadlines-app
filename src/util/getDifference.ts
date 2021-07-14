/**
 * Get a new object containing the properties of a target that differ from a reference
 */
export default function getDifference<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { [key: string]: any },
>(target: T, ref: Partial<T>): Partial<T> {
  const result: Partial<T> = {};
  Object.keys(target).forEach((key: keyof T) => {
    if (target[key] !== ref[key]) { result[key] = target[key]; }
  });

  return result;
}
