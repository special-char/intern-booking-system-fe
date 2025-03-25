type NestedObject<T> = {
  [key: string]: T | NestedObject<T>;
};

export function getObjectValueByPath<T>(obj: NestedObject<T>, path: string): T | undefined {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as NestedObject<T>)[key];
    }
    return;
  }, obj) as T | undefined;
}