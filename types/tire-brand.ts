export interface TireBrand {
  id: string;
  logoUrl: string
  name: string;
  preferredSuplierId: string | null
  status: boolean
  suppliers: TireSupplier[]
}

export interface TireSupplier {
  id: string;
  name: string
}
