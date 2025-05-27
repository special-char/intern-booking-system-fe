import { getTechnicianHoursOfOperation } from "@/mocks/territories-availability/technician-hours-of-operation"
import { TechnicianGrid } from "./components/grid"
import { TechnicianHoursOfOperation } from "@/types/territories/technician-hours-of-operation"
import { DateRange } from "@/types/date"
import { Territory } from "@/payload-types"

interface TechnicianGridTemplateProps {
  dateRange: DateRange
  territories: Territory[]
  filters: Record<string, boolean>
  search: string
}

export async function TechnicianGridTemplate({ dateRange, territories, filters, search }: TechnicianGridTemplateProps) {
  const technicianHoursOfOperation: TechnicianHoursOfOperation | null = await getTechnicianHoursOfOperation(dateRange, filters, search)

  if (!technicianHoursOfOperation) {
    return <div>No technician hours of operation found</div>;
  }

  return <TechnicianGrid dateRange={dateRange} technicianHoursOfOperation={technicianHoursOfOperation} territories={territories} />
}