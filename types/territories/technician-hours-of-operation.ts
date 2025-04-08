import { Technician } from "@/modules/vans-techs/technicians/components/technicians-table/columns"
import { Territory } from "./territory"

export interface TechnicianHoursOfOperationTerritory extends Territory {
  from: string,
  to: string,
}

export interface TechnicianHoursOfOperation {
  dateRange: {
    from: string,
    to: string
  }
  data: {
    technician: Partial<Technician>,
    territories: TechnicianHoursOfOperationTerritory[]
  }[]
}