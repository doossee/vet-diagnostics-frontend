export function searchUtil<T>(search: string, item: T, keys: (keyof T)[]) {
  if (!search) return true;

  const searchLower = search.toLowerCase();

  return keys.some((key) => String(item[key]).toLowerCase().includes(searchLower));
}
