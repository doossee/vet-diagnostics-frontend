function getValueByPath(item: unknown, path: string) {
  return path.split(".").reduce((acc: any, key) => acc?.[key], item as any);
}

export function searchUtil<T>(search: string, item: T, keys: string[]) {
  if (!search) return true;

  const searchLower = search.toLowerCase();

  return keys.some((key) => String(getValueByPath(item, key) ?? "").toLowerCase().includes(searchLower));
}
