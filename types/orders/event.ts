export interface Event {
  id: string,
  title: string,
  start: string,
  end: string,
  type: "idle" | "installation" | "inspection" | "lunch" | "load",
}