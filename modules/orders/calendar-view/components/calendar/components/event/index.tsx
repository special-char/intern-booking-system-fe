import { Clock } from "lucide-react"
import "./style.css"
import { Event as EventType } from "@/types/orders/event"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/shadcn/skeleton"

export interface EventProps {
  event: Omit<EventType, "start" | "end"> & {
    start: Date
    end: Date
  }
  isLoading?: boolean
}

export function Event({ event, isLoading }: EventProps) {
  function getEventStyle(): string {
    switch (event.type) {
      case "installation":
        return "border-t-2 border-r-2 border-b-2 border-l-purple-600 bg-purple-50 border-t-purple-100 border-r-purple-100 border-b-purple-100 hover:bg-purple-100"
      case "inspection":
        return "border-t-2 border-r-2 border-b-2 border-l-orange-600 bg-orange-50 border-t-orange-100 border-r-orange-100 border-b-orange-100 hover:bg-orange-100"
      case "load":
        return "relative border-l-4 border-l-gray-400 border-t-0 border-r-0 border-b-0 bg-gray-50 before:content-[''] before:absolute before:top-0 before:left-1 before:right-0 before:bottom-0 before:border before:border-dashed before:border-gray-400 before:border-l-0 before:rounded-r-lg hover:bg-gray-100"
      default:
        return ""
    }
  }

  function calculateDuration(start: Date, end: Date): string {
    const durationMs: number = end.getTime() - start.getTime()
    const durationMinutes: number = Math.round(durationMs / (1000 * 60))
    return `${durationMinutes} mins`
  }

  function formatTimeRange(start: Date, end: Date): string {
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    return `${timeFormatter.format(start)} - ${timeFormatter.format(end)}`
  }

  if (event.type === "idle") {
    return (
      <div className="absolute bg-gray-100 rounded-none inset-0 m-0 border-l-0 transition-all duration-150 ease-in-out before:content-[''] before:absolute before:top-0 before:left-1 before:bottom-0 before:w-1 before:bg-cyan-300 bg-[radial-gradient(#06B6D4,transparent_1px)] bg-[length:20px_20px] px-3 cursor-default">
        <div className="flex mt-2 gap-2 h-fit items-center">
          <Clock size={18} color="#06B6D4" className="ml-2" />
          <p className="text-xs font-semibold text-gray-700">{event.title}</p>
          <p className="text-[0.65rem] text-gray-500">{calculateDuration(event.start, event.end)}</p>
        </div>
      </div>
    )
  }

  if (event.type === "lunch") {
    return (
      <div className="relative p-0 h-full rounded-none bg-[#EEF2FF] bg-[repeating-linear-gradient(-45deg,#EEF2FF,#EEF2FF_10px,#D1D5DB_10px,#D1D5DB_11px)] [image-rendering:crisp-edges] [transform:translateZ(0)] [backface-visibility:hidden] transition-all duration-150 ease-in-out flex items-center cursor-default">
        <div className="p-3 flex items-center text-xs text-gray-500 gap-2">
          <span>🍔</span>
          <p>{event.title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("h-full rounded-lg overflow-hidden shadow-none border-l-4 transition-all duration-150 ease-in-out", getEventStyle())}>
      <div className="px-3 mt-2 flex flex-col justify-start">
        <p className="text-xs font-semibold text-gray-700 mb-2">
          {event.title}
        </p>
        {isLoading ? (
          <>
            <Skeleton className="w-1/2 h-7 mb-2" />
            <Skeleton className="w-1/3 h-4" />
          </>
        ) : (
          <p className="text-[0.65rem] text-gray-500">{formatTimeRange(event.start, event.end)}</p>
        )}
      </div>
    </div>
  )
}

