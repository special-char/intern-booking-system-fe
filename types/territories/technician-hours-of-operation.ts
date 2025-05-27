
import { Territory } from "./territory"
import { DateRange } from "../date"
import { Technician } from "@/payload-types"
export interface TechnicianHoursOfOperationTerritory extends Territory {
  from: string,
  to: string,
}

export interface TechnicianHoursOfOperationData {
  technician: Technician,
  territories: TechnicianHoursOfOperationTerritory[]
}

export interface TechnicianHoursOfOperation {
  dateRange: DateRange,
  data: TechnicianHoursOfOperationData[]
}