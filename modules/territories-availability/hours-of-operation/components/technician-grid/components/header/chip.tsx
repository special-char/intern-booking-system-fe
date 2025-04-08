import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface TechnicianGridHeaderChipProps {
  label: string
  textClassName: string
  wrapperClassName: string
}

export function TechnicianGridHeaderChip({ label, textClassName, wrapperClassName }: TechnicianGridHeaderChipProps) {
  return (
    <div className={cn("border rounded-lg p-1", wrapperClassName)}>
      <div className={cn("flex items-center gap-1", textClassName)}>
        <CircleCheck size={12} />
        <span className="text-[0.5625rem]">{label}</span>
      </div>
    </div>
  );
}