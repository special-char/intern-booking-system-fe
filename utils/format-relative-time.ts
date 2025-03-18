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
