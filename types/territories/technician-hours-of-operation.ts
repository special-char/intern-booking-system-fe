import { Technician } from "@/lib/data/technicians"
import { Territory } from "./territory"
import { DateRange } from "../date"

export interface TechnicianHoursOfOperationTerritory extends Territory {
  from: string,
  to: string,
}

export interface TechnicianHoursOfOperationData {
  technician: Partial<Technician>,
  territories: TechnicianHoursOfOperationTerritory[]
}

export interface TechnicianHoursOfOperation {
  dateRange: DateRange,
  data: TechnicianHoursOfOperationData[]
}