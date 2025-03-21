export interface TireSupplier {
  autoPay: boolean
  connectionKey: string
  functionalities: TireSupplierFunctionality[],
  id: string;
  name: string
  notes?: string
  orderCutoff: number
  orderCutoffMin: number
  orderCutoffMax: number
  receiving: "routeDelivery" | "willCall"
  receivingMin: number
  receivingMax: number
  receivingFrom: number
  receivingTo: number
  slug: string
}

export interface TireSupplierFunctionality {
  id: string
  name: string
  lastChecked: string
  status: "connected" | "disconnected"
}