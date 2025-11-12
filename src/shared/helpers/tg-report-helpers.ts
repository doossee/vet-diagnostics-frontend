export function extractFilePath(file?: string): string {
  if (!file) return "-";
  try {
    const decoded = decodeURIComponent(file);
    const match = decoded.match(/src\/[^\s)]+\.tsx?/);
    if (match) return match[0];
    const chunkMatch = decoded.match(/chunks\/([^\/]+)\./);
    if (chunkMatch) return `chunk: ${chunkMatch?.[1]}`;
  } catch {}
  return "-";
}

export function cleanPageUrl(url?: string) {
  if (!url) return "-";
  try {
    return url?.replace(/^https?:\/\/[^/]+/i, "");;
  } catch {
    return url;
  }
}

export function simplifyBrowser(ua?: string) {
  if (!ua) return "-";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  return "Неизвестный браузер";
}

export function translateType(type?: string) {
  switch (type) {
    case "runtime":
      return "Ошибка выполнения";
    case "promise":
      return "Ошибка промиса";
    case "react":
      return "Ошибка React";
    default:
      return "Неизвестная ошибка";
  }
}
