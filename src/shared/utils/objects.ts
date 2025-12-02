export function pickDefined<T extends object>(obj: T): Partial<T> {
  return JSON.parse(
    JSON.stringify(obj, (_, v) => {
      if (v !== undefined && v !== null && v !== 'undefined' && v !== 'null') {
        return v as T[keyof T];
      }
    }),
  ) as Partial<T>;
}
