import { getTechnicianHoursOfOperation } from "@/mocks/territories-availability/technician-hours-of-operation"
import { TechnicianGrid } from "./components/grid"
import { TechnicianHoursOfOperation } from "@/types/territories/technician-hours-of-operation"

interface TechnicianGridTemplateProps {
  dateRange: {
    from: string
    to: string
  }
}

export async function TechnicianGridTemplate({ dateRange }: TechnicianGridTemplateProps) {
  const technicianHoursOfOperation: TechnicianHoursOfOperation | null = await getTechnicianHoursOfOperation(dateRange)

  if (!technicianHoursOfOperation) {
    return <div>No technician hours of operation found</div>;
  }

  return <TechnicianGrid technicianHoursOfOperation={technicianHoursOfOperation} />
}