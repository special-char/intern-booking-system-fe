import { Eye, WrenchIcon } from "lucide-react"

interface UnroutedOverlayContentProps {
  jobsTotal: number
  label: string
  installations: number
  inspections: number
}

export function UnroutedOverlayContent({ jobsTotal, label, installations, inspections }: UnroutedOverlayContentProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-6 w-full h-full relative">
      {Array.from({ length: 24 }, (_, index) => {
        return (
          <div key={index} className="border-t border-r">
            <div className="h-full w-full"></div>
          </div>
        )
      })}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-3">
        <div className="bg-primary-100 px-4 py-1 rounded-xl font-semibold">
          <span>
            {label}
          </span>
        </div>
        <span>
          Unrouted
        </span>
        <span className="font-semibold text-5xl">
          {jobsTotal}
        </span>
        <div className="flex gap-3 mt-2">
          <div className="flex items-center gap-1.5">
            <WrenchIcon className="text-purple-600" size={20} />
            <div className="bg-primary-100 py-1 px-1.5 rounded-sm">
              <span className="font-semibold text-primary">
                {installations}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Eye className="text-orange-600" size={20} />
            <div className="bg-primary-100 py-1 px-1.5 rounded-sm">
              <span className="font-semibold text-primary">
                {inspections}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}