import { Tire } from "../tire"

export interface VehicleDetail {
  id: string
  name: string
  numberPlate: string
  tireDetails: Pick<Tire, 'brand' | 'model' | 'size'> & {
    inVan: boolean
  }
  wheels: {
    frontLeft: boolean,
    frontRight: boolean,
    rearLeft: boolean,
    rearRight: boolean
  }
  year: number
}