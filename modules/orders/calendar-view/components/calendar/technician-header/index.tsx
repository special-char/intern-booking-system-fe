import { Skeleton } from "@/components/shadcn/skeleton"
import { Eye, WrenchIcon } from "lucide-react"

interface ResourceStats {
  installations: number
  inspections: number
}

interface TechnicianHeaderProps {
  isLoading?: boolean
  resource: {
    title: string
    stats: ResourceStats
  }
}

export function TechnicianHeader({ isLoading, resource }: TechnicianHeaderProps) {
  const [name, surname] = resource.title.trim().split(" ")

  return (
    <div className="flex flex-col py-3 px-4 gap-3">
      <div className="flex justify-between items-start gap-2">
        {isLoading ? (
          <div className="flex flex-col grow gap-1 mb-2">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden">
            {[name, surname].map((part) => (
              <p key={part} className="text-base text-left font-medium text-text-primary truncate">{part}</p>
            ))}
          </div>
        )}
        <Skeleton className="min-w-10 min-h-10 rounded-lg mt-1" />
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-1 bg-purple-50 py-1 px-2 rounded-lg text-purple-600">
          <WrenchIcon size={20} />
          {isLoading ? (
            <div className="w-3"></div>
          ) : (
            <span>{resource.stats.installations}</span>
          )}
        </div>
        <div className="flex items-center gap-1 bg-orange-50 py-1 px-2 rounded-lg text-orange-600">
          <Eye size={20} />
          {isLoading ? (
            <div className="w-3"></div>
          ) : (
            <span>{resource.stats.inspections}</span>
          )}
        </div>
      </div>
    </div>
  )
}