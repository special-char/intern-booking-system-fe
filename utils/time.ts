import { TimeMarker } from "@/components/common/time/time-markers";

export function formatRelativeTime(created_at: string | Date): string {
  const date =
    typeof created_at === "string" ? new Date(created_at) : created_at;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 60000) {
    return "just now";
  }

  if (diffMs < 3600000) {
    const minutes = Math.floor(diffMs / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  if (diffMs < 86400000) {
    const hours = Math.floor(diffMs / 3600000);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function secondsToTimeString(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function timeStringToSeconds(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60;
}

interface GenerateTimeMarkersInterface {
  minSeconds: number;
  maxSeconds: number;
  step: number;
}

export function getTimeMarkers({ minSeconds, maxSeconds, step }: GenerateTimeMarkersInterface): TimeMarker[] {
  const markers: TimeMarker[] = [];

  // Round maxSeconds to the nearest full hour if it exceeds the last minute
  if (maxSeconds % 3600 !== 0) {
    maxSeconds = Math.ceil(maxSeconds / 3600) * 3600;
  }

  for (let seconds = minSeconds; seconds <= maxSeconds; seconds += step) {
    markers.push({
      seconds,
      label: getTimeHoursBySeconds(seconds)
    });
  }

  return markers;
}

function getTimeHoursBySeconds(seconds: number): string {
  let hours: number = Math.floor(seconds / 3600) % 24;
  const suffix: string = getTimeHoursSuffix(hours)
  hours = hours % 12 || 12;
  return `${hours}${suffix}`;
}

export function getTimeHoursSuffix(hours: number): string {
  return hours >= 12 ? "pm" : "am";
}