import { PreInspection } from "./pre-inspection"
import { VehicleDetail } from "./vehicle-detail"

export interface Event {
  createdAt: string
  customer: {
    id: string,
    name: string,
    phone: string
  },
  end: string,
  id: string,
  invoice: {
    sum: number
  }
  location: {
    street: string,
    city: string,
    state: string,
    zipCode: string
  }
  notes?: string,
  preInspection: PreInspection,
  start: string,
  title: string,
  subTitle: string,
  status: "success" | "failure" | "pending"
  type: "idle" | "installation" | "inspection" | "lunch" | "load",
  vehicleDetail: VehicleDetail
}