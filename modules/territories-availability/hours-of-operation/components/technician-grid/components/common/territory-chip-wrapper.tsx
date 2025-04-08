import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface TerritoryChipWrapperProps extends PropsWithChildren {
  color: string
  className?: string
}

export function TerritoryChipWrapper({ children, color, className }: TerritoryChipWrapperProps) {
  return (
    <div className={cn("rounded-lg p-1 border relative", className)} style={{ borderColor: color }}>
      <div className="absolute top-0 left-0 bottom-0 right-0 rounded-lg z-1" style={{ backgroundColor: color, opacity: 0.1 }}>
      </div>
      <div className="z-2 relative">{children}</div>
    </div>
  );
}