import { Skeleton } from "@/components/shadcn/skeleton";
import { cn } from "@/lib/utils";

export type TimeMarker = { seconds: number; label: string }

interface TimeMarkersProps {
  className?: string
  isLoading?: boolean
  markers: TimeMarker[]
  maxSeconds: number
  minSeconds: number
}

export function TimeMarkers({
  className,
  isLoading,
  markers,
  maxSeconds,
  minSeconds,
}: TimeMarkersProps) {
  return (
    <div className={cn("relative mt-3 text-[8px] text-muted-foreground select-none", className)}>
      {markers.map((marker, index) => {
        const position: number = ((marker.seconds - minSeconds) / (maxSeconds - minSeconds)) * 100;

        return (
          <div
            key={index}
            className="absolute flex flex-col w-max"
            style={{ left: `${position}%` }}
          >
            <div className="h-2 w-px bg-muted-foreground/50"></div>
            <span className="-translate-x-[50%]">
              {isLoading ? <Skeleton variant="default" className="w-7 h-2 mt-1" /> : marker.label}
            </span>
          </div>
        )
      })}
    </div >
  );
}