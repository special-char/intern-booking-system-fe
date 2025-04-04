import { ImageIcon, NotebookPenIcon } from "lucide-react";

interface PreInspectionNotificationIndicatorProps {
  amount: number,
  type: "remarks" | "photos"
}

export function PreInspectionNotificationIndicator({ amount, type }: PreInspectionNotificationIndicatorProps) {
  return (
    <div className="flex min-w-9 min-h-9 items-center justify-center relative top-1">
      {type === "remarks" ? <NotebookPenIcon size={20} /> : <ImageIcon size={20} />}
      <div className="absolute top-0 right-0.5 flex justify-center items-center bg-primary text-white text-xs rounded-full min-h-4 min-w-4 h-4 w-4">
        <span className="font-semibold">{amount}</span>
      </div>
    </div>
  );
}