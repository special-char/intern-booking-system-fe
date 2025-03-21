import { TireSupplier } from "./tire-supplier";

export interface TireBrand {
  id: string;
  logoUrl: string
  name: string;
  preferredSuplierId: string | null
  status: boolean
  suppliers: TireSupplier[]
}

