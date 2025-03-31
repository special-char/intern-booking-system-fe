export function safeParseJSON(value: string) {
  try {
    return JSON.parse(value)
  } catch {
    return {}
  }
}