export function paramsToQueryKeys(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .sort(([a], [b]) => a.localeCompare(b))
    .flat(1)
}