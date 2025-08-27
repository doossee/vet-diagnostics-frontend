export function splitPathParam(str: string) {
  const parts = str.split('/').filter(Boolean) // убираем пустые
  if (parts.length < 2) return [str, undefined]
  return ["/" + parts[0], parts.slice(1).join('/')]
}