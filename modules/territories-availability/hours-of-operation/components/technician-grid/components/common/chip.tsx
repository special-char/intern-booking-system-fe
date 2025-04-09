import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface GridChipProps {
  label: string
  textClassName: string
  wrapperClassName: string
  showIcon?: boolean
}

export function GridChip({ label, textClassName, wrapperClassName, showIcon = true }: GridChipProps) {
  return (
    <div className={cn("border rounded-lg p-1", wrapperClassName)}>
      <div className={cn("flex items-center gap-1", textClassName)}>
        {showIcon && <CircleCheck size={12} />}
        <span className="text-[0.5625rem]">{label}</span>
      </div>
    </div>
  );
}