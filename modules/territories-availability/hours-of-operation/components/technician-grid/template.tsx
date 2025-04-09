import { getTechnicianHoursOfOperation } from "@/mocks/territories-availability/technician-hours-of-operation"
import { TechnicianGrid } from "./components/grid"
import { TechnicianHoursOfOperation } from "@/types/territories/technician-hours-of-operation"
import { DateRange } from "@/types/date"

interface TechnicianGridTemplateProps {
  dateRange: DateRange
}

export async function TechnicianGridTemplate({ dateRange }: TechnicianGridTemplateProps) {
  const technicianHoursOfOperation: TechnicianHoursOfOperation | null = await getTechnicianHoursOfOperation(dateRange)

  if (!technicianHoursOfOperation) {
    return <div>No technician hours of operation found</div>;
  }

  return <TechnicianGrid dateRange={dateRange} technicianHoursOfOperation={technicianHoursOfOperation} />
}