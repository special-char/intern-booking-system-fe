import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  className?: string
  level?: "success" | "warning" | "error" | "default";
  label: string
}

export function StatusBadge({ className, level, label }: StatusBadgeProps) {
  const statusClassName = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    default: "bg-gray-100 text-gray-700"
  }[level ?? "default"];

  return (
    <div className={cn("inline-block px-2.5 py-0.5 rounded-full font-medium text-xs", statusClassName, className)}>
      {label}
    </div>
  );
}
